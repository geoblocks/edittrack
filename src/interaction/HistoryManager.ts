
 export default class HistoryManager<StateType> {
  private history_: StateType[] = [];
  private historyIndex_ = -1;

  add(state: StateType) {
    this.historyIndex_++;
    this.history_[this.historyIndex_] = state;
    this.history_.splice(this.historyIndex_ + 1);
  }

  clear() {
    this.history_.length = 0;
    this.historyIndex_ = -1;
  }

  undo(): StateType|undefined {
    if (this.historyIndex_ > 0) {
      this.historyIndex_--;
      return this.history_[this.historyIndex_];
    }
    this.historyIndex_ = -1;
    return undefined;
  }

  redo(): StateType|undefined {
    if (this.historyIndex_ < this.history_.length - 1) {
      this.historyIndex_++;
      return this.history_[this.historyIndex_];
    }
    return undefined;
  }
}
