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
    this.finishedPath = false;
    this.nodeClicked = null;
    // this.clearBoard = this.clearBoard.bind(this);
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
          if (!board.finishedPath) {
            if (!currentNode.isFinish) {
              board.nodeClicked = currentElement;
              if ((currentNode.isStart && board.previous === null) || (board.nodeClicked === board.previous)) {
                currentNode.mouseDown = true;
                board.buttonsOn = true
                if (!board.myPath.includes(currentNode)) {
                  board.myPath.push(currentNode);
                }
              }
            }
          }
        });
            
        currentElement.addEventListener("mouseenter", function(e) {
          if (!currentNode.isWall) {
            if (board.buttonsOn) {
              currentNode.mouseDown = true;
  
              if (currentNode.isFinish) {
                board.buttonsOn = false;
                board.myPath.push(currentNode);
                board.finishedPath = true;
              }
              
              if (!board.myPath.includes(currentNode)) { 
                board.previous = currentElement;
              board.myPath.push(currentNode);
                currentElement.className += " clicked";
              }
            }
          } else {
            board.buttonsOn = false;
          }
        });

        // currentElement.addEventListener("mouseleave" , function(e) {
          // if (board.buttonsOn) {
          //   board.previous = currentElement;
          // }
        // })


        currentElement.addEventListener("mouseup", function(e) {
          if (board.buttonsOn) {
            board.buttonsOn = false;
          }
        });

      }
    }
    const clear = document.getElementById("clear-button")
    clear.addEventListener("click", function(e) {
      board.myPath.forEach(node => {
        const row = node.row;
        const col = node.col;
        const nodeEle = document.getElementById(`${row}-${col}`);
        nodeEle.classList.remove("clicked")
        board.myPath = [];
        board.buttonsOn = false;
        board.previous = null;
        board.finishedPath = false;
        board.nodeClicked = null;
      })
    });

  }

  getNode(id) {
    let coordinates = id.split("-");
    let row = parseInt(coordinates[0]);
    let col = parseInt(coordinates[1]);
    return this.grid[row][col];
  };
}

export default Board;