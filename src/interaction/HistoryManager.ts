
 export default class HistoryManager<StateType> {
  private history: StateType[] = [];
  private historyIndex = -1;

  add(state: StateType) {
    this.historyIndex++;
    this.history[this.historyIndex] = state;
    this.history.splice(this.historyIndex + 1);
  }

  clear() {
    this.history.length = 0;
    this.historyIndex = -1;
  }

  undo(): StateType|undefined {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      return this.history[this.historyIndex];
    }
    this.historyIndex = -1;
    return undefined;
  }

  redo(): StateType|undefined {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      return this.history[this.historyIndex];
    }
    return undefined;
  }

  size(): number {
    return this.history.length;
  }

  position(): number {
    return this.historyIndex;
  }
}
