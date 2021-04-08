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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



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
    this.nodeClicked = null;
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

            if (currentNode.isStart || currentNode.mouseDown) {
              if (board.previous === board.nodeClicked) {
                currentNode.mouseDown = true;
              }

              board.buttonsOn = true;
              board.nodeClicked = currentElement;

              if (!board.myPath.includes(currentNode)) {
                board.myPath.push(currentNode);
              }
            }
          });
          currentElement.addEventListener("mouseenter", function (e) {
            if (board.buttonsOn) {
              currentNode.mouseDown = true; // board.nodeClicked = currentElement;
              // debugger

              if (!board.myPath.includes(currentNode)) {
                //board.previous === board.nodeClicked
                board.myPath.push(currentNode);
                currentElement.className += " clicked";
              }
            }
          });
          currentElement.addEventListener("mouseleave", function (e) {
            if (board.buttonsOn) {
              board.previous = currentElement;
            }
          });
          currentElement.addEventListener("mouseup", function (e) {
            if (board.buttonsOn) {
              board.previous = currentElement;
              board.buttonsOn = false; // board.nodeClicked = currentElement;   
            }

            debugger;
          });
        };

        for (var col = 0; col < board.maxCol; col++) {
          _loop(col);
        }
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

/***/ "./src/scripts/node.js":
/*!*****************************!*\
  !*** ./src/scripts/node.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var START_NODE_ROW = 10;
var START_NODE_COL = 15;
var FINISH_NODE_ROW = 10;
var FINISH_NODE_COL = 25;

var Node = /*#__PURE__*/function () {
  function Node(row, col) {
    _classCallCheck(this, Node);

    this.row = row;
    this.col = col;
    this.mouseDown = false;
    this.isStart = this.isStart();
    this.isFinish = this.isFinish();
  }

  _createClass(Node, [{
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


document.addEventListener("DOMContentLoaded", function () {
  var el = document.getElementById("grid");
  new _scripts_board__WEBPACK_IMPORTED_MODULE_1__.default(el);
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL25vZGUuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkJvYXJkIiwiZWwiLCJtYXhSb3ciLCJtYXhDb2wiLCJncmlkIiwibXlQYXRoIiwiYm9hcmQiLCJjcmVhdGVCb2FyZCIsImFkZEV2ZW50TGlzdGVuZXJzIiwiYnV0dG9uc09uIiwicHJldmlvdXMiLCJub2RlQ2xpY2tlZCIsInJvdyIsImJvYXJkUm93IiwibmV3RWxlUm93IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiYXBwZW5kQ2hpbGQiLCJjb2wiLCJuZXdFbGVOb2RlIiwic2V0QXR0cmlidXRlIiwibm9kZSIsIk5vZGUiLCJwdXNoIiwiY3VycmVudElkIiwiY3VycmVudE5vZGUiLCJnZXROb2RlIiwiY3VycmVudEVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJpc1N0YXJ0IiwibW91c2VEb3duIiwiaW5jbHVkZXMiLCJpZCIsImNvb3JkaW5hdGVzIiwic3BsaXQiLCJwYXJzZUludCIsIlNUQVJUX05PREVfUk9XIiwiU1RBUlRfTk9ERV9DT0wiLCJGSU5JU0hfTk9ERV9ST1ciLCJGSU5JU0hfTk9ERV9DT0wiLCJpc0ZpbmlzaCIsImFkZENsYXNzIiwibm9kZUVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBR01BLEs7QUFDSixpQkFBWUMsRUFBWixFQUFnQjtBQUFBOztBQUNkLFNBQUtBLEVBQUwsR0FBVUEsRUFBVjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEtBQUtDLFdBQUwsRUFBYjtBQUNBLFNBQUtDLGlCQUFMO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0Q7Ozs7V0FFRCx1QkFBYztBQUNaLFdBQUssSUFBSUMsR0FBRyxHQUFHLENBQWYsRUFBa0JBLEdBQUcsR0FBRyxLQUFLVixNQUE3QixFQUFxQ1UsR0FBRyxFQUF4QyxFQUE0QztBQUMxQyxZQUFJQyxRQUFRLEdBQUcsRUFBZjtBQUNBLFlBQUlDLFNBQVMsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBQ0FGLGlCQUFTLENBQUNHLFNBQVYsR0FBc0IsVUFBdEI7QUFDQSxhQUFLaEIsRUFBTCxDQUFRaUIsV0FBUixDQUFvQkosU0FBcEI7O0FBRUEsYUFBSyxJQUFJSyxHQUFHLEdBQUcsQ0FBZixFQUFrQkEsR0FBRyxHQUFHLEtBQUtoQixNQUE3QixFQUFxQ2dCLEdBQUcsRUFBeEMsRUFBNEM7QUFDMUMsY0FBSUMsVUFBVSxHQUFHTCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBakI7QUFDQUksb0JBQVUsQ0FBQ0gsU0FBWCxHQUF1QixNQUF2QjtBQUNBRyxvQkFBVSxDQUFDQyxZQUFYLENBQXdCLElBQXhCLFlBQWlDVCxHQUFqQyxjQUF3Q08sR0FBeEM7QUFDQUwsbUJBQVMsQ0FBQ0ksV0FBVixDQUFzQkUsVUFBdEI7QUFDQSxjQUFJRSxJQUFJLEdBQUcsSUFBSUMsMENBQUosQ0FBU1gsR0FBVCxFQUFjTyxHQUFkLENBQVg7QUFDQU4sa0JBQVEsQ0FBQ1csSUFBVCxDQUFjRixJQUFkO0FBQ0Q7O0FBRUQsYUFBS2xCLElBQUwsQ0FBVW9CLElBQVYsQ0FBZVgsUUFBZjtBQUNEO0FBQ0Y7OztXQUVELDZCQUFvQjtBQUNsQixVQUFJUCxLQUFLLEdBQUcsSUFBWjs7QUFDQSxXQUFLLElBQUlNLEdBQUcsR0FBRyxDQUFmLEVBQWtCQSxHQUFHLEdBQUdOLEtBQUssQ0FBQ0osTUFBOUIsRUFBc0NVLEdBQUcsRUFBekMsRUFBNkM7QUFBQSxtQ0FDbENPLEdBRGtDO0FBRXpDLGNBQUlNLFNBQVMsYUFBTWIsR0FBTixjQUFhTyxHQUFiLENBQWI7QUFDQSxjQUFJTyxXQUFXLEdBQUdwQixLQUFLLENBQUNxQixPQUFOLENBQWNGLFNBQWQsQ0FBbEI7QUFDQSxjQUFJRyxjQUFjLEdBQUdiLFFBQVEsQ0FBQ2MsY0FBVCxDQUF3QkosU0FBeEIsQ0FBckI7QUFFQUcsd0JBQWMsQ0FBQ0UsZ0JBQWYsQ0FBZ0MsV0FBaEMsRUFBNkMsVUFBU0MsQ0FBVCxFQUFZO0FBQ3ZEQSxhQUFDLENBQUNDLGNBQUY7O0FBQ0EsZ0JBQUlOLFdBQVcsQ0FBQ08sT0FBWixJQUF1QlAsV0FBVyxDQUFDUSxTQUF2QyxFQUFrRDtBQUVoRCxrQkFBSTVCLEtBQUssQ0FBQ0ksUUFBTixLQUFtQkosS0FBSyxDQUFDSyxXQUE3QixFQUEwQztBQUN4Q2UsMkJBQVcsQ0FBQ1EsU0FBWixHQUF3QixJQUF4QjtBQUNEOztBQUVENUIsbUJBQUssQ0FBQ0csU0FBTixHQUFrQixJQUFsQjtBQUNBSCxtQkFBSyxDQUFDSyxXQUFOLEdBQW9CaUIsY0FBcEI7O0FBQ0Esa0JBQUksQ0FBQ3RCLEtBQUssQ0FBQ0QsTUFBTixDQUFhOEIsUUFBYixDQUFzQlQsV0FBdEIsQ0FBTCxFQUF5QztBQUN2Q3BCLHFCQUFLLENBQUNELE1BQU4sQ0FBYW1CLElBQWIsQ0FBa0JFLFdBQWxCO0FBQ0Q7QUFDRjtBQUNGLFdBZEQ7QUFnQkFFLHdCQUFjLENBQUNFLGdCQUFmLENBQWdDLFlBQWhDLEVBQThDLFVBQVNDLENBQVQsRUFBWTtBQUN4RCxnQkFBSXpCLEtBQUssQ0FBQ0csU0FBVixFQUFxQjtBQUNuQmlCLHlCQUFXLENBQUNRLFNBQVosR0FBd0IsSUFBeEIsQ0FEbUIsQ0FFbkI7QUFDQTs7QUFFQSxrQkFBSSxDQUFDNUIsS0FBSyxDQUFDRCxNQUFOLENBQWE4QixRQUFiLENBQXNCVCxXQUF0QixDQUFMLEVBQXlDO0FBQUc7QUFDNUNwQixxQkFBSyxDQUFDRCxNQUFOLENBQWFtQixJQUFiLENBQWtCRSxXQUFsQjtBQUNFRSw4QkFBYyxDQUFDWCxTQUFmLElBQTRCLFVBQTVCO0FBQ0Q7QUFDRjtBQUNGLFdBWEQ7QUFhQVcsd0JBQWMsQ0FBQ0UsZ0JBQWYsQ0FBZ0MsWUFBaEMsRUFBK0MsVUFBU0MsQ0FBVCxFQUFZO0FBQ3pELGdCQUFJekIsS0FBSyxDQUFDRyxTQUFWLEVBQXFCO0FBQ25CSCxtQkFBSyxDQUFDSSxRQUFOLEdBQWlCa0IsY0FBakI7QUFDRDtBQUNGLFdBSkQ7QUFPQUEsd0JBQWMsQ0FBQ0UsZ0JBQWYsQ0FBZ0MsU0FBaEMsRUFBMkMsVUFBU0MsQ0FBVCxFQUFZO0FBQ3JELGdCQUFJekIsS0FBSyxDQUFDRyxTQUFWLEVBQXFCO0FBQ25CSCxtQkFBSyxDQUFDSSxRQUFOLEdBQWlCa0IsY0FBakI7QUFDQXRCLG1CQUFLLENBQUNHLFNBQU4sR0FBa0IsS0FBbEIsQ0FGbUIsQ0FHbkI7QUFDRDs7QUFDRDtBQUNELFdBUEQ7QUExQ3lDOztBQUMzQyxhQUFLLElBQUlVLEdBQUcsR0FBRyxDQUFmLEVBQWtCQSxHQUFHLEdBQUdiLEtBQUssQ0FBQ0gsTUFBOUIsRUFBc0NnQixHQUFHLEVBQXpDLEVBQTZDO0FBQUEsZ0JBQXBDQSxHQUFvQztBQWtENUM7QUFDRjtBQUNGOzs7V0FFRCxpQkFBUWlCLEVBQVIsRUFBWTtBQUNWLFVBQUlDLFdBQVcsR0FBR0QsRUFBRSxDQUFDRSxLQUFILENBQVMsR0FBVCxDQUFsQjtBQUNBLFVBQUkxQixHQUFHLEdBQUcyQixRQUFRLENBQUNGLFdBQVcsQ0FBQyxDQUFELENBQVosQ0FBbEI7QUFDQSxVQUFJbEIsR0FBRyxHQUFHb0IsUUFBUSxDQUFDRixXQUFXLENBQUMsQ0FBRCxDQUFaLENBQWxCO0FBQ0EsYUFBTyxLQUFLakMsSUFBTCxDQUFVUSxHQUFWLEVBQWVPLEdBQWYsQ0FBUDtBQUNEOzs7Ozs7QUFTSCwrREFBZW5CLEtBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1R0EsSUFBTXdDLGNBQWMsR0FBRyxFQUF2QjtBQUNBLElBQU1DLGNBQWMsR0FBRyxFQUF2QjtBQUNBLElBQU1DLGVBQWUsR0FBRyxFQUF4QjtBQUNBLElBQU1DLGVBQWUsR0FBRyxFQUF4Qjs7SUFFTXBCLEk7QUFDSixnQkFBWVgsR0FBWixFQUFpQk8sR0FBakIsRUFBc0I7QUFBQTs7QUFDcEIsU0FBS1AsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS08sR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS2UsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFNBQUtELE9BQUwsR0FBZSxLQUFLQSxPQUFMLEVBQWY7QUFDQSxTQUFLVyxRQUFMLEdBQWdCLEtBQUtBLFFBQUwsRUFBaEI7QUFDRDs7OztXQUVELG1CQUFVO0FBQ1IsVUFBSSxLQUFLaEMsR0FBTCxLQUFhNEIsY0FBYixJQUErQixLQUFLckIsR0FBTCxLQUFhc0IsY0FBaEQsRUFBZ0U7QUFDOUQsYUFBS0ksUUFBTCxDQUFjLFlBQWQ7QUFDQSxlQUFPLElBQVA7QUFDRDs7QUFBQTtBQUNELGFBQU8sS0FBUDtBQUNEOzs7V0FFRCxvQkFBVztBQUNULFVBQUksS0FBS2pDLEdBQUwsS0FBYThCLGVBQWIsSUFBZ0MsS0FBS3ZCLEdBQUwsS0FBYXdCLGVBQWpELEVBQWtFO0FBQ2hFLGFBQUtFLFFBQUwsQ0FBYyxhQUFkO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7O0FBQUE7QUFDRCxhQUFPLEtBQVA7QUFDRDs7O1dBRUQsa0JBQVM1QixTQUFULEVBQW9CO0FBQ2xCLFVBQUk2QixPQUFPLEdBQUcvQixRQUFRLENBQUNjLGNBQVQsV0FBMkIsS0FBS2pCLEdBQWhDLGNBQXVDLEtBQUtPLEdBQTVDLEVBQWQ7QUFDQTJCLGFBQU8sQ0FBQzdCLFNBQVIsZUFBeUJBLFNBQXpCO0FBQ0Q7Ozs7OztBQUdILCtEQUFlTSxJQUFmLEU7Ozs7Ozs7Ozs7O0FDcENBOzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBR0FSLFFBQVEsQ0FBQ2UsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7QUFDdkQsTUFBTTdCLEVBQUUsR0FBR2MsUUFBUSxDQUFDYyxjQUFULENBQXdCLE1BQXhCLENBQVg7QUFFQSxNQUFJN0IsbURBQUosQ0FBVUMsRUFBVjtBQUVELENBTEQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5vZGUgZnJvbSAnLi9ub2RlJztcblxuXG5jbGFzcyBCb2FyZCB7XG4gIGNvbnN0cnVjdG9yKGVsKSB7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMubWF4Um93ID0gMjA7XG4gICAgdGhpcy5tYXhDb2wgPSA1MDtcbiAgICB0aGlzLmdyaWQgPSBbXTtcbiAgICB0aGlzLm15UGF0aCA9IFtdO1xuICAgIHRoaXMuYm9hcmQgPSB0aGlzLmNyZWF0ZUJvYXJkKCk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuYnV0dG9uc09uID0gZmFsc2U7XG4gICAgdGhpcy5wcmV2aW91cyA9IG51bGw7XG4gICAgdGhpcy5ub2RlQ2xpY2tlZCA9IG51bGw7XG4gIH1cblxuICBjcmVhdGVCb2FyZCgpIHtcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLm1heFJvdzsgcm93KyspIHtcbiAgICAgIGxldCBib2FyZFJvdyA9IFtdO1xuICAgICAgbGV0IG5ld0VsZVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBuZXdFbGVSb3cuY2xhc3NOYW1lID0gXCJub2RlLXJvd1wiO1xuICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZChuZXdFbGVSb3cpO1xuXG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLm1heENvbDsgY29sKyspIHtcbiAgICAgICAgbGV0IG5ld0VsZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBuZXdFbGVOb2RlLmNsYXNzTmFtZSA9IFwibm9kZVwiO1xuICAgICAgICBuZXdFbGVOb2RlLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3Jvd30tJHtjb2x9YClcbiAgICAgICAgbmV3RWxlUm93LmFwcGVuZENoaWxkKG5ld0VsZU5vZGUpO1xuICAgICAgICBsZXQgbm9kZSA9IG5ldyBOb2RlKHJvdywgY29sKVxuICAgICAgICBib2FyZFJvdy5wdXNoKG5vZGUpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuZ3JpZC5wdXNoKGJvYXJkUm93KVxuICAgIH1cbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGxldCBib2FyZCA9IHRoaXM7XG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgYm9hcmQubWF4Um93OyByb3crKykge1xuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgYm9hcmQubWF4Q29sOyBjb2wrKykge1xuICAgICAgICBsZXQgY3VycmVudElkID0gYCR7cm93fS0ke2NvbH1gO1xuICAgICAgICBsZXQgY3VycmVudE5vZGUgPSBib2FyZC5nZXROb2RlKGN1cnJlbnRJZCk7XG4gICAgICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1cnJlbnRJZCk7XG5cbiAgICAgICAgY3VycmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlmIChjdXJyZW50Tm9kZS5pc1N0YXJ0IHx8IGN1cnJlbnROb2RlLm1vdXNlRG93bikge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoYm9hcmQucHJldmlvdXMgPT09IGJvYXJkLm5vZGVDbGlja2VkKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnROb2RlLm1vdXNlRG93biA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJvYXJkLmJ1dHRvbnNPbiA9IHRydWVcbiAgICAgICAgICAgIGJvYXJkLm5vZGVDbGlja2VkID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoIWJvYXJkLm15UGF0aC5pbmNsdWRlcyhjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgICAgICAgYm9hcmQubXlQYXRoLnB1c2goY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgY3VycmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChib2FyZC5idXR0b25zT24pIHtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlLm1vdXNlRG93biA9IHRydWU7XG4gICAgICAgICAgICAvLyBib2FyZC5ub2RlQ2xpY2tlZCA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgICAgICAgLy8gZGVidWdnZXJcblxuICAgICAgICAgICAgaWYgKCFib2FyZC5teVBhdGguaW5jbHVkZXMoY3VycmVudE5vZGUpKSB7ICAvL2JvYXJkLnByZXZpb3VzID09PSBib2FyZC5ub2RlQ2xpY2tlZFxuICAgICAgICAgICAgYm9hcmQubXlQYXRoLnB1c2goY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudC5jbGFzc05hbWUgKz0gXCIgY2xpY2tlZFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY3VycmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiAsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoYm9hcmQuYnV0dG9uc09uKSB7XG4gICAgICAgICAgICBib2FyZC5wcmV2aW91cyA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuXG4gICAgICAgIGN1cnJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoYm9hcmQuYnV0dG9uc09uKSB7XG4gICAgICAgICAgICBib2FyZC5wcmV2aW91cyA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgICAgICAgYm9hcmQuYnV0dG9uc09uID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBib2FyZC5ub2RlQ2xpY2tlZCA9IGN1cnJlbnRFbGVtZW50OyAgIFxuICAgICAgICAgIH1cbiAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldE5vZGUoaWQpIHtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBpZC5zcGxpdChcIi1cIik7XG4gICAgbGV0IHJvdyA9IHBhcnNlSW50KGNvb3JkaW5hdGVzWzBdKTtcbiAgICBsZXQgY29sID0gcGFyc2VJbnQoY29vcmRpbmF0ZXNbMV0pO1xuICAgIHJldHVybiB0aGlzLmdyaWRbcm93XVtjb2xdO1xuICB9O1xuXG4gIC8vIGFwcGVuZEVsZW1lbnRUb0RvbShjbGFzc05hbWUsIHBhcmVudD10aGlzLmVsKSB7XG4gIC8vICAgbGV0IGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgLy8gICBjaGlsZC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gIC8vICAgcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgLy8gfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCb2FyZDsiLCJjb25zdCBTVEFSVF9OT0RFX1JPVyA9IDEwO1xuY29uc3QgU1RBUlRfTk9ERV9DT0wgPSAxNTtcbmNvbnN0IEZJTklTSF9OT0RFX1JPVyA9IDEwO1xuY29uc3QgRklOSVNIX05PREVfQ09MID0gMjU7XG5cbmNsYXNzIE5vZGUge1xuICBjb25zdHJ1Y3Rvcihyb3csIGNvbCkge1xuICAgIHRoaXMucm93ID0gcm93O1xuICAgIHRoaXMuY29sID0gY29sO1xuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XG4gICAgdGhpcy5pc1N0YXJ0ID0gdGhpcy5pc1N0YXJ0KCk7XG4gICAgdGhpcy5pc0ZpbmlzaCA9IHRoaXMuaXNGaW5pc2goKTtcbiAgfVxuXG4gIGlzU3RhcnQoKSB7XG4gICAgaWYgKHRoaXMucm93ID09PSBTVEFSVF9OT0RFX1JPVyAmJiB0aGlzLmNvbCA9PT0gU1RBUlRfTk9ERV9DT0wpIHtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoXCJub2RlLXN0YXJ0XCIpO1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzRmluaXNoKCkge1xuICAgIGlmICh0aGlzLnJvdyA9PT0gRklOSVNIX05PREVfUk9XICYmIHRoaXMuY29sID09PSBGSU5JU0hfTk9ERV9DT0wpIHtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoXCJub2RlLWZpbmlzaFwiKTtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhZGRDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBsZXQgbm9kZUVsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RoaXMucm93fS0ke3RoaXMuY29sfWApXG4gICAgbm9kZUVsZS5jbGFzc05hbWUgKz0gYCAke2NsYXNzTmFtZX1gO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vZGU7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IEJvYXJkIGZyb20gXCIuL3NjcmlwdHMvYm9hcmRcIlxuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JpZFwiKVxuXG4gIG5ldyBCb2FyZChlbClcbiAgXG59KVxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=