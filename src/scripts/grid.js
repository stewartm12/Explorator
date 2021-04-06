// import Node from './node'

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 25;

class Grid {
  constructor(el) {
    this.el = el;
    this.grid = this.createGrid();
  }

  createGrid() {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      let newEleRow = document.createElement("div");
      newEleRow.className = "node-row";
      const currentRow = [];
      this.el.appendChild(newEleRow);
      for (let col = 0; col < 50; col++) {
        let newEleNode = document.createElement("div");
        newEleNode.className = "node";
        newEleRow.appendChild(newEleNode)
        currentRow.push(this.createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  }

  createNode(col, row) {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    }
  };
}

export default Grid;