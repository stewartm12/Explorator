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
    sortByDistance(unvisitedNodes);
    var closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    closestNode.isVisited = true;
    sptSet.push(closestNode);
    if (closestNode === finishNode) return sptSet;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortByDistance(unvisitedNodes) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2RpamtzdHJhLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9tb2RhbC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvbm9kZS5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIlNUQVJUX05PREVfUk9XIiwiU1RBUlRfTk9ERV9DT0wiLCJGSU5JU0hfTk9ERV9ST1ciLCJGSU5JU0hfTk9ERV9DT0wiLCJWSVNJVEVEX05PREVTIiwiQm9hcmQiLCJlbCIsIm1heFJvdyIsIm1heENvbCIsImdyaWQiLCJteVBhdGgiLCJib2FyZCIsImNyZWF0ZUJvYXJkIiwiYWRkRXZlbnRMaXN0ZW5lcnMiLCJidXR0b25zT24iLCJwcmV2aW91cyIsImZpbmlzaGVkUGF0aCIsIm5vZGVDbGlja2VkIiwiY2xlYXJTb2x1dGlvbiIsImJpbmQiLCJyb3ciLCJib2FyZFJvdyIsIm5ld0VsZVJvdyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImFwcGVuZENoaWxkIiwiY29sIiwibmV3RWxlTm9kZSIsInNldEF0dHJpYnV0ZSIsIm5vZGUiLCJOb2RlIiwicHVzaCIsImN1cnJlbnRJZCIsImN1cnJlbnROb2RlIiwiZ2V0Tm9kZSIsImN1cnJlbnRFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiaXNGaW5pc2giLCJpc1N0YXJ0IiwibW91c2VEb3duIiwiaW5jbHVkZXMiLCJpc1dhbGwiLCJjbGVhciIsImRpamtzdHJhIiwiZGlzYWJsZUJ1dHRvbiIsInN0YXJ0Tm9kZSIsImZpbmlzaE5vZGUiLCJ2aXNpdGVkTm9kZXNJbk9yZGVyIiwiZGlqa3N0cmFBbGdvIiwibm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyIiwiZGlqa3N0cmFTaG9ydGVzdFBhdGgiLCJkaXNwbGF5RGlqa3N0cmEiLCJkaWprc3RyYUJ1dHRvbiIsInJlbW92ZUF0dHJpYnV0ZSIsInNvbHV0aW9uQnV0dG9uIiwibm9kZUVsZSIsImNsZWFyQnV0dG9uIiwiaSIsImxlbmd0aCIsInNob3dCdXR0b24iLCJkaXNwbGF5U2hvcnRlc3RQYXRoIiwic2V0VGltZW91dCIsIm5vZGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJkaXNwbGF5UmVzdWx0cyIsImVuYWJsZUJ1dHRvbiIsInBlcmNlbnRhZ2UiLCJjYWxjdWxhdGVQb2ludHMiLCJpc1Zpc2libGUiLCJyZXN1bHRNb2RhbCIsIm1vZGFsQ29udGVudCIsInJlc3VsdCIsInRleHROb2RlIiwiY3JlYXRlVGV4dE5vZGUiLCJNYXRoIiwiZmxvb3IiLCJ0cnlBZ2FpbiIsInRleHROb2RlMiIsInRleHRSZXN1bHQiLCJjaGlsZHJlbiIsInRleHRDb250ZW50IiwiYXBwZW5kIiwiYWRkIiwibXlQYXRoT3JkZXIiLCJzZXRQb2ludHMiLCJTZXQiLCJzZXQxIiwiZm9yRWFjaCIsImhhcyIsInNpemUiLCJzY29yZSIsImlkIiwiY29vcmRpbmF0ZXMiLCJzcGxpdCIsInBhcnNlSW50Iiwic3B0U2V0IiwiZGlzdGFuY2UiLCJ1bnZpc2l0ZWROb2RlcyIsImFsbFNpbmdsZU5vZGVzIiwic29ydEJ5RGlzdGFuY2UiLCJjbG9zZXN0Tm9kZSIsInNoaWZ0IiwiaXNWaXNpdGVkIiwidXBkYXRlVW52aXNpdGVkTmVpZ2hib3JzIiwic29ydCIsIm5vZGVBIiwibm9kZUIiLCJ1bnZpc2l0ZWROZWlnaGJvcnMiLCJnZXRVbnZpc2l0ZWROZWlnaGJvcnMiLCJuZWlnaGJvciIsInByZXZpb3VzTm9kZSIsIm5laWdoYm9ycyIsImZpbHRlciIsIm5vZGVzIiwic2hvcnRlc3RQYXRoIiwidW5zaGlmdCIsInRvZ2dsZU1vZGFsIiwib3BlbkVscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjbG9zZUVscyIsIm1vZGFsSWQiLCJkYXRhc2V0Iiwib3BlbiIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmUiLCJrZXkiLCJxdWVyeVNlbGVjdG9yIiwiV0FMTF9OT0RFUyIsIkluZmluaXR5IiwiciIsImMiLCJhZGRDbGFzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBLElBQU1BLGNBQWMsR0FBRyxFQUF2QjtBQUNBLElBQU1DLGNBQWMsR0FBRyxDQUF2QjtBQUNBLElBQU1DLGVBQWUsR0FBRyxDQUF4QjtBQUNBLElBQU1DLGVBQWUsR0FBRyxFQUF4QjtBQUNBLElBQUlDLGFBQWEsR0FBRyxJQUFwQjs7SUFHTUMsSztBQUNKLGlCQUFZQyxFQUFaLEVBQWdCO0FBQUE7O0FBQ2QsU0FBS0EsRUFBTCxHQUFVQSxFQUFWO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLFNBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLQyxLQUFMLEdBQWEsS0FBS0MsV0FBTCxFQUFiO0FBQ0Es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QixFQUE4QyxZQUFXO0FBQ3ZELE1BQU1oQyxFQUFFLEdBQUdpQixRQUFRLENBQUNjLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBWDs7QUFDQSxNQUFNMUIsS0FBSyxHQUFHLFNBQVJBLEtBQVEsQ0FBQUwsRUFBRTtBQUFBLFdBQUksSUFBSUQsbURBQUosQ0FBVUMsRUFBVixDQUFKO0FBQUEsR0FBaEI7O0FBQ0FLLE9BQUssQ0FBQ0wsRUFBRCxDQUFMO0FBQ0FtSCw2REFBVztBQUNaLENBTEQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5vZGUgZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7ZGlqa3N0cmFBbGdvLCBkaWprc3RyYVNob3J0ZXN0UGF0aH0gZnJvbSAnLi9kaWprc3RyYSc7XG5cbmNvbnN0IFNUQVJUX05PREVfUk9XID0gMTg7XG5jb25zdCBTVEFSVF9OT0RFX0NPTCA9IDE7XG5jb25zdCBGSU5JU0hfTk9ERV9ST1cgPSAxO1xuY29uc3QgRklOSVNIX05PREVfQ09MID0gNDg7XG5sZXQgVklTSVRFRF9OT0RFUyA9IG51bGw7XG5cblxuY2xhc3MgQm9hcmQge1xuICBjb25zdHJ1Y3RvcihlbCkge1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLm1heFJvdyA9IDIwO1xuICAgIHRoaXMubWF4Q29sID0gNTA7XG4gICAgdGhpcy5ncmlkID0gW107XG4gICAgdGhpcy5teVBhdGggPSBbXTtcbiAgICB0aGlzLmJvYXJkID0gdGhpcy5jcmVhdGVCb2FyZCgpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLmJ1dHRvbnNPbiA9IGZhbHNlO1xuICAgIHRoaXMucHJldmlvdXMgPSBudWxsO1xuICAgIHRoaXMuZmluaXNoZWRQYXRoID0gZmFsc2U7XG4gICAgdGhpcy5ub2RlQ2xpY2tlZCA9IG51bGw7XG4gICAgdGhpcy5jbGVhclNvbHV0aW9uID0gdGhpcy5jbGVhclNvbHV0aW9uLmJpbmQodGhpcyk7XG4gIH1cblxuICBjcmVhdGVCb2FyZCgpIHtcblxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMubWF4Um93OyByb3crKykge1xuICAgICAgbGV0IGJvYXJkUm93ID0gW107XG4gICAgICBsZXQgbmV3RWxlUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG5ld0VsZVJvdy5jbGFzc05hbWUgPSBcIm5vZGUtcm93XCI7XG4gICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKG5ld0VsZVJvdyk7XG5cbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHRoaXMubWF4Q29sOyBjb2wrKykge1xuICAgICAgICBsZXQgbmV3RWxlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG5ld0VsZU5vZGUuY2xhc3NOYW1lID0gXCJub2RlXCI7XG4gICAgICAgIG5ld0VsZU5vZGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7cm93fS0ke2NvbH1gKVxuICAgICAgICBuZXdFbGVSb3cuYXBwZW5kQ2hpbGQobmV3RWxlTm9kZSk7XG4gICAgICAgIGxldCBub2RlID0gbmV3IE5vZGUocm93LCBjb2wpXG4gICAgICAgIGJvYXJkUm93LnB1c2gobm9kZSlcbiAgICAgIH1cblxuICAgICAgdGhpcy5ncmlkLnB1c2goYm9hcmRSb3cpXG4gICAgfVxuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgXG4gICAgbGV0IGJvYXJkID0gdGhpcztcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBib2FyZC5tYXhSb3c7IHJvdysrKSB7XG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBib2FyZC5tYXhDb2w7IGNvbCsrKSB7XG4gICAgICAgIGxldCBjdXJyZW50SWQgPSBgJHtyb3d9LSR7Y29sfWA7XG4gICAgICAgIGxldCBjdXJyZW50Tm9kZSA9IGJvYXJkLmdldE5vZGUoY3VycmVudElkKTtcbiAgICAgICAgbGV0IGN1cnJlbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3VycmVudElkKTtcblxuICAgICAgICBjdXJyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgaWYgKCFib2FyZC5maW5pc2hlZFBhdGgpIHtcbiAgICAgICAgICAgIGlmICghY3VycmVudE5vZGUuaXNGaW5pc2gpIHtcbiAgICAgICAgICAgICAgYm9hcmQubm9kZUNsaWNrZWQgPSBjdXJyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgaWYgKChjdXJyZW50Tm9kZS5pc1N0YXJ0ICYmIGJvYXJkLnByZXZpb3VzID09PSBudWxsKSB8fCAoYm9hcmQubm9kZUNsaWNrZWQgPT09IGJvYXJkLnByZXZpb3VzKSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm1vdXNlRG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgYm9hcmQuYnV0dG9uc09uID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGlmICghYm9hcmQubXlQYXRoLmluY2x1ZGVzKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgICAgICAgICAgYm9hcmQubXlQYXRoLnB1c2goY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgY3VycmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmICghY3VycmVudE5vZGUuaXNXYWxsKSB7XG4gICAgICAgICAgICBpZiAoYm9hcmQuYnV0dG9uc09uKSB7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5tb3VzZURvd24gPSB0cnVlO1xuICBcbiAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlLmlzRmluaXNoKSB7XG4gICAgICAgICAgICAgICAgYm9hcmQuYnV0dG9uc09uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYm9hcmQubXlQYXRoLnB1c2goY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgICAgIGJvYXJkLmZpbmlzaGVkUGF0aCA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIGlmICghYm9hcmQubXlQYXRoLmluY2x1ZGVzKGN1cnJlbnROb2RlKSkgeyBcbiAgICAgICAgICAgICAgICBib2FyZC5wcmV2aW91cyA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICBib2FyZC5teVBhdGgucHVzaChjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuY2xhc3NOYW1lICs9IFwiIGNsaWNrZWRcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2FyZC5idXR0b25zT24gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGN1cnJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoYm9hcmQuYnV0dG9uc09uKSB7XG4gICAgICAgICAgICBib2FyZC5idXR0b25zT24gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGNsZWFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbGVhci1idXR0b25cIilcbiAgICBcbiAgICBjbGVhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGVhclNvbHV0aW9uKTtcblxuXG4gICAgY29uc3QgZGlqa3N0cmEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXktYnV0dG9uXCIpO1xuICAgIFxuICAgIGRpamtzdHJhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICBib2FyZC5kaXNhYmxlQnV0dG9uKCk7XG4gICAgICBcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpXG4gICAgICBjb25zdCBncmlkID0gYm9hcmQuZ3JpZDtcbiAgICAgIGNvbnN0IHN0YXJ0Tm9kZSA9IGdyaWRbU1RBUlRfTk9ERV9ST1ddW1NUQVJUX05PREVfQ09MXTtcbiAgICAgIGNvbnN0IGZpbmlzaE5vZGUgPSBncmlkW0ZJTklTSF9OT0RFX1JPV11bRklOSVNIX05PREVfQ09MXTtcbiAgICAgIFxuICAgICAgY29uc3QgdmlzaXRlZE5vZGVzSW5PcmRlciA9IFZJU0lURURfTk9ERVMgfHwgZGlqa3N0cmFBbGdvKGdyaWQsIHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSk7XG4gICAgICBWSVNJVEVEX05PREVTID0gdmlzaXRlZE5vZGVzSW5PcmRlcjtcbiAgICAgIGNvbnN0IG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlciA9IGRpamtzdHJhU2hvcnRlc3RQYXRoKGZpbmlzaE5vZGUpO1xuICAgICAgXG4gICAgICBib2FyZC5kaXNwbGF5RGlqa3N0cmEodmlzaXRlZE5vZGVzSW5PcmRlciwgbm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKTtcbiAgICB9KVxuXG5cblxuICB9XG5cbiAgY2xlYXJTb2x1dGlvbigpIHtcbiAgICB0aGlzLm15UGF0aCA9IFtdO1xuICAgIHRoaXMuYnV0dG9uc09uID0gZmFsc2U7XG4gICAgdGhpcy5wcmV2aW91cyA9IG51bGw7XG4gICAgdGhpcy5maW5pc2hlZFBhdGggPSBmYWxzZTtcbiAgICB0aGlzLm5vZGVDbGlja2VkID0gbnVsbDtcblxuICAgIGNvbnN0IGRpamtzdHJhQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5LWJ1dHRvblwiKTtcbiAgICBkaWprc3RyYUJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcblxuICAgIGNvbnN0IHNvbHV0aW9uQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb2x1dGlvblwiKTtcbiAgICBzb2x1dGlvbkJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIilcblxuICAgIGNvbnN0IHN0YXJ0Tm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke1NUQVJUX05PREVfUk9XfS0ke1NUQVJUX05PREVfQ09MfWApO1xuICAgIGNvbnN0IGZpbmlzaE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtGSU5JU0hfTk9ERV9ST1d9LSR7RklOSVNIX05PREVfQ09MfWApO1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBWSVNJVEVEX05PREVTKSB7XG4gICAgICBjb25zdCBub2RlRWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bm9kZS5yb3d9LSR7bm9kZS5jb2x9YCk7XG4gICAgICBpZiAobm9kZUVsZSA9PT0gc3RhcnROb2RlKSB7XG4gICAgICAgIFxuICAgICAgICBub2RlRWxlLmNsYXNzTmFtZSA9IFwibm9kZSBub2RlLXN0YXJ0XCI7XG4gICAgICB9IGVsc2UgaWYgKG5vZGVFbGUgPT09IGZpbmlzaE5vZGUpIHtcbiAgICAgICAgbm9kZUVsZS5jbGFzc05hbWUgPSBcIm5vZGUgbm9kZS1maW5pc2hcIjtcbiAgICAgICAgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlRWxlLmNsYXNzTmFtZSA9IFwibm9kZVwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGVCdXR0b24oKSB7XG4gICAgY29uc3QgY2xlYXJCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsZWFyLWJ1dHRvblwiKTtcbiAgICBjbGVhckJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG5cbiAgICBjb25zdCBzb2x1dGlvbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic29sdXRpb25cIik7XG4gICAgc29sdXRpb25CdXR0b24uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpXG4gICAgXG4gIH1cblxuICBlbmFibGVCdXR0b24oKSB7XG4gICAgXG4gICAgY29uc3QgY2xlYXJCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsZWFyLWJ1dHRvblwiKTtcbiAgICBjbGVhckJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcblxuICAgIGNvbnN0IHNvbHV0aW9uQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb2x1dGlvblwiKTtcbiAgICBzb2x1dGlvbkJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgfVxuXG4gIGRpc3BsYXlEaWprc3RyYSh2aXNpdGVkTm9kZXNJbk9yZGVyLCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpIHtcbiAgICBjb25zdCBib2FyZCA9IHRoaXM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB2aXNpdGVkTm9kZXNJbk9yZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBcbiAgICAgIGlmIChpID09PSB2aXNpdGVkTm9kZXNJbk9yZGVyLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBzaG93QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb2x1dGlvblwiKTtcbiAgICAgICAgc2hvd0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGJvYXJkLmRpc2FibGVCdXR0b24oKTtcbiAgICAgICAgICBcbiAgICAgICAgICBib2FyZC5kaXNwbGF5U2hvcnRlc3RQYXRoKG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcik7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gdmlzaXRlZE5vZGVzSW5PcmRlcltpXTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5vZGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bm9kZS5yb3d9LSR7bm9kZS5jb2x9YClcbiAgICAgICAgaWYgKG5vZGVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImNsaWNrZWRcIikgfHwgbm9kZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibm9kZS1zdGFydFwiKSB8fCBub2RlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJub2RlLWZpbmlzaFwiKSkge1xuICAgICAgICAgIG5vZGVFbGVtZW50LmNsYXNzTmFtZSArPScgbXktcGF0aC1ub2RlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub2RlRWxlbWVudC5jbGFzc05hbWUgKz0gJyBub2RlLXZpc2l0ZWQnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSAgdmlzaXRlZE5vZGVzSW5PcmRlci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgYm9hcmQuZGlzcGxheVJlc3VsdHMoIG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcik7XG4gICAgICAgIH1cbiAgICAgIH0sIDEwICogaSk7XG4gICAgICBcbiAgICB9XG4gIH1cblxuICBkaXNwbGF5U2hvcnRlc3RQYXRoKG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlcikge1xuICAgIGxldCBib2FyZCA9IHRoaXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIubGVuZ3RoOyBpKyspIHtcblxuICAgICAgaWYgKGkgPT09IG5vZGVzSW5TaG9ydGVzdFBhdGhPcmRlci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgc2V0VGltZW91dChib2FyZC5lbmFibGVCdXR0b24sIDQwICogaSk7XG4gICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgIFxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXJbaV07XG4gICAgICAgIGNvbnN0IG5vZGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bm9kZS5yb3d9LSR7bm9kZS5jb2x9YCk7XG5cbiAgICAgICAgaWYgKG5vZGVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm15LXBhdGgtbm9kZVwiKSkge1xuICAgICAgICAgIG5vZGVFbGVtZW50LmNsYXNzTmFtZSA9ICdub2RlIGNvcnJlY3Qtbm9kZS1zaG9ydGVzdC1wYXRoJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub2RlRWxlbWVudC5jbGFzc05hbWUgKz0gJyBub2RlLXNob3J0ZXN0LXBhdGgnO1xuICAgICAgICB9XG4gICAgICB9LCA0MCAqIGkpO1xuICAgICAgXG4gICAgfVxuICB9XG5cbiAgZGlzcGxheVJlc3VsdHMobm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKSB7XG4gICAgY29uc3QgcGVyY2VudGFnZSA9IHRoaXMuY2FsY3VsYXRlUG9pbnRzKHRoaXMubXlQYXRoLCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpXG4gICAgY29uc3QgaXNWaXNpYmxlID0gXCJpcy12aXNpYmxlXCI7XG4gICAgY29uc3QgcmVzdWx0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsM1wiKTtcbiAgICBjb25zdCBtb2RhbENvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXktcmVzdWx0c1wiKTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7TWF0aC5mbG9vcihwZXJjZW50YWdlKX0lIG91dCBvZiAxMDAlYCk7XG4gICAgY29uc3QgdHJ5QWdhaW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBjb25zdCB0ZXh0Tm9kZTIgPSB0aGlzLnRleHRSZXN1bHQocGVyY2VudGFnZSk7XG5cbiAgICBpZiAobW9kYWxDb250ZW50LmNoaWxkcmVuLmxlbmd0aCkgbW9kYWxDb250ZW50LnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgICAgcmVzdWx0LmFwcGVuZCh0ZXh0Tm9kZSk7XG4gICAgICB0cnlBZ2Fpbi5hcHBlbmQodGV4dE5vZGUyKTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmQocmVzdWx0KTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmQodHJ5QWdhaW4pO1xuXG4gICAgcmVzdWx0TW9kYWwuY2xhc3NMaXN0LmFkZChpc1Zpc2libGUpO1xuICB9XG5cbiAgY2FsY3VsYXRlUG9pbnRzKG15UGF0aE9yZGVyLCBub2Rlc0luU2hvcnRlc3RQYXRoT3JkZXIpIHtcbiAgICBjb25zdCBzZXRQb2ludHMgPSBuZXcgU2V0KCk7XG4gICAgY29uc3Qgc2V0MSA9IG5ldyBTZXQobm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyKTtcblxuICAgIG15UGF0aE9yZGVyLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBpZiAoc2V0MS5oYXMobm9kZSkpIHNldFBvaW50cy5hZGQobm9kZSk7XG4gICAgfSlcbiAgICBjb25zdCBwZXJjZW50YWdlID0gKHNldFBvaW50cy5zaXplIC8gbm9kZXNJblNob3J0ZXN0UGF0aE9yZGVyLmxlbmd0aCkgKiAxMDBcbiAgICByZXR1cm4gcGVyY2VudGFnZTtcbiAgfVxuXG4gIHRleHRSZXN1bHQoc2NvcmUpIHtcbiAgICBpZiAoc2NvcmUgPT09IDEwMCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiQ09OR1JBVFVMQVRJT05TISBZb3Uga25vdyB3aGF0IHlvdSdyZSBkb2luZ1wiKTtcbiAgICB9IGVsc2UgaWYgKHNjb3JlID4gOTApIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlNPIENMT1NFISBLZWVwIHdvcmtpbmchIFlvdSBnb3QgdGhpcyFcIik7XG4gICAgfSBlbHNlIGlmIChzY29yZSA+IDcwKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJOb3QgYmFkISBrZWVwIGl0IHVwIGFuZCB5b3UnbGwgZ2V0IGl0XCIpO1xuICAgIH0gZWxzZSBpZiAoc2NvcmUgPiA1MCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiRWhoaGhoLCB5b3UgY291bGQgZG8gYmV0dGVyXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJTdHVkeSwgc3R1ZHksIHN0dWR5XCIpO1xuICAgIH1cbiAgfVxuXG4gIGdldE5vZGUoaWQpIHtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBpZC5zcGxpdChcIi1cIik7XG4gICAgbGV0IHJvdyA9IHBhcnNlSW50KGNvb3JkaW5hdGVzWzBdKTtcbiAgICBsZXQgY29sID0gcGFyc2VJbnQoY29vcmRpbmF0ZXNbMV0pO1xuICAgIHJldHVybiB0aGlzLmdyaWRbcm93XVtjb2xdO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBCb2FyZDsiLCJleHBvcnQgZnVuY3Rpb24gZGlqa3N0cmFBbGdvKGdyaWQsIHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSkge1xuXHQvLyBzcHRTZXQgKHNob3J0ZXN0IHBhdGggdHJlZSBzZXQpXG4gIGNvbnN0IHNwdFNldCA9IFtdO1xuICBzdGFydE5vZGUuZGlzdGFuY2UgPSAwO1xuXHRcbiAgY29uc3QgdW52aXNpdGVkTm9kZXMgPSBhbGxTaW5nbGVOb2RlcyhncmlkKTtcblx0XG4gIHdoaWxlICh1bnZpc2l0ZWROb2Rlcy5sZW5ndGgpIHtcblxuICAgIHNvcnRCeURpc3RhbmNlKHVudmlzaXRlZE5vZGVzKTtcbiAgICBjb25zdCBjbG9zZXN0Tm9kZSA9IHVudmlzaXRlZE5vZGVzLnNoaWZ0KCk7XG4gICAgXG4gICAgaWYgKGNsb3Nlc3ROb2RlLmlzV2FsbCkgY29udGludWU7XG5cbiAgICBjbG9zZXN0Tm9kZS5pc1Zpc2l0ZWQgPSB0cnVlO1xuICAgIHNwdFNldC5wdXNoKGNsb3Nlc3ROb2RlKTtcblx0XHRcbiAgICBpZiAoY2xvc2VzdE5vZGUgPT09IGZpbmlzaE5vZGUpIHJldHVybiBzcHRTZXQ7XG5cdFx0XG4gICAgdXBkYXRlVW52aXNpdGVkTmVpZ2hib3JzKGNsb3Nlc3ROb2RlLCBncmlkKTtcblx0XHRcbiAgfVxufVxuXG5mdW5jdGlvbiBzb3J0QnlEaXN0YW5jZSh1bnZpc2l0ZWROb2Rlcykge1xuICBcbiAgdW52aXNpdGVkTm9kZXMuc29ydCgobm9kZUEsIG5vZGVCKSA9PiBub2RlQS5kaXN0YW5jZSAtIG5vZGVCLmRpc3RhbmNlKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVW52aXNpdGVkTmVpZ2hib3JzKG5vZGUsIGdyaWQpIHtcblx0XG4gIGNvbnN0IHVudmlzaXRlZE5laWdoYm9ycyA9IGdldFVudmlzaXRlZE5laWdoYm9ycyhub2RlLCBncmlkKTtcbiAgZm9yIChjb25zdCBuZWlnaGJvciBvZiB1bnZpc2l0ZWROZWlnaGJvcnMpIHtcbiAgICBuZWlnaGJvci5kaXN0YW5jZSA9IG5vZGUuZGlzdGFuY2UgKyAxO1xuICAgIG5laWdoYm9yLnByZXZpb3VzTm9kZSA9IG5vZGU7XG4gICAgXG4gIH1cblx0XG59XG5cbmZ1bmN0aW9uIGdldFVudmlzaXRlZE5laWdoYm9ycyhub2RlLCBncmlkKSB7XG5cdFxuICBjb25zdCBuZWlnaGJvcnMgPSBbXTtcbiAgY29uc3Qge2NvbCwgcm93fSA9IG5vZGU7XG4vLyBncmFiIHRoZSB0b3AgbmVpZ2hib3JcbiAgaWYgKHJvdyA+IDApIG5laWdoYm9ycy5wdXNoKGdyaWRbcm93IC0gMV1bY29sXSk7XG4gIC8vIGdyYWIgdGhlIGJvdHRvbSBuZWlnaGJvclxuICBpZiAocm93IDwgZ3JpZC5sZW5ndGggLSAxKSBuZWlnaGJvcnMucHVzaChncmlkW3JvdyArIDFdW2NvbF0pO1xuICAvLyBncmFiIHRoZSBsZWZ0IG5laWdoYm9yXG4gIGlmIChjb2wgPiAwKSBuZWlnaGJvcnMucHVzaChncmlkW3Jvd11bY29sIC0gMV0pO1xuICAvLyBncmFiIHRoZSByaWdodCBuZWlnaGJvclxuICBpZiAoY29sIDwgZ3JpZFswXS5sZW5ndGggLSAxKSBuZWlnaGJvcnMucHVzaChncmlkW3Jvd11bY29sICsgMV0pO1xuXHRcbiAgcmV0dXJuIG5laWdoYm9ycy5maWx0ZXIobmVpZ2hib3IgPT4gIW5laWdoYm9yLmlzVmlzaXRlZCk7XG59XG5cbmZ1bmN0aW9uIGFsbFNpbmdsZU5vZGVzKGdyaWQpIHtcblx0XG4gIGNvbnN0IG5vZGVzID0gW107XG4gIGZvciAoY29uc3Qgcm93IG9mIGdyaWQpIHtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygcm93KSB7XG4gICAgICBub2Rlcy5wdXNoKG5vZGUpO1xuICAgIH1cbiAgfVxuXG5cdFxuICByZXR1cm4gbm9kZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaWprc3RyYVNob3J0ZXN0UGF0aChmaW5pc2hOb2RlKSB7XG4gIGNvbnN0IHNob3J0ZXN0UGF0aCA9IFtdO1xuICBsZXQgY3VycmVudE5vZGUgPSBmaW5pc2hOb2RlO1xuICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICBzaG9ydGVzdFBhdGgudW5zaGlmdChjdXJyZW50Tm9kZSk7XG4gICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5wcmV2aW91c05vZGU7XG4gIH1cbiAgcmV0dXJuIHNob3J0ZXN0UGF0aDtcbn0iLCJpbXBvcnQgQm9hcmQgZnJvbSBcIi4vYm9hcmRcIlxuXG5leHBvcnQgY29uc3QgdG9nZ2xlTW9kYWwgPSAoKSA9PiB7XG4gIGNvbnN0IGlzVmlzaWJsZSA9IFwiaXMtdmlzaWJsZVwiO1xuICBjb25zdCBvcGVuRWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLW9wZW5dXCIpO1xuICBjb25zdCBjbG9zZUVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1jbG9zZV1cIik7XG5cbiAgZm9yIChjb25zdCBlbCBvZiBvcGVuRWxzKSB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG1vZGFsSWQgPSB0aGlzLmRhdGFzZXQub3BlbjtcbiAgICAgIFxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW9kYWxJZCkuY2xhc3NMaXN0LmFkZChpc1Zpc2libGUpO1xuICAgIH0pO1xuICB9XG5cbiBcbiAgZm9yIChjb25zdCBlbCBvZiBjbG9zZUVscykge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgIEJvYXJkLnByb3RvdHlwZS5lbmFibGVCdXR0b24oKTtcbiAgICAgIHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShpc1Zpc2libGUpO1xuICAgIH0pO1xuICB9XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGUgPT4ge1xuICAgIEJvYXJkLnByb3RvdHlwZS5lbmFibGVCdXR0b24oKTtcbiAgICBpZiAoZS5rZXkgPT0gXCJFc2NhcGVcIiAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsLmlzLXZpc2libGVcIikpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwuaXMtdmlzaWJsZVwiKS5jbGFzc0xpc3QucmVtb3ZlKGlzVmlzaWJsZSk7XG4gICAgfVxuICB9KTtcbn1cblxuIiwiY29uc3QgU1RBUlRfTk9ERV9ST1cgPSAxODtcbmNvbnN0IFNUQVJUX05PREVfQ09MID0gMTtcbmNvbnN0IEZJTklTSF9OT0RFX1JPVyA9IDE7XG5jb25zdCBGSU5JU0hfTk9ERV9DT0wgPSA0ODtcblxuY29uc3QgV0FMTF9OT0RFUyA9IFtcbiAgWzEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDFdLFxuICBbMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMV0sXG4gIFsxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxXSxcbiAgWzEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDFdLFxuICBbMSwgMSwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMV0sXG4gIFsxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxXSxcbiAgWzEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDAsIDEsIDEsIDAsIDAsIDFdLFxuICBbMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMV0sXG4gIFsxLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAxXSxcbiAgWzEsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICBbMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMV0sXG4gIFsxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAwLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxXSxcbiAgWzEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDFdLFxuICBbMSwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMSwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMSwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMV0sXG4gIFsxLCAwLCAwLCAxLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxXSxcbiAgWzEsIDAsIDEsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDEsIDAsIDEsIDAsIDAsIDEsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDFdLFxuICBbMSwgMCwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMV0sXG4gIFsxLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxXSxcbiAgWzEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICBbMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMV0sXG5dXG5cbmNsYXNzIE5vZGUge1xuICBjb25zdHJ1Y3Rvcihyb3csIGNvbCkge1xuICAgIHRoaXMucm93ID0gcm93O1xuICAgIHRoaXMuY29sID0gY29sO1xuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XG4gICAgdGhpcy5pc1N0YXJ0ID0gdGhpcy5pc1N0YXJ0KCk7XG4gICAgdGhpcy5pc0ZpbmlzaCA9IHRoaXMuaXNGaW5pc2goKTtcbiAgICB0aGlzLmlzV2FsbCA9IHRoaXMuaXNXYWxsKCk7XG4gICAgdGhpcy5wcmV2aW91c05vZGUgPSBudWxsO1xuICAgIHRoaXMuZGlzdGFuY2UgPSBJbmZpbml0eTtcbiAgICB0aGlzLmlzVmlzaXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgaXNXYWxsKCkge1xuICAgIGNvbnN0IHIgPSB0aGlzLnJvdztcbiAgICBjb25zdCBjID0gdGhpcy5jb2w7XG4gICAgaWYgKFdBTExfTk9ERVNbcl1bY10pIHtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoXCJ3YWxsXCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc1N0YXJ0KCkge1xuICAgIGlmICh0aGlzLnJvdyA9PT0gU1RBUlRfTk9ERV9ST1cgJiYgdGhpcy5jb2wgPT09IFNUQVJUX05PREVfQ09MKSB7XG4gICAgICB0aGlzLmFkZENsYXNzKFwibm9kZS1zdGFydFwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNGaW5pc2goKSB7XG4gICAgaWYgKHRoaXMucm93ID09PSBGSU5JU0hfTk9ERV9ST1cgJiYgdGhpcy5jb2wgPT09IEZJTklTSF9OT0RFX0NPTCkge1xuICAgICAgdGhpcy5hZGRDbGFzcyhcIm5vZGUtZmluaXNoXCIpO1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge1xuICAgIGxldCBub2RlRWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGhpcy5yb3d9LSR7dGhpcy5jb2x9YClcbiAgICBub2RlRWxlLmNsYXNzTmFtZSArPSBgICR7Y2xhc3NOYW1lfWA7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBOb2RlOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBCb2FyZCBmcm9tIFwiLi9zY3JpcHRzL2JvYXJkXCI7XG5pbXBvcnQge3RvZ2dsZU1vZGFsfSBmcm9tIFwiLi9zY3JpcHRzL21vZGFsXCI7XG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncmlkXCIpO1xuICBjb25zdCBib2FyZCA9IGVsID0+IG5ldyBCb2FyZChlbCk7XG4gIGJvYXJkKGVsKTtcbiAgdG9nZ2xlTW9kYWwoKTtcbn0pO1xuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=