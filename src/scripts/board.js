import Node from './node';


class Board {
  constructor(el) {
    this.el = el;
    this.maxRow = 20;
    this.maxCol = 50;
    this.grid = [];
    this.myPath = [];
    this.board = this.createBoard();
    this.addEventListeners();
    this.buttonsOn = false;
    this.previous = null;
    this.nodeClicked = null;
  }

  createBoard() {
    for (let row = 0; row < this.maxRow; row++) {
      let boardRow = [];
      let newEleRow = document.createElement("div");
      newEleRow.className = "node-row";
      this.el.appendChild(newEleRow);

      for (let col = 0; col < this.maxCol; col++) {
        let newEleNode = document.createElement("div");
        newEleNode.className = "node";
        newEleNode.setAttribute("id", `${row}-${col}`)
        newEleRow.appendChild(newEleNode);
        let node = new Node(row, col)
        boardRow.push(node)
      }

      this.grid.push(boardRow)
    }
  }

  addEventListeners() {
    let board = this;
    for (let row = 0; row < board.maxRow; row++) {
      for (let col = 0; col < board.maxCol; col++) {
        let currentId = `${row}-${col}`;
        let currentNode = board.getNode(currentId);
        let currentElement = document.getElementById(currentId);

        currentElement.addEventListener("mousedown", function(e) {
          e.preventDefault();
          if (currentNode.isStart || currentNode.mouseDown) {
            currentNode.mouseDown = true;
            board.buttonsOn = true
            board.nodeClicked = currentElement;
            if (!board.myPath.includes(currentNode)) {
              board.myPath.push(currentNode);
            }
          }
        });
            
        currentElement.addEventListener("mouseenter", function(e) {
          if (board.buttonsOn) {
            currentNode.mouseDown = true;
            // board.nodeClicked = currentElement;
            // debugger

            if (!board.myPath.includes(currentNode)) {  //board.previous === board.nodeClicked
            board.myPath.push(currentNode);
              currentElement.className += " clicked";
            }
          }
        });

        currentElement.addEventListener("mouseleave" , function(e) {
          if (board.buttonsOn) {
            board.previous = currentElement;
          }
        })


        currentElement.addEventListener("mouseup", function(e) {
          if (board.buttonsOn) {
            board.previous = currentElement;
            board.buttonsOn = false;
            // board.nodeClicked = currentElement;   
          }
          debugger
        });

      }
    }
  }

  getNode(id) {
    let coordinates = id.split("-");
    let row = parseInt(coordinates[0]);
    let col = parseInt(coordinates[1]);
    return this.grid[row][col];
  };

  // appendElementToDom(className, parent=this.el) {
  //   let child = document.createElement("div");
  //   child.className = className;
  //   parent.appendChild(child);
  // }
}

export default Board;