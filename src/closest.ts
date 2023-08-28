/**
 * @module ol/geom/flat/closest
 */
import {lerp, squaredDistance as squaredDx} from 'ol/math.js';

/*
 * Returns the point on the 2D line segment flatCoordinates[offset1] to
 * flatCoordinates[offset2] that is closest to the point (x, y).  Extra
 * dimensions are linearly interpolated.
 */
function assignClosest(
  flatCoordinates: number[],
  offset1: number,
  offset2: number,
  stride: number,
  x: number,
  y: number,
  closestPoint: number[]
) {
  const x1 = flatCoordinates[offset1];
  const y1 = flatCoordinates[offset1 + 1];
  const dx = flatCoordinates[offset2] - x1;
  const dy = flatCoordinates[offset2 + 1] - y1;
  let offset;
  if (dx === 0 && dy === 0) {
    offset = offset1;
  } else {
    const t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      offset = offset2;
    } else if (t > 0) {
      for (let i = 0; i < stride; ++i) {
        closestPoint[i] = lerp(
          flatCoordinates[offset1 + i],
          flatCoordinates[offset2 + i],
          t
        );
      }
      closestPoint.length = stride;
      return;
    } else {
      offset = offset1;
    }
  }
  for (let i = 0; i < stride; ++i) {
    closestPoint[i] = flatCoordinates[offset + i];
  }
  closestPoint.length = stride;
}

type ClosestPointResult = {
  totalSquaredDistance: number;
  squaredDistance: number;
  closestPoint: number[];
}

export function getClosestPoint(
  flatCoordinates: number[],
  offset: number,
  end: number,
  stride: number,
  maxDelta: number,
  x: number,
  y: number
): ClosestPointResult {
  let minSquaredDistance = Infinity;
  const closestPoint = [NaN, NaN];
  let minIndex;
  if (offset == end) {
    return {
      closestPoint: closestPoint,
      squaredDistance: minSquaredDistance,
      totalSquaredDistance: minSquaredDistance,
    };
  }
  let i, squaredDistance;
  if (maxDelta === 0) {
    // All points are identical, so just test the first point.
    squaredDistance = squaredDx(
      x,
      y,
      flatCoordinates[offset],
      flatCoordinates[offset + 1]
    );
    if (squaredDistance < minSquaredDistance) {
      for (i = 0; i < stride; ++i) {
        closestPoint[i] = flatCoordinates[offset + i];
      }
      closestPoint.length = stride;
      return {
        closestPoint: closestPoint,
        squaredDistance: squaredDistance,
        totalSquaredDistance: squaredDx(
          flatCoordinates[offset],
          flatCoordinates[offset + 1],
          closestPoint[0],
          closestPoint[1]
        ),
      };
    }
    return {
      closestPoint: closestPoint,
      squaredDistance: minSquaredDistance,
      totalSquaredDistance: minSquaredDistance,
    };
  }
  const tmpPoint = [NaN, NaN];
  let index = offset + stride;
  while (index < end) {
    assignClosest(
      flatCoordinates,
      index - stride,
      index,
      stride,
      x,
      y,
      tmpPoint
    );
    squaredDistance = squaredDx(x, y, tmpPoint[0], tmpPoint[1]);
    if (squaredDistance < minSquaredDistance) {
      minSquaredDistance = squaredDistance;
      minIndex = index;
      for (i = 0; i < stride; ++i) {
        closestPoint[i] = tmpPoint[i];
      }
      closestPoint.length = stride;
      index += stride;
    } else {
      // console.log('no match', index);
      // Skip ahead multiple points, because we know that all the skipped
      // points cannot be any closer than the closest point we have found so
      // far.  We know this because we know how close the current point is, how
      // close the closest point we have found so far is, and the maximum
      // distance between consecutive points.  For example, if we're currently
      // at distance 10, the best we've found so far is 3, and that the maximum
      // distance between consecutive points is 2, then we'll need to skip at
      // least (10 - 3) / 2 == 3 (rounded down) points to have any chance of
      // finding a closer point.  We use Math.max(..., 1) to ensure that we
      // always advance at least one point, to avoid an infinite loop.
      index +=
        stride *
        Math.max(
          ((Math.sqrt(squaredDistance) - Math.sqrt(minSquaredDistance)) /
            maxDelta) |
            0,
          1
        );
    }
  }
  let totalSquaredDistance = 0;
  for (i = offset + stride; i < minIndex; ++i) {
    totalSquaredDistance += squaredDx(
      flatCoordinates[i - stride],
      flatCoordinates[i - stride + 1],
      flatCoordinates[i],
      flatCoordinates[i + 1]
    )
  }
  totalSquaredDistance += squaredDx(
    flatCoordinates[minIndex],
    flatCoordinates[minIndex + 1],
    closestPoint[0],
    closestPoint[1]
  );

  return {
    totalSquaredDistance: totalSquaredDistance,
    squaredDistance: minSquaredDistance,
    closestPoint: closestPoint,
  }
}
