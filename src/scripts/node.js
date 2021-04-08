const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 25;

class Node {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.mouseDown = false;
    this.isStart = this.isStart();
    this.isFinish = this.isFinish();
  }

  isStart() {
    if (this.row === START_NODE_ROW && this.col === START_NODE_COL) {
      this.addClass("node-start");
      return true
    };
    return false;
  }

  isFinish() {
    if (this.row === FINISH_NODE_ROW && this.col === FINISH_NODE_COL) {
      this.addClass("node-finish");
      return true
    };
    return false;
  }

  addClass(className) {
    let nodeEle = document.getElementById(`${this.row}-${this.col}`)
    nodeEle.className += ` ${className}`;
  }
}

export default Node;