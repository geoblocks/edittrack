
/**
 * @template StateType
 */
 export default class HistoryManager {

  constructor() {

    /**
     * @type {Array<StateType>}
     */
    this.history_ = [];

    /**
     * @type {number}
     */
    this.historyIndex_ = -1;
  }

  /**
   * @param {StateType} state
   */
  add(state) {
    this.historyIndex_++;
    this.history_[this.historyIndex_] = state;
    this.history_.splice(this.historyIndex_ + 1);
  }

  clear() {
    this.history_.length = 0;
    this.historyIndex_ = -1;
  }

  /**
   * @return {StateType|undefined} state
   */
  undo() {
    if (this.historyIndex_ > 0) {
      this.historyIndex_--;
      return this.history_[this.historyIndex_];
    }
    this.historyIndex_ = -1;
    return undefined;
  }

  /**
   * @return {StateType|undefined} state
   */
  redo() {
    if (this.historyIndex_ < this.history_.length - 1) {
      this.historyIndex_++;
      return this.history_[this.historyIndex_];
    }
    return undefined;
  }
}
