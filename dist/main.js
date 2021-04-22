/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/board.js":
/*!******************************!*\
  !*** ./src/scripts/board.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./src/scripts/node.js");
/* harmony import */ var _dijkstra__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dijkstra */ "./src/scripts/dijkstra.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var START_NODE_ROW = 18;
var START_NODE_COL = 1;
var FINISH_NODE_ROW = 1;
var FINISH_NODE_COL = 48;

var Board = /*#__PURE__*/function () {
  function Board(el) {
    _classCallCheck(this, Board);

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
    this.nodeClicked = null; // this.myPath.push(this.getNode(`${START_NODE_ROW}-${START_NODE_COL}`));
    // this.grid.push(this.getNode(`${START_NODE_ROW}-${START_NODE_COL}`));
    // this.displayDijkstra = this.displayDijkstra.bind(this);
    // this.clearBoard = this.clearBoard.bind(this);
  }

  _createClass(Board, [{
    key: "createBoard",
    value: function createBoard() {
      for (var row = 0; row < this.maxRow; row++) {
        var boardRow = [];
        var newEleRow = document.createElement("div");
        newEleRow.className = "node-row";
        this.el.appendChild(newEleRow);

        for (var col = 0; col < this.maxCol; col++) {
          var newEleNode = document.createElement("div");
          newEleNode.className = "node";
          newEleNode.setAttribute("id", "".concat(row, "-").concat(col));
          newEleRow.appendChild(newEleNode);
          var node = new _node__WEBPACK_IMPORTED_MODULE_0__.default(row, col);
          boardRow.push(node);
        }

        this.grid.push(boardRow);
      }
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var board = this;

      for (var row = 0; row < board.maxRow; row++) {
        var _loop = function _loop(col) {
          var currentId = "".concat(row, "-").concat(col);
          var currentNode = board.getNode(currentId);
          var currentElement = document.getElementById(currentId);
          currentElement.addEventListener("mousedown", function (e) {
            e.preventDefault();

            if (!board.finishedPath) {
              if (!currentNode.isFinish) {
                board.nodeClicked = currentElement;

                if (currentNode.isStart && board.previous === null || board.nodeClicked === board.previous) {
                  currentNode.mouseDown = true;
                  board.buttonsOn = true;

                  if (!board.myPath.includes(currentNode)) {
                    board.myPath.push(currentNode);
                  }
                }
              }
            }
          });
          currentElement.addEventListener("mouseenter", function (e) {
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
          }); // currentElement.addEventListener("mouseleave" , function(e) {
          // if (board.buttonsOn) {
          //   board.previous = currentElement;
          // }
          // })

          currentElement.addEventListener("mouseup", function (e) {
            if (board.buttonsOn) {
              board.buttonsOn = false;
            }
          });
        };

        for (var col = 0; col < board.maxCol; col++) {
          _loop(col);
        }
      }

      var clear = document.getElementById("clear-button");
      clear.addEventListener("click", function (e) {
        window.location.reload(); // board.myPath.forEach(node => {
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
      var dijkstra = document.getElementById("display-button");
      dijkstra.addEventListener("click", function (e) {
        this.setAttribute("disabled", "true");
        var grid = board.grid;
        var startNode = grid[START_NODE_ROW][START_NODE_COL];
        var finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        var visitedNodesInOrder = (0,_dijkstra__WEBPACK_IMPORTED_MODULE_1__.dijkstraAlgo)(grid, startNode, finishNode);
        var nodesInShortestPathOrder = (0,_dijkstra__WEBPACK_IMPORTED_MODULE_1__.getNodesInShortestPathOrder)(finishNode); // 

        board.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
      });
    }
  }, {
    key: "animateDijkstra",
    value: function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
      var board = this;

      var _loop2 = function _loop2(i) {
        // 
        if (i === visitedNodesInOrder.length) {
          var showButton = document.getElementById("solution");
          showButton.addEventListener("click", function (e) {
            board.animateShortestPath(nodesInShortestPathOrder);
          }); // setTimeout(() => {
          //   board.animateShortestPath(nodesInShortestPathOrder);
          // }, 10 * i);

          return {
            v: void 0
          };
        }

        setTimeout(function () {
          var node = visitedNodesInOrder[i];
          var nodeElement = document.getElementById("".concat(node.row, "-").concat(node.col));

          if (nodeElement.classList.contains("clicked") || nodeElement.classList.contains("node-start") || nodeElement.classList.contains("node-finish")) {
            nodeElement.className += ' my-path-node';
          } else {
            nodeElement.className += ' node-visited';
          }

          if (i === visitedNodesInOrder.length - 1) {
            board.displayResults(nodesInShortestPathOrder);
          }
        }, 10 * i);
      };

      for (var i = 0; i <= visitedNodesInOrder.length; i++) {
        var _ret = _loop2(i);

        if (_typeof(_ret) === "object") return _ret.v;
      }
    }
  }, {
    key: "animateShortestPath",
    value: function animateShortestPath(nodesInShortestPathOrder) {
      var board = this;

      var _loop3 = function _loop3(i) {
        setTimeout(function () {
          var node = nodesInShortestPathOrder[i];
          var nodeElement = document.getElementById("".concat(node.row, "-").concat(node.col));

          if (nodeElement.classList.contains("my-path-node")) {
            nodeElement.className = 'node correct-node-shortest-path';
          } else {
            nodeElement.className += ' node-shortest-path';
          } // if (i ===  nodesInShortestPathOrder.length - 1) {
          //   board.displayResults( nodesInShortestPathOrder);
          // }

        }, 50 * i);
      };

      for (var i = 0; i < nodesInShortestPathOrder.length; i++) {
        _loop3(i);
      }
    }
  }, {
    key: "displayResults",
    value: function displayResults(nodesInShortestPathOrder) {
      var percentage = this.calculatePoints(this.myPath, nodesInShortestPathOrder);
      var isVisible = "is-visible";
      var resultModal = document.getElementById("modal3");
      var modalContent = document.getElementById("display-results");
      var result = document.createElement("p");
      var textNode = document.createTextNode("".concat(Math.floor(percentage), "% out of 100% nodes correct"));
      var tryAgain = document.createElement("p"); // const textNode2 = document.createTextNode("Please Try Again :)");

      var textNode2 = this.textResult(percentage);
      result.append(textNode);
      tryAgain.append(textNode2);
      modalContent.append(result);
      modalContent.append(tryAgain);
      resultModal.classList.add(isVisible);
      console.log("achieved");
    }
  }, {
    key: "calculatePoints",
    value: function calculatePoints(myPathOrder, nodesInShortestPathOrder) {
      var setPoints = new Set();
      var set1 = new Set(nodesInShortestPathOrder);
      myPathOrder.forEach(function (node) {
        if (set1.has(node)) setPoints.add(node);
      });
      var percentage = setPoints.size / nodesInShortestPathOrder.length * 100;
      return percentage;
    }
  }, {
    key: "textResult",
    value: function textResult(score) {
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
  }, {
    key: "getNode",
    value: function getNode(id) {
      var coordinates = id.split("-");
      var row = parseInt(coordinates[0]);
      var col = parseInt(coordinates[1]);
      return this.grid[row][col];
    }
  }]);

  return Board;
}();

/* harmony default export */ __webpack_exports__["default"] = (Board);

/***/ }),

/***/ "./src/scripts/dijkstra.js":
/*!*********************************!*\
  !*** ./src/scripts/dijkstra.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dijkstraAlgo": function() { return /* binding */ dijkstraAlgo; },
/* harmony export */   "getNodesInShortestPathOrder": function() { return /* binding */ getNodesInShortestPathOrder; }
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
function dijkstraAlgo(grid, startNode, finishNode) {
  var visitedNodesInOrder = [];
  startNode.distance = 0;
  var unvisitedNodes = getAllNodes(grid);

  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    var closestNode = unvisitedNodes.shift(); // If we encounter a wall, we skip it.

    if (closestNode.isWall) continue; // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    // if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort(function (nodeA, nodeB) {
    return nodeA.distance - nodeB.distance;
  });
}

function updateUnvisitedNeighbors(node, grid) {
  var unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

  var _iterator = _createForOfIteratorHelper(unvisitedNeighbors),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var neighbor = _step.value;
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function getUnvisitedNeighbors(node, grid) {
  var neighbors = [];
  var col = node.col,
      row = node.row;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(function (neighbor) {
    return !neighbor.isVisited;
  });
}

function getAllNodes(grid) {
  var nodes = [];

  var _iterator2 = _createForOfIteratorHelper(grid),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var row = _step2.value;

      var _iterator3 = _createForOfIteratorHelper(row),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var node = _step3.value;
          nodes.push(node);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return nodes;
} // Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.


function getNodesInShortestPathOrder(finishNode) {
  var nodesInShortestPathOrder = [];
  var currentNode = finishNode;

  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
}

/***/ }),

/***/ "./src/scripts/modal.js":
/*!******************************!*\
  !*** ./src/scripts/modal.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toggleModal": function() { return /* binding */ toggleModal; }
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var toggleModal = function toggleModal() {
  var isVisible = "is-visible";
  var openEls = document.querySelectorAll("[data-open]");
  var closeEls = document.querySelectorAll("[data-close]");

  var _iterator = _createForOfIteratorHelper(openEls),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var el = _step.value;
      el.addEventListener("click", function () {
        var modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var _iterator2 = _createForOfIteratorHelper(closeEls),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _el = _step2.value;

      _el.addEventListener("click", function () {
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
      });
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  document.addEventListener("keyup", function (e) {
    if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
      document.querySelector(".modal.is-visible").classList.remove(isVisible);
    }
  });
};

/***/ }),

/***/ "./src/scripts/node.js":
/*!*****************************!*\
  !*** ./src/scripts/node.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var START_NODE_ROW = 18;
var START_NODE_COL = 1;
var FINISH_NODE_ROW = 1;
var FINISH_NODE_COL = 48;
var WALL_NODES = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1], [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1], [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1], [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

var Node = /*#__PURE__*/function () {
  function Node(row, col) {
    _classCallCheck(this, Node);

    this.row = row;
    this.col = col;
    this.mouseDown = false;
    this.isStart = this.isStart();
    this.isFinish = this.isFinish();
    this.isWall = this.isWall();
    this.previousNode = null;
    this.distance = Infinity;
  }

  _createClass(Node, [{
    key: "isWall",
    value: function isWall() {
      var r = this.row;
      var c = this.col;

      if (WALL_NODES[r][c]) {
        this.addClass("wall");
        return true;
      }

      ;
      return false;
    }
  }, {
    key: "isStart",
    value: function isStart() {
      if (this.row === START_NODE_ROW && this.col === START_NODE_COL) {
        this.addClass("node-start");
        return true;
      }

      ;
      return false;
    }
  }, {
    key: "isFinish",
    value: function isFinish() {
      if (this.row === FINISH_NODE_ROW && this.col === FINISH_NODE_COL) {
        this.addClass("node-finish");
        return true;
      }

      ;
      return false;
    }
  }, {
    key: "addClass",
    value: function addClass(className) {
      var nodeEle = document.getElementById("".concat(this.row, "-").concat(this.col));
      nodeEle.className += " ".concat(className);
    }
  }]);

  return Node;
}();

/* harmony default export */ __webpack_exports__["default"] = (Node);

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _scripts_board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/board */ "./src/scripts/board.js");
/* harmony import */ var _scripts_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/modal */ "./src/scripts/modal.js");



document.addEventListener("DOMContentLoaded", function () {
  var el = document.getElementById("grid");

  var board = function board(el) {
    return new _scripts_board__WEBPACK_IMPORTED_MODULE_1__.default(el);
  };

  board(el);
  (0,_scripts_modal__WEBPACK_IMPORTED_MODULE_2__.toggleModal)();
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2RpamtzdHJhLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9tb2RhbC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvbm9kZS5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIlNUQVJUX05PREVfUk9XIiwiU1RBUlRfTk9ERV9DT0wiLCJGSU5JU0hfTk9ERV9ST1ciLCJGSU5JU0hfTk9ERV9DT0wiLCJCb2FyZCIsImVsIiwibWF4Um93IiwibWF4Q29sIiwiZ3JpZCIsIm15UGF0aCIsImJvYXJkIiwiY3JlYXRlQm9hcmQiLCJhZGRFdmVudExpc3RlbmVycyIsImJ1dHRvbnNPbiIsInByZXZpb3VzIiwiZmluaXNoZWRQYXRoIiwibm9kZUNsaWNrZWQiLCJyb3ciLCJib2FyZFJvdyIsIm5ld0VsZVJvdyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImFwcGVuZENoaWxkIiwiY29sIiwibmV3RWxlTm9kZSIsInNldEF0dHJpYnV0ZSIsIm5vZGUiLCJOb2RlIiwicHVzaCIsImN1cnJlbnRJZCIsImN1cnJlbnROb2RlIiwiZ2V0Tm9kZSIsImN1cnJlbnRFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiaXNGaW5pc2giLCJpc1N0YXJ0IiwibW91c2VEb3duIiwiaW5jbHVkZXMiLCJpc1dhbGwiLCJjbGVhciIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZGlqa3N0cmEiLCJzdGFydE5vZGUiLCJmaW5pc2hOb2RlIiwidmlzaXRlZE5vZGVzSW5PcmRlciIsImRpamtzdHJhQWxnbyIsIm5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlciIsImdldE5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlciIsImFuaW1hdGVEaWprc3RyYSIsImkiLCJsZW5ndGgiLCJzaG93QnV0dG9uIiwiYW5pbWF0ZVNob3J0ZXN0UGF0aCIsInNldFRpbWVvdXQiLCJub2RlRWxlbWVudCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiZGlzcGxheVJlc3VsdHMiLCJwZXJjZW50YWdlIiwiY2FsY3VsYXRlUG9pbnRzIiwiaXNWaXNpYmxlIiwicmVzdWx0TW9kYWwiLCJtb2RhbENvbnRlbnQiLCJyZXN1bHQiLCJ0ZXh0Tm9kZSIsImNyZWF0ZVRleHROb2RlIiwiTWF0aCIsImZsb29yIiwidHJ5QWdhaW4iLCJ0ZXh0Tm9kZTIiLCJ0ZXh0UmVzdWx0IiwiYXBwZW5kIiwiYWRkIiwiY29uc29sZSIsImxvZyIsIm15UGF0aE9yZGVyIiwic2V0UG9pbnRzIiwiU2V0Iiwic2V0MSIsImZvckVhY2giLCJoYXMiLCJzaXplIiwic2NvcmUiLCJpZCIsImNvb3JkaW5hdGVzIiwic3BsaXQiLCJwYXJzZUludCIsImRpc3RhbmNlIiwidW52aXNpdGVkTm9kZXMiLCJnZXRBbGxOb2RlcyIsInNvcnROb2Rlc0J5RGlzdGFuY2UiLCJjbG9zZXN0Tm9kZSIsInNoaWZ0IiwiaXNWaXNpdGVkIiwidXBkYXRlVW52aXNpdGVkTmVpZ2hib3JzIiwic29ydCIsIm5vZGVBIiwibm9kZUIiLCJ1bnZpc2l0ZWROZWlnaGJvcnMiLCJnZXRVbnZpc2l0ZWROZWlnaGJvcnMiLCJuZWlnaGJvciIsInByZXZpb3VzTm9kZSIsIm5laWdoYm9ycyIsImZpbHRlciIsIm5vZGVzIiwidW5zaGlmdCIsInRvZ2dsZU1vZGFsIiwib3BlbkVscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjbG9zZUVscyIsIm1vZGFsSWQiLCJkYXRhc2V0Iiwib3BlbiIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmUiLCJrZXkiLCJxdWVyeVNlbGVjdG9yIiwiV0FMTF9OT0RFUyIsIkluZmluaXR5IiwiciIsImMiLCJhZGRDbGFzcyIsIm5vZGVFbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFFQSxJQUFNQSxjQUFjLEdBQUcsRUFBdkI7QUFDQSxJQUFNQyxjQUFjLEdBQUcsQ0FBdkI7QUFDQSxJQUFNQyxlQUFlLEdBQUcsQ0FBeEI7QUFDQSxJQUFNQyxlQUFlLEdBQUcsRUFBeEI7O0lBRU1DLEs7QUFDSixpQkFBWUMsRUFBWixFQUFnQjtBQUFBOztBQUNkLFNBQUtBLEVBQUwsR0FBVUEsRUFBVjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEtBQUtDLFdBQUwsRUFBYjtBQUNBLFNBQUtDLGlCQUFMO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLEtBQXBCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixJQUFuQixDQVhjLENBWWQ7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7OztXQUVELHVC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RUFBNEUsQ0FBNUUsRUFBK0UsQ0FBL0UsRUFBa0YsQ0FBbEYsRUFBcUYsQ0FBckYsRUFBd0YsQ0FBeEYsRUFBMkYsQ0FBM0YsRUFBOEYsQ0FBOUYsRUFBaUcsQ0FBakcsRUFBb0csQ0FBcEcsRUFBdUcsQ0FBdkcsRUFBMEcsQ0FBMUcsRUFBNkcsQ0FBN0csRUFBZ0gsQ0FBaEgsRUFBbUgsQ0FBbkgsRUFBc0gsQ0FBdEgsRUFBeUgsQ0FBekgsRUFBNEgsQ0FBNUgsRUFBK0gsQ0FBL0gsRUFBa0ksQ0FBbEksRUFBcUksQ0FBckksRUFBd0ksQ0FBeEksRUFBMkksQ0FBM0ksRUFBOEksQ0FBOUksRUFBaUosQ0FBakosRUFBb0osQ0FBcEosQ0FmaUIsRUFnQmpCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsRUFBMkMsQ0FBM0MsRUFBOEMsQ0FBOUMsRUFBaUQsQ0FBakQsRUFBb0QsQ0FBcEQsRUFBdUQsQ0FBdkQsRUFBMEQsQ0FBMUQsRUFBNkQsQ0FBN0QsRUFBZ0UsQ0FBaEUsRUFBbUUsQ0FBbkUsRUFBc0UsQ0FBdEUsRUFBeUUsQ0FBekUsRUFBNEUsQ0FBNUUsRUFBK0UsQ0FBL0UsRUFBa0YsQ0FBbEYsRUFBcUYsQ0FBckYsRUFBd0YsQ0FBeEYsRUFBMkYsQ0FBM0YsRUFBOEYsQ0FBOUYsRUFBaUcsQ0FBakcsRUFBb0csQ0FBcEcsRUFBdUcsQ0FBdkcsRUFBMEcsQ0FBMUcsRUFBNkcsQ0FBN0csRUFBZ0gsQ0FBaEgsRUFBbUgsQ0FBbkgsRUFBc0gsQ0FBdEgsRUFBeUgsQ0FBekgsRUFBNEgsQ0FBNUgsRUFBK0gsQ0FBL0gsRUFBa0ksQ0FBbEksRUFBcUksQ0FBckksRUFBd0ksQ0FBeEksRUFBMkksQ0FBM0ksRUFBOEksQ0FBOUksRUFBaUosQ0FBakosRUFBb0osQ0FB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LHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsNkNBQTZDLHdEQUF3RCxFOzs7OztXQ0FyRztXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFHQVIsUUFBUSxDQUFDZSxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVztBQUN2RCxNQUFNOUIsRUFBRSxHQUFHZSxRQUFRLENBQUNjLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBWDs7QUFDQSxNQUFNeEIsS0FBSyxHQUFHLFNBQVJBLEtBQVEsQ0FBQUwsRUFBRTtBQUFBLFdBQUksSUFBSUQsbURBQUosQ0FBVUMsRUFBVixDQUFKO0FBQUEsR0FBaEI7O0FBQ0FLLE9BQUssQ0FBQ0wsRUFBRCxDQUFMO0FBQ0EyRyw2REFBVztBQUNaLENBTEQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5vZGUgZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7ZGlqa3N0cmFBbGdvLCBnZXROb2Rlc0luU2hvcnRlc3RQYXRoT3JkZXJ9IGZyb20gJy4vZGlqa3N0cmEnO1xuXG5jb25zdCBTVEFSVF9OT0RFX1JPVyA9IDE4O1xuY29uc3QgU1RBUlRfTk9ERV9DT0wgPSAxO1xuY29uc3QgRklOSVNIX05PREVfUk9XID0gMTtcbmNvbnN0IEZJTklTSF9OT0RFX0NPTCA9IDQ4O1xuXG5jbGFzcyBCb2FyZCB7XG4gIGNvbnN0cnVjdG9yKGVsKSB7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMubWF4Um93ID0gMjA7XG4gICAgdGhpcy5tYXhDb2wgPSA1MDtcbiAgICB0aGlzLmdyaWQgPSBbXTtcbiAgICB0aGlzLm15UGF0aCA9IFtdO1xuICAgIHRoaXMuYm9hcmQgPSB0aGlzLmNyZWF0ZUJvYXJkKCk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuYnV0dG9uc09uID0gZmFsc2U7XG4gICAgdGhpcy5wcmV2aW91cyA9IG51bGw7XG4gICAgdGhpcy5maW5pc2hlZFBhdGggPSBmYWxzZTtcbiAgICB0aGlzLm5vZGVDbGlja2VkID0gbnVsbDtcbiAgICAvLyB0aGlzLm15UGF0aC5wdXNoKHRoaXMuZ2V0Tm9kZShgJHtTVEFSVF9OT0RFX1JPV30tJHtTVEFSVF9OT0RFX0NPTH1gKSk7XG4gICAgLy8gdGhpcy5ncmlkLnB1c2godGhpcy5nZXROb2RlKGAke1NUQVJUX05PREVfUk9XfS0ke1NUQVJUX05PREVfQ09MfWApKTtcbiAgICAvLyB0aGlzLmRpc3BsYXlEaWprc3RyYSA9IHRoaXMuZGlzcGxheURpamtzdHJhLmJpbmQodGhpcyk7XG4gICAgLy8gdGhpcy5jbGVhckJvYXJkID0gdGhpcy5jbGVhckJvYXJkLmJpbmQodGhpcyk7XG4gIH1cblxuICBjcmVhdGVCb2FyZCgpIHtcblxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMubWF4Um93OyByb3crKykge1xuICAgICAgbGV0IGJvYXJkUm93ID0gW107XG4gICAgICBsZXQgbmV3RWxlUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG5ld0VsZVJvdy5jbGFzc05hbWUgPSBcIm5vZGUtcm93XCI7XG4gICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKG5ld0VsZVJvdyk7XG5cbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHRoaXMubWF4Q29sOyBjb2wrKykge1xuICAgICAgICBsZXQgbmV3RWxlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG5ld0VsZU5vZGUuY2xhc3NOYW1lID0gXCJub2RlXCI7XG4gICAgICAgIG5ld0VsZU5vZGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7cm93fS0ke2NvbH1gKVxuICAgICAgICBuZXdFbGVSb3cuYXBwZW5kQ2hpbGQobmV3RWxlTm9kZSk7XG4gICAgICAgIGxldCBub2RlID0gbmV3IE5vZGUocm93LCBjb2wpXG4gICAgICAgIGJvYXJkUm93LnB1c2gobm9kZSlcbiAgICAgIH1cblxuICAgICAgdGhpcy5ncmlkLnB1c2goYm9hcmRSb3cpXG4gICAgfVxuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgbGV0IGJvYXJkID0gdGhpcztcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBib2FyZC5tYXhSb3c7IHJvdysrKSB7XG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBib2FyZC5tYXhDb2w7IGNvbCsrKSB7XG4gICAgICAgIGxldCBjdXJyZW50SWQgPSBgJHtyb3d9LSR7Y29sfWA7XG4gICAgICAgIGxldCBjdXJyZW50Tm9kZSA9IGJvYXJkLmdldE5vZGUoY3VycmVudElkKTtcbiAgICAgICAgbGV0IGN1cnJlbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3VycmVudElkKTtcblxuICAgICAgICBjdXJyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgaWYgKCFib2FyZC5maW5pc2hlZFBhdGgpIHtcbiAgICAgICAgICAgIGlmICghY3VycmVudE5vZGUuaXNGaW5pc2gpIHtcbiAgICAgICAgICAgICAgYm9hcmQubm9kZUNsaWNrZWQgPSBjdXJyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgaWYgKChjdXJyZW50Tm9kZS5pc1N0YXJ0ICYmIGJvYXJkLnByZXZpb3VzID09PSBudWxsKSB8fCAoYm9hcmQubm9kZUNsaWNrZWQgPT09IGJvYXJkLnByZXZpb3VzKSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm1vdXNlRG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgYm9hcmQuYnV0dG9uc09uID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGlmICghYm9hcmQubXlQYXRoLmluY2x1ZGVzKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgICAgICAgICAgYm9hcmQubXlQYXRoLnB1c2goY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgY3VycmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmICghY3VycmVudE5vZGUuaXNXYWxsKSB7XG4gICAgICAgICAgICBpZiAoYm9hcmQuYnV0dG9uc09uKSB7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5tb3VzZURvd24gPSB0cnVlO1xuICBcbiAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlLmlzRmluaXNoKSB7XG4gICAgICAgICAgICAgICAgYm9hcmQuYnV0dG9uc09uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYm9hcmQubXlQYXRoLnB1c2goY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgICAgIGJvYXJkLmZpbmlzaGVkUGF0aCA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIGlmICghYm9hcmQubXlQYXRoLmluY2x1ZGVzKGN1cnJlbnROb2RlKSkgeyBcbiAgICAgICAgICAgICAgICBib2FyZC5wcmV2aW91cyA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICBib2FyZC5teVBhdGgucHVzaChjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuY2xhc3NOYW1lICs9IFwiIGNsaWNrZWRcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2FyZC5idXR0b25zT24gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGN1cnJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIgLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgLy8gaWYgKGJvYXJkLmJ1dHRvbnNPbikge1xuICAgICAgICAgIC8vICAgYm9hcmQucHJldmlvdXMgPSBjdXJyZW50RWxlbWVudDtcbiAgICAgICAgICAvLyB9XG4gICAgICAgIC8vIH0pXG5cblxuICAgICAgICBjdXJyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGJvYXJkLmJ1dHRvbnNPbikge1xuICAgICAgICAgICAgYm9hcmQuYnV0dG9uc09uID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjbGVhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xlYXItYnV0dG9uXCIpXG4gICAgY2xlYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIC8vIGJvYXJkLm15UGF0aC5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgLy8gICBjb25zdCByb3cgPSBub2RlLnJvdztcbiAgICAgIC8vICAgY29uc3QgY29sID0gbm9kZS5jb2w7XG4gICAgICAvLyAgIGNvbnN0IG5vZGVFbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtyb3d9LSR7Y29sfWApO1xuICAgICAgLy8gICBub2RlRWxlLmNsYXNzTGlzdC5yZW1vdmUoXCJjbGlja2VkXCIpXG4gICAgICAvLyAgIGJvYXJkLm15UGF0aCA9IFtdO1xuICAgICAgLy8gICBib2FyZC5idXR0b25zT24gPSBmYWxzZTtcbiAgICAgIC8vICAgYm9hcmQucHJldmlvdXMgPSBudWxsO1xuICAgICAgLy8gICBib2FyZC5maW5pc2hlZFBhdGggPSBmYWxzZTtcbiAgICAgIC8vICAgYm9hcmQubm9kZUNsaWNrZWQgPSBudWxsO1xuICAgICAgLy8gfSlcbiAgICB9KTtcblxuICAgIGNvbnN0IGRpamtzdHJhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5LWJ1dHRvblwiKTtcbiAgICBcbiAgICBkaWprc3RyYS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIilcbiAgICAgIGNvbnN0IGdyaWQgPSBib2FyZC5ncmlkO1xuICAgICAgY29uc3Qgc3RhcnROb2RlID0gZ3JpZFtTVEFSVF9OT0RFX1JPV11bU1RBUlRfTk9ERV9DT0xdO1xuICAgICAgY29uc3QgZmluaXNoTm9kZSA9IGdyaWRbRklOSVNIX05PREVfUk9XXVtGSU5JU0hfTk9ERV9DT0xdO1xuICAgICAgXG4gICAgICBjb25zdCB2aXNpdGVkTm9kZXNJbk9yZGVyID0gZGlqa3N0cmFBbGdvKGdyaWQsIHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSk7XG4gICAgICBcbiAgICAgIGNvbnN0IG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlciA9IGdldE5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcihmaW5pc2hOb2RlKTtcbiAgICAgIC8vIFxuICAgICAgYm9hcmQuYW5pbWF0ZURpamtzdHJhKHZpc2l0ZWROb2Rlc0luT3JkZXIsIG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcik7XG4gICAgfSlcblxuXG5cbiAgfVxuXG4gIGFuaW1hdGVEaWprc3RyYSh2aXNpdGVkTm9kZXNJbk9yZGVyLCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpIHtcbiAgICBjb25zdCBib2FyZCA9IHRoaXM7XG4gICAgXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB2aXNpdGVkTm9kZXNJbk9yZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBcbiAgICAgIGlmIChpID09PSB2aXNpdGVkTm9kZXNJbk9yZGVyLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBzaG93QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb2x1dGlvblwiKTtcbiAgICAgICAgc2hvd0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGJvYXJkLmFuaW1hdGVTaG9ydGVzdFBhdGgobm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKTtcbiAgICAgICAgfSlcbiAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgXG4gICAgICAgIC8vICAgYm9hcmQuYW5pbWF0ZVNob3J0ZXN0UGF0aChub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpO1xuICAgICAgICAvLyB9LCAxMCAqIGkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHZpc2l0ZWROb2Rlc0luT3JkZXJbaV07XG4gICAgICAgIFxuICAgICAgICBjb25zdCBub2RlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke25vZGUucm93fS0ke25vZGUuY29sfWApXG4gICAgICAgIGlmIChub2RlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjbGlja2VkXCIpIHx8IG5vZGVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm5vZGUtc3RhcnRcIikgfHwgbm9kZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibm9kZS1maW5pc2hcIikpIHtcbiAgICAgICAgICBub2RlRWxlbWVudC5jbGFzc05hbWUgKz0nIG15LXBhdGgtbm9kZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbm9kZUVsZW1lbnQuY2xhc3NOYW1lICs9ICcgbm9kZS12aXNpdGVkJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gIHZpc2l0ZWROb2Rlc0luT3JkZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGJvYXJkLmRpc3BsYXlSZXN1bHRzKCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpO1xuICAgICAgICB9XG4gICAgICB9LCAxMCAqIGkpO1xuICAgICAgXG4gICAgfVxuICB9XG5cbiAgYW5pbWF0ZVNob3J0ZXN0UGF0aChub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpIHtcbiAgICBjb25zdCBib2FyZCA9IHRoaXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgIFxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXJbaV07XG4gICAgICAgIGNvbnN0IG5vZGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bm9kZS5yb3d9LSR7bm9kZS5jb2x9YCk7XG4gICAgICAgIFxuICAgICAgICBpZiAobm9kZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibXktcGF0aC1ub2RlXCIpKSB7XG4gICAgICAgICAgbm9kZUVsZW1lbnQuY2xhc3NOYW1lID0gJ25vZGUgY29ycmVjdC1ub2RlLXNob3J0ZXN0LXBhdGgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vZGVFbGVtZW50LmNsYXNzTmFtZSArPSAnIG5vZGUtc2hvcnRlc3QtcGF0aCc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgKGkgPT09ICBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAvLyAgIGJvYXJkLmRpc3BsYXlSZXN1bHRzKCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpO1xuICAgICAgICAvLyB9XG4gICAgICB9LCA1MCAqIGkpO1xuICAgICAgXG4gICAgfVxuICB9XG5cbiAgZGlzcGxheVJlc3VsdHMobm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKSB7XG4gICAgY29uc3QgcGVyY2VudGFnZSA9IHRoaXMuY2FsY3VsYXRlUG9pbnRzKHRoaXMubXlQYXRoLCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpXG4gICAgY29uc3QgaXNWaXNpYmxlID0gXCJpcy12aXNpYmxlXCI7XG4gICAgY29uc3QgcmVzdWx0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsM1wiKTtcbiAgICBjb25zdCBtb2RhbENvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXktcmVzdWx0c1wiKTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7TWF0aC5mbG9vcihwZXJjZW50YWdlKX0lIG91dCBvZiAxMDAlIG5vZGVzIGNvcnJlY3RgKTtcbiAgICBjb25zdCB0cnlBZ2FpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIC8vIGNvbnN0IHRleHROb2RlMiA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiUGxlYXNlIFRyeSBBZ2FpbiA6KVwiKTtcbiAgICBjb25zdCB0ZXh0Tm9kZTIgPSB0aGlzLnRleHRSZXN1bHQocGVyY2VudGFnZSk7XG5cbiAgICByZXN1bHQuYXBwZW5kKHRleHROb2RlKTtcbiAgICB0cnlBZ2Fpbi5hcHBlbmQodGV4dE5vZGUyKTtcbiAgICBtb2RhbENvbnRlbnQuYXBwZW5kKHJlc3VsdCk7XG4gICAgbW9kYWxDb250ZW50LmFwcGVuZCh0cnlBZ2Fpbik7XG5cbiAgICByZXN1bHRNb2RhbC5jbGFzc0xpc3QuYWRkKGlzVmlzaWJsZSk7XG4gICAgY29uc29sZS5sb2coXCJhY2hpZXZlZFwiKVxuICB9XG5cbiAgY2FsY3VsYXRlUG9pbnRzKG15UGF0aE9yZGVyLCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpIHtcbiAgICBjb25zdCBzZXRQb2ludHMgPSBuZXcgU2V0KCk7XG4gICAgY29uc3Qgc2V0MSA9IG5ldyBTZXQobm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKTtcblxuICAgIG15UGF0aE9yZGVyLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBpZiAoc2V0MS5oYXMobm9kZSkpIHNldFBvaW50cy5hZGQobm9kZSk7XG4gICAgfSlcbiAgICBjb25zdCBwZXJjZW50YWdlID0gKHNldFBvaW50cy5zaXplIC8gbm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyLmxlbmd0aCkgKiAxMDBcbiAgICByZXR1cm4gcGVyY2VudGFnZTtcbiAgfVxuXG4gIHRleHRSZXN1bHQoc2NvcmUpIHtcbiAgICBpZiAoc2NvcmUgPT09IDEwMCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiQ09OR1JBVFVMQVRJT05TISBZb3Uga25vdyB3aGF0IHlvdSdyZSBkb2luZ1wiKTtcbiAgICB9IGVsc2UgaWYgKHNjb3JlID4gOTApIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlNPIENMT1NFISBLZWVwIHdvcmtpbmchIFlvdSBnb3QgdGhpcyFcIik7XG4gICAgfSBlbHNlIGlmIChzY29yZSA+IDcwKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJOb3QgYmFkISBrZWVwIGl0IHVwIGFuZCB5b3UnbGwgZ2V0IGl0XCIpO1xuICAgIH0gZWxzZSBpZiAoc2NvcmUgPiA1MCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiRWhoaGhoLCB5b3UgY291bGQgZG8gYmV0dGVyXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJTdHVkeSwgc3R1ZHksIHN0dWR5XCIpO1xuICAgIH1cbiAgfVxuXG4gIGdldE5vZGUoaWQpIHtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBpZC5zcGxpdChcIi1cIik7XG4gICAgbGV0IHJvdyA9IHBhcnNlSW50KGNvb3JkaW5hdGVzWzBdKTtcbiAgICBsZXQgY29sID0gcGFyc2VJbnQoY29vcmRpbmF0ZXNbMV0pO1xuICAgIHJldHVybiB0aGlzLmdyaWRbcm93XVtjb2xdO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBCb2FyZDsiLCIvLyBQZXJmb3JtcyBEaWprc3RyYSdzIGFsZ29yaXRobTsgcmV0dXJucyAqYWxsKiBub2RlcyBpbiB0aGUgb3JkZXJcbi8vIGluIHdoaWNoIHRoZXkgd2VyZSB2aXNpdGVkLiBBbHNvIG1ha2VzIG5vZGVzIHBvaW50IGJhY2sgdG8gdGhlaXJcbi8vIHByZXZpb3VzIG5vZGUsIGVmZmVjdGl2ZWx5IGFsbG93aW5nIHVzIHRvIGNvbXB1dGUgdGhlIHNob3J0ZXN0IHBhdGhcbi8vIGJ5IGJhY2t0cmFja2luZyBmcm9tIHRoZSBmaW5pc2ggbm9kZS5cbmV4cG9ydCBmdW5jdGlvbiBkaWprc3RyYUFsZ28oZ3JpZCwgc3RhcnROb2RlLCBmaW5pc2hOb2RlKSB7XG5cdFxuICBjb25zdCB2aXNpdGVkTm9kZXNJbk9yZGVyID0gW107XG4gIHN0YXJ0Tm9kZS5kaXN0YW5jZSA9IDA7XG5cdFxuICBjb25zdCB1bnZpc2l0ZWROb2RlcyA9IGdldEFsbE5vZGVzKGdyaWQpO1xuXHRcbiAgd2hpbGUgKCEhdW52aXNpdGVkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XG4gICAgc29ydE5vZGVzQnlEaXN0YW5jZSh1bnZpc2l0ZWROb2Rlcyk7XG5cdFx0XG4gICAgY29uc3QgY2xvc2VzdE5vZGUgPSB1bnZpc2l0ZWROb2Rlcy5zaGlmdCgpO1xuICAgIFxuICAgIC8vIElmIHdlIGVuY291bnRlciBhIHdhbGwsIHdlIHNraXAgaXQuXG4gICAgaWYgKGNsb3Nlc3ROb2RlLmlzV2FsbCkgY29udGludWU7XG4gICAgLy8gSWYgdGhlIGNsb3Nlc3Qgbm9kZSBpcyBhdCBhIGRpc3RhbmNlIG9mIGluZmluaXR5LFxuICAgIC8vIHdlIG11c3QgYmUgdHJhcHBlZCBhbmQgc2hvdWxkIHRoZXJlZm9yZSBzdG9wLlxuICAgIFxuICAgIC8vIGlmIChjbG9zZXN0Tm9kZS5kaXN0YW5jZSA9PT0gSW5maW5pdHkpIHJldHVybiB2aXNpdGVkTm9kZXNJbk9yZGVyO1xuICAgIGNsb3Nlc3ROb2RlLmlzVmlzaXRlZCA9IHRydWU7XG4gICAgdmlzaXRlZE5vZGVzSW5PcmRlci5wdXNoKGNsb3Nlc3ROb2RlKTtcblx0XHRcbiAgICBpZiAoY2xvc2VzdE5vZGUgPT09IGZpbmlzaE5vZGUpIHJldHVybiB2aXNpdGVkTm9kZXNJbk9yZGVyO1xuXHRcdFxuICAgIHVwZGF0ZVVudmlzaXRlZE5laWdoYm9ycyhjbG9zZXN0Tm9kZSwgZ3JpZCk7XG5cdFx0XG4gIH1cbn1cblxuZnVuY3Rpb24gc29ydE5vZGVzQnlEaXN0YW5jZSh1bnZpc2l0ZWROb2Rlcykge1xuXHRcbiAgdW52aXNpdGVkTm9kZXMuc29ydCgobm9kZUEsIG5vZGVCKSA9PiBub2RlQS5kaXN0YW5jZSAtIG5vZGVCLmRpc3RhbmNlKTtcblx0XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVVudmlzaXRlZE5laWdoYm9ycyhub2RlLCBncmlkKSB7XG5cdFxuICBjb25zdCB1bnZpc2l0ZWROZWlnaGJvcnMgPSBnZXRVbnZpc2l0ZWROZWlnaGJvcnMobm9kZSwgZ3JpZCk7XG5cdFxuICBmb3IgKGNvbnN0IG5laWdoYm9yIG9mIHVudmlzaXRlZE5laWdoYm9ycykge1xuICAgIFxuICAgIG5laWdoYm9yLmRpc3RhbmNlID0gbm9kZS5kaXN0YW5jZSArIDE7XG4gICAgbmVpZ2hib3IucHJldmlvdXNOb2RlID0gbm9kZTtcbiAgICBcbiAgfVxuXHRcbn1cblxuZnVuY3Rpb24gZ2V0VW52aXNpdGVkTmVpZ2hib3JzKG5vZGUsIGdyaWQpIHtcblx0XG4gIGNvbnN0IG5laWdoYm9ycyA9IFtdO1xuICBjb25zdCB7Y29sLCByb3d9ID0gbm9kZTtcblx0XG4gIGlmIChyb3cgPiAwKSBuZWlnaGJvcnMucHVzaChncmlkW3JvdyAtIDFdW2NvbF0pO1xuICBcbiAgaWYgKHJvdyA8IGdyaWQubGVuZ3RoIC0gMSkgbmVpZ2hib3JzLnB1c2goZ3JpZFtyb3cgKyAxXVtjb2xdKTtcbiAgXG4gIGlmIChjb2wgPiAwKSBuZWlnaGJvcnMucHVzaChncmlkW3Jvd11bY29sIC0gMV0pO1xuICBcbiAgaWYgKGNvbCA8IGdyaWRbMF0ubGVuZ3RoIC0gMSkgbmVpZ2hib3JzLnB1c2goZ3JpZFtyb3ddW2NvbCArIDFdKTtcblx0XG4gIHJldHVybiBuZWlnaGJvcnMuZmlsdGVyKG5laWdoYm9yID0+ICFuZWlnaGJvci5pc1Zpc2l0ZWQpO1xufVxuXG5mdW5jdGlvbiBnZXRBbGxOb2RlcyhncmlkKSB7XG5cdFxuICBjb25zdCBub2RlcyA9IFtdO1xuICBmb3IgKGNvbnN0IHJvdyBvZiBncmlkKSB7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIHJvdykge1xuICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICB9XG4gIH1cblxuXHRcbiAgcmV0dXJuIG5vZGVzO1xufVxuXG4vLyBCYWNrdHJhY2tzIGZyb20gdGhlIGZpbmlzaE5vZGUgdG8gZmluZCB0aGUgc2hvcnRlc3QgcGF0aC5cbi8vIE9ubHkgd29ya3Mgd2hlbiBjYWxsZWQgKmFmdGVyKiB0aGUgZGlqa3N0cmEgbWV0aG9kIGFib3ZlLlxuZXhwb3J0IGZ1bmN0aW9uIGdldE5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcihmaW5pc2hOb2RlKSB7XG4gIGNvbnN0IG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlciA9IFtdO1xuICBsZXQgY3VycmVudE5vZGUgPSBmaW5pc2hOb2RlO1xuICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIudW5zaGlmdChjdXJyZW50Tm9kZSk7XG4gICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5wcmV2aW91c05vZGU7XG4gIH1cbiAgcmV0dXJuIG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcjtcbn0iLCJleHBvcnQgY29uc3QgdG9nZ2xlTW9kYWwgPSAoKSA9PiB7XG4gIGNvbnN0IGlzVmlzaWJsZSA9IFwiaXMtdmlzaWJsZVwiO1xuICBjb25zdCBvcGVuRWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLW9wZW5dXCIpO1xuICBjb25zdCBjbG9zZUVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1jbG9zZV1cIik7XG5cbiAgZm9yIChjb25zdCBlbCBvZiBvcGVuRWxzKSB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG1vZGFsSWQgPSB0aGlzLmRhdGFzZXQub3BlbjtcbiAgICAgIFxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW9kYWxJZCkuY2xhc3NMaXN0LmFkZChpc1Zpc2libGUpO1xuICAgIH0pO1xuICB9XG5cbiBcbiAgZm9yIChjb25zdCBlbCBvZiBjbG9zZUVscykge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgIFxuICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGlzVmlzaWJsZSk7XG4gICAgfSk7XG4gIH1cblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZSA9PiB7XG4gICAgaWYgKGUua2V5ID09IFwiRXNjYXBlXCIgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbC5pcy12aXNpYmxlXCIpKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsLmlzLXZpc2libGVcIikuY2xhc3NMaXN0LnJlbW92ZShpc1Zpc2libGUpO1xuICAgIH1cbiAgfSk7XG59XG5cbiIsImNvbnN0IFNUQVJUX05PREVfUk9XID0gMTg7XG5jb25zdCBTVEFSVF9OT0RFX0NPTCA9IDE7XG5jb25zdCBGSU5JU0hfTk9ERV9ST1cgPSAxO1xuY29uc3QgRklOSVNIX05PREVfQ09MID0gNDg7XG5cbmNvbnN0IFdBTExfTk9ERVMgPSBbXG4gIFsxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxXSxcbiAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDFdLFxuICBbMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMV0sXG4gIFsxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxXSxcbiAgWzEsIDEsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDEsIDAsIDAsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDFdLFxuICBbMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMSwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMV0sXG4gIFsxLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAwLCAxLCAxLCAwLCAwLCAxXSxcbiAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDAsIDEsIDEsIDEsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICBbMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMV0sXG4gIFsxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxXSxcbiAgWzEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDFdLFxuICBbMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMCwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMV0sXG4gIFsxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxXSxcbiAgWzEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDEsIDEsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDAsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDFdLFxuICBbMSwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMV0sXG4gIFsxLCAwLCAxLCAxLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAxLCAwLCAxLCAwLCAwLCAxLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxXSxcbiAgWzEsIDAsIDAsIDEsIDAsIDAsIDEsIDEsIDEsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICBbMSwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMV0sXG4gIFsxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxXSxcbiAgWzEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDFdLFxuXVxuXG5jbGFzcyBOb2RlIHtcbiAgY29uc3RydWN0b3Iocm93LCBjb2wpIHtcbiAgICB0aGlzLnJvdyA9IHJvdztcbiAgICB0aGlzLmNvbCA9IGNvbDtcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xuICAgIHRoaXMuaXNTdGFydCA9IHRoaXMuaXNTdGFydCgpO1xuICAgIHRoaXMuaXNGaW5pc2ggPSB0aGlzLmlzRmluaXNoKCk7XG4gICAgdGhpcy5pc1dhbGwgPSB0aGlzLmlzV2FsbCgpO1xuICAgIHRoaXMucHJldmlvdXNOb2RlID0gbnVsbDtcbiAgICB0aGlzLmRpc3RhbmNlID0gSW5maW5pdHk7XG4gIH1cblxuICBpc1dhbGwoKSB7XG4gICAgY29uc3QgciA9IHRoaXMucm93O1xuICAgIGNvbnN0IGMgPSB0aGlzLmNvbDtcbiAgICBpZiAoV0FMTF9OT0RFU1tyXVtjXSkge1xuICAgICAgdGhpcy5hZGRDbGFzcyhcIndhbGxcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzU3RhcnQoKSB7XG4gICAgaWYgKHRoaXMucm93ID09PSBTVEFSVF9OT0RFX1JPVyAmJiB0aGlzLmNvbCA9PT0gU1RBUlRfTk9ERV9DT0wpIHtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoXCJub2RlLXN0YXJ0XCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0ZpbmlzaCgpIHtcbiAgICBpZiAodGhpcy5yb3cgPT09IEZJTklTSF9OT0RFX1JPVyAmJiB0aGlzLmNvbCA9PT0gRklOSVNIX05PREVfQ09MKSB7XG4gICAgICB0aGlzLmFkZENsYXNzKFwibm9kZS1maW5pc2hcIik7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH07XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgbGV0IG5vZGVFbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0aGlzLnJvd30tJHt0aGlzLmNvbH1gKVxuICAgIG5vZGVFbGUuY2xhc3NOYW1lICs9IGAgJHtjbGFzc05hbWV9YDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOb2RlOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBCb2FyZCBmcm9tIFwiLi9zY3JpcHRzL2JvYXJkXCI7XG5pbXBvcnQge3RvZ2dsZU1vZGFsfSBmcm9tIFwiLi9zY3JpcHRzL21vZGFsXCI7XG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncmlkXCIpO1xuICBjb25zdCBib2FyZCA9IGVsID0+IG5ldyBCb2FyZChlbCk7XG4gIGJvYXJkKGVsKTtcbiAgdG9nZ2xlTW9kYWwoKTtcbn0pO1xuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=