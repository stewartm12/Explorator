import Node from './node';
import {dijkstraAlgo, getNodesInShortestPathOrder} from './dijkstra';

const START_NODE_ROW = 18;
const START_NODE_COL = 1;
const FINISH_NODE_ROW = 1;
const FINISH_NODE_COL = 48;

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
    // this.myPath.push(this.getNode(`${START_NODE_ROW}-${START_NODE_COL}`));
    // this.grid.push(this.getNode(`${START_NODE_ROW}-${START_NODE_COL}`));
    // this.displayDijkstra = this.displayDijkstra.bind(this);
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
      window.location.reload();
      // board.myPath.forEach(node => {
      //   const row = node.row;
      //   const col = node.col;
      //   const nodeEle = document.getElementById(`${row}-${col}`);
      //   nodeEle.classList.remove("clicked")
      //   board.myPath = [];
      //   board.buttonsOn = false;
      //   board.previous = null;
      //   board.finishedPath = false;
      //   board.nodeClicked = null;
      // })
    });

    const dijkstra = document.getElementById("display-button");
    
    dijkstra.addEventListener("click", function(e) {
      this.setAttribute("disabled", "true")
      const grid = board.grid;
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      
      const visitedNodesInOrder = dijkstraAlgo(grid, startNode, finishNode);
      
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      // 
      board.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    })



  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    const board = this;
    

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      // 
      if (i === visitedNodesInOrder.length) {
        const showButton = document.getElementById("solution");
        showButton.addEventListener("click", function(e) {
          board.animateShortestPath(nodesInShortestPathOrder);
        })
        // setTimeout(() => {
          
        //   board.animateShortestPath(nodesInShortestPathOrder);
        // }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        
        const nodeElement = document.getElementById(`${node.row}-${node.col}`)
        if (nodeElement.classList.contains("clicked") || nodeElement.classList.contains("node-start") || nodeElement.classList.contains("node-finish")) {
          nodeElement.className +=' my-path-node';
        } else {
          nodeElement.className += ' node-visited';
        }
        if (i ===  visitedNodesInOrder.length - 1) {
          board.displayResults( nodesInShortestPathOrder);
        }
      }, 10 * i);
      
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    const board = this;
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const nodeElement = document.getElementById(`${node.row}-${node.col}`);
        debugger
        if (nodeElement.classList.contains("my-path-node")) {
          nodeElement.className = 'node correct-node-shortest-path';
        } else {
          nodeElement.className += ' node-shortest-path';
        }
        // if (i ===  nodesInShortestPathOrder.length - 1) {
        //   board.displayResults( nodesInShortestPathOrder);
        // }
      }, 50 * i);
      
    }
  }

  displayResults(nodesInShortestPathOrder) {
    const percentage = this.calculatePoints(this.myPath, nodesInShortestPathOrder)
    const isVisible = "is-visible";
    const resultModal = document.getElementById("modal3");
    const modalContent = document.getElementById("display-results");

    const result = document.createElement("p");
    const textNode = document.createTextNode(`${Math.floor(percentage)}% out of 100% nodes correct`);
    const tryAgain = document.createElement("p");
    const textNode2 = document.createTextNode("Please Try Again :)");

    result.append(textNode);
    tryAgain.append(textNode2);
    modalContent.append(result);
    modalContent.append(tryAgain);

    resultModal.classList.add(isVisible);
    console.log("achieved")
  }

  calculatePoints(myPathOrder, nodesInShortestPathOrder) {
    const setPoints = new Set();
    const set1 = new Set(nodesInShortestPathOrder);

    myPathOrder.forEach(node => {
      if (set1.has(node)) setPoints.add(node);
    })
    const percentage = (setPoints.size / nodesInShortestPathOrder.length) * 100
    return percentage;
  }

  getNode(id) {
    let coordinates = id.split("-");
    let row = parseInt(coordinates[0]);
    let col = parseInt(coordinates[1]);
    return this.grid[row][col];
  };
}

export default Board;