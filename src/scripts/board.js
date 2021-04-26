import Node from './node';
import {dijkstraAlgo, dijkstraShortestPath} from './dijkstra';

const START_NODE_ROW = 18;
const START_NODE_COL = 1;
const FINISH_NODE_ROW = 1;
const FINISH_NODE_COL = 48;
let VISITED_NODES = null;


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
    this.clearSolution = this.clearSolution.bind(this);
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

        currentElement.addEventListener("mouseup", function(e) {
          if (board.buttonsOn) {
            board.buttonsOn = false;
          }
        });

      }
    }
    const clear = document.getElementById("clear-button")
    
    clear.addEventListener("click", this.clearSolution);


    const dijkstra = document.getElementById("display-button");
    
    dijkstra.addEventListener("click", function(e) {
      board.disableButton();
      
      this.setAttribute("disabled", "true")
      const grid = board.grid;
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      
      const visitedNodesInOrder = VISITED_NODES || dijkstraAlgo(grid, startNode, finishNode);
      VISITED_NODES = visitedNodesInOrder;
      const nodesInShortestPathOrder = dijkstraShortestPath(finishNode);
      
      board.displayDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    })



  }

  clearSolution() {
    this.myPath = [];
    this.buttonsOn = false;
    this.previous = null;
    this.finishedPath = false;
    this.nodeClicked = null;

    const dijkstraButton = document.getElementById("display-button");
    dijkstraButton.removeAttribute("disabled");

    const solutionButton = document.getElementById("solution");
    solutionButton.setAttribute("disabled", "true")

    const startNode = document.getElementById(`${START_NODE_ROW}-${START_NODE_COL}`);
    const finishNode = document.getElementById(`${FINISH_NODE_ROW}-${FINISH_NODE_COL}`);
    for (const node of VISITED_NODES) {
      const nodeEle = document.getElementById(`${node.row}-${node.col}`);
      if (nodeEle === startNode) {
        
        nodeEle.className = "node node-start";
      } else if (nodeEle === finishNode) {
        nodeEle.className = "node node-finish";
        
      } else {
        nodeEle.className = "node";
      }
    }
  }

  disableButton() {
    const clearButton = document.getElementById("clear-button");
    clearButton.setAttribute("disabled", "true");

    const solutionButton = document.getElementById("solution");
    solutionButton.setAttribute("disabled", "true")
    
  }

  enableButton() {
    
    const clearButton = document.getElementById("clear-button");
    clearButton.removeAttribute("disabled");

    const solutionButton = document.getElementById("solution");
    solutionButton.removeAttribute("disabled");
  }

  displayDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    const board = this;

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      
      if (i === visitedNodesInOrder.length) {
        const showButton = document.getElementById("solution");
        showButton.addEventListener("click", function(e) {
          board.disableButton();
          
          board.displayShortestPath(nodesInShortestPathOrder);
        })
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

  displayShortestPath(nodesInShortestPathOrder) {
    let board = this;
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {

      if (i === nodesInShortestPathOrder.length - 1) {
          setTimeout(board.enableButton, 40 * i);
          
        }
      
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const nodeElement = document.getElementById(`${node.row}-${node.col}`);

        if (nodeElement.classList.contains("my-path-node")) {
          nodeElement.className = 'node correct-node-shortest-path';
        } else {
          nodeElement.className += ' node-shortest-path';
        }
      }, 40 * i);
      
    }
  }

  displayResults(nodesInShortestPathOrder) {
    const percentage = this.calculatePoints(this.myPath, nodesInShortestPathOrder)
    const isVisible = "is-visible";
    const resultModal = document.getElementById("modal3");
    const modalContent = document.getElementById("display-results");

    const result = document.createElement("p");
    const textNode = document.createTextNode(`${Math.floor(percentage)}% out of 100%`);
    const tryAgain = document.createElement("p");
    const textNode2 = this.textResult(percentage);

    if (modalContent.children.length) modalContent.textContent = "";

      result.append(textNode);
      tryAgain.append(textNode2);
      modalContent.append(result);
      modalContent.append(tryAgain);

    resultModal.classList.add(isVisible);
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

  textResult(score) {
    if (score === 100) {
      return document.createTextNode("CONGRATULATIONS! You know what you're doing");
    } else if (score > 90) {
      return document.createTextNode("SO CLOSE! Keep working! You got this!");
    } else if (score > 70) {
      return document.createTextNode("Not bad! keep it up and you'll get it");
    } else if (score > 50) {
      return document.createTextNode("Ehhhhh, you could do better");
    } else {
      return document.createTextNode("Study, study, study");
    }
  }

  getNode(id) {
    let coordinates = id.split("-");
    let row = parseInt(coordinates[0]);
    let col = parseInt(coordinates[1]);
    return this.grid[row][col];
  };
}

export default Board;