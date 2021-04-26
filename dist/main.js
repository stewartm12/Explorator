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
  var visitedNodes = [];
  startNode.distance = 0;
  var unvisitedNodes = allSingleNodes(grid);

  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    var closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    closestNode.isVisited = true;
    visitedNodes.push(closestNode);
    if (closestNode === finishNode) return visitedNodes;
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
var WALL_NODES = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1], [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1], [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1], [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2RpamtzdHJhLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9tb2RhbC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvbm9kZS5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIlNUQVJUX05PREVfUk9XIiwiU1RBUlRfTk9ERV9DT0wiLCJGSU5JU0hfTk9ERV9ST1ciLCJGSU5JU0hfTk9ERV9DT0wiLCJWSVNJVEVEX05PREVTIiwiQm9hcmQiLCJlbCIsIm1heFJvdyIsIm1heENvbCIsImdyaWQiLCJteVBhdGgiLCJib2FyZCIsImNyZWF0ZUJvYXJkIiwiYWRkRXZlbnRMaXN0ZW5lcnMiLCJidXR0b25zT24iLCJwcmV2aW91cyIsImZpbmlzaGVkUGF0aCIsIm5vZGVDbGlja2VkIiwiY2xlYXJTb2x1dGlvbiIsImJpbmQiLCJyb3ciLCJib2FyZFJvdyIsIm5ld0VsZVJvdyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImFwcGVuZENoaWxkIiwiY29sIiwibmV3RWxlTm9kZSIsInNldEF0dHJpYnV0ZSIsIm5vZGUiLCJOb2RlIiwicHVzaCIsImN1cnJlbnRJZCIsImN1cnJlbnROb2RlIiwiZ2V0Tm9kZSIsImN1cnJlbnRFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiaXNGaW5pc2giLCJpc1N0YXJ0IiwibW91c2VEb3duIiwiaW5jbHVkZXMiLCJpc1dhbGwiLCJjbGVhciIsImRpamtzdHJhIiwiZGlzYWJsZUJ1dHRvbiIsInN0YXJ0Tm9kZSIsImZpbmlzaE5vZGUiLCJ2aXNpdGVkTm9kZXNJbk9yZGVyIiwiZGlqa3N0cmFBbGdvIiwibm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyIiwiZGlqa3N0cmFTaG9ydGVzdFBhdGgiLCJkaXNwbGF5RGlqa3N0cmEiLCJkaWprc3RyYUJ1dHRvbiIsInJlbW92ZUF0dHJpYnV0ZSIsInNvbHV0aW9uQnV0dG9uIiwibm9kZUVsZSIsImNsZWFyQnV0dG9uIiwiaSIsImxlbmd0aCIsInNob3dCdXR0b24iLCJkaXNwbGF5U2hvcnRlc3RQYXRoIiwic2V0VGltZW91dCIsIm5vZGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJkaXNwbGF5UmVzdWx0cyIsImVuYWJsZUJ1dHRvbiIsInBlcmNlbnRhZ2UiLCJjYWxjdWxhdGVQb2ludHMiLCJpc1Zpc2libGUiLCJyZXN1bHRNb2RhbCIsIm1vZGFsQ29udGVudCIsInJlc3VsdCIsInRleHROb2RlIiwiY3JlYXRlVGV4dE5vZGUiLCJNYXRoIiwiZmxvb3IiLCJ0cnlBZ2FpbiIsInRleHROb2RlMiIsInRleHRSZXN1bHQiLCJjaGlsZHJlbiIsInRleHRDb250ZW50IiwiYXBwZW5kIiwiYWRkIiwibXlQYXRoT3JkZXIiLCJzZXRQb2ludHMiLCJTZXQiLCJzZXQxIiwiZm9yRWFjaCIsImhhcyIsInNpemUiLCJzY29yZSIsImlkIiwiY29vcmRpbmF0ZXMiLCJzcGxpdCIsInBhcnNlSW50IiwidmlzaXRlZE5vZGVzIiwiZGlzdGFuY2UiLCJ1bnZpc2l0ZWROb2RlcyIsImFsbFNpbmdsZU5vZGVzIiwic29ydE5vZGVzQnlEaXN0YW5jZSIsImNsb3Nlc3ROb2RlIiwic2hpZnQiLCJpc1Zpc2l0ZWQiLCJ1cGRhdGVVbnZpc2l0ZWROZWlnaGJvcnMiLCJzb3J0Iiwibm9kZUEiLCJub2RlQiIsInVudmlzaXRlZE5laWdoYm9ycyIsImdldFVudmlzaXRlZE5laWdoYm9ycyIsIm5laWdoYm9yIiwicHJldmlvdXNOb2RlIiwibmVpZ2hib3JzIiwiZmlsdGVyIiwibm9kZXMiLCJzaG9ydGVzdFBhdGgiLCJ1bnNoaWZ0IiwidG9nZ2xlTW9kYWwiLCJvcGVuRWxzIiwicXVlcnlTZWxlY3RvckFsbCIsImNsb3NlRWxzIiwibW9kYWxJZCIsImRhdGFzZXQiLCJvcGVuIiwicGFyZW50RWxlbWVudCIsInJlbW92ZSIsImtleSIsInF1ZXJ5U2VsZWN0b3IiLCJXQUxMX05PREVTIiwiSW5maW5pdHkiLCJyIiwiYyIsImFkZENsYXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUEsSUFBTUEsY0FBYyxHQUFHLEVBQXZCO0FBQ0EsSUFBTUMsY0FBYyxHQUFHLENBQXZCO0FBQ0EsSUFBTUMsZUFBZSxHQUFHLENBQXhCO0FBQ0EsSUFBTUMsZUFBZSxHQUFHLEVBQXhCO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLElBQXBCOztJQUdNQyxLO0FBQ0osaUJBQVlDLEVBQVosRUFBZ0I7QUFBQTs7QUFDZCxTQUFLQSxFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxTQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLFNBQUtDLEtBQUwsR0FBYSxLQUFLQyxXQUFM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LEdBQUdpQixRQUFRLENBQUNjLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBWDs7QUFDQSxNQUFNMUIsS0FBSyxHQUFHLFNBQVJBLEtBQVEsQ0FBQUwsRUFBRTtBQUFBLFdBQUksSUFBSUQsbURBQUosQ0FBVUMsRUFBVixDQUFKO0FBQUEsR0FBaEI7O0FBQ0FLLE9BQUssQ0FBQ0wsRUFBRCxDQUFMO0FBQ0FtSCw2REFBVztBQUNaLENBTEQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5vZGUgZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7ZGlqa3N0cmFBbGdvLCBkaWprc3RyYVNob3J0ZXN0UGF0aH0gZnJvbSAnLi9kaWprc3RyYSc7XG5cbmNvbnN0IFNUQVJUX05PREVfUk9XID0gMTg7XG5jb25zdCBTVEFSVF9OT0RFX0NPTCA9IDE7XG5jb25zdCBGSU5JU0hfTk9ERV9ST1cgPSAxO1xuY29uc3QgRklOSVNIX05PREVfQ09MID0gNDg7XG5sZXQgVklTSVRFRF9OT0RFUyA9IG51bGw7XG5cblxuY2xhc3MgQm9hcmQge1xuICBjb25zdHJ1Y3RvcihlbCkge1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLm1heFJvdyA9IDIwO1xuICAgIHRoaXMubWF4Q29sID0gNTA7XG4gICAgdGhpcy5ncmlkID0gW107XG4gICAgdGhpcy5teVBhdGggPSBbXTtcbiAgICB0aGlzLmJvYXJkID0gdGhpcy5jcmVhdGVCb2FyZCgpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLmJ1dHRvbnNPbiA9IGZhbHNlO1xuICAgIHRoaXMucHJldmlvdXMgPSBudWxsO1xuICAgIHRoaXMuZmluaXNoZWRQYXRoID0gZmFsc2U7XG4gICAgdGhpcy5ub2RlQ2xpY2tlZCA9IG51bGw7XG4gICAgdGhpcy5jbGVhclNvbHV0aW9uID0gdGhpcy5jbGVhclNvbHV0aW9uLmJpbmQodGhpcyk7XG4gIH1cblxuICBjcmVhdGVCb2FyZCgpIHtcblxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMubWF4Um93OyByb3crKykge1xuICAgICAgbGV0IGJvYXJkUm93ID0gW107XG4gICAgICBsZXQgbmV3RWxlUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG5ld0VsZVJvdy5jbGFzc05hbWUgPSBcIm5vZGUtcm93XCI7XG4gICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKG5ld0VsZVJvdyk7XG5cbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHRoaXMubWF4Q29sOyBjb2wrKykge1xuICAgICAgICBsZXQgbmV3RWxlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG5ld0VsZU5vZGUuY2xhc3NOYW1lID0gXCJub2RlXCI7XG4gICAgICAgIG5ld0VsZU5vZGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7cm93fS0ke2NvbH1gKVxuICAgICAgICBuZXdFbGVSb3cuYXBwZW5kQ2hpbGQobmV3RWxlTm9kZSk7XG4gICAgICAgIGxldCBub2RlID0gbmV3IE5vZGUocm93LCBjb2wpXG4gICAgICAgIGJvYXJkUm93LnB1c2gobm9kZSlcbiAgICAgIH1cblxuICAgICAgdGhpcy5ncmlkLnB1c2goYm9hcmRSb3cpXG4gICAgfVxuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgXG4gICAgbGV0IGJvYXJkID0gdGhpcztcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBib2FyZC5tYXhSb3c7IHJvdysrKSB7XG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBib2FyZC5tYXhDb2w7IGNvbCsrKSB7XG4gICAgICAgIGxldCBjdXJyZW50SWQgPSBgJHtyb3d9LSR7Y29sfWA7XG4gICAgICAgIGxldCBjdXJyZW50Tm9kZSA9IGJvYXJkLmdldE5vZGUoY3VycmVudElkKTtcbiAgICAgICAgbGV0IGN1cnJlbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3VycmVudElkKTtcblxuICAgICAgICBjdXJyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgaWYgKCFib2FyZC5maW5pc2hlZFBhdGgpIHtcbiAgICAgICAgICAgIGlmICghY3VycmVudE5vZGUuaXNGaW5pc2gpIHtcbiAgICAgICAgICAgICAgYm9hcmQubm9kZUNsaWNrZWQgPSBjdXJyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgaWYgKChjdXJyZW50Tm9kZS5pc1N0YXJ0ICYmIGJvYXJkLnByZXZpb3VzID09PSBudWxsKSB8fCAoYm9hcmQubm9kZUNsaWNrZWQgPT09IGJvYXJkLnByZXZpb3VzKSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm1vdXNlRG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgYm9hcmQuYnV0dG9uc09uID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGlmICghYm9hcmQubXlQYXRoLmluY2x1ZGVzKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgICAgICAgICAgYm9hcmQubXlQYXRoLnB1c2goY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgY3VycmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmICghY3VycmVudE5vZGUuaXNXYWxsKSB7XG4gICAgICAgICAgICBpZiAoYm9hcmQuYnV0dG9uc09uKSB7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5tb3VzZURvd24gPSB0cnVlO1xuICBcbiAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlLmlzRmluaXNoKSB7XG4gICAgICAgICAgICAgICAgYm9hcmQuYnV0dG9uc09uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYm9hcmQubXlQYXRoLnB1c2goY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgICAgIGJvYXJkLmZpbmlzaGVkUGF0aCA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIGlmICghYm9hcmQubXlQYXRoLmluY2x1ZGVzKGN1cnJlbnROb2RlKSkgeyBcbiAgICAgICAgICAgICAgICBib2FyZC5wcmV2aW91cyA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICBib2FyZC5teVBhdGgucHVzaChjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuY2xhc3NOYW1lICs9IFwiIGNsaWNrZWRcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2FyZC5idXR0b25zT24gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGN1cnJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoYm9hcmQuYnV0dG9uc09uKSB7XG4gICAgICAgICAgICBib2FyZC5idXR0b25zT24gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGNsZWFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbGVhci1idXR0b25cIilcbiAgICBcbiAgICBjbGVhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGVhclNvbHV0aW9uKTtcblxuXG4gICAgY29uc3QgZGlqa3N0cmEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXktYnV0dG9uXCIpO1xuICAgIFxuICAgIGRpamtzdHJhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICBib2FyZC5kaXNhYmxlQnV0dG9uKCk7XG4gICAgICBcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpXG4gICAgICBjb25zdCBncmlkID0gYm9hcmQuZ3JpZDtcbiAgICAgIGNvbnN0IHN0YXJ0Tm9kZSA9IGdyaWRbU1RBUlRfTk9ERV9ST1ddW1NUQVJUX05PREVfQ09MXTtcbiAgICAgIGNvbnN0IGZpbmlzaE5vZGUgPSBncmlkW0ZJTklTSF9OT0RFX1JPV11bRklOSVNIX05PREVfQ09MXTtcbiAgICAgIFxuICAgICAgY29uc3QgdmlzaXRlZE5vZGVzSW5PcmRlciA9IFZJU0lURURfTk9ERVMgfHwgZGlqa3N0cmFBbGdvKGdyaWQsIHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSk7XG4gICAgICBWSVNJVEVEX05PREVTID0gdmlzaXRlZE5vZGVzSW5PcmRlcjtcbiAgICAgIGNvbnN0IG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlciA9IGRpamtzdHJhU2hvcnRlc3RQYXRoKGZpbmlzaE5vZGUpO1xuICAgICAgXG4gICAgICBib2FyZC5kaXNwbGF5RGlqa3N0cmEodmlzaXRlZE5vZGVzSW5PcmRlciwgbm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKTtcbiAgICB9KVxuXG5cblxuICB9XG5cbiAgY2xlYXJTb2x1dGlvbigpIHtcbiAgICB0aGlzLm15UGF0aCA9IFtdO1xuICAgIHRoaXMuYnV0dG9uc09uID0gZmFsc2U7XG4gICAgdGhpcy5wcmV2aW91cyA9IG51bGw7XG4gICAgdGhpcy5maW5pc2hlZFBhdGggPSBmYWxzZTtcbiAgICB0aGlzLm5vZGVDbGlja2VkID0gbnVsbDtcblxuICAgIGNvbnN0IGRpamtzdHJhQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5LWJ1dHRvblwiKTtcbiAgICBkaWprc3RyYUJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcblxuICAgIGNvbnN0IHNvbHV0aW9uQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb2x1dGlvblwiKTtcbiAgICBzb2x1dGlvbkJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIilcblxuICAgIGNvbnN0IHN0YXJ0Tm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke1NUQVJUX05PREVfUk9XfS0ke1NUQVJUX05PREVfQ09MfWApO1xuICAgIGNvbnN0IGZpbmlzaE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtGSU5JU0hfTk9ERV9ST1d9LSR7RklOSVNIX05PREVfQ09MfWApO1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBWSVNJVEVEX05PREVTKSB7XG4gICAgICBjb25zdCBub2RlRWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bm9kZS5yb3d9LSR7bm9kZS5jb2x9YCk7XG4gICAgICBpZiAobm9kZUVsZSA9PT0gc3RhcnROb2RlKSB7XG4gICAgICAgIFxuICAgICAgICBub2RlRWxlLmNsYXNzTmFtZSA9IFwibm9kZSBub2RlLXN0YXJ0XCI7XG4gICAgICB9IGVsc2UgaWYgKG5vZGVFbGUgPT09IGZpbmlzaE5vZGUpIHtcbiAgICAgICAgbm9kZUVsZS5jbGFzc05hbWUgPSBcIm5vZGUgbm9kZS1maW5pc2hcIjtcbiAgICAgICAgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlRWxlLmNsYXNzTmFtZSA9IFwibm9kZVwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGVCdXR0b24oKSB7XG4gICAgY29uc3QgY2xlYXJCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsZWFyLWJ1dHRvblwiKTtcbiAgICBjbGVhckJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG5cbiAgICBjb25zdCBzb2x1dGlvbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic29sdXRpb25cIik7XG4gICAgc29sdXRpb25CdXR0b24uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpXG4gICAgXG4gIH1cblxuICBlbmFibGVCdXR0b24oKSB7XG4gICAgXG4gICAgY29uc3QgY2xlYXJCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsZWFyLWJ1dHRvblwiKTtcbiAgICBjbGVhckJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcblxuICAgIGNvbnN0IHNvbHV0aW9uQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb2x1dGlvblwiKTtcbiAgICBzb2x1dGlvbkJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgfVxuXG4gIGRpc3BsYXlEaWprc3RyYSh2aXNpdGVkTm9kZXNJbk9yZGVyLCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpIHtcbiAgICBjb25zdCBib2FyZCA9IHRoaXM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB2aXNpdGVkTm9kZXNJbk9yZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBcbiAgICAgIGlmIChpID09PSB2aXNpdGVkTm9kZXNJbk9yZGVyLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBzaG93QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb2x1dGlvblwiKTtcbiAgICAgICAgc2hvd0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGJvYXJkLmRpc2FibGVCdXR0b24oKTtcbiAgICAgICAgICBcbiAgICAgICAgICBib2FyZC5kaXNwbGF5U2hvcnRlc3RQYXRoKG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcik7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gdmlzaXRlZE5vZGVzSW5PcmRlcltpXTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5vZGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bm9kZS5yb3d9LSR7bm9kZS5jb2x9YClcbiAgICAgICAgaWYgKG5vZGVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImNsaWNrZWRcIikgfHwgbm9kZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibm9kZS1zdGFydFwiKSB8fCBub2RlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJub2RlLWZpbmlzaFwiKSkge1xuICAgICAgICAgIG5vZGVFbGVtZW50LmNsYXNzTmFtZSArPScgbXktcGF0aC1ub2RlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub2RlRWxlbWVudC5jbGFzc05hbWUgKz0gJyBub2RlLXZpc2l0ZWQnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSAgdmlzaXRlZE5vZGVzSW5PcmRlci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgYm9hcmQuZGlzcGxheVJlc3VsdHMoIG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcik7XG4gICAgICAgIH1cbiAgICAgIH0sIDEwICogaSk7XG4gICAgICBcbiAgICB9XG4gIH1cblxuICBkaXNwbGF5U2hvcnRlc3RQYXRoKG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcikge1xuICAgIGxldCBib2FyZCA9IHRoaXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIubGVuZ3RoOyBpKyspIHtcblxuICAgICAgaWYgKGkgPT09IG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgc2V0VGltZW91dChib2FyZC5lbmFibGVCdXR0b24sIDQwICogaSk7XG4gICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgIFxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXJbaV07XG4gICAgICAgIGNvbnN0IG5vZGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bm9kZS5yb3d9LSR7bm9kZS5jb2x9YCk7XG5cbiAgICAgICAgaWYgKG5vZGVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm15LXBhdGgtbm9kZVwiKSkge1xuICAgICAgICAgIG5vZGVFbGVtZW50LmNsYXNzTmFtZSA9ICdub2RlIGNvcnJlY3Qtbm9kZS1zaG9ydGVzdC1wYXRoJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub2RlRWxlbWVudC5jbGFzc05hbWUgKz0gJyBub2RlLXNob3J0ZXN0LXBhdGgnO1xuICAgICAgICB9XG4gICAgICB9LCA0MCAqIGkpO1xuICAgICAgXG4gICAgfVxuICB9XG5cbiAgZGlzcGxheVJlc3VsdHMobm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKSB7XG4gICAgY29uc3QgcGVyY2VudGFnZSA9IHRoaXMuY2FsY3VsYXRlUG9pbnRzKHRoaXMubXlQYXRoLCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpXG4gICAgY29uc3QgaXNWaXNpYmxlID0gXCJpcy12aXNpYmxlXCI7XG4gICAgY29uc3QgcmVzdWx0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsM1wiKTtcbiAgICBjb25zdCBtb2RhbENvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXktcmVzdWx0c1wiKTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7TWF0aC5mbG9vcihwZXJjZW50YWdlKX0lIG91dCBvZiAxMDAlYCk7XG4gICAgY29uc3QgdHJ5QWdhaW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBjb25zdCB0ZXh0Tm9kZTIgPSB0aGlzLnRleHRSZXN1bHQocGVyY2VudGFnZSk7XG5cbiAgICBpZiAobW9kYWxDb250ZW50LmNoaWxkcmVuLmxlbmd0aCkgbW9kYWxDb250ZW50LnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgICAgcmVzdWx0LmFwcGVuZCh0ZXh0Tm9kZSk7XG4gICAgICB0cnlBZ2Fpbi5hcHBlbmQodGV4dE5vZGUyKTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmQocmVzdWx0KTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmQodHJ5QWdhaW4pO1xuXG4gICAgcmVzdWx0TW9kYWwuY2xhc3NMaXN0LmFkZChpc1Zpc2libGUpO1xuICB9XG5cbiAgY2FsY3VsYXRlUG9pbnRzKG15UGF0aE9yZGVyLCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpIHtcbiAgICBjb25zdCBzZXRQb2ludHMgPSBuZXcgU2V0KCk7XG4gICAgY29uc3Qgc2V0MSA9IG5ldyBTZXQobm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKTtcblxuICAgIG15UGF0aE9yZGVyLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBpZiAoc2V0MS5oYXMobm9kZSkpIHNldFBvaW50cy5hZGQobm9kZSk7XG4gICAgfSlcbiAgICBjb25zdCBwZXJjZW50YWdlID0gKHNldFBvaW50cy5zaXplIC8gbm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyLmxlbmd0aCkgKiAxMDBcbiAgICByZXR1cm4gcGVyY2VudGFnZTtcbiAgfVxuXG4gIHRleHRSZXN1bHQoc2NvcmUpIHtcbiAgICBpZiAoc2NvcmUgPT09IDEwMCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiQ09OR1JBVFVMQVRJT05TISBZb3Uga25vdyB3aGF0IHlvdSdyZSBkb2luZ1wiKTtcbiAgICB9IGVsc2UgaWYgKHNjb3JlID4gOTApIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlNPIENMT1NFISBLZWVwIHdvcmtpbmchIFlvdSBnb3QgdGhpcyFcIik7XG4gICAgfSBlbHNlIGlmIChzY29yZSA+IDcwKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJOb3QgYmFkISBrZWVwIGl0IHVwIGFuZCB5b3UnbGwgZ2V0IGl0XCIpO1xuICAgIH0gZWxzZSBpZiAoc2NvcmUgPiA1MCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiRWhoaGhoLCB5b3UgY291bGQgZG8gYmV0dGVyXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJTdHVkeSwgc3R1ZHksIHN0dWR5XCIpO1xuICAgIH1cbiAgfVxuXG4gIGdldE5vZGUoaWQpIHtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBpZC5zcGxpdChcIi1cIik7XG4gICAgbGV0IHJvdyA9IHBhcnNlSW50KGNvb3JkaW5hdGVzWzBdKTtcbiAgICBsZXQgY29sID0gcGFyc2VJbnQoY29vcmRpbmF0ZXNbMV0pO1xuICAgIHJldHVybiB0aGlzLmdyaWRbcm93XVtjb2xdO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBCb2FyZDsiLCJleHBvcnQgZnVuY3Rpb24gZGlqa3N0cmFBbGdvKGdyaWQsIHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSkge1xuXHRcbiAgY29uc3QgdmlzaXRlZE5vZGVzID0gW107XG4gIHN0YXJ0Tm9kZS5kaXN0YW5jZSA9IDA7XG5cdFxuICBjb25zdCB1bnZpc2l0ZWROb2RlcyA9IGFsbFNpbmdsZU5vZGVzKGdyaWQpO1xuXHRcbiAgd2hpbGUgKHVudmlzaXRlZE5vZGVzLmxlbmd0aCkge1xuXHRcdFxuICAgIHNvcnROb2Rlc0J5RGlzdGFuY2UodW52aXNpdGVkTm9kZXMpO1xuXHRcdFxuICAgIGNvbnN0IGNsb3Nlc3ROb2RlID0gdW52aXNpdGVkTm9kZXMuc2hpZnQoKTtcbiAgICBcbiAgICBpZiAoY2xvc2VzdE5vZGUuaXNXYWxsKSBjb250aW51ZTtcblxuICAgIGNsb3Nlc3ROb2RlLmlzVmlzaXRlZCA9IHRydWU7XG4gICAgdmlzaXRlZE5vZGVzLnB1c2goY2xvc2VzdE5vZGUpO1xuXHRcdFxuICAgIGlmIChjbG9zZXN0Tm9kZSA9PT0gZmluaXNoTm9kZSkgcmV0dXJuIHZpc2l0ZWROb2Rlcztcblx0XHRcbiAgICB1cGRhdGVVbnZpc2l0ZWROZWlnaGJvcnMoY2xvc2VzdE5vZGUsIGdyaWQpO1xuXHRcdFxuICB9XG59XG5cbmZ1bmN0aW9uIHNvcnROb2Rlc0J5RGlzdGFuY2UodW52aXNpdGVkTm9kZXMpIHtcbiAgXG4gIHVudmlzaXRlZE5vZGVzLnNvcnQoKG5vZGVBLCBub2RlQikgPT4gbm9kZUEuZGlzdGFuY2UgLSBub2RlQi5kaXN0YW5jZSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVVudmlzaXRlZE5laWdoYm9ycyhub2RlLCBncmlkKSB7XG5cdFxuICBjb25zdCB1bnZpc2l0ZWROZWlnaGJvcnMgPSBnZXRVbnZpc2l0ZWROZWlnaGJvcnMobm9kZSwgZ3JpZCk7XG4gIGZvciAoY29uc3QgbmVpZ2hib3Igb2YgdW52aXNpdGVkTmVpZ2hib3JzKSB7XG4gICAgbmVpZ2hib3IuZGlzdGFuY2UgPSBub2RlLmRpc3RhbmNlICsgMTtcbiAgICBuZWlnaGJvci5wcmV2aW91c05vZGUgPSBub2RlO1xuICAgIFxuICB9XG5cdFxufVxuXG5mdW5jdGlvbiBnZXRVbnZpc2l0ZWROZWlnaGJvcnMobm9kZSwgZ3JpZCkge1xuXHRcbiAgY29uc3QgbmVpZ2hib3JzID0gW107XG4gIGNvbnN0IHtjb2wsIHJvd30gPSBub2RlO1xuXHRcbiAgaWYgKHJvdyA+IDApIG5laWdoYm9ycy5wdXNoKGdyaWRbcm93IC0gMV1bY29sXSk7XG4gIFxuICBpZiAocm93IDwgZ3JpZC5sZW5ndGggLSAxKSBuZWlnaGJvcnMucHVzaChncmlkW3JvdyArIDFdW2NvbF0pO1xuICBcbiAgaWYgKGNvbCA+IDApIG5laWdoYm9ycy5wdXNoKGdyaWRbcm93XVtjb2wgLSAxXSk7XG4gIFxuICBpZiAoY29sIDwgZ3JpZFswXS5sZW5ndGggLSAxKSBuZWlnaGJvcnMucHVzaChncmlkW3Jvd11bY29sICsgMV0pO1xuXHRcbiAgcmV0dXJuIG5laWdoYm9ycy5maWx0ZXIobmVpZ2hib3IgPT4gIW5laWdoYm9yLmlzVmlzaXRlZCk7XG59XG5cbmZ1bmN0aW9uIGFsbFNpbmdsZU5vZGVzKGdyaWQpIHtcblx0XG4gIGNvbnN0IG5vZGVzID0gW107XG4gIGZvciAoY29uc3Qgcm93IG9mIGdyaWQpIHtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygcm93KSB7XG4gICAgICBub2Rlcy5wdXNoKG5vZGUpO1xuICAgIH1cbiAgfVxuXG5cdFxuICByZXR1cm4gbm9kZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaWprc3RyYVNob3J0ZXN0UGF0aChmaW5pc2hOb2RlKSB7XG4gIGNvbnN0IHNob3J0ZXN0UGF0aCA9IFtdO1xuICBsZXQgY3VycmVudE5vZGUgPSBmaW5pc2hOb2RlO1xuICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICBzaG9ydGVzdFBhdGgudW5zaGlmdChjdXJyZW50Tm9kZSk7XG4gICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5wcmV2aW91c05vZGU7XG4gIH1cbiAgcmV0dXJuIHNob3J0ZXN0UGF0aDtcbn0iLCJpbXBvcnQgQm9hcmQgZnJvbSBcIi4vYm9hcmRcIlxuXG5leHBvcnQgY29uc3QgdG9nZ2xlTW9kYWwgPSAoKSA9PiB7XG4gIGNvbnN0IGlzVmlzaWJsZSA9IFwiaXMtdmlzaWJsZVwiO1xuICBjb25zdCBvcGVuRWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLW9wZW5dXCIpO1xuICBjb25zdCBjbG9zZUVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1jbG9zZV1cIik7XG5cbiAgZm9yIChjb25zdCBlbCBvZiBvcGVuRWxzKSB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG1vZGFsSWQgPSB0aGlzLmRhdGFzZXQub3BlbjtcbiAgICAgIFxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW9kYWxJZCkuY2xhc3NMaXN0LmFkZChpc1Zpc2libGUpO1xuICAgIH0pO1xuICB9XG5cbiBcbiAgZm9yIChjb25zdCBlbCBvZiBjbG9zZUVscykge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgIEJvYXJkLnByb3RvdHlwZS5lbmFibGVCdXR0b24oKTtcbiAgICAgIHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShpc1Zpc2libGUpO1xuICAgIH0pO1xuICB9XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGUgPT4ge1xuICAgIEJvYXJkLnByb3RvdHlwZS5lbmFibGVCdXR0b24oKTtcbiAgICBpZiAoZS5rZXkgPT0gXCJFc2NhcGVcIiAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsLmlzLXZpc2libGVcIikpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwuaXMtdmlzaWJsZVwiKS5jbGFzc0xpc3QucmVtb3ZlKGlzVmlzaWJsZSk7XG4gICAgfVxuICB9KTtcbn1cblxuIiwiY29uc3QgU1RBUlRfTk9ERV9ST1cgPSAxODtcbmNvbnN0IFNUQVJUX05PREVfQ09MID0gMTtcbmNvbnN0IEZJTklTSF9OT0RFX1JPVyA9IDE7XG5jb25zdCBGSU5JU0hfTk9ERV9DT0wgPSA0ODtcblxuY29uc3QgV0FMTF9OT0RFUyA9IFtcbiAgWzEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDFdLFxuICBbMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMV0sXG4gIFsxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxXSxcbiAgWzEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDFdLFxuICBbMSwgMSwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMV0sXG4gIFsxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxXSxcbiAgWzEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDAsIDEsIDEsIDAsIDAsIDFdLFxuICBbMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMV0sXG4gIFsxLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAxXSxcbiAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICBbMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMV0sXG4gIFsxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAwLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxXSxcbiAgWzEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDFdLFxuICBbMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMV0sXG4gIFsxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxXSxcbiAgWzEsIDAsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDEsIDAsIDEsIDAsIDAsIDEsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDFdLFxuICBbMSwgMCwgMCwgMSwgMCwgMCwgMSwgMSwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMV0sXG4gIFsxLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxXSxcbiAgWzEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICBbMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMV0sXG5dXG5cbmNsYXNzIE5vZGUge1xuICBjb25zdHJ1Y3Rvcihyb3csIGNvbCkge1xuICAgIHRoaXMucm93ID0gcm93O1xuICAgIHRoaXMuY29sID0gY29sO1xuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XG4gICAgdGhpcy5pc1N0YXJ0ID0gdGhpcy5pc1N0YXJ0KCk7XG4gICAgdGhpcy5pc0ZpbmlzaCA9IHRoaXMuaXNGaW5pc2goKTtcbiAgICB0aGlzLmlzV2FsbCA9IHRoaXMuaXNXYWxsKCk7XG4gICAgdGhpcy5wcmV2aW91c05vZGUgPSBudWxsO1xuICAgIHRoaXMuZGlzdGFuY2UgPSBJbmZpbml0eTtcbiAgICB0aGlzLmlzVmlzaXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgaXNXYWxsKCkge1xuICAgIGNvbnN0IHIgPSB0aGlzLnJvdztcbiAgICBjb25zdCBjID0gdGhpcy5jb2w7XG4gICAgaWYgKFdBTExfTk9ERVNbcl1bY10pIHtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoXCJ3YWxsXCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc1N0YXJ0KCkge1xuICAgIGlmICh0aGlzLnJvdyA9PT0gU1RBUlRfTk9ERV9ST1cgJiYgdGhpcy5jb2wgPT09IFNUQVJUX05PREVfQ09MKSB7XG4gICAgICB0aGlzLmFkZENsYXNzKFwibm9kZS1zdGFydFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNGaW5pc2goKSB7XG4gICAgaWYgKHRoaXMucm93ID09PSBGSU5JU0hfTk9ERV9ST1cgJiYgdGhpcy5jb2wgPT09IEZJTklTSF9OT0RFX0NPTCkge1xuICAgICAgdGhpcy5hZGRDbGFzcyhcIm5vZGUtZmluaXNoXCIpO1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge1xuICAgIGxldCBub2RlRWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGhpcy5yb3d9LSR7dGhpcy5jb2x9YClcbiAgICBub2RlRWxlLmNsYXNzTmFtZSArPSBgICR7Y2xhc3NOYW1lfWA7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTm9kZTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5zY3NzXCI7XG5pbXBvcnQgQm9hcmQgZnJvbSBcIi4vc2NyaXB0cy9ib2FyZFwiO1xuaW1wb3J0IHt0b2dnbGVNb2RhbH0gZnJvbSBcIi4vc2NyaXB0cy9tb2RhbFwiO1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JpZFwiKTtcbiAgY29uc3QgYm9hcmQgPSBlbCA9PiBuZXcgQm9hcmQoZWwpO1xuICBib2FyZChlbCk7XG4gIHRvZ2dsZU1vZGFsKCk7XG59KTtcblxuXG4iXSwic291cmNlUm9vdCI6IiJ9