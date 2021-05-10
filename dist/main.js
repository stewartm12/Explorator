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
    this.nodeClicked = null;
    this.clearSolution = this.clearSolution.bind(this);
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
          });
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
      clear.addEventListener("click", this.clearSolution);
      var dijkstra = document.getElementById("display-button");
      dijkstra.addEventListener("click", function (e) {
        board.disableButton();
        this.setAttribute("disabled", "true");
        var grid = board.grid;
        var startNode = grid[START_NODE_ROW][START_NODE_COL];
        var finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        var visitedNodesInOrder = VISITED_NODES || (0,_dijkstra__WEBPACK_IMPORTED_MODULE_1__.dijkstraAlgo)(grid, startNode, finishNode);
        VISITED_NODES = visitedNodesInOrder;
        var nodesInShortestPathOrder = (0,_dijkstra__WEBPACK_IMPORTED_MODULE_1__.dijkstraShortestPath)(finishNode);
        board.displayDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
      });
    }
  }, {
    key: "clearSolution",
    value: function clearSolution() {
      this.myPath = [];
      this.buttonsOn = false;
      this.previous = null;
      this.finishedPath = false;
      this.nodeClicked = null;
      var dijkstraButton = document.getElementById("display-button");
      dijkstraButton.removeAttribute("disabled");
      var solutionButton = document.getElementById("solution");
      solutionButton.setAttribute("disabled", "true");
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
    }
  }, {
    key: "disableButton",
    value: function disableButton() {
      var clearButton = document.getElementById("clear-button");
      clearButton.setAttribute("disabled", "true");
      var solutionButton = document.getElementById("solution");
      solutionButton.setAttribute("disabled", "true");
    }
  }, {
    key: "enableButton",
    value: function enableButton() {
      var clearButton = document.getElementById("clear-button");
      clearButton.removeAttribute("disabled");
      var solutionButton = document.getElementById("solution");
      solutionButton.removeAttribute("disabled");
    }
  }, {
    key: "displayDijkstra",
    value: function displayDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
      var board = this;

      var _loop2 = function _loop2(i) {
        if (i === visitedNodesInOrder.length) {
          var showButton = document.getElementById("solution");
          showButton.addEventListener("click", function (e) {
            board.disableButton();
            board.displayShortestPath(nodesInShortestPathOrder);
          });
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
    key: "displayShortestPath",
    value: function displayShortestPath(nodesInShortestPathOrder) {
      var board = this;

      var _loop3 = function _loop3(i) {
        if (i === nodesInShortestPathOrder.length - 1) {
          setTimeout(board.enableButton, 40 * i);
        }

        setTimeout(function () {
          var node = nodesInShortestPathOrder[i];
          var nodeElement = document.getElementById("".concat(node.row, "-").concat(node.col));

          if (nodeElement.classList.contains("my-path-node")) {
            nodeElement.className = 'node correct-node-shortest-path';
          } else {
            nodeElement.className += ' node-shortest-path';
          }
        }, 40 * i);
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
      var tryAgain = document.createElement("p");
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
/* harmony export */   "dijkstraShortestPath": function() { return /* binding */ dijkstraShortestPath; }
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function dijkstraAlgo(grid, startNode, finishNode) {
  // sptSet (shortest path tree set)
  var sptSet = [];
  startNode.distance = 0;
  var unvisitedNodes = allSingleNodes(grid);

  while (unvisitedNodes.length) {
    // sortByDistance(unvisitedNodes);
    var unvisitedNodesSorted = unvisitedNodes.sort(function (nodeA, nodeB) {
      return nodeA.distance - nodeB.distance;
    });
    var closestNode = unvisitedNodesSorted.shift();
    if (closestNode.isWall) continue;
    closestNode.isVisited = true;
    sptSet.push(closestNode);
    if (closestNode === finishNode) return sptSet;
    updateUnvisitedNeighbors(closestNode, grid);
  }
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
  ;
  var neighbors = [];
  var col = node.col,
      row = node.row; // grab the top neighbor

  if (row > 0) neighbors.push(grid[row - 1][col]); // grab the bottom neighbor

  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // grab the left neighbor

  if (col > 0) neighbors.push(grid[row][col - 1]); // grab the right neighbor

  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(function (neighbor) {
    return !neighbor.isVisited;
  });
}

function allSingleNodes(grid) {
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
}

function dijkstraShortestPath(finishNode) {
  var shortestPath = [];
  var currentNode = finishNode;

  while (currentNode !== null) {
    shortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return shortestPath;
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
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/scripts/board.js");
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
        _board__WEBPACK_IMPORTED_MODULE_0__.default.prototype.enableButton();
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
      });
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  document.addEventListener("keyup", function (e) {
    _board__WEBPACK_IMPORTED_MODULE_0__.default.prototype.enableButton();

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
var WALL_NODES = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1], [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1], [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1], [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1], [1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

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
    this.isVisited = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2RpamtzdHJhLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9tb2RhbC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvbm9kZS5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIlNUQVJUX05PREVfUk9XIiwiU1RBUlRfTk9ERV9DT0wiLCJGSU5JU0hfTk9ERV9ST1ciLCJGSU5JU0hfTk9ERV9DT0wiLCJWSVNJVEVEX05PREVTIiwiQm9hcmQiLCJlbCIsIm1heFJvdyIsIm1heENvbCIsImdyaWQiLCJteVBhdGgiLCJib2FyZCIsImNyZWF0ZUJvYXJkIiwiYWRkRXZlbnRMaXN0ZW5lcnMiLCJidXR0b25zT24iLCJwcmV2aW91cyIsImZpbmlzaGVkUGF0aCIsIm5vZGVDbGlja2VkIiwiY2xlYXJTb2x1dGlvbiIsImJpbmQiLCJyb3ciLCJib2FyZFJvdyIsIm5ld0VsZVJvdyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImFwcGVuZENoaWxkIiwiY29sIiwibmV3RWxlTm9kZSIsInNldEF0dHJpYnV0ZSIsIm5vZGUiLCJOb2RlIiwicHVzaCIsImN1cnJlbnRJZCIsImN1cnJlbnROb2RlIiwiZ2V0Tm9kZSIsImN1cnJlbnRFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiaXNGaW5pc2giLCJpc1N0YXJ0IiwibW91c2VEb3duIiwiaW5jbHVkZXMiLCJpc1dhbGwiLCJjbGVhciIsImRpamtzdHJhIiwiZGlzYWJsZUJ1dHRvbiIsInN0YXJ0Tm9kZSIsImZpbmlzaE5vZGUiLCJ2aXNpdGVkTm9kZXNJbk9yZGVyIiwiZGlqa3N0cmFBbGdvIiwibm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyIiwiZGlqa3N0cmFTaG9ydGVzdFBhdGgiLCJkaXNwbGF5RGlqa3N0cmEiLCJkaWprc3RyYUJ1dHRvbiIsInJlbW92ZUF0dHJpYnV0ZSIsInNvbHV0aW9uQnV0dG9uIiwibm9kZUVsZSIsImNsZWFyQnV0dG9uIiwiaSIsImxlbmd0aCIsInNob3dCdXR0b24iLCJkaXNwbGF5U2hvcnRlc3RQYXRoIiwic2V0VGltZW91dCIsIm5vZGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJkaXNwbGF5UmVzdWx0cyIsImVuYWJsZUJ1dHRvbiIsInBlcmNlbnRhZ2UiLCJjYWxjdWxhdGVQb2ludHMiLCJpc1Zpc2libGUiLCJyZXN1bHRNb2RhbCIsIm1vZGFsQ29udGVudCIsInJlc3VsdCIsInRleHROb2RlIiwiY3JlYXRlVGV4dE5vZGUiLCJNYXRoIiwiZmxvb3IiLCJ0cnlBZ2FpbiIsInRleHROb2RlMiIsInRleHRSZXN1bHQiLCJjaGlsZHJlbiIsInRleHRDb250ZW50IiwiYXBwZW5kIiwiYWRkIiwibXlQYXRoT3JkZXIiLCJzZXRQb2ludHMiLCJTZXQiLCJzZXQxIiwiZm9yRWFjaCIsImhhcyIsInNpemUiLCJzY29yZSIsImlkIiwiY29vcmRpbmF0ZXMiLCJzcGxpdCIsInBhcnNlSW50Iiwic3B0U2V0IiwiZGlzdGFuY2UiLCJ1bnZpc2l0ZWROb2RlcyIsImFsbFNpbmdsZU5vZGVzIiwidW52aXNpdGVkTm9kZXNTb3J0ZWQiLCJzb3J0Iiwibm9kZUEiLCJub2RlQiIsImNsb3Nlc3ROb2RlIiwic2hpZnQiLCJpc1Zpc2l0ZWQiLCJ1cGRhdGVVbnZpc2l0ZWROZWlnaGJvcnMiLCJ1bnZpc2l0ZWROZWlnaGJvcnMiLCJnZXRVbnZpc2l0ZWROZWlnaGJvcnMiLCJuZWlnaGJvciIsInByZXZpb3VzTm9kZSIsIm5laWdoYm9ycyIsImZpbHRlciIsIm5vZGVzIiwic2hvcnRlc3RQYXRoIiwidW5zaGlmdCIsInRvZ2dsZU1vZGFsIiwib3BlbkVscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjbG9zZUVscyIsIm1vZGFsSWQiLCJkYXRhc2V0Iiwib3BlbiIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmUiLCJrZXkiLCJxdWVyeVNlbGVjdG9yIiwiV0FMTF9OT0RFUyIsIkluZmluaXR5IiwiciIsImMiLCJhZGRDbGFzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBLElBQU1BLGNBQWMsR0FBRyxFQUF2QjtBQUNBLElBQU1DLGNBQWMsR0FBRyxDQUF2QjtBQUNBLElBQU1DLGVBQWUsR0FBRyxDQUF4QjtBQUNBLElBQU1DLGVBQWUsR0FBRyxFQUF4QjtBQUNBLElBQUlDLGFBQWEsR0FBRyxJQUFwQjs7SUFHTUMsSztBQUNKLGlCQUFZQyxFQUFaLEVBQWdCO0FBQUE7O0FBQ2QsU0FBS0EsRUFBTCxHQUFVQSxFQUFWO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLFNBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLQyxLQUFMLEdBQWEsS0FBS0MsV0FBTCxFQUFi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QUUsR0FBR2lCLFFBQVEsQ0FBQ2MsY0FBVCxDQUF3QixNQUF4QixDQUFYOztBQUNBLE1BQU0xQixLQUFLLEdBQUcsU0FBUkEsS0FBUSxDQUFBTCxFQUFFO0FBQUEsV0FBSSxJQUFJRCxtREFBSixDQUFVQyxFQUFWLENBQUo7QUFBQSxHQUFoQjs7QUFDQUssT0FBSyxDQUFDTCxFQUFELENBQUw7QUFDQW1ILDZEQUFXO0FBQ1osQ0FMRCxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTm9kZSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtkaWprc3RyYUFsZ28sIGRpamtzdHJhU2hvcnRlc3RQYXRofSBmcm9tICcuL2RpamtzdHJhJztcblxuY29uc3QgU1RBUlRfTk9ERV9ST1cgPSAxODtcbmNvbnN0IFNUQVJUX05PREVfQ09MID0gMTtcbmNvbnN0IEZJTklTSF9OT0RFX1JPVyA9IDE7XG5jb25zdCBGSU5JU0hfTk9ERV9DT0wgPSA0ODtcbmxldCBWSVNJVEVEX05PREVTID0gbnVsbDtcblxuXG5jbGFzcyBCb2FyZCB7XG4gIGNvbnN0cnVjdG9yKGVsKSB7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMubWF4Um93ID0gMjA7XG4gICAgdGhpcy5tYXhDb2wgPSA1MDtcbiAgICB0aGlzLmdyaWQgPSBbXTtcbiAgICB0aGlzLm15UGF0aCA9IFtdO1xuICAgIHRoaXMuYm9hcmQgPSB0aGlzLmNyZWF0ZUJvYXJkKCk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuYnV0dG9uc09uID0gZmFsc2U7XG4gICAgdGhpcy5wcmV2aW91cyA9IG51bGw7XG4gICAgdGhpcy5maW5pc2hlZFBhdGggPSBmYWxzZTtcbiAgICB0aGlzLm5vZGVDbGlja2VkID0gbnVsbDtcbiAgICB0aGlzLmNsZWFyU29sdXRpb24gPSB0aGlzLmNsZWFyU29sdXRpb24uYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNyZWF0ZUJvYXJkKCkge1xuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5tYXhSb3c7IHJvdysrKSB7XG4gICAgICBsZXQgYm9hcmRSb3cgPSBbXTtcbiAgICAgIGxldCBuZXdFbGVSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbmV3RWxlUm93LmNsYXNzTmFtZSA9IFwibm9kZS1yb3dcIjtcbiAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQobmV3RWxlUm93KTtcblxuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgdGhpcy5tYXhDb2w7IGNvbCsrKSB7XG4gICAgICAgIGxldCBuZXdFbGVOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbmV3RWxlTm9kZS5jbGFzc05hbWUgPSBcIm5vZGVcIjtcbiAgICAgICAgbmV3RWxlTm9kZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtyb3d9LSR7Y29sfWApXG4gICAgICAgIG5ld0VsZVJvdy5hcHBlbmRDaGlsZChuZXdFbGVOb2RlKTtcbiAgICAgICAgbGV0IG5vZGUgPSBuZXcgTm9kZShyb3csIGNvbClcbiAgICAgICAgYm9hcmRSb3cucHVzaChub2RlKVxuICAgICAgfVxuXG4gICAgICB0aGlzLmdyaWQucHVzaChib2FyZFJvdylcbiAgICB9XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICBcbiAgICBsZXQgYm9hcmQgPSB0aGlzO1xuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IGJvYXJkLm1heFJvdzsgcm93KyspIHtcbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGJvYXJkLm1heENvbDsgY29sKyspIHtcbiAgICAgICAgbGV0IGN1cnJlbnRJZCA9IGAke3Jvd30tJHtjb2x9YDtcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlID0gYm9hcmQuZ2V0Tm9kZShjdXJyZW50SWQpO1xuICAgICAgICBsZXQgY3VycmVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50SWQpO1xuXG4gICAgICAgIGN1cnJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBpZiAoIWJvYXJkLmZpbmlzaGVkUGF0aCkge1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50Tm9kZS5pc0ZpbmlzaCkge1xuICAgICAgICAgICAgICBib2FyZC5ub2RlQ2xpY2tlZCA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICBpZiAoKGN1cnJlbnROb2RlLmlzU3RhcnQgJiYgYm9hcmQucHJldmlvdXMgPT09IG51bGwpIHx8IChib2FyZC5ub2RlQ2xpY2tlZCA9PT0gYm9hcmQucHJldmlvdXMpKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudE5vZGUubW91c2VEb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBib2FyZC5idXR0b25zT24gPSB0cnVlXG4gICAgICAgICAgICAgICAgaWYgKCFib2FyZC5teVBhdGguaW5jbHVkZXMoY3VycmVudE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICBib2FyZC5teVBhdGgucHVzaChjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICBjdXJyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKCFjdXJyZW50Tm9kZS5pc1dhbGwpIHtcbiAgICAgICAgICAgIGlmIChib2FyZC5idXR0b25zT24pIHtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIGN1cnJlbnROb2RlLm1vdXNlRG93biA9IHRydWU7XG4gIFxuICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuaXNGaW5pc2gpIHtcbiAgICAgICAgICAgICAgICBib2FyZC5idXR0b25zT24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBib2FyZC5teVBhdGgucHVzaChjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICAgICAgYm9hcmQuZmluaXNoZWRQYXRoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgaWYgKCFib2FyZC5teVBhdGguaW5jbHVkZXMoY3VycmVudE5vZGUpKSB7IFxuICAgICAgICAgICAgICAgIGJvYXJkLnByZXZpb3VzID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgIGJvYXJkLm15UGF0aC5wdXNoKGN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudC5jbGFzc05hbWUgKz0gXCIgY2xpY2tlZFwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvYXJkLmJ1dHRvbnNPbiA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY3VycmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChib2FyZC5idXR0b25zT24pIHtcbiAgICAgICAgICAgIGJvYXJkLmJ1dHRvbnNPbiA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgY2xlYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsZWFyLWJ1dHRvblwiKVxuICAgIFxuICAgIGNsZWFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsZWFyU29sdXRpb24pO1xuXG5cbiAgICBjb25zdCBkaWprc3RyYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheS1idXR0b25cIik7XG4gICAgXG4gICAgZGlqa3N0cmEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGJvYXJkLmRpc2FibGVCdXR0b24oKTtcbiAgICAgIFxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIilcbiAgICAgIGNvbnN0IGdyaWQgPSBib2FyZC5ncmlkO1xuICAgICAgY29uc3Qgc3RhcnROb2RlID0gZ3JpZFtTVEFSVF9OT0RFX1JPV11bU1RBUlRfTk9ERV9DT0xdO1xuICAgICAgY29uc3QgZmluaXNoTm9kZSA9IGdyaWRbRklOSVNIX05PREVfUk9XXVtGSU5JU0hfTk9ERV9DT0xdO1xuICAgICAgXG4gICAgICBjb25zdCB2aXNpdGVkTm9kZXNJbk9yZGVyID0gVklTSVRFRF9OT0RFUyB8fCBkaWprc3RyYUFsZ28oZ3JpZCwgc3RhcnROb2RlLCBmaW5pc2hOb2RlKTtcbiAgICAgIFZJU0lURURfTk9ERVMgPSB2aXNpdGVkTm9kZXNJbk9yZGVyO1xuICAgICAgY29uc3Qgbm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyID0gZGlqa3N0cmFTaG9ydGVzdFBhdGgoZmluaXNoTm9kZSk7XG4gICAgICBcbiAgICAgIGJvYXJkLmRpc3BsYXlEaWprc3RyYSh2aXNpdGVkTm9kZXNJbk9yZGVyLCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpO1xuICAgIH0pXG5cblxuXG4gIH1cblxuICBjbGVhclNvbHV0aW9uKCkge1xuICAgIHRoaXMubXlQYXRoID0gW107XG4gICAgdGhpcy5idXR0b25zT24gPSBmYWxzZTtcbiAgICB0aGlzLnByZXZpb3VzID0gbnVsbDtcbiAgICB0aGlzLmZpbmlzaGVkUGF0aCA9IGZhbHNlO1xuICAgIHRoaXMubm9kZUNsaWNrZWQgPSBudWxsO1xuXG4gICAgY29uc3QgZGlqa3N0cmFCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXktYnV0dG9uXCIpO1xuICAgIGRpamtzdHJhQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuXG4gICAgY29uc3Qgc29sdXRpb25CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNvbHV0aW9uXCIpO1xuICAgIHNvbHV0aW9uQnV0dG9uLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKVxuXG4gICAgY29uc3Qgc3RhcnROb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7U1RBUlRfTk9ERV9ST1d9LSR7U1RBUlRfTk9ERV9DT0x9YCk7XG4gICAgY29uc3QgZmluaXNoTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke0ZJTklTSF9OT0RFX1JPV30tJHtGSU5JU0hfTk9ERV9DT0x9YCk7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIFZJU0lURURfTk9ERVMpIHtcbiAgICAgIGNvbnN0IG5vZGVFbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtub2RlLnJvd30tJHtub2RlLmNvbH1gKTtcbiAgICAgIGlmIChub2RlRWxlID09PSBzdGFydE5vZGUpIHtcbiAgICAgICAgXG4gICAgICAgIG5vZGVFbGUuY2xhc3NOYW1lID0gXCJub2RlIG5vZGUtc3RhcnRcIjtcbiAgICAgIH0gZWxzZSBpZiAobm9kZUVsZSA9PT0gZmluaXNoTm9kZSkge1xuICAgICAgICBub2RlRWxlLmNsYXNzTmFtZSA9IFwibm9kZSBub2RlLWZpbmlzaFwiO1xuICAgICAgICBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVFbGUuY2xhc3NOYW1lID0gXCJub2RlXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZUJ1dHRvbigpIHtcbiAgICBjb25zdCBjbGVhckJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xlYXItYnV0dG9uXCIpO1xuICAgIGNsZWFyQnV0dG9uLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcblxuICAgIGNvbnN0IHNvbHV0aW9uQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb2x1dGlvblwiKTtcbiAgICBzb2x1dGlvbkJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIilcbiAgICBcbiAgfVxuXG4gIGVuYWJsZUJ1dHRvbigpIHtcbiAgICBcbiAgICBjb25zdCBjbGVhckJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xlYXItYnV0dG9uXCIpO1xuICAgIGNsZWFyQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuXG4gICAgY29uc3Qgc29sdXRpb25CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNvbHV0aW9uXCIpO1xuICAgIHNvbHV0aW9uQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICB9XG5cbiAgZGlzcGxheURpamtzdHJhKHZpc2l0ZWROb2Rlc0luT3JkZXIsIG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcikge1xuICAgIGNvbnN0IGJvYXJkID0gdGhpcztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHZpc2l0ZWROb2Rlc0luT3JkZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgIFxuICAgICAgaWYgKGkgPT09IHZpc2l0ZWROb2Rlc0luT3JkZXIubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHNob3dCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNvbHV0aW9uXCIpO1xuICAgICAgICBzaG93QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgYm9hcmQuZGlzYWJsZUJ1dHRvbigpO1xuICAgICAgICAgIFxuICAgICAgICAgIGJvYXJkLmRpc3BsYXlTaG9ydGVzdFBhdGgobm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKTtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB2aXNpdGVkTm9kZXNJbk9yZGVyW2ldO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgbm9kZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtub2RlLnJvd30tJHtub2RlLmNvbH1gKVxuICAgICAgICBpZiAobm9kZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2xpY2tlZFwiKSB8fCBub2RlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJub2RlLXN0YXJ0XCIpIHx8IG5vZGVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm5vZGUtZmluaXNoXCIpKSB7XG4gICAgICAgICAgbm9kZUVsZW1lbnQuY2xhc3NOYW1lICs9JyBteS1wYXRoLW5vZGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vZGVFbGVtZW50LmNsYXNzTmFtZSArPSAnIG5vZGUtdmlzaXRlZCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09ICB2aXNpdGVkTm9kZXNJbk9yZGVyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBib2FyZC5kaXNwbGF5UmVzdWx0cyggbm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTAgKiBpKTtcbiAgICAgIFxuICAgIH1cbiAgfVxuXG4gIGRpc3BsYXlTaG9ydGVzdFBhdGgobm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKSB7XG4gICAgbGV0IGJvYXJkID0gdGhpcztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlci5sZW5ndGg7IGkrKykge1xuXG4gICAgICBpZiAoaSA9PT0gbm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGJvYXJkLmVuYWJsZUJ1dHRvbiwgNDAgKiBpKTtcbiAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcltpXTtcbiAgICAgICAgY29uc3Qgbm9kZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtub2RlLnJvd30tJHtub2RlLmNvbH1gKTtcblxuICAgICAgICBpZiAobm9kZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibXktcGF0aC1ub2RlXCIpKSB7XG4gICAgICAgICAgbm9kZUVsZW1lbnQuY2xhc3NOYW1lID0gJ25vZGUgY29ycmVjdC1ub2RlLXNob3J0ZXN0LXBhdGgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vZGVFbGVtZW50LmNsYXNzTmFtZSArPSAnIG5vZGUtc2hvcnRlc3QtcGF0aCc7XG4gICAgICAgIH1cbiAgICAgIH0sIDQwICogaSk7XG4gICAgICBcbiAgICB9XG4gIH1cblxuICBkaXNwbGF5UmVzdWx0cyhub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpIHtcbiAgICBjb25zdCBwZXJjZW50YWdlID0gdGhpcy5jYWxjdWxhdGVQb2ludHModGhpcy5teVBhdGgsIG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcilcbiAgICBjb25zdCBpc1Zpc2libGUgPSBcImlzLXZpc2libGVcIjtcbiAgICBjb25zdCByZXN1bHRNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwzXCIpO1xuICAgIGNvbnN0IG1vZGFsQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheS1yZXN1bHRzXCIpO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgJHtNYXRoLmZsb29yKHBlcmNlbnRhZ2UpfSUgb3V0IG9mIDEwMCVgKTtcbiAgICBjb25zdCB0cnlBZ2FpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGNvbnN0IHRleHROb2RlMiA9IHRoaXMudGV4dFJlc3VsdChwZXJjZW50YWdlKTtcblxuICAgIGlmIChtb2RhbENvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoKSBtb2RhbENvbnRlbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICByZXN1bHQuYXBwZW5kKHRleHROb2RlKTtcbiAgICAgIHRyeUFnYWluLmFwcGVuZCh0ZXh0Tm9kZTIpO1xuICAgICAgbW9kYWxDb250ZW50LmFwcGVuZChyZXN1bHQpO1xuICAgICAgbW9kYWxDb250ZW50LmFwcGVuZCh0cnlBZ2Fpbik7XG5cbiAgICByZXN1bHRNb2RhbC5jbGFzc0xpc3QuYWRkKGlzVmlzaWJsZSk7XG4gIH1cblxuICBjYWxjdWxhdGVQb2ludHMobXlQYXRoT3JkZXIsIG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcikge1xuICAgIGNvbnN0IHNldFBvaW50cyA9IG5ldyBTZXQoKTtcbiAgICBjb25zdCBzZXQxID0gbmV3IFNldChub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpO1xuXG4gICAgbXlQYXRoT3JkZXIuZm9yRWFjaChub2RlID0+IHtcbiAgICAgIGlmIChzZXQxLmhhcyhub2RlKSkgc2V0UG9pbnRzLmFkZChub2RlKTtcbiAgICB9KVxuICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSAoc2V0UG9pbnRzLnNpemUgLyBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIubGVuZ3RoKSAqIDEwMFxuICAgIHJldHVybiBwZXJjZW50YWdlO1xuICB9XG5cbiAgdGV4dFJlc3VsdChzY29yZSkge1xuICAgIGlmIChzY29yZSA9PT0gMTAwKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJDT05HUkFUVUxBVElPTlMhIFlvdSBrbm93IHdoYXQgeW91J3JlIGRvaW5nXCIpO1xuICAgIH0gZWxzZSBpZiAoc2NvcmUgPiA5MCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiU08gQ0xPU0UhIEtlZXAgd29ya2luZyEgWW91IGdvdCB0aGlzIVwiKTtcbiAgICB9IGVsc2UgaWYgKHNjb3JlID4gNzApIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIk5vdCBiYWQhIGtlZXAgaXQgdXAgYW5kIHlvdSdsbCBnZXQgaXRcIik7XG4gICAgfSBlbHNlIGlmIChzY29yZSA+IDUwKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJFaGhoaGgsIHlvdSBjb3VsZCBkbyBiZXR0ZXJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlN0dWR5LCBzdHVkeSwgc3R1ZHlcIik7XG4gICAgfVxuICB9XG5cbiAgZ2V0Tm9kZShpZCkge1xuICAgIGxldCBjb29yZGluYXRlcyA9IGlkLnNwbGl0KFwiLVwiKTtcbiAgICBsZXQgcm93ID0gcGFyc2VJbnQoY29vcmRpbmF0ZXNbMF0pO1xuICAgIGxldCBjb2wgPSBwYXJzZUludChjb29yZGluYXRlc1sxXSk7XG4gICAgcmV0dXJuIHRoaXMuZ3JpZFtyb3ddW2NvbF07XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJvYXJkOyIsImV4cG9ydCBmdW5jdGlvbiBkaWprc3RyYUFsZ28oZ3JpZCwgc3RhcnROb2RlLCBmaW5pc2hOb2RlKSB7XG5cdC8vIHNwdFNldCAoc2hvcnRlc3QgcGF0aCB0cmVlIHNldClcbiAgY29uc3Qgc3B0U2V0ID0gW107XG4gIHN0YXJ0Tm9kZS5kaXN0YW5jZSA9IDA7XG5cdFxuICBjb25zdCB1bnZpc2l0ZWROb2RlcyA9IGFsbFNpbmdsZU5vZGVzKGdyaWQpO1xuXHRcbiAgd2hpbGUgKHVudmlzaXRlZE5vZGVzLmxlbmd0aCkge1xuXG4gICAgLy8gc29ydEJ5RGlzdGFuY2UodW52aXNpdGVkTm9kZXMpO1xuICAgIGxldCB1bnZpc2l0ZWROb2Rlc1NvcnRlZCA9IHVudmlzaXRlZE5vZGVzLnNvcnQoKG5vZGVBLCBub2RlQikgPT4gbm9kZUEuZGlzdGFuY2UgLSBub2RlQi5kaXN0YW5jZSk7XG4gICAgXG4gICAgY29uc3QgY2xvc2VzdE5vZGUgPSB1bnZpc2l0ZWROb2Rlc1NvcnRlZC5zaGlmdCgpO1xuICAgIFxuICAgIGlmIChjbG9zZXN0Tm9kZS5pc1dhbGwpIGNvbnRpbnVlO1xuXG4gICAgY2xvc2VzdE5vZGUuaXNWaXNpdGVkID0gdHJ1ZTtcbiAgICBzcHRTZXQucHVzaChjbG9zZXN0Tm9kZSk7XG5cdFx0XG4gICAgaWYgKGNsb3Nlc3ROb2RlID09PSBmaW5pc2hOb2RlKSByZXR1cm4gc3B0U2V0O1xuXHRcdFxuICAgIHVwZGF0ZVVudmlzaXRlZE5laWdoYm9ycyhjbG9zZXN0Tm9kZSwgZ3JpZCk7XG5cdFx0XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlVW52aXNpdGVkTmVpZ2hib3JzKG5vZGUsIGdyaWQpIHtcblx0XG4gIGNvbnN0IHVudmlzaXRlZE5laWdoYm9ycyA9IGdldFVudmlzaXRlZE5laWdoYm9ycyhub2RlLCBncmlkKTtcbiAgZm9yIChjb25zdCBuZWlnaGJvciBvZiB1bnZpc2l0ZWROZWlnaGJvcnMpIHtcbiAgICBuZWlnaGJvci5kaXN0YW5jZSA9IG5vZGUuZGlzdGFuY2UgKyAxO1xuICAgIG5laWdoYm9yLnByZXZpb3VzTm9kZSA9IG5vZGU7XG4gICAgXG4gIH1cblx0XG59XG5cbmZ1bmN0aW9uIGdldFVudmlzaXRlZE5laWdoYm9ycyhub2RlLCBncmlkKSB7XG5cdGRlYnVnZ2VyXG4gIGNvbnN0IG5laWdoYm9ycyA9IFtdO1xuICBjb25zdCB7Y29sLCByb3d9ID0gbm9kZTtcbi8vIGdyYWIgdGhlIHRvcCBuZWlnaGJvclxuICBpZiAocm93ID4gMCkgbmVpZ2hib3JzLnB1c2goZ3JpZFtyb3cgLSAxXVtjb2xdKTtcbiAgLy8gZ3JhYiB0aGUgYm90dG9tIG5laWdoYm9yXG4gIGlmIChyb3cgPCBncmlkLmxlbmd0aCAtIDEpIG5laWdoYm9ycy5wdXNoKGdyaWRbcm93ICsgMV1bY29sXSk7XG4gIC8vIGdyYWIgdGhlIGxlZnQgbmVpZ2hib3JcbiAgaWYgKGNvbCA+IDApIG5laWdoYm9ycy5wdXNoKGdyaWRbcm93XVtjb2wgLSAxXSk7XG4gIC8vIGdyYWIgdGhlIHJpZ2h0IG5laWdoYm9yXG4gIGlmIChjb2wgPCBncmlkWzBdLmxlbmd0aCAtIDEpIG5laWdoYm9ycy5wdXNoKGdyaWRbcm93XVtjb2wgKyAxXSk7XG5cdFxuICByZXR1cm4gbmVpZ2hib3JzLmZpbHRlcihuZWlnaGJvciA9PiAhbmVpZ2hib3IuaXNWaXNpdGVkKTtcbn1cblxuZnVuY3Rpb24gYWxsU2luZ2xlTm9kZXMoZ3JpZCkge1xuXHRcbiAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgZm9yIChjb25zdCByb3cgb2YgZ3JpZCkge1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiByb3cpIHtcbiAgICAgIG5vZGVzLnB1c2gobm9kZSk7XG4gICAgfVxuICB9XG5cblx0XG4gIHJldHVybiBub2Rlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpamtzdHJhU2hvcnRlc3RQYXRoKGZpbmlzaE5vZGUpIHtcbiAgY29uc3Qgc2hvcnRlc3RQYXRoID0gW107XG4gIGxldCBjdXJyZW50Tm9kZSA9IGZpbmlzaE5vZGU7XG4gIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgIHNob3J0ZXN0UGF0aC51bnNoaWZ0KGN1cnJlbnROb2RlKTtcbiAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLnByZXZpb3VzTm9kZTtcbiAgfVxuICByZXR1cm4gc2hvcnRlc3RQYXRoO1xufSIsImltcG9ydCBCb2FyZCBmcm9tIFwiLi9ib2FyZFwiXG5cbmV4cG9ydCBjb25zdCB0b2dnbGVNb2RhbCA9ICgpID0+IHtcbiAgY29uc3QgaXNWaXNpYmxlID0gXCJpcy12aXNpYmxlXCI7XG4gIGNvbnN0IG9wZW5FbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtb3Blbl1cIik7XG4gIGNvbnN0IGNsb3NlRWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWNsb3NlXVwiKTtcblxuICBmb3IgKGNvbnN0IGVsIG9mIG9wZW5FbHMpIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgbW9kYWxJZCA9IHRoaXMuZGF0YXNldC5vcGVuO1xuICAgICAgXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RhbElkKS5jbGFzc0xpc3QuYWRkKGlzVmlzaWJsZSk7XG4gICAgfSk7XG4gIH1cblxuIFxuICBmb3IgKGNvbnN0IGVsIG9mIGNsb3NlRWxzKSB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgQm9hcmQucHJvdG90eXBlLmVuYWJsZUJ1dHRvbigpO1xuICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGlzVmlzaWJsZSk7XG4gICAgfSk7XG4gIH1cblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZSA9PiB7XG4gICAgQm9hcmQucHJvdG90eXBlLmVuYWJsZUJ1dHRvbigpO1xuICAgIGlmIChlLmtleSA9PSBcIkVzY2FwZVwiICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwuaXMtdmlzaWJsZVwiKSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbC5pcy12aXNpYmxlXCIpLmNsYXNzTGlzdC5yZW1vdmUoaXNWaXNpYmxlKTtcbiAgICB9XG4gIH0pO1xufVxuXG4iLCJjb25zdCBTVEFSVF9OT0RFX1JPVyA9IDE4O1xuY29uc3QgU1RBUlRfTk9ERV9DT0wgPSAxO1xuY29uc3QgRklOSVNIX05PREVfUk9XID0gMTtcbmNvbnN0IEZJTklTSF9OT0RFX0NPTCA9IDQ4O1xuXG5jb25zdCBXQUxMX05PREVTID0gW1xuICBbMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMV0sXG4gIFsxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxXSxcbiAgWzEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDFdLFxuICBbMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMV0sXG4gIFsxLCAxLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxXSxcbiAgWzEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDFdLFxuICBbMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMSwgMSwgMCwgMCwgMV0sXG4gIFsxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAxLCAwLCAxLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAwLCAxLCAxLCAxLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxXSxcbiAgWzEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDFdLFxuICBbMSwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMV0sXG4gIFsxLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAxXSxcbiAgWzEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDEsIDAsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDFdLFxuICBbMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMV0sXG4gIFsxLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAxLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAwLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxXSxcbiAgWzEsIDAsIDAsIDEsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICBbMSwgMCwgMSwgMSwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMSwgMCwgMSwgMCwgMCwgMSwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMV0sXG4gIFsxLCAwLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAwLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxXSxcbiAgWzEsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDFdLFxuICBbMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMV0sXG4gIFsxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxXSxcbl1cblxuY2xhc3MgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKHJvdywgY29sKSB7XG4gICAgdGhpcy5yb3cgPSByb3c7XG4gICAgdGhpcy5jb2wgPSBjb2w7XG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgICB0aGlzLmlzU3RhcnQgPSB0aGlzLmlzU3RhcnQoKTtcbiAgICB0aGlzLmlzRmluaXNoID0gdGhpcy5pc0ZpbmlzaCgpO1xuICAgIHRoaXMuaXNXYWxsID0gdGhpcy5pc1dhbGwoKTtcbiAgICB0aGlzLnByZXZpb3VzTm9kZSA9IG51bGw7XG4gICAgdGhpcy5kaXN0YW5jZSA9IEluZmluaXR5O1xuICAgIHRoaXMuaXNWaXNpdGVkID0gZmFsc2U7XG4gIH1cblxuICBpc1dhbGwoKSB7XG4gICAgY29uc3QgciA9IHRoaXMucm93O1xuICAgIGNvbnN0IGMgPSB0aGlzLmNvbDtcbiAgICBpZiAoV0FMTF9OT0RFU1tyXVtjXSkge1xuICAgICAgdGhpcy5hZGRDbGFzcyhcIndhbGxcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzU3RhcnQoKSB7XG4gICAgaWYgKHRoaXMucm93ID09PSBTVEFSVF9OT0RFX1JPVyAmJiB0aGlzLmNvbCA9PT0gU1RBUlRfTk9ERV9DT0wpIHtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoXCJub2RlLXN0YXJ0XCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0ZpbmlzaCgpIHtcbiAgICBpZiAodGhpcy5yb3cgPT09IEZJTklTSF9OT0RFX1JPVyAmJiB0aGlzLmNvbCA9PT0gRklOSVNIX05PREVfQ09MKSB7XG4gICAgICB0aGlzLmFkZENsYXNzKFwibm9kZS1maW5pc2hcIik7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH07XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgbGV0IG5vZGVFbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0aGlzLnJvd30tJHt0aGlzLmNvbH1gKVxuICAgIG5vZGVFbGUuY2xhc3NOYW1lICs9IGAgJHtjbGFzc05hbWV9YDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE5vZGU7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IEJvYXJkIGZyb20gXCIuL3NjcmlwdHMvYm9hcmRcIjtcbmltcG9ydCB7dG9nZ2xlTW9kYWx9IGZyb20gXCIuL3NjcmlwdHMvbW9kYWxcIjtcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdyaWRcIik7XG4gIGNvbnN0IGJvYXJkID0gZWwgPT4gbmV3IEJvYXJkKGVsKTtcbiAgYm9hcmQoZWwpO1xuICB0b2dnbGVNb2RhbCgpO1xufSk7XG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==