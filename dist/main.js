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

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var START_NODE_ROW = 18;
var START_NODE_COL = 1;
var FINISH_NODE_ROW = 1;
var FINISH_NODE_COL = 48;
var VISITED_NODES = null;

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
        // window.location.reload("false")
        board.myPath = [];
        board.buttonsOn = false;
        board.previous = null;
        board.finishedPath = false;
        board.nodeClicked = null;
        var dijkstraButton = document.getElementById("display-button");
        dijkstraButton.removeAttribute("disabled");
        var startNode = document.getElementById("".concat(START_NODE_ROW, "-").concat(START_NODE_COL));
        var finishNode = document.getElementById("".concat(FINISH_NODE_ROW, "-").concat(FINISH_NODE_COL));

        var _iterator = _createForOfIteratorHelper(VISITED_NODES),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var node = _step.value;
            var nodeEle = document.getElementById("".concat(node.row, "-").concat(node.col));

            if (nodeEle === startNode) {
              nodeEle.className = "node node-start";
            } else if (nodeEle === finishNode) {
              nodeEle.className = "node node-finish";
            } else {
              nodeEle.className = "node";
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
      var dijkstra = document.getElementById("display-button");
      dijkstra.addEventListener("click", function (e) {
        this.setAttribute("disabled", "true");
        var grid = board.grid;
        var startNode = grid[START_NODE_ROW][START_NODE_COL];
        var finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        var visitedNodesInOrder = VISITED_NODES || (0,_dijkstra__WEBPACK_IMPORTED_MODULE_1__.dijkstraAlgo)(grid, startNode, finishNode);
        VISITED_NODES = visitedNodesInOrder;
        var nodesInShortestPathOrder = (0,_dijkstra__WEBPACK_IMPORTED_MODULE_1__.getNodesInShortestPathOrder)(finishNode);
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
      var textNode = document.createTextNode("".concat(Math.floor(percentage), "% out of 100%"));
      var tryAgain = document.createElement("p"); // const textNode2 = document.createTextNode("Please Try Again :)");

      var textNode2 = this.textResult(percentage);
      if (modalContent.children.length) modalContent.textContent = "";
      result.append(textNode);
      tryAgain.append(textNode2);
      modalContent.append(result);
      modalContent.append(tryAgain);
      resultModal.classList.add(isVisible);
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
var WALL_NODES = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1], [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1], [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1], [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2RpamtzdHJhLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9tb2RhbC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvbm9kZS5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIlNUQVJUX05PREVfUk9XIiwiU1RBUlRfTk9ERV9DT0wiLCJGSU5JU0hfTk9ERV9ST1ciLCJGSU5JU0hfTk9ERV9DT0wiLCJWSVNJVEVEX05PREVTIiwiQm9hcmQiLCJlbCIsIm1heFJvdyIsIm1heENvbCIsImdyaWQiLCJteVBhdGgiLCJib2FyZCIsImNyZWF0ZUJvYXJkIiwiYWRkRXZlbnRMaXN0ZW5lcnMiLCJidXR0b25zT24iLCJwcmV2aW91cyIsImZpbmlzaGVkUGF0aCIsIm5vZGVDbGlja2VkIiwicm93IiwiYm9hcmRSb3ciLCJuZXdFbGVSb3ciLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJhcHBlbmRDaGlsZCIsImNvbCIsIm5ld0VsZU5vZGUiLCJzZXRBdHRyaWJ1dGUiLCJub2RlIiwiTm9kZSIsInB1c2giLCJjdXJyZW50SWQiLCJjdXJyZW50Tm9kZSIsImdldE5vZGUiLCJjdXJyZW50RWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImlzRmluaXNoIiwiaXNTdGFydCIsIm1vdXNlRG93biIsImluY2x1ZGVzIiwiaXNXYWxsIiwiY2xlYXIiLCJkaWprc3RyYUJ1dHRvbiIsInJlbW92ZUF0dHJpYnV0ZSIsInN0YXJ0Tm9kZSIsImZpbmlzaE5vZGUiLCJub2RlRWxlIiwiZGlqa3N0cmEiLCJ2aXNpdGVkTm9kZXNJbk9yZGVyIiwiZGlqa3N0cmFBbGdvIiwibm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyIiwiZ2V0Tm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyIiwiYW5pbWF0ZURpamtzdHJhIiwiaSIsImxlbmd0aCIsInNob3dCdXR0b24iLCJhbmltYXRlU2hvcnRlc3RQYXRoIiwic2V0VGltZW91dCIsIm5vZGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJkaXNwbGF5UmVzdWx0cyIsInBlcmNlbnRhZ2UiLCJjYWxjdWxhdGVQb2ludHMiLCJpc1Zpc2libGUiLCJyZXN1bHRNb2RhbCIsIm1vZGFsQ29udGVudCIsInJlc3VsdCIsInRleHROb2RlIiwiY3JlYXRlVGV4dE5vZGUiLCJNYXRoIiwiZmxvb3IiLCJ0cnlBZ2FpbiIsInRleHROb2RlMiIsInRleHRSZXN1bHQiLCJjaGlsZHJlbiIsInRleHRDb250ZW50IiwiYXBwZW5kIiwiYWRkIiwibXlQYXRoT3JkZXIiLCJzZXRQb2ludHMiLCJTZXQiLCJzZXQxIiwiZm9yRWFjaCIsImhhcyIsInNpemUiLCJzY29yZSIsImlkIiwiY29vcmRpbmF0ZXMiLCJzcGxpdCIsInBhcnNlSW50IiwiZGlzdGFuY2UiLCJ1bnZpc2l0ZWROb2RlcyIsImdldEFsbE5vZGVzIiwic29ydE5vZGVzQnlEaXN0YW5jZSIsImNsb3Nlc3ROb2RlIiwic2hpZnQiLCJpc1Zpc2l0ZWQiLCJ1cGRhdGVVbnZpc2l0ZWROZWlnaGJvcnMiLCJzb3J0Iiwibm9kZUEiLCJub2RlQiIsInVudmlzaXRlZE5laWdoYm9ycyIsImdldFVudmlzaXRlZE5laWdoYm9ycyIsIm5laWdoYm9yIiwicHJldmlvdXNOb2RlIiwibmVpZ2hib3JzIiwiZmlsdGVyIiwibm9kZXMiLCJ1bnNoaWZ0IiwidG9nZ2xlTW9kYWwiLCJvcGVuRWxzIiwicXVlcnlTZWxlY3RvckFsbCIsImNsb3NlRWxzIiwibW9kYWxJZCIsImRhdGFzZXQiLCJvcGVuIiwicGFyZW50RWxlbWVudCIsInJlbW92ZSIsImtleSIsInF1ZXJ5U2VsZWN0b3IiLCJXQUxMX05PREVTIiwiSW5maW5pdHkiLCJyIiwiYyIsImFkZENsYXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUEsSUFBTUEsY0FBYyxHQUFHLEVBQXZCO0FBQ0EsSUFBTUMsY0FBYyxHQUFHLENBQXZCO0FBQ0EsSUFBTUMsZUFBZSxHQUFHLENBQXhCO0FBQ0EsSUFBTUMsZUFBZSxHQUFHLEVBQXhCO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLElBQXBCOztJQUVNQyxLO0FBQ0osaUJBQVlDLEVBQVosRUFBZ0I7QUFBQTs7QUFDZCxTQUFLQSxFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxTQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLFNBQUtDLEtBQUwsR0FBYSxLQUFLQyxXQUFMLEVBQWI7QUFDQSxTQUFLQyxpQkFBTDtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQixLQUFwQjtBQUNB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Ozs7V0NQQSw2Q0FBNkMsd0RBQXdELEU7Ozs7O1dDQXJHO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUdBUixRQUFRLENBQUNlLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3ZELE1BQU05QixFQUFFLEdBQUdlLFFBQVEsQ0FBQ2MsY0FBVCxDQUF3QixNQUF4QixDQUFYOztBQUNBLE1BQU14QixLQUFLLEdBQUcsU0FBUkEsS0FBUSxDQUFBTCxFQUFFO0FBQUEsV0FBSSxJQUFJRCxtREFBSixDQUFVQyxFQUFWLENBQUo7QUFBQSxHQUFoQjs7QUFDQUssT0FBSyxDQUFDTCxFQUFELENBQUw7QUFDQTJHLDZEQUFXO0FBQ1osQ0FMRCxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTm9kZSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtkaWprc3RyYUFsZ28sIGdldE5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcn0gZnJvbSAnLi9kaWprc3RyYSc7XG5cbmNvbnN0IFNUQVJUX05PREVfUk9XID0gMTg7XG5jb25zdCBTVEFSVF9OT0RFX0NPTCA9IDE7XG5jb25zdCBGSU5JU0hfTk9ERV9ST1cgPSAxO1xuY29uc3QgRklOSVNIX05PREVfQ09MID0gNDg7XG5sZXQgVklTSVRFRF9OT0RFUyA9IG51bGw7XG5cbmNsYXNzIEJvYXJkIHtcbiAgY29uc3RydWN0b3IoZWwpIHtcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy5tYXhSb3cgPSAyMDtcbiAgICB0aGlzLm1heENvbCA9IDUwO1xuICAgIHRoaXMuZ3JpZCA9IFtdO1xuICAgIHRoaXMubXlQYXRoID0gW107XG4gICAgdGhpcy5ib2FyZCA9IHRoaXMuY3JlYXRlQm9hcmQoKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5idXR0b25zT24gPSBmYWxzZTtcbiAgICB0aGlzLnByZXZpb3VzID0gbnVsbDtcbiAgICB0aGlzLmZpbmlzaGVkUGF0aCA9IGZhbHNlO1xuICAgIHRoaXMubm9kZUNsaWNrZWQgPSBudWxsO1xuICAgIC8vIHRoaXMubXlQYXRoLnB1c2godGhpcy5nZXROb2RlKGAke1NUQVJUX05PREVfUk9XfS0ke1NUQVJUX05PREVfQ09MfWApKTtcbiAgICAvLyB0aGlzLmdyaWQucHVzaCh0aGlzLmdldE5vZGUoYCR7U1RBUlRfTk9ERV9ST1d9LSR7U1RBUlRfTk9ERV9DT0x9YCkpO1xuICAgIC8vIHRoaXMuZGlzcGxheURpamtzdHJhID0gdGhpcy5kaXNwbGF5RGlqa3N0cmEuYmluZCh0aGlzKTtcbiAgICAvLyB0aGlzLmNsZWFyQm9hcmQgPSB0aGlzLmNsZWFyQm9hcmQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNyZWF0ZUJvYXJkKCkge1xuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5tYXhSb3c7IHJvdysrKSB7XG4gICAgICBsZXQgYm9hcmRSb3cgPSBbXTtcbiAgICAgIGxldCBuZXdFbGVSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbmV3RWxlUm93LmNsYXNzTmFtZSA9IFwibm9kZS1yb3dcIjtcbiAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQobmV3RWxlUm93KTtcblxuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgdGhpcy5tYXhDb2w7IGNvbCsrKSB7XG4gICAgICAgIGxldCBuZXdFbGVOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbmV3RWxlTm9kZS5jbGFzc05hbWUgPSBcIm5vZGVcIjtcbiAgICAgICAgbmV3RWxlTm9kZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtyb3d9LSR7Y29sfWApXG4gICAgICAgIG5ld0VsZVJvdy5hcHBlbmRDaGlsZChuZXdFbGVOb2RlKTtcbiAgICAgICAgbGV0IG5vZGUgPSBuZXcgTm9kZShyb3csIGNvbClcbiAgICAgICAgYm9hcmRSb3cucHVzaChub2RlKVxuICAgICAgfVxuXG4gICAgICB0aGlzLmdyaWQucHVzaChib2FyZFJvdylcbiAgICB9XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICBsZXQgYm9hcmQgPSB0aGlzO1xuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IGJvYXJkLm1heFJvdzsgcm93KyspIHtcbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGJvYXJkLm1heENvbDsgY29sKyspIHtcbiAgICAgICAgbGV0IGN1cnJlbnRJZCA9IGAke3Jvd30tJHtjb2x9YDtcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlID0gYm9hcmQuZ2V0Tm9kZShjdXJyZW50SWQpO1xuICAgICAgICBsZXQgY3VycmVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50SWQpO1xuXG4gICAgICAgIGN1cnJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBpZiAoIWJvYXJkLmZpbmlzaGVkUGF0aCkge1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50Tm9kZS5pc0ZpbmlzaCkge1xuICAgICAgICAgICAgICBib2FyZC5ub2RlQ2xpY2tlZCA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICBpZiAoKGN1cnJlbnROb2RlLmlzU3RhcnQgJiYgYm9hcmQucHJldmlvdXMgPT09IG51bGwpIHx8IChib2FyZC5ub2RlQ2xpY2tlZCA9PT0gYm9hcmQucHJldmlvdXMpKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudE5vZGUubW91c2VEb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBib2FyZC5idXR0b25zT24gPSB0cnVlXG4gICAgICAgICAgICAgICAgaWYgKCFib2FyZC5teVBhdGguaW5jbHVkZXMoY3VycmVudE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICBib2FyZC5teVBhdGgucHVzaChjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICBjdXJyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKCFjdXJyZW50Tm9kZS5pc1dhbGwpIHtcbiAgICAgICAgICAgIGlmIChib2FyZC5idXR0b25zT24pIHtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIGN1cnJlbnROb2RlLm1vdXNlRG93biA9IHRydWU7XG4gIFxuICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuaXNGaW5pc2gpIHtcbiAgICAgICAgICAgICAgICBib2FyZC5idXR0b25zT24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBib2FyZC5teVBhdGgucHVzaChjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICAgICAgYm9hcmQuZmluaXNoZWRQYXRoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgaWYgKCFib2FyZC5teVBhdGguaW5jbHVkZXMoY3VycmVudE5vZGUpKSB7IFxuICAgICAgICAgICAgICAgIGJvYXJkLnByZXZpb3VzID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgIGJvYXJkLm15UGF0aC5wdXNoKGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudC5jbGFzc05hbWUgKz0gXCIgY2xpY2tlZFwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvYXJkLmJ1dHRvbnNPbiA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY3VycmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiAsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAvLyBpZiAoYm9hcmQuYnV0dG9uc09uKSB7XG4gICAgICAgICAgLy8gICBib2FyZC5wcmV2aW91cyA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgLy8gfSlcblxuXG4gICAgICAgIGN1cnJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoYm9hcmQuYnV0dG9uc09uKSB7XG4gICAgICAgICAgICBib2FyZC5idXR0b25zT24gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGNsZWFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbGVhci1idXR0b25cIilcbiAgICBjbGVhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgLy8gd2luZG93LmxvY2F0aW9uLnJlbG9hZChcImZhbHNlXCIpXG4gICAgICBib2FyZC5teVBhdGggPSBbXTtcbiAgICAgIGJvYXJkLmJ1dHRvbnNPbiA9IGZhbHNlO1xuICAgICAgYm9hcmQucHJldmlvdXMgPSBudWxsO1xuICAgICAgYm9hcmQuZmluaXNoZWRQYXRoID0gZmFsc2U7XG4gICAgICBib2FyZC5ub2RlQ2xpY2tlZCA9IG51bGw7XG4gICAgICBjb25zdCBkaWprc3RyYUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheS1idXR0b25cIik7XG4gICAgICBkaWprc3RyYUJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKVxuXG4gICAgICBjb25zdCBzdGFydE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtTVEFSVF9OT0RFX1JPV30tJHtTVEFSVF9OT0RFX0NPTH1gKTtcbiAgICAgIGNvbnN0IGZpbmlzaE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtGSU5JU0hfTk9ERV9ST1d9LSR7RklOSVNIX05PREVfQ09MfWApO1xuXG4gICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgVklTSVRFRF9OT0RFUykge1xuICAgICAgICBjb25zdCBub2RlRWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bm9kZS5yb3d9LSR7bm9kZS5jb2x9YCk7XG5cbiAgICAgICAgaWYgKG5vZGVFbGUgPT09IHN0YXJ0Tm9kZSkge1xuICAgICAgICAgIFxuICAgICAgICAgIG5vZGVFbGUuY2xhc3NOYW1lID0gXCJub2RlIG5vZGUtc3RhcnRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlRWxlID09PSBmaW5pc2hOb2RlKSB7XG4gICAgICAgICAgbm9kZUVsZS5jbGFzc05hbWUgPSBcIm5vZGUgbm9kZS1maW5pc2hcIjtcbiAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub2RlRWxlLmNsYXNzTmFtZSA9IFwibm9kZVwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBkaWprc3RyYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheS1idXR0b25cIik7XG4gICAgXG4gICAgZGlqa3N0cmEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpXG4gICAgICBjb25zdCBncmlkID0gYm9hcmQuZ3JpZDtcbiAgICAgIGNvbnN0IHN0YXJ0Tm9kZSA9IGdyaWRbU1RBUlRfTk9ERV9ST1ddW1NUQVJUX05PREVfQ09MXTtcbiAgICAgIGNvbnN0IGZpbmlzaE5vZGUgPSBncmlkW0ZJTklTSF9OT0RFX1JPV11bRklOSVNIX05PREVfQ09MXTtcbiAgICAgIFxuICAgICAgY29uc3QgdmlzaXRlZE5vZGVzSW5PcmRlciA9IFZJU0lURURfTk9ERVMgfHwgZGlqa3N0cmFBbGdvKGdyaWQsIHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSk7XG4gICAgICBWSVNJVEVEX05PREVTID0gdmlzaXRlZE5vZGVzSW5PcmRlcjtcbiAgICAgIGNvbnN0IG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlciA9IGdldE5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcihmaW5pc2hOb2RlKTtcbiAgICAgIFxuICAgICAgYm9hcmQuYW5pbWF0ZURpamtzdHJhKHZpc2l0ZWROb2Rlc0luT3JkZXIsIG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcik7XG4gICAgfSlcblxuXG5cbiAgfVxuXG4gIGFuaW1hdGVEaWprc3RyYSh2aXNpdGVkTm9kZXNJbk9yZGVyLCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpIHtcbiAgICBjb25zdCBib2FyZCA9IHRoaXM7XG4gICAgXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB2aXNpdGVkTm9kZXNJbk9yZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBcbiAgICAgIGlmIChpID09PSB2aXNpdGVkTm9kZXNJbk9yZGVyLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBzaG93QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb2x1dGlvblwiKTtcbiAgICAgICAgc2hvd0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGJvYXJkLmFuaW1hdGVTaG9ydGVzdFBhdGgobm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKTtcbiAgICAgICAgfSlcbiAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgXG4gICAgICAgIC8vICAgYm9hcmQuYW5pbWF0ZVNob3J0ZXN0UGF0aChub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpO1xuICAgICAgICAvLyB9LCAxMCAqIGkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHZpc2l0ZWROb2Rlc0luT3JkZXJbaV07XG4gICAgICAgIFxuICAgICAgICBjb25zdCBub2RlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke25vZGUucm93fS0ke25vZGUuY29sfWApXG4gICAgICAgIGlmIChub2RlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjbGlja2VkXCIpIHx8IG5vZGVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm5vZGUtc3RhcnRcIikgfHwgbm9kZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibm9kZS1maW5pc2hcIikpIHtcbiAgICAgICAgICBub2RlRWxlbWVudC5jbGFzc05hbWUgKz0nIG15LXBhdGgtbm9kZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbm9kZUVsZW1lbnQuY2xhc3NOYW1lICs9ICcgbm9kZS12aXNpdGVkJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gIHZpc2l0ZWROb2Rlc0luT3JkZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGJvYXJkLmRpc3BsYXlSZXN1bHRzKCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpO1xuICAgICAgICB9XG4gICAgICB9LCAxMCAqIGkpO1xuICAgICAgXG4gICAgfVxuICB9XG5cbiAgYW5pbWF0ZVNob3J0ZXN0UGF0aChub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpIHtcbiAgICBjb25zdCBib2FyZCA9IHRoaXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgIFxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXJbaV07XG4gICAgICAgIGNvbnN0IG5vZGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bm9kZS5yb3d9LSR7bm9kZS5jb2x9YCk7XG4gICAgICAgIFxuICAgICAgICBpZiAobm9kZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibXktcGF0aC1ub2RlXCIpKSB7XG4gICAgICAgICAgbm9kZUVsZW1lbnQuY2xhc3NOYW1lID0gJ25vZGUgY29ycmVjdC1ub2RlLXNob3J0ZXN0LXBhdGgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vZGVFbGVtZW50LmNsYXNzTmFtZSArPSAnIG5vZGUtc2hvcnRlc3QtcGF0aCc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgKGkgPT09ICBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIubGVuZ3RoIC0gMSkge1xuICAgICAgICAvLyAgIGJvYXJkLmRpc3BsYXlSZXN1bHRzKCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpO1xuICAgICAgICAvLyB9XG4gICAgICB9LCA1MCAqIGkpO1xuICAgICAgXG4gICAgfVxuICB9XG5cbiAgZGlzcGxheVJlc3VsdHMobm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKSB7XG4gICAgY29uc3QgcGVyY2VudGFnZSA9IHRoaXMuY2FsY3VsYXRlUG9pbnRzKHRoaXMubXlQYXRoLCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpXG4gICAgY29uc3QgaXNWaXNpYmxlID0gXCJpcy12aXNpYmxlXCI7XG4gICAgY29uc3QgcmVzdWx0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsM1wiKTtcbiAgICBjb25zdCBtb2RhbENvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXktcmVzdWx0c1wiKTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7TWF0aC5mbG9vcihwZXJjZW50YWdlKX0lIG91dCBvZiAxMDAlYCk7XG4gICAgY29uc3QgdHJ5QWdhaW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAvLyBjb25zdCB0ZXh0Tm9kZTIgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlBsZWFzZSBUcnkgQWdhaW4gOilcIik7XG4gICAgY29uc3QgdGV4dE5vZGUyID0gdGhpcy50ZXh0UmVzdWx0KHBlcmNlbnRhZ2UpO1xuXG4gICAgaWYgKG1vZGFsQ29udGVudC5jaGlsZHJlbi5sZW5ndGgpIG1vZGFsQ29udGVudC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICAgIHJlc3VsdC5hcHBlbmQodGV4dE5vZGUpO1xuICAgICAgdHJ5QWdhaW4uYXBwZW5kKHRleHROb2RlMik7XG4gICAgICBtb2RhbENvbnRlbnQuYXBwZW5kKHJlc3VsdCk7XG4gICAgICBtb2RhbENvbnRlbnQuYXBwZW5kKHRyeUFnYWluKTtcblxuICAgIHJlc3VsdE1vZGFsLmNsYXNzTGlzdC5hZGQoaXNWaXNpYmxlKTtcbiAgfVxuXG4gIGNhbGN1bGF0ZVBvaW50cyhteVBhdGhPcmRlciwgbm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKSB7XG4gICAgY29uc3Qgc2V0UG9pbnRzID0gbmV3IFNldCgpO1xuICAgIGNvbnN0IHNldDEgPSBuZXcgU2V0KG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcik7XG5cbiAgICBteVBhdGhPcmRlci5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgaWYgKHNldDEuaGFzKG5vZGUpKSBzZXRQb2ludHMuYWRkKG5vZGUpO1xuICAgIH0pXG4gICAgY29uc3QgcGVyY2VudGFnZSA9IChzZXRQb2ludHMuc2l6ZSAvIG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlci5sZW5ndGgpICogMTAwXG4gICAgcmV0dXJuIHBlcmNlbnRhZ2U7XG4gIH1cblxuICB0ZXh0UmVzdWx0KHNjb3JlKSB7XG4gICAgaWYgKHNjb3JlID09PSAxMDApIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkNPTkdSQVRVTEFUSU9OUyEgWW91IGtub3cgd2hhdCB5b3UncmUgZG9pbmdcIik7XG4gICAgfSBlbHNlIGlmIChzY29yZSA+IDkwKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJTTyBDTE9TRSEgS2VlcCB3b3JraW5nISBZb3UgZ290IHRoaXMhXCIpO1xuICAgIH0gZWxzZSBpZiAoc2NvcmUgPiA3MCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiTm90IGJhZCEga2VlcCBpdCB1cCBhbmQgeW91J2xsIGdldCBpdFwiKTtcbiAgICB9IGVsc2UgaWYgKHNjb3JlID4gNTApIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkVoaGhoaCwgeW91IGNvdWxkIGRvIGJldHRlclwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiU3R1ZHksIHN0dWR5LCBzdHVkeVwiKTtcbiAgICB9XG4gIH1cblxuICBnZXROb2RlKGlkKSB7XG4gICAgbGV0IGNvb3JkaW5hdGVzID0gaWQuc3BsaXQoXCItXCIpO1xuICAgIGxldCByb3cgPSBwYXJzZUludChjb29yZGluYXRlc1swXSk7XG4gICAgbGV0IGNvbCA9IHBhcnNlSW50KGNvb3JkaW5hdGVzWzFdKTtcbiAgICByZXR1cm4gdGhpcy5ncmlkW3Jvd11bY29sXTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQm9hcmQ7IiwiLy8gUGVyZm9ybXMgRGlqa3N0cmEncyBhbGdvcml0aG07IHJldHVybnMgKmFsbCogbm9kZXMgaW4gdGhlIG9yZGVyXG4vLyBpbiB3aGljaCB0aGV5IHdlcmUgdmlzaXRlZC4gQWxzbyBtYWtlcyBub2RlcyBwb2ludCBiYWNrIHRvIHRoZWlyXG4vLyBwcmV2aW91cyBub2RlLCBlZmZlY3RpdmVseSBhbGxvd2luZyB1cyB0byBjb21wdXRlIHRoZSBzaG9ydGVzdCBwYXRoXG4vLyBieSBiYWNrdHJhY2tpbmcgZnJvbSB0aGUgZmluaXNoIG5vZGUuXG5leHBvcnQgZnVuY3Rpb24gZGlqa3N0cmFBbGdvKGdyaWQsIHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSkge1xuXHRcbiAgY29uc3QgdmlzaXRlZE5vZGVzSW5PcmRlciA9IFtdO1xuICBzdGFydE5vZGUuZGlzdGFuY2UgPSAwO1xuXHRcbiAgY29uc3QgdW52aXNpdGVkTm9kZXMgPSBnZXRBbGxOb2RlcyhncmlkKTtcblx0XG4gIHdoaWxlICghIXVudmlzaXRlZE5vZGVzLmxlbmd0aCkge1xuXHRcdFxuICAgIHNvcnROb2Rlc0J5RGlzdGFuY2UodW52aXNpdGVkTm9kZXMpO1xuXHRcdFxuICAgIGNvbnN0IGNsb3Nlc3ROb2RlID0gdW52aXNpdGVkTm9kZXMuc2hpZnQoKTtcbiAgICBcbiAgICAvLyBJZiB3ZSBlbmNvdW50ZXIgYSB3YWxsLCB3ZSBza2lwIGl0LlxuICAgIGlmIChjbG9zZXN0Tm9kZS5pc1dhbGwpIGNvbnRpbnVlO1xuICAgIC8vIElmIHRoZSBjbG9zZXN0IG5vZGUgaXMgYXQgYSBkaXN0YW5jZSBvZiBpbmZpbml0eSxcbiAgICAvLyB3ZSBtdXN0IGJlIHRyYXBwZWQgYW5kIHNob3VsZCB0aGVyZWZvcmUgc3RvcC5cbiAgICBcbiAgICAvLyBpZiAoY2xvc2VzdE5vZGUuZGlzdGFuY2UgPT09IEluZmluaXR5KSByZXR1cm4gdmlzaXRlZE5vZGVzSW5PcmRlcjtcbiAgICBjbG9zZXN0Tm9kZS5pc1Zpc2l0ZWQgPSB0cnVlO1xuICAgIHZpc2l0ZWROb2Rlc0luT3JkZXIucHVzaChjbG9zZXN0Tm9kZSk7XG5cdFx0XG4gICAgaWYgKGNsb3Nlc3ROb2RlID09PSBmaW5pc2hOb2RlKSByZXR1cm4gdmlzaXRlZE5vZGVzSW5PcmRlcjtcblx0XHRcbiAgICB1cGRhdGVVbnZpc2l0ZWROZWlnaGJvcnMoY2xvc2VzdE5vZGUsIGdyaWQpO1xuXHRcdFxuICB9XG59XG5cbmZ1bmN0aW9uIHNvcnROb2Rlc0J5RGlzdGFuY2UodW52aXNpdGVkTm9kZXMpIHtcblx0XG4gIHVudmlzaXRlZE5vZGVzLnNvcnQoKG5vZGVBLCBub2RlQikgPT4gbm9kZUEuZGlzdGFuY2UgLSBub2RlQi5kaXN0YW5jZSk7XG5cdFxufVxuXG5mdW5jdGlvbiB1cGRhdGVVbnZpc2l0ZWROZWlnaGJvcnMobm9kZSwgZ3JpZCkge1xuXHRcbiAgY29uc3QgdW52aXNpdGVkTmVpZ2hib3JzID0gZ2V0VW52aXNpdGVkTmVpZ2hib3JzKG5vZGUsIGdyaWQpO1xuXHRcbiAgZm9yIChjb25zdCBuZWlnaGJvciBvZiB1bnZpc2l0ZWROZWlnaGJvcnMpIHtcbiAgICBcbiAgICBuZWlnaGJvci5kaXN0YW5jZSA9IG5vZGUuZGlzdGFuY2UgKyAxO1xuICAgIG5laWdoYm9yLnByZXZpb3VzTm9kZSA9IG5vZGU7XG4gICAgXG4gIH1cblx0XG59XG5cbmZ1bmN0aW9uIGdldFVudmlzaXRlZE5laWdoYm9ycyhub2RlLCBncmlkKSB7XG5cdFxuICBjb25zdCBuZWlnaGJvcnMgPSBbXTtcbiAgY29uc3Qge2NvbCwgcm93fSA9IG5vZGU7XG5cdFxuICBpZiAocm93ID4gMCkgbmVpZ2hib3JzLnB1c2goZ3JpZFtyb3cgLSAxXVtjb2xdKTtcbiAgXG4gIGlmIChyb3cgPCBncmlkLmxlbmd0aCAtIDEpIG5laWdoYm9ycy5wdXNoKGdyaWRbcm93ICsgMV1bY29sXSk7XG4gIFxuICBpZiAoY29sID4gMCkgbmVpZ2hib3JzLnB1c2goZ3JpZFtyb3ddW2NvbCAtIDFdKTtcbiAgXG4gIGlmIChjb2wgPCBncmlkWzBdLmxlbmd0aCAtIDEpIG5laWdoYm9ycy5wdXNoKGdyaWRbcm93XVtjb2wgKyAxXSk7XG5cdFxuICByZXR1cm4gbmVpZ2hib3JzLmZpbHRlcihuZWlnaGJvciA9PiAhbmVpZ2hib3IuaXNWaXNpdGVkKTtcbn1cblxuZnVuY3Rpb24gZ2V0QWxsTm9kZXMoZ3JpZCkge1xuXHRcbiAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgZm9yIChjb25zdCByb3cgb2YgZ3JpZCkge1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiByb3cpIHtcbiAgICAgIG5vZGVzLnB1c2gobm9kZSk7XG4gICAgfVxuICB9XG5cblx0XG4gIHJldHVybiBub2Rlcztcbn1cblxuLy8gQmFja3RyYWNrcyBmcm9tIHRoZSBmaW5pc2hOb2RlIHRvIGZpbmQgdGhlIHNob3J0ZXN0IHBhdGguXG4vLyBPbmx5IHdvcmtzIHdoZW4gY2FsbGVkICphZnRlciogdGhlIGRpamtzdHJhIG1ldGhvZCBhYm92ZS5cbmV4cG9ydCBmdW5jdGlvbiBnZXROb2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIoZmluaXNoTm9kZSkge1xuICBjb25zdCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIgPSBbXTtcbiAgbGV0IGN1cnJlbnROb2RlID0gZmluaXNoTm9kZTtcbiAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgbm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyLnVuc2hpZnQoY3VycmVudE5vZGUpO1xuICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucHJldmlvdXNOb2RlO1xuICB9XG4gIHJldHVybiBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXI7XG59IiwiZXhwb3J0IGNvbnN0IHRvZ2dsZU1vZGFsID0gKCkgPT4ge1xuICBjb25zdCBpc1Zpc2libGUgPSBcImlzLXZpc2libGVcIjtcbiAgY29uc3Qgb3BlbkVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1vcGVuXVwiKTtcbiAgY29uc3QgY2xvc2VFbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtY2xvc2VdXCIpO1xuXG4gIGZvciAoY29uc3QgZWwgb2Ygb3BlbkVscykge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBtb2RhbElkID0gdGhpcy5kYXRhc2V0Lm9wZW47XG4gICAgICBcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG1vZGFsSWQpLmNsYXNzTGlzdC5hZGQoaXNWaXNpYmxlKTtcbiAgICB9KTtcbiAgfVxuXG4gXG4gIGZvciAoY29uc3QgZWwgb2YgY2xvc2VFbHMpIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBcbiAgICAgIHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShpc1Zpc2libGUpO1xuICAgIH0pO1xuICB9XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGUgPT4ge1xuICAgIGlmIChlLmtleSA9PSBcIkVzY2FwZVwiICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwuaXMtdmlzaWJsZVwiKSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbC5pcy12aXNpYmxlXCIpLmNsYXNzTGlzdC5yZW1vdmUoaXNWaXNpYmxlKTtcbiAgICB9XG4gIH0pO1xufVxuXG4iLCJjb25zdCBTVEFSVF9OT0RFX1JPVyA9IDE4O1xuY29uc3QgU1RBUlRfTk9ERV9DT0wgPSAxO1xuY29uc3QgRklOSVNIX05PREVfUk9XID0gMTtcbmNvbnN0IEZJTklTSF9OT0RFX0NPTCA9IDQ4O1xuXG5jb25zdCBXQUxMX05PREVTID0gW1xuICBbMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMV0sXG4gIFsxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxXSxcbiAgWzEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDFdLFxuICBbMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMV0sXG4gIFsxLCAxLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxXSxcbiAgWzEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDFdLFxuICBbMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMSwgMSwgMCwgMCwgMV0sXG4gIFsxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAxLCAwLCAxLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAwLCAxLCAxLCAxLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxXSxcbiAgWzEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDFdLFxuICBbMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMV0sXG4gIFsxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAxXSxcbiAgWzEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDEsIDAsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDFdLFxuICBbMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMV0sXG4gIFsxLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAxLCAxLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAwLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxXSxcbiAgWzEsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICBbMSwgMCwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMSwgMCwgMSwgMCwgMCwgMSwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMV0sXG4gIFsxLCAwLCAwLCAxLCAwLCAwLCAxLCAxLCAxLCAwLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxXSxcbiAgWzEsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDFdLFxuICBbMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMV0sXG4gIFsxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxXSxcbl1cblxuY2xhc3MgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKHJvdywgY29sKSB7XG4gICAgdGhpcy5yb3cgPSByb3c7XG4gICAgdGhpcy5jb2wgPSBjb2w7XG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgICB0aGlzLmlzU3RhcnQgPSB0aGlzLmlzU3RhcnQoKTtcbiAgICB0aGlzLmlzRmluaXNoID0gdGhpcy5pc0ZpbmlzaCgpO1xuICAgIHRoaXMuaXNXYWxsID0gdGhpcy5pc1dhbGwoKTtcbiAgICB0aGlzLnByZXZpb3VzTm9kZSA9IG51bGw7XG4gICAgdGhpcy5kaXN0YW5jZSA9IEluZmluaXR5O1xuICB9XG5cbiAgaXNXYWxsKCkge1xuICAgIGNvbnN0IHIgPSB0aGlzLnJvdztcbiAgICBjb25zdCBjID0gdGhpcy5jb2w7XG4gICAgaWYgKFdBTExfTk9ERVNbcl1bY10pIHtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoXCJ3YWxsXCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc1N0YXJ0KCkge1xuICAgIGlmICh0aGlzLnJvdyA9PT0gU1RBUlRfTk9ERV9ST1cgJiYgdGhpcy5jb2wgPT09IFNUQVJUX05PREVfQ09MKSB7XG4gICAgICB0aGlzLmFkZENsYXNzKFwibm9kZS1zdGFydFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNGaW5pc2goKSB7XG4gICAgaWYgKHRoaXMucm93ID09PSBGSU5JU0hfTk9ERV9ST1cgJiYgdGhpcy5jb2wgPT09IEZJTklTSF9OT0RFX0NPTCkge1xuICAgICAgdGhpcy5hZGRDbGFzcyhcIm5vZGUtZmluaXNoXCIpO1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge1xuICAgIGxldCBub2RlRWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGhpcy5yb3d9LSR7dGhpcy5jb2x9YClcbiAgICBub2RlRWxlLmNsYXNzTmFtZSArPSBgICR7Y2xhc3NOYW1lfWA7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTm9kZTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5zY3NzXCI7XG5pbXBvcnQgQm9hcmQgZnJvbSBcIi4vc2NyaXB0cy9ib2FyZFwiO1xuaW1wb3J0IHt0b2dnbGVNb2RhbH0gZnJvbSBcIi4vc2NyaXB0cy9tb2RhbFwiO1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JpZFwiKTtcbiAgY29uc3QgYm9hcmQgPSBlbCA9PiBuZXcgQm9hcmQoZWwpO1xuICBib2FyZChlbCk7XG4gIHRvZ2dsZU1vZGFsKCk7XG59KTtcblxuXG4iXSwic291cmNlUm9vdCI6IiJ9