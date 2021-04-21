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
          debugger;

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
      var tryAgain = document.createElement("p");
      var textNode2 = document.createTextNode("Please Try Again :)");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2RpamtzdHJhLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9tb2RhbC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvbm9kZS5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIlNUQVJUX05PREVfUk9XIiwiU1RBUlRfTk9ERV9DT0wiLCJGSU5JU0hfTk9ERV9ST1ciLCJGSU5JU0hfTk9ERV9DT0wiLCJCb2FyZCIsImVsIiwibWF4Um93IiwibWF4Q29sIiwiZ3JpZCIsIm15UGF0aCIsImJvYXJkIiwiY3JlYXRlQm9hcmQiLCJhZGRFdmVudExpc3RlbmVycyIsImJ1dHRvbnNPbiIsInByZXZpb3VzIiwiZmluaXNoZWRQYXRoIiwibm9kZUNsaWNrZWQiLCJyb3ciLCJib2FyZFJvdyIsIm5ld0VsZVJvdyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImFwcGVuZENoaWxkIiwiY29sIiwibmV3RWxlTm9kZSIsInNldEF0dHJpYnV0ZSIsIm5vZGUiLCJOb2RlIiwicHVzaCIsImN1cnJlbnRJZCIsImN1cnJlbnROb2RlIiwiZ2V0Tm9kZSIsImN1cnJlbnRFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiaXNGaW5pc2giLCJpc1N0YXJ0IiwibW91c2VEb3duIiwiaW5jbHVkZXMiLCJpc1dhbGwiLCJjbGVhciIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZGlqa3N0cmEiLCJzdGFydE5vZGUiLCJmaW5pc2hOb2RlIiwidmlzaXRlZE5vZGVzSW5PcmRlciIsImRpamtzdHJhQWxnbyIsIm5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlciIsImdldE5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlciIsImFuaW1hdGVEaWprc3RyYSIsImkiLCJsZW5ndGgiLCJzaG93QnV0dG9uIiwiYW5pbWF0ZVNob3J0ZXN0UGF0aCIsInNldFRpbWVvdXQiLCJub2RlRWxlbWVudCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiZGlzcGxheVJlc3VsdHMiLCJwZXJjZW50YWdlIiwiY2FsY3VsYXRlUG9pbnRzIiwiaXNWaXNpYmxlIiwicmVzdWx0TW9kYWwiLCJtb2RhbENvbnRlbnQiLCJyZXN1bHQiLCJ0ZXh0Tm9kZSIsImNyZWF0ZVRleHROb2RlIiwiTWF0aCIsImZsb29yIiwidHJ5QWdhaW4iLCJ0ZXh0Tm9kZTIiLCJhcHBlbmQiLCJhZGQiLCJjb25zb2xlIiwibG9nIiwibXlQYXRoT3JkZXIiLCJzZXRQb2ludHMiLCJTZXQiLCJzZXQxIiwiZm9yRWFjaCIsImhhcyIsInNpemUiLCJpZCIsImNvb3JkaW5hdGVzIiwic3BsaXQiLCJwYXJzZUludCIsImRpc3RhbmNlIiwidW52aXNpdGVkTm9kZXMiLCJnZXRBbGxOb2RlcyIsInNvcnROb2Rlc0J5RGlzdGFuY2UiLCJjbG9zZXN0Tm9kZSIsInNoaWZ0IiwiaXNWaXNpdGVkIiwidXBkYXRlVW52aXNpdGVkTmVpZ2hib3JzIiwic29ydCIsIm5vZGVBIiwibm9kZUIiLCJ1bnZpc2l0ZWROZWlnaGJvcnMiLCJnZXRVbnZpc2l0ZWROZWlnaGJvcnMiLCJuZWlnaGJvciIsInByZXZpb3VzTm9kZSIsIm5laWdoYm9ycyIsImZpbHRlciIsIm5vZGVzIiwidW5zaGlmdCIsInRvZ2dsZU1vZGFsIiwib3BlbkVscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjbG9zZUVscyIsIm1vZGFsSWQiLCJkYXRhc2V0Iiwib3BlbiIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmUiLCJrZXkiLCJxdWVyeVNlbGVjdG9yIiwiV0FMTF9OT0RFUyIsIkluZmluaXR5IiwiciIsImMiLCJhZGRDbGFzcyIsIm5vZGVFbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFFQSxJQUFNQSxjQUFjLEdBQUcsRUFBdkI7QUFDQSxJQUFNQyxjQUFjLEdBQUcsQ0FBdkI7QUFDQSxJQUFNQyxlQUFlLEdBQUcsQ0FBeEI7QUFDQSxJQUFNQyxlQUFlLEdBQUcsRUFBeEI7O0lBRU1DLEs7QUFDSixpQkFBWUMsRUFBWixFQUFnQjtBQUFBOztBQUNkLFNBQUtBLEVBQUwsR0FBVUEsRUFBVjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEtBQUtDLFdBQUwsRUFBYjtBQUNBLFNBQUtDLGlCQUFMO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLEtBQXBCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixJQUFuQixDQVhjLENBWWQ7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7OztXQUVELHVCQUFjO0FBRVosV0FBSyxJQUFJQyxH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bXBvcnQge2RpamtzdHJhQWxnbywgZ2V0Tm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyfSBmcm9tICcuL2RpamtzdHJhJztcblxuY29uc3QgU1RBUlRfTk9ERV9ST1cgPSAxODtcbmNvbnN0IFNUQVJUX05PREVfQ09MID0gMTtcbmNvbnN0IEZJTklTSF9OT0RFX1JPVyA9IDE7XG5jb25zdCBGSU5JU0hfTk9ERV9DT0wgPSA0ODtcblxuY2xhc3MgQm9hcmQge1xuICBjb25zdHJ1Y3RvcihlbCkge1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLm1heFJvdyA9IDIwO1xuICAgIHRoaXMubWF4Q29sID0gNTA7XG4gICAgdGhpcy5ncmlkID0gW107XG4gICAgdGhpcy5teVBhdGggPSBbXTtcbiAgICB0aGlzLmJvYXJkID0gdGhpcy5jcmVhdGVCb2FyZCgpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLmJ1dHRvbnNPbiA9IGZhbHNlO1xuICAgIHRoaXMucHJldmlvdXMgPSBudWxsO1xuICAgIHRoaXMuZmluaXNoZWRQYXRoID0gZmFsc2U7XG4gICAgdGhpcy5ub2RlQ2xpY2tlZCA9IG51bGw7XG4gICAgLy8gdGhpcy5teVBhdGgucHVzaCh0aGlzLmdldE5vZGUoYCR7U1RBUlRfTk9ERV9ST1d9LSR7U1RBUlRfTk9ERV9DT0x9YCkpO1xuICAgIC8vIHRoaXMuZ3JpZC5wdXNoKHRoaXMuZ2V0Tm9kZShgJHtTVEFSVF9OT0RFX1JPV30tJHtTVEFSVF9OT0RFX0NPTH1gKSk7XG4gICAgLy8gdGhpcy5kaXNwbGF5RGlqa3N0cmEgPSB0aGlzLmRpc3BsYXlEaWprc3RyYS5iaW5kKHRoaXMpO1xuICAgIC8vIHRoaXMuY2xlYXJCb2FyZCA9IHRoaXMuY2xlYXJCb2FyZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY3JlYXRlQm9hcmQoKSB7XG5cbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLm1heFJvdzsgcm93KyspIHtcbiAgICAgIGxldCBib2FyZFJvdyA9IFtdO1xuICAgICAgbGV0IG5ld0VsZVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBuZXdFbGVSb3cuY2xhc3NOYW1lID0gXCJub2RlLXJvd1wiO1xuICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZChuZXdFbGVSb3cpO1xuXG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLm1heENvbDsgY29sKyspIHtcbiAgICAgICAgbGV0IG5ld0VsZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBuZXdFbGVOb2RlLmNsYXNzTmFtZSA9IFwibm9kZVwiO1xuICAgICAgICBuZXdFbGVOb2RlLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3Jvd30tJHtjb2x9YClcbiAgICAgICAgbmV3RWxlUm93LmFwcGVuZENoaWxkKG5ld0VsZU5vZGUpO1xuICAgICAgICBsZXQgbm9kZSA9IG5ldyBOb2RlKHJvdywgY29sKVxuICAgICAgICBib2FyZFJvdy5wdXNoKG5vZGUpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuZ3JpZC5wdXNoKGJvYXJkUm93KVxuICAgIH1cbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGxldCBib2FyZCA9IHRoaXM7XG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgYm9hcmQubWF4Um93OyByb3crKykge1xuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgYm9hcmQubWF4Q29sOyBjb2wrKykge1xuICAgICAgICBsZXQgY3VycmVudElkID0gYCR7cm93fS0ke2NvbH1gO1xuICAgICAgICBsZXQgY3VycmVudE5vZGUgPSBib2FyZC5nZXROb2RlKGN1cnJlbnRJZCk7XG4gICAgICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1cnJlbnRJZCk7XG5cbiAgICAgICAgY3VycmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlmICghYm9hcmQuZmluaXNoZWRQYXRoKSB7XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnROb2RlLmlzRmluaXNoKSB7XG4gICAgICAgICAgICAgIGJvYXJkLm5vZGVDbGlja2VkID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgIGlmICgoY3VycmVudE5vZGUuaXNTdGFydCAmJiBib2FyZC5wcmV2aW91cyA9PT0gbnVsbCkgfHwgKGJvYXJkLm5vZGVDbGlja2VkID09PSBib2FyZC5wcmV2aW91cykpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5tb3VzZURvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJvYXJkLmJ1dHRvbnNPbiA9IHRydWVcbiAgICAgICAgICAgICAgICBpZiAoIWJvYXJkLm15UGF0aC5pbmNsdWRlcyhjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgIGJvYXJkLm15UGF0aC5wdXNoKGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIGN1cnJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoIWN1cnJlbnROb2RlLmlzV2FsbCkge1xuICAgICAgICAgICAgaWYgKGJvYXJkLmJ1dHRvbnNPbikge1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgY3VycmVudE5vZGUubW91c2VEb3duID0gdHJ1ZTtcbiAgXG4gICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZS5pc0ZpbmlzaCkge1xuICAgICAgICAgICAgICAgIGJvYXJkLmJ1dHRvbnNPbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJvYXJkLm15UGF0aC5wdXNoKGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgICAgICBib2FyZC5maW5pc2hlZFBhdGggPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBpZiAoIWJvYXJkLm15UGF0aC5pbmNsdWRlcyhjdXJyZW50Tm9kZSkpIHsgXG4gICAgICAgICAgICAgICAgYm9hcmQucHJldmlvdXMgPSBjdXJyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgYm9hcmQubXlQYXRoLnB1c2goY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LmNsYXNzTmFtZSArPSBcIiBjbGlja2VkXCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9hcmQuYnV0dG9uc09uID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjdXJyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiICwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIC8vIGlmIChib2FyZC5idXR0b25zT24pIHtcbiAgICAgICAgICAvLyAgIGJvYXJkLnByZXZpb3VzID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICAgICAgLy8gfVxuICAgICAgICAvLyB9KVxuXG5cbiAgICAgICAgY3VycmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChib2FyZC5idXR0b25zT24pIHtcbiAgICAgICAgICAgIGJvYXJkLmJ1dHRvbnNPbiA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgY2xlYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsZWFyLWJ1dHRvblwiKVxuICAgIGNsZWFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAvLyBib2FyZC5teVBhdGguZm9yRWFjaChub2RlID0+IHtcbiAgICAgIC8vICAgY29uc3Qgcm93ID0gbm9kZS5yb3c7XG4gICAgICAvLyAgIGNvbnN0IGNvbCA9IG5vZGUuY29sO1xuICAgICAgLy8gICBjb25zdCBub2RlRWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cm93fS0ke2NvbH1gKTtcbiAgICAgIC8vICAgbm9kZUVsZS5jbGFzc0xpc3QucmVtb3ZlKFwiY2xpY2tlZFwiKVxuICAgICAgLy8gICBib2FyZC5teVBhdGggPSBbXTtcbiAgICAgIC8vICAgYm9hcmQuYnV0dG9uc09uID0gZmFsc2U7XG4gICAgICAvLyAgIGJvYXJkLnByZXZpb3VzID0gbnVsbDtcbiAgICAgIC8vICAgYm9hcmQuZmluaXNoZWRQYXRoID0gZmFsc2U7XG4gICAgICAvLyAgIGJvYXJkLm5vZGVDbGlja2VkID0gbnVsbDtcbiAgICAgIC8vIH0pXG4gICAgfSk7XG5cbiAgICBjb25zdCBkaWprc3RyYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheS1idXR0b25cIik7XG4gICAgXG4gICAgZGlqa3N0cmEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpXG4gICAgICBjb25zdCBncmlkID0gYm9hcmQuZ3JpZDtcbiAgICAgIGNvbnN0IHN0YXJ0Tm9kZSA9IGdyaWRbU1RBUlRfTk9ERV9ST1ddW1NUQVJUX05PREVfQ09MXTtcbiAgICAgIGNvbnN0IGZpbmlzaE5vZGUgPSBncmlkW0ZJTklTSF9OT0RFX1JPV11bRklOSVNIX05PREVfQ09MXTtcbiAgICAgIFxuICAgICAgY29uc3QgdmlzaXRlZE5vZGVzSW5PcmRlciA9IGRpamtzdHJhQWxnbyhncmlkLCBzdGFydE5vZGUsIGZpbmlzaE5vZGUpO1xuICAgICAgXG4gICAgICBjb25zdCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIgPSBnZXROb2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIoZmluaXNoTm9kZSk7XG4gICAgICAvLyBcbiAgICAgIGJvYXJkLmFuaW1hdGVEaWprc3RyYSh2aXNpdGVkTm9kZXNJbk9yZGVyLCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpO1xuICAgIH0pXG5cblxuXG4gIH1cblxuICBhbmltYXRlRGlqa3N0cmEodmlzaXRlZE5vZGVzSW5PcmRlciwgbm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKSB7XG4gICAgY29uc3QgYm9hcmQgPSB0aGlzO1xuICAgIFxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdmlzaXRlZE5vZGVzSW5PcmRlci5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gXG4gICAgICBpZiAoaSA9PT0gdmlzaXRlZE5vZGVzSW5PcmRlci5sZW5ndGgpIHtcbiAgICAgICAgY29uc3Qgc2hvd0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic29sdXRpb25cIik7XG4gICAgICAgIHNob3dCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBib2FyZC5hbmltYXRlU2hvcnRlc3RQYXRoKG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcik7XG4gICAgICAgIH0pXG4gICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIFxuICAgICAgICAvLyAgIGJvYXJkLmFuaW1hdGVTaG9ydGVzdFBhdGgobm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKTtcbiAgICAgICAgLy8gfSwgMTAgKiBpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB2aXNpdGVkTm9kZXNJbk9yZGVyW2ldO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgbm9kZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtub2RlLnJvd30tJHtub2RlLmNvbH1gKVxuICAgICAgICBpZiAobm9kZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2xpY2tlZFwiKSB8fCBub2RlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJub2RlLXN0YXJ0XCIpIHx8IG5vZGVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm5vZGUtZmluaXNoXCIpKSB7XG4gICAgICAgICAgbm9kZUVsZW1lbnQuY2xhc3NOYW1lICs9JyBteS1wYXRoLW5vZGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vZGVFbGVtZW50LmNsYXNzTmFtZSArPSAnIG5vZGUtdmlzaXRlZCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09ICB2aXNpdGVkTm9kZXNJbk9yZGVyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBib2FyZC5kaXNwbGF5UmVzdWx0cyggbm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTAgKiBpKTtcbiAgICAgIFxuICAgIH1cbiAgfVxuXG4gIGFuaW1hdGVTaG9ydGVzdFBhdGgobm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKSB7XG4gICAgY29uc3QgYm9hcmQgPSB0aGlzO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gbm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyW2ldO1xuICAgICAgICBjb25zdCBub2RlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke25vZGUucm93fS0ke25vZGUuY29sfWApO1xuICAgICAgICBkZWJ1Z2dlclxuICAgICAgICBpZiAobm9kZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibXktcGF0aC1ub2RlXCIpKSB7XG4gICAgICAgICAgbm9kZUVsZW1lbnQuY2xhc3NOYW1lID0gJ25vZGUgY29ycmVjdC1ub2RlLXNob3J0ZXN0LXBhdGgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vZGVFbGVtZW50LmNsYXNzTmFtZSArPSAnIG5vZGUtc2hvcnRlc3QtcGF0aCc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgKGkgPT09ICBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAvLyAgIGJvYXJkLmRpc3BsYXlSZXN1bHRzKCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpO1xuICAgICAgICAvLyB9XG4gICAgICB9LCA1MCAqIGkpO1xuICAgICAgXG4gICAgfVxuICB9XG5cbiAgZGlzcGxheVJlc3VsdHMobm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKSB7XG4gICAgY29uc3QgcGVyY2VudGFnZSA9IHRoaXMuY2FsY3VsYXRlUG9pbnRzKHRoaXMubXlQYXRoLCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpXG4gICAgY29uc3QgaXNWaXNpYmxlID0gXCJpcy12aXNpYmxlXCI7XG4gICAgY29uc3QgcmVzdWx0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsM1wiKTtcbiAgICBjb25zdCBtb2RhbENvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXktcmVzdWx0c1wiKTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7TWF0aC5mbG9vcihwZXJjZW50YWdlKX0lIG91dCBvZiAxMDAlIG5vZGVzIGNvcnJlY3RgKTtcbiAgICBjb25zdCB0cnlBZ2FpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGNvbnN0IHRleHROb2RlMiA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiUGxlYXNlIFRyeSBBZ2FpbiA6KVwiKTtcblxuICAgIHJlc3VsdC5hcHBlbmQodGV4dE5vZGUpO1xuICAgIHRyeUFnYWluLmFwcGVuZCh0ZXh0Tm9kZTIpO1xuICAgIG1vZGFsQ29udGVudC5hcHBlbmQocmVzdWx0KTtcbiAgICBtb2RhbENvbnRlbnQuYXBwZW5kKHRyeUFnYWluKTtcblxuICAgIHJlc3VsdE1vZGFsLmNsYXNzTGlzdC5hZGQoaXNWaXNpYmxlKTtcbiAgICBjb25zb2xlLmxvZyhcImFjaGlldmVkXCIpXG4gIH1cblxuICBjYWxjdWxhdGVQb2ludHMobXlQYXRoT3JkZXIsIG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcikge1xuICAgIGNvbnN0IHNldFBvaW50cyA9IG5ldyBTZXQoKTtcbiAgICBjb25zdCBzZXQxID0gbmV3IFNldChub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpO1xuXG4gICAgbXlQYXRoT3JkZXIuZm9yRWFjaChub2RlID0+IHtcbiAgICAgIGlmIChzZXQxLmhhcyhub2RlKSkgc2V0UG9pbnRzLmFkZChub2RlKTtcbiAgICB9KVxuICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSAoc2V0UG9pbnRzLnNpemUgLyBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIubGVuZ3RoKSAqIDEwMFxuICAgIHJldHVybiBwZXJjZW50YWdlO1xuICB9XG5cbiAgZ2V0Tm9kZShpZCkge1xuICAgIGxldCBjb29yZGluYXRlcyA9IGlkLnNwbGl0KFwiLVwiKTtcbiAgICBsZXQgcm93ID0gcGFyc2VJbnQoY29vcmRpbmF0ZXNbMF0pO1xuICAgIGxldCBjb2wgPSBwYXJzZUludChjb29yZGluYXRlc1sxXSk7XG4gICAgcmV0dXJuIHRoaXMuZ3JpZFtyb3ddW2NvbF07XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJvYXJkOyIsIi8vIFBlcmZvcm1zIERpamtzdHJhJ3MgYWxnb3JpdGhtOyByZXR1cm5zICphbGwqIG5vZGVzIGluIHRoZSBvcmRlclxuLy8gaW4gd2hpY2ggdGhleSB3ZXJlIHZpc2l0ZWQuIEFsc28gbWFrZXMgbm9kZXMgcG9pbnQgYmFjayB0byB0aGVpclxuLy8gcHJldmlvdXMgbm9kZSwgZWZmZWN0aXZlbHkgYWxsb3dpbmcgdXMgdG8gY29tcHV0ZSB0aGUgc2hvcnRlc3QgcGF0aFxuLy8gYnkgYmFja3RyYWNraW5nIGZyb20gdGhlIGZpbmlzaCBub2RlLlxuZXhwb3J0IGZ1bmN0aW9uIGRpamtzdHJhQWxnbyhncmlkLCBzdGFydE5vZGUsIGZpbmlzaE5vZGUpIHtcblx0XG4gIGNvbnN0IHZpc2l0ZWROb2Rlc0luT3JkZXIgPSBbXTtcbiAgc3RhcnROb2RlLmRpc3RhbmNlID0gMDtcblx0XG4gIGNvbnN0IHVudmlzaXRlZE5vZGVzID0gZ2V0QWxsTm9kZXMoZ3JpZCk7XG5cdFxuICB3aGlsZSAoISF1bnZpc2l0ZWROb2Rlcy5sZW5ndGgpIHtcblx0XHRcbiAgICBzb3J0Tm9kZXNCeURpc3RhbmNlKHVudmlzaXRlZE5vZGVzKTtcblx0XHRcbiAgICBjb25zdCBjbG9zZXN0Tm9kZSA9IHVudmlzaXRlZE5vZGVzLnNoaWZ0KCk7XG4gICAgXG4gICAgLy8gSWYgd2UgZW5jb3VudGVyIGEgd2FsbCwgd2Ugc2tpcCBpdC5cbiAgICBpZiAoY2xvc2VzdE5vZGUuaXNXYWxsKSBjb250aW51ZTtcbiAgICAvLyBJZiB0aGUgY2xvc2VzdCBub2RlIGlzIGF0IGEgZGlzdGFuY2Ugb2YgaW5maW5pdHksXG4gICAgLy8gd2UgbXVzdCBiZSB0cmFwcGVkIGFuZCBzaG91bGQgdGhlcmVmb3JlIHN0b3AuXG4gICAgXG4gICAgLy8gaWYgKGNsb3Nlc3ROb2RlLmRpc3RhbmNlID09PSBJbmZpbml0eSkgcmV0dXJuIHZpc2l0ZWROb2Rlc0luT3JkZXI7XG4gICAgY2xvc2VzdE5vZGUuaXNWaXNpdGVkID0gdHJ1ZTtcbiAgICB2aXNpdGVkTm9kZXNJbk9yZGVyLnB1c2goY2xvc2VzdE5vZGUpO1xuXHRcdFxuICAgIGlmIChjbG9zZXN0Tm9kZSA9PT0gZmluaXNoTm9kZSkgcmV0dXJuIHZpc2l0ZWROb2Rlc0luT3JkZXI7XG5cdFx0XG4gICAgdXBkYXRlVW52aXNpdGVkTmVpZ2hib3JzKGNsb3Nlc3ROb2RlLCBncmlkKTtcblx0XHRcbiAgfVxufVxuXG5mdW5jdGlvbiBzb3J0Tm9kZXNCeURpc3RhbmNlKHVudmlzaXRlZE5vZGVzKSB7XG5cdFxuICB1bnZpc2l0ZWROb2Rlcy5zb3J0KChub2RlQSwgbm9kZUIpID0+IG5vZGVBLmRpc3RhbmNlIC0gbm9kZUIuZGlzdGFuY2UpO1xuXHRcbn1cblxuZnVuY3Rpb24gdXBkYXRlVW52aXNpdGVkTmVpZ2hib3JzKG5vZGUsIGdyaWQpIHtcblx0XG4gIGNvbnN0IHVudmlzaXRlZE5laWdoYm9ycyA9IGdldFVudmlzaXRlZE5laWdoYm9ycyhub2RlLCBncmlkKTtcblx0XG4gIGZvciAoY29uc3QgbmVpZ2hib3Igb2YgdW52aXNpdGVkTmVpZ2hib3JzKSB7XG4gICAgXG4gICAgbmVpZ2hib3IuZGlzdGFuY2UgPSBub2RlLmRpc3RhbmNlICsgMTtcbiAgICBuZWlnaGJvci5wcmV2aW91c05vZGUgPSBub2RlO1xuICAgIFxuICB9XG5cdFxufVxuXG5mdW5jdGlvbiBnZXRVbnZpc2l0ZWROZWlnaGJvcnMobm9kZSwgZ3JpZCkge1xuXHRcbiAgY29uc3QgbmVpZ2hib3JzID0gW107XG4gIGNvbnN0IHtjb2wsIHJvd30gPSBub2RlO1xuXHRcbiAgaWYgKHJvdyA+IDApIG5laWdoYm9ycy5wdXNoKGdyaWRbcm93IC0gMV1bY29sXSk7XG4gIFxuICBpZiAocm93IDwgZ3JpZC5sZW5ndGggLSAxKSBuZWlnaGJvcnMucHVzaChncmlkW3JvdyArIDFdW2NvbF0pO1xuICBcbiAgaWYgKGNvbCA+IDApIG5laWdoYm9ycy5wdXNoKGdyaWRbcm93XVtjb2wgLSAxXSk7XG4gIFxuICBpZiAoY29sIDwgZ3JpZFswXS5sZW5ndGggLSAxKSBuZWlnaGJvcnMucHVzaChncmlkW3Jvd11bY29sICsgMV0pO1xuXHRcbiAgcmV0dXJuIG5laWdoYm9ycy5maWx0ZXIobmVpZ2hib3IgPT4gIW5laWdoYm9yLmlzVmlzaXRlZCk7XG59XG5cbmZ1bmN0aW9uIGdldEFsbE5vZGVzKGdyaWQpIHtcblx0XG4gIGNvbnN0IG5vZGVzID0gW107XG4gIGZvciAoY29uc3Qgcm93IG9mIGdyaWQpIHtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygcm93KSB7XG4gICAgICBub2Rlcy5wdXNoKG5vZGUpO1xuICAgIH1cbiAgfVxuXG5cdFxuICByZXR1cm4gbm9kZXM7XG59XG5cbi8vIEJhY2t0cmFja3MgZnJvbSB0aGUgZmluaXNoTm9kZSB0byBmaW5kIHRoZSBzaG9ydGVzdCBwYXRoLlxuLy8gT25seSB3b3JrcyB3aGVuIGNhbGxlZCAqYWZ0ZXIqIHRoZSBkaWprc3RyYSBtZXRob2QgYWJvdmUuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Tm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKGZpbmlzaE5vZGUpIHtcbiAgY29uc3Qgbm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyID0gW107XG4gIGxldCBjdXJyZW50Tm9kZSA9IGZpbmlzaE5vZGU7XG4gIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgIG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlci51bnNoaWZ0KGN1cnJlbnROb2RlKTtcbiAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLnByZXZpb3VzTm9kZTtcbiAgfVxuICByZXR1cm4gbm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyO1xufSIsImV4cG9ydCBjb25zdCB0b2dnbGVNb2RhbCA9ICgpID0+IHtcbiAgY29uc3QgaXNWaXNpYmxlID0gXCJpcy12aXNpYmxlXCI7XG4gIGNvbnN0IG9wZW5FbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtb3Blbl1cIik7XG4gIGNvbnN0IGNsb3NlRWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWNsb3NlXVwiKTtcblxuICBmb3IgKGNvbnN0IGVsIG9mIG9wZW5FbHMpIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgbW9kYWxJZCA9IHRoaXMuZGF0YXNldC5vcGVuO1xuICAgICAgXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RhbElkKS5jbGFzc0xpc3QuYWRkKGlzVmlzaWJsZSk7XG4gICAgfSk7XG4gIH1cblxuIFxuICBmb3IgKGNvbnN0IGVsIG9mIGNsb3NlRWxzKSB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgXG4gICAgICB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoaXNWaXNpYmxlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBlID0+IHtcbiAgICBpZiAoZS5rZXkgPT0gXCJFc2NhcGVcIiAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsLmlzLXZpc2libGVcIikpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwuaXMtdmlzaWJsZVwiKS5jbGFzc0xpc3QucmVtb3ZlKGlzVmlzaWJsZSk7XG4gICAgfVxuICB9KTtcbn1cblxuIiwiY29uc3QgU1RBUlRfTk9ERV9ST1cgPSAxODtcbmNvbnN0IFNUQVJUX05PREVfQ09MID0gMTtcbmNvbnN0IEZJTklTSF9OT0RFX1JPVyA9IDE7XG5jb25zdCBGSU5JU0hfTk9ERV9DT0wgPSA0ODtcblxuY29uc3QgV0FMTF9OT0RFUyA9IFtcbiAgWzEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDFdLFxuICBbMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMV0sXG4gIFsxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxXSxcbiAgWzEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDFdLFxuICBbMSwgMSwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMCwgMCwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMV0sXG4gIFsxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAxLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxXSxcbiAgWzEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDAsIDEsIDEsIDAsIDAsIDFdLFxuICBbMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMV0sXG4gIFsxLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAxXSxcbiAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICBbMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMV0sXG4gIFsxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAwLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxXSxcbiAgWzEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDFdLFxuICBbMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMV0sXG4gIFsxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxXSxcbiAgWzEsIDAsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDEsIDAsIDEsIDAsIDAsIDEsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDFdLFxuICBbMSwgMCwgMCwgMSwgMCwgMCwgMSwgMSwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMV0sXG4gIFsxLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxXSxcbiAgWzEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICBbMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMV0sXG5dXG5cbmNsYXNzIE5vZGUge1xuICBjb25zdHJ1Y3Rvcihyb3csIGNvbCkge1xuICAgIHRoaXMucm93ID0gcm93O1xuICAgIHRoaXMuY29sID0gY29sO1xuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XG4gICAgdGhpcy5pc1N0YXJ0ID0gdGhpcy5pc1N0YXJ0KCk7XG4gICAgdGhpcy5pc0ZpbmlzaCA9IHRoaXMuaXNGaW5pc2goKTtcbiAgICB0aGlzLmlzV2FsbCA9IHRoaXMuaXNXYWxsKCk7XG4gICAgdGhpcy5wcmV2aW91c05vZGUgPSBudWxsO1xuICAgIHRoaXMuZGlzdGFuY2UgPSBJbmZpbml0eTtcbiAgfVxuXG4gIGlzV2FsbCgpIHtcbiAgICBjb25zdCByID0gdGhpcy5yb3c7XG4gICAgY29uc3QgYyA9IHRoaXMuY29sO1xuICAgIGlmIChXQUxMX05PREVTW3JdW2NdKSB7XG4gICAgICB0aGlzLmFkZENsYXNzKFwid2FsbFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNTdGFydCgpIHtcbiAgICBpZiAodGhpcy5yb3cgPT09IFNUQVJUX05PREVfUk9XICYmIHRoaXMuY29sID09PSBTVEFSVF9OT0RFX0NPTCkge1xuICAgICAgdGhpcy5hZGRDbGFzcyhcIm5vZGUtc3RhcnRcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzRmluaXNoKCkge1xuICAgIGlmICh0aGlzLnJvdyA9PT0gRklOSVNIX05PREVfUk9XICYmIHRoaXMuY29sID09PSBGSU5JU0hfTk9ERV9DT0wpIHtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoXCJub2RlLWZpbmlzaFwiKTtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhZGRDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBsZXQgbm9kZUVsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RoaXMucm93fS0ke3RoaXMuY29sfWApXG4gICAgbm9kZUVsZS5jbGFzc05hbWUgKz0gYCAke2NsYXNzTmFtZX1gO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vZGU7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IEJvYXJkIGZyb20gXCIuL3NjcmlwdHMvYm9hcmRcIjtcbmltcG9ydCB7dG9nZ2xlTW9kYWx9IGZyb20gXCIuL3NjcmlwdHMvbW9kYWxcIjtcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdyaWRcIik7XG4gIGNvbnN0IGJvYXJkID0gZWwgPT4gbmV3IEJvYXJkKGVsKTtcbiAgYm9hcmQoZWwpO1xuICB0b2dnbGVNb2RhbCgpO1xufSk7XG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==