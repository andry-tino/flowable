/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Arc = exports.ChildInfo = exports.Node = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * tree.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Andrea Tino - 2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _relation = __webpack_require__(6);

var relation = _interopRequireWildcard(_relation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Describes a node in the tree.
 * Every node only stores information about children, no info for parent is persisted.
 * 
 * @export
 * @class Node
 */
var Node = exports.Node = function () {
    /**
     * Creates an instance of Node.
     * @param {any} content An object exposing a property called `id`.
     * @memberof Node
     */
    function Node(content) {
        _classCallCheck(this, Node);

        if (!content) throw "content cannot be null or undefined";

        this.children = [];
        this.arcs = [];
        this._content = content;
    }

    /**
     * Gets the content of the node.
     * 
     * @readonly
     * @memberof Node
     */


    _createClass(Node, [{
        key: "child",


        /**
         * Returns the n-th child and arc. Null if not present.
         * If index is out of bound, null is returned.
         * 
         * @param {Number} n A number representing the index (1-based)
         * @memberof Node
         */
        value: function child(n) {
            return this.children.length === 0 || n > this.children.length || n <= 0 ? null : new ChildInfo(this.children[n - 1], this.arcs[n - 1]);
        }

        /**
         * Gets the number of children.
         * 
         * @readonly
         * @memberof Node
         */

    }, {
        key: "addChild",


        /**
         * Adds a node as child.
         * 
         * @param {Node} node 
         * @param {Arc} arc 
         * @returns 
         * @memberof Node
         */
        value: function addChild(node, arc) {
            if (!node) throw "node cannot be null or undefined";
            if (!arc) throw "node cannot be null or undefined";

            this.children.push(node);
            this.arcs.push(arc);
        }
    }, {
        key: "content",
        get: function get() {
            return this._content;
        }

        /**
         * Gets the id of the content.
         * 
         * @readonly
         * @memberof Node
         */

    }, {
        key: "id",
        get: function get() {
            return this._content.id;
        }

        /**
         * Gets the first child and arc. If no children is present, null is returned.
         * 
         * @readonly
         * @memberof Node
         */

    }, {
        key: "firstChild",
        get: function get() {
            return this.children.length === 0 ? null : new ChildInfo(this.children[0], this.arcs[0]);
        }

        /**
         * Gets the last child and arc. If no children is present, null is returned.
         * 
         * @readonly
         * @memberof Node
         */

    }, {
        key: "lastChild",
        get: function get() {
            return this.children.length === 0 ? null : new ChildInfo(this.children[this.children.length - 1], this.arcs[this.arcs.length - 1]);
        }
    }, {
        key: "count",
        get: function get() {
            return this.children.length;
        }
    }]);

    return Node;
}();

/**
 * Describes information of a Node's child.
 * 
 * @export
 * @class ChildInfo
 */


var ChildInfo = exports.ChildInfo = function () {
    /**
     * Creates an instance of ChildInfo.
     * @param {Node} node 
     * @param {Arc} arc 
     * @memberof ChildInfo
     */
    function ChildInfo(node, arc) {
        _classCallCheck(this, ChildInfo);

        if (!node) throw "node cannot be null or undefined";
        if (!arc) throw "arc cannot be null or underfined";

        this._node = node;
        this._arc = arc;
    }

    /**
     * Gets the node.
     * 
     * @readonly
     * @memberof ChildInfo
     */


    _createClass(ChildInfo, [{
        key: "node",
        get: function get() {
            return this._node;
        }

        /**
         * Gets the arc.
         * 
         * @readonly
         * @memberof ChildInfo
         */

    }, {
        key: "arc",
        get: function get() {
            return this._arc;
        }
    }]);

    return ChildInfo;
}();

/**
 * Describes an arc.
 * 
 * @export
 * @class Arc
 */


var Arc = exports.Arc = function () {
    /**
     * Creates an instance of Arc.
     * @param {Number} type 
     * @memberof Arc
     */
    function Arc(type) {
        _classCallCheck(this, Arc);

        if (!type) type = Arc.D;

        this._type = type;
    }

    /**
     * Gets the value for DOWN arc type.
     * 
     * @readonly
     * @static
     * @memberof Arc
     */


    _createClass(Arc, [{
        key: "type",


        /**
         * Gets the type of arc.
         * 
         * @readonly
         * @memberof Arc
         */
        get: function get() {
            return this._type;
        }
    }], [{
        key: "D",
        get: function get() {
            return relation.Relation.D;
        }

        /**
         * Gets the value for UP arc type.
         * 
         * @readonly
         * @static
         * @memberof Arc
         */

    }, {
        key: "U",
        get: function get() {
            return relation.Relation.U;
        }

        /**
         * Gets the value for LEFT arc type.
         * 
         * @readonly
         * @static
         * @memberof Arc
         */

    }, {
        key: "L",
        get: function get() {
            return relation.Relation.L;
        }

        /**
         * Gets the value for RIGHT arc type.
         * 
         * @readonly
         * @static
         * @memberof Arc
         */

    }, {
        key: "R",
        get: function get() {
            return relation.Relation.R;
        }
    }]);

    return Arc;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * relationsTable.js
 * Andrea Tino - 2017
 */

/**
 * Describes a table containing relations.
 * This class performs checks on the collection in order to avoid duplicates.
 * 
 * @export
 * @class RelationsTable
 */
var RelationsTable = exports.RelationsTable = function () {
    /**
     * Creates an instance of RelationsTable.
     * @memberof RelationsTable
     */
    function RelationsTable() {
        _classCallCheck(this, RelationsTable);

        this.relations = [];
        this.boxes = {}; // We keep a dictionary of boxes: id -> box
    }

    /**
     * Adds a relation to the table.
     * 
     * @param {any} relation 
     * @memberof RelationsTable
     */


    _createClass(RelationsTable, [{
        key: "add",
        value: function add(relation) {
            if (!relation) throw "relation cannot be null or undefined";
            if (!relation.rhs) throw "relation's RHS cannot be null or undefined";
            if (!relation.lhs) throw "relation's LHS cannot be null or undefined";

            this.relations.push(relation);

            if (!this.boxes[relation.rhs.id]) this.boxes[relation.rhs.id] = relation.rhs;
            if (!this.boxes[relation.lhs.id]) this.boxes[relation.lhs.id] = relation.lhs;
        }

        /**
         * Gets a box by providing the id.
         * 
         * @param {String} id 
         * @memberof RelationsTable
         */

    }, {
        key: "getBox",
        value: function getBox(id) {
            if (!id) throw "id cannot be null or undefined";

            var box = this.boxes[id];
            if (!box) return null;

            return box;
        }

        /**
         * Iterates through the relations.
         * 
         * @param {any} action 
         * @memberof RelationsTable
         */

    }, {
        key: "each",
        value: function each(action) {
            if (!action) throw "action cannot be null or undefined";

            for (var i = 0; i < this.relations.length; i++) {
                action(this.relations[i]);
            }
        }

        /**
         * Gets the length of the table (number of relations).
         * 
         * @readonly
         * @memberof RelationsTable
         */

    }, {
        key: "size",
        get: function get() {
            return this.relations.length;
        }
    }]);

    return RelationsTable;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hitTest = hitTest;
exports.assert = assert;
/**
 * utils.js
 * Andrea Tino - 2017
 */

/**
 * Gets a value indicating whether two rectangles overlaps each other or not.
 * 
 * @export
 * @param {any} xa1 
 * @param {any} xa2 
 * @param {any} ya1 
 * @param {any} ya2 
 * @param {any} xb1 
 * @param {any} xb2 
 * @param {any} yb1 
 * @param {any} yb2 
 */
function hitTest(xa1, xa2, ya1, ya2, xb1, xb2, yb1, yb2) {
    assert(xa1 <= xa2);
    assert(ya1 <= ya2);
    assert(xb1 <= xb2);
    assert(yb1 <= yb2);

    var r1 = { x1: xa1, x2: xa2, y1: ya1, y2: ya2 };
    var r2 = { x1: xb1, x2: xb2, y1: yb1, y2: yb2 };

    // The rectangles don't overlap if
    // one rectangle's minimum in some dimension 
    // is greater than the other's maximum in
    // that dimension.
    var noOverlap = r1.x1 > r2.x2 || r2.x1 > r1.x2 || r1.y1 > r2.y2 || r2.y1 > r1.y2;

    return !noOverlap;
}

/**
 * Asserts.
 * 
 * @export
 * @param {any} prop 
 */
function assert(prop) {
    if (prop === true) {
        return;
    }

    if (prop === false) {
        throw "Assert failure on: " + prop;
    }

    throw "Assert (type) failure on: " + prop;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

__webpack_require__(8);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Arranger = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * arranger.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Andrea Tino - 2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _relationsTable = __webpack_require__(1);

var relationsTable = _interopRequireWildcard(_relationsTable);

var _table2tree = __webpack_require__(5);

var treeTableConversions = _interopRequireWildcard(_table2tree);

var _tree = __webpack_require__(0);

var tree = _interopRequireWildcard(_tree);

var _treeTraversal = __webpack_require__(7);

var traversal = _interopRequireWildcard(_treeTraversal);

var _utils = __webpack_require__(2);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Describes the arranging algorithm.
 * The algorithm takes as input a table of boxes, those 
 * boxes will be modified, not copied.
 * 
 * @export
 * @class Arranger
 */
var Arranger = exports.Arranger = function () {
    /**
     * Creates an instance of Arranger.
     * @param {relationsTable.RelationsTable} table 
     * @memberof Arranger
     */
    function Arranger(table) {
        _classCallCheck(this, Arranger);

        if (!table) throw "table cannot be null or undefined";

        this.table = table;
        this.root = null; // The root of the tree

        this._marginX = 10; // In pixels
        this._marginY = 10; // In pixels
    }

    /**
     * Gets the horizontal margin.
     * 
     * @memberof Arranger
     */


    _createClass(Arranger, [{
        key: "run",


        /**
         * Runs the algorithm.
         * 
         * @memberof Arranger
         */
        value: function run() {
            if (!this.root) {
                this.root = new treeTableConversions.Table2Tree(this.table).convert();
                if (!this.root) throw "Error during table2tree conversion";
            }

            // Using dummy grid as default algorithm
            //arrangeInDummyGrid(this.root, { marginx: 10, marginy: 10 });
            // Using dictionary grid as default algorithm
            arrangeInDictionaryGrid(this.root, { marginx: 10, marginy: 10 });
        }
    }, {
        key: "marginX",
        get: function get() {
            return this._marginX;
        }

        /**
         * Sets the horizontal margin.
         * 
         * @memberof Arranger
         */
        ,
        set: function set(value) {
            this._marginX = value;
        }

        /**
         * Gets the vertical margin.
         * 
         * @memberof Arranger
         */

    }, {
        key: "marginY",
        get: function get() {
            return this._marginY;
        }

        /**
         * Sets the vertical margin.
         * 
         * @memberof Arranger
         */
        ,
        set: function set(value) {
            this._marginY = value;
        }
    }]);

    return Arranger;
}();

/**
 * Algorithm for arranging boxes in a sophisticated grid by using a 
 * point-to-box dictionary to keep track of used space.
 * 
 * @param {any} node 
 * @param {any} config Expects the following:
 *                     { marginx, marginy }
 */


function arrangeInDictionaryGrid(node, config) {
    if (!node) {
        throw "Node cannot be null or undefined! Cannot arrange.";
    }

    if (!config) {
        // Default config
        config = {
            marginx: 10,
            marginy: 10
        };
    }

    // Here we should have the tree
    var traverser = new traversal.TreeTraverser(node);

    // Initialize
    traverser.traverse(function (node, type) {
        var box = node.content;
        if (!box) throw "Node content (box) not present";

        box.x = 0;
        box.y = 0;

        // TODO: Add checks for dimensions
    });

    var my = config.marginy;
    var mx = config.marginx;

    /*
     * The dictionary will contain single column associations to boxes
     * x, y: string(int) -> [box]
     */
    var dict = {
        minx: 0,
        miny: 0,
        maxx: 0,
        maxy: 0,
        x: {},
        y: {}
    };

    var addBoxToDict = function addBoxToDict(box) {
        if (!box) throw "box cannot be null or undefined";

        var x1 = box.x,
            x2 = box.x + box.width,
            y1 = box.y,
            y2 = box.y + box.height;

        for (var i = x1; i <= x2; i++) {
            dict.x["" + i] = dict.x["" + i] || [];
            dict.x["" + i].push(box);
        }
        for (var j = y1; j <= y2; j++) {
            dict.y["" + j] = dict.y["" + j] || [];
            dict.y["" + j].push(box);
        }

        // Update min and max
        dict.minx = x1 < dict.minx ? x1 : dict.minx;
        dict.miny = y1 < dict.miny ? y1 : dict.miny;
        dict.maxx = x2 > dict.maxx ? x2 : dict.maxx;
        dict.maxy = y2 > dict.maxy ? y2 : dict.maxy;
    };

    var buildReverseGrid = function buildReverseGrid(dict, minx, miny, maxx, maxy) {
        // Validates that the space of integers is contiguous and extract min and max
        // Returns { min: int, max: int }
        var extractExtremes = function extractExtremes(values) {
            if (values.length == 1) {
                return { min: values[0], max: values[0] };
            }

            var sortedValues = values.sort(function (a, b) {
                return a - b;
            });

            for (var k = 1; k < sortedValues.length; k++) {
                if (sortedValues[k] - sortedValues[k - 1] != 1) {
                    console.log("Inconsistent interval detected in array:", values);
                    throw "Inconsistent interval";
                }
            }

            return { min: sortedValues[0], max: sortedValues[sortedValues.length - 1] };
        };

        // x, y: boxid -> [xvals:int]
        var revdict = {
            x: {},
            y: {}
        };

        for (var i = minx; i <= maxx; i++) {
            var entries = dict.x["" + i];
            if (!entries || entries.length == 0) continue;

            for (var k = 0; k < entries.length; k++) {
                var box = entries[k];

                revdict.x[box.id] = revdict.x[box.id] || [];
                revdict.x[box.id].push(i);
            }
        }
        for (var j = miny; j <= maxy; j++) {
            var _entries = dict.y["" + j];
            if (!_entries || _entries.length == 0) continue;

            for (var _k = 0; _k < _entries.length; _k++) {
                var _box = _entries[_k];

                revdict.y[_box.id] = revdict.y[_box.id] || [];
                revdict.y[_box.id].push(j);
            }
        }

        //console.log("revdict before reassign", revdict);

        // Process each array to get extremes
        for (var _k2 = 0; _k2 < Object.keys(revdict.x).length; _k2++) {
            var boxid = Object.keys(revdict.x)[_k2];
            var values = revdict.x[boxid];

            // Reassign
            revdict.x[boxid] = extractExtremes(values);
        }
        for (var _k3 = 0; _k3 < Object.keys(revdict.y).length; _k3++) {
            var _boxid = Object.keys(revdict.y)[_k3];
            var _values = revdict.y[_boxid];

            // Reassign
            revdict.y[_boxid] = extractExtremes(_values);
        }

        return revdict;
    };

    var renderDictGrid = function renderDictGrid(dict, element) {
        var el = element || window.document.body;
        var revdict = buildReverseGrid(dict, dict.minx, dict.miny, dict.maxx, dict.maxy);

        console.log("Dict is:", dict);
        console.log("Reverse dict is:", revdict);
        console.log("Consistency test:", Object.keys(revdict.x).length === Object.keys(revdict.x).length ? "PASS" : "FAIL");

        for (var k = 0; k < Object.keys(revdict.x).length; k++) {
            var boxid = Object.keys(revdict.x)[k];
            var extremesx = revdict.x[boxid];
            var extremesy = revdict.y[boxid];

            if (!extremesx || !extremesy) {
                throw "One element in X does not found in Y or vice versa";
            }

            var div = document.createElement("div");
            div.style.width = extremesx.max - extremesx.min + "px";
            div.style.height = extremesy.max - extremesy.min + "px";
            div.style.position = "absolute";
            div.style.opacity = ".25";
            div.style.backgroundColor = "#ff9900";
            div.style.left = extremesx.min + "px";
            div.style.top = extremesy.min + "px";

            el.appendChild(div);
        }
    };

    // Returns all the boxes on the row and column line and makes intersection
    var getDictEntry = function getDictEntry(x, y) {
        var boxes_x = dict.x["" + x] || [];
        var boxes_y = dict.y["" + y] || [];
        var res = [];

        for (var i = 0; i < boxes_x.length; i++) {
            for (var j = 0; j < boxes_y.length; j++) {
                if (boxes_x[i].id === boxes_y[j].id) {
                    res.push(boxes_x[i]);
                }
            }
        }

        // Checking that we have only one entry
        if (res.length > 1) {
            throw "Colliding boxes detected";
        }

        return res.length == 0 ? null : res[0];
    };

    // Returns an object with hit details, otherwise null in case of no hit
    // Check the perimeter
    var hitTest = function hitTest(box) {
        // Top and bottom side
        for (var i = box.x; i <= box.x + box.width; i++) {
            if (!!getDictEntry(i, box.y)) {
                return {
                    box: box,
                    hitBox: getDictEntry(i, box.y),
                    x: i, y: box.y,
                    desc: "top side scan of box" };
            }
            if (!!getDictEntry(i, box.y + box.height)) {
                return {
                    box: box,
                    hitBox: getDictEntry(i, box.y + box.height),
                    x: i, y: box.y + box.height,
                    desc: "bottom side scan of box" };
            }
        }

        // Left and right side
        for (var j = box.y; j <= box.y + box.height; j++) {
            if (!!getDictEntry(box.x, j)) {
                return {
                    box: box,
                    hitBox: getDictEntry(box.x, j),
                    x: box.x, y: j,
                    desc: "left side scan of box" };
            }
            if (!!getDictEntry(box.x + box.width, j)) {
                return {
                    box: box,
                    hitBox: getDictEntry(box.x + box.width, j),
                    x: box.x + box.width, y: j,
                    desc: "right side scan of box" };
            }
        }

        return null;
    };

    // Arrange
    traverser.traverse(function (node, type, parentNode) {
        var box = node.content;
        var parentBox = parentNode ? parentNode.content : null;
        if (!box) throw "Node content (box) not present";

        // Make inherit the node its parent's coordinates for starters
        // The parent has already been positioned
        // The coordinates will be refined later.
        if (parentBox) {
            box.x = parentBox.x;
            box.y = parentBox.y;
        }

        var maxAttemptsNumber = 10;
        if (type === -1) {// Current node is the root
            // The box stays at (0, 0)
        } else if (type === tree.Arc.D) {
            // Current node is DOWN with its parent
            // Try to place the block down and check whether the block hits something
            var attemptsCounter = 0;
            for (box.y += parentBox.height + my; hitTest(box) && attemptsCounter < maxAttemptsNumber; attemptsCounter++) {
                var hitInfo = hitTest(box);
                var hitBox = hitInfo.hitBox;

                // Take the box further down
                box.y += hitBox.height + my;

                console.log("Pos DOWN", "box " + box.id, box, "failed hit test on box " + hitBox.id + ":", hitInfo, "attempt", attemptsCounter);
            }
        } else if (type === tree.Arc.U) {// Current node is UP with its parent
            // TODO
        } else if (type === tree.Arc.L) {// Current node is LEFT with its parent
            // TODO
        } else if (type === tree.Arc.R) {
            // Current node is RIGHT with its parent
            // Try to place the block to the left and check whether the block hits something
            var _attemptsCounter = 0;
            for (box.x += parentBox.width + mx; hitTest(box) && _attemptsCounter < maxAttemptsNumber; _attemptsCounter++) {
                var _hitInfo = hitTest(box);
                var _hitBox = _hitInfo.hitBox;

                // Take the box further down
                box.x += _hitBox.width + mx;

                console.log("Pos RIGHT", "box " + box.id, box, "failed hit test on box " + _hitBox.id + ":", _hitInfo, "attempt", _attemptsCounter);
            }
        } else {
            throw "Unrecognized relation type: " + type;
        }

        addBoxToDict(box);
    });

    // Debug
    //renderDictGrid(dict);
}

/**
 * Algorithm for arranging boxes in a very simplistic grid.
 * 
 * @param {any} node 
 * @param {any} config Expects the following:
 *                     { marginx, marginy }
 */
function arrangeInDummyGrid(node, config) {
    if (!node) {
        throw "Node cannot be null or undefined! Cannot arrange.";
    }

    if (!config) {
        // Default config
        config = {
            marginx: 10,
            marginy: 10
        };
    }

    // Variables used to keep track of the max values for the positions in the 4 directions
    var maxX = 0,
        minX = 0,
        maxY = 0,
        minY = 0;

    // Here we should have the tree
    var traverser = new traversal.TreeTraverser(node);

    // Initialize
    traverser.traverse(function (node, type) {
        var box = node.content;
        if (!box) throw "Node content (box) not present";

        box.x = 0;
        box.y = 0;

        // TODO: Add checks for dimensions
    });

    var my = config.marginy;
    var mx = config.marginx;

    var logger = function logger() {
        return "maxX=" + maxX + " minX=" + minX + " maxY=" + maxY + " minY=" + minY;
    };

    // Arrange
    traverser.traverse(function (node, type, parentNode) {
        var box = node.content;
        var parentBox = parentNode ? parentNode.content : null;
        if (!box) throw "Node content (box) not present";

        // Make inherit the node its parent's coordinates for starters
        // The parent has already been positioned
        // The coordinates will be refined later.
        if (parentBox) {
            box.x = parentBox.x;
            box.y = parentBox.y;
        }

        if (type === -1) {
            // Current node is the root
            // Update position variable
            maxX += box.width + mx;
            maxY += box.height + my;
            minX -= 0 + mx;
            minY -= 0 + my;

            console.log("arranger", "root node:", box, "info:", logger());
            return;
        }

        if (type === tree.Arc.D) {
            // Current node is DOWN with its parent
            // Update node's position
            box.y = maxY;

            // Update position variable
            maxY += box.height + my;

            console.log("arranger", "DOWN node:", box, "parent:", parentNode, "info:", logger());
            return;
        }

        if (type === tree.Arc.U) {
            // Current node is UP with its parent
            // Update node's position
            box.y = minY;

            // Update position variable
            minY -= box.height + my;

            console.log("arranger", "UP node:", box, "parent:", parentNode, "info:", logger());
            return;
        }

        if (type === tree.Arc.L) {
            // Current node is LEFT with its parent
            // Update node's position
            box.x = minX;

            // Update position variable
            minX -= box.width + mx;

            console.log("arranger", "LEFT node:", box, "parent:", parentNode, "info:", logger());
            return;
        }

        if (type === tree.Arc.R) {
            // Current node is RIGHT with its parent
            // Update node's position
            box.x = maxX;

            // Update position variable
            maxX += box.width + mx;

            console.log("arranger", "RIGHT node:", box, "parent:", parentNode, "info:", logger());
            return;
        }

        throw "Unrecognized relation type: " + type;
    });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Table2Tree = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * table2tree.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Andrea Tino - 2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _relationsTable = __webpack_require__(1);

var relationsTable = _interopRequireWildcard(_relationsTable);

var _tree = __webpack_require__(0);

var tree = _interopRequireWildcard(_tree);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Converts a table into a tree.
 * 
 * @export
 * @class Table2Tree
 */
var Table2Tree = exports.Table2Tree = function () {
    /**
     * Creates an instance of Table2Tree.
     * @param {relationsTable.RelationsTable} table 
     * @memberof Table2Tree
     */
    function Table2Tree(table) {
        _classCallCheck(this, Table2Tree);

        if (!table) throw "table cannot be null or undefined";

        this.table = table; // Table of relations (box -> box)
        this.nodes = {}; // Dictionary of nodes out of boxes

        this.parentChildDict = null; // parent.id -> child
        this.childParentDict = null; // child.id -> parent
        this.childParentRelsDict = null; // child.id -> relation to parent
    }

    /**
     * Converts the table into a tree.
     * 
     * @returns {tree.Node}
     * @memberof Table2Tree
     */


    _createClass(Table2Tree, [{
        key: "convert",
        value: function convert() {
            if (!this.childParentDict) {
                this.childParentDict = populateChildParentDict(this.table);
                this.childParentRelsDict = populateChildParentRelsDict(this.table);
            }
            if (!this.parentChildDict) {
                this.parentChildDict = populateParentChildDict(this.table);
            }

            var keys = Object.keys(this.childParentDict);

            /*
             * From whatever node, the childParent dictionary is used to 
             * traverse up until a node is found which does not figure 
             * in the keys of the dictionary.
             * Recursive function.
             */
            var locateRoot = function locateRoot(id, childParentDict, nodes) {
                var next = childParentDict[id];
                return next ? locateRoot(next.id, childParentDict, nodes) : nodes[id];
            };

            for (var i = 0; i < keys.length; i++) {
                var parent = this.childParentDict[keys[i]]; // Box
                var parentRel = this.childParentRelsDict[keys[i]]; // Relation type (number)
                var child = this.table.getBox(keys[i]); // Box

                if (!parent) throw "Parent box should be found for key: " + keys[i];
                if (!child) throw "Child box should be found for key: " + keys[i];

                // Generate nodes and index them
                if (!this.nodes[parent.id]) this.nodes[parent.id] = new tree.Node(parent);
                if (!this.nodes[child.id]) this.nodes[child.id] = new tree.Node(child);

                // Creating tree relation
                this.nodes[parent.id].addChild(this.nodes[child.id], new tree.Arc(parentRel));
            }

            return locateRoot(keys[0], this.childParentDict, this.nodes);
        }
    }]);

    return Table2Tree;
}();

/**
 * Populates the dictionary for building the tree.
 * 
 * @param {any} table 
 * @returns 
 */


function populateChildParentDict(table) {
    var dict = {};

    table.each(function (relation) {
        dict[relation.rhs.id] = relation.lhs;
    });

    return dict;
}

/**
 * Populates the dictionary of relation types for building the tree.
 * 
 * @param {any} table 
 * @returns 
 */
function populateChildParentRelsDict(table) {
    var dict = {};

    table.each(function (relation) {
        dict[relation.rhs.id] = relation.type;
    });

    return dict;
}

/**
 * Populates the dictionary for building the tree.
 * 
 * @param {any} table 
 * @returns 
 */
function populateParentChildDict(table) {
    var dict = {};

    table.each(function (relation) {
        dict[relation.lhs.id] = relation.rhs;
    });

    return dict;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * relation.js
 * Andrea Tino - 2017
 */

/**
 * Describes a relation between boxes.
 * 
 * @export
 * @class Relation
 */
var Relation = exports.Relation = function () {
  /**
   * Creates an instance of Relation.
   * @param {Box} lhs 
   * @param {Box} rhs 
   * @param {any} type 
   * @memberof Relation
   */
  function Relation(lhs, rhs, type) {
    _classCallCheck(this, Relation);

    if (!lhs) throw "lhs cannot be null or undefined";
    if (!rhs) throw "rhs cannot be null or undefined";
    if (!type) type = Relation.D;

    this._lhs = lhs;
    this._rhs = rhs;
    this._type = type;
  }

  /**
   * Gets the RHS.
   * 
   * @readonly
   * @memberof Relation
   */


  _createClass(Relation, [{
    key: "rhs",
    get: function get() {
      return this._rhs;
    }

    /**
     * Gets the LHS.
     * 
     * @readonly
     * @memberof Relation
     */

  }, {
    key: "lhs",
    get: function get() {
      return this._lhs;
    }

    /**
     * Gets the type of relation.
     * 
     * @readonly
     * @memberof Relation
     */

  }, {
    key: "type",
    get: function get() {
      return this._type;
    }

    /**
     * Gets the value for DOWN relation type.
     * 
     * @readonly
     * @static
     * @memberof Arc
     */

  }], [{
    key: "D",
    get: function get() {
      return 0;
    }

    /**
     * Gets the value for UP relation type.
     * 
     * @readonly
     * @static
     * @memberof Arc
     */

  }, {
    key: "U",
    get: function get() {
      return 1;
    }

    /**
     * Gets the value for LEFT relation type.
     * 
     * @readonly
     * @static
     * @memberof Arc
     */

  }, {
    key: "L",
    get: function get() {
      return 2;
    }

    /**
     * Gets the value for RIGHT relation type.
     * 
     * @readonly
     * @static
     * @memberof Arc
     */

  }, {
    key: "R",
    get: function get() {
      return 3;
    }
  }]);

  return Relation;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BreadthFirstLxRxTreeTraverser = exports.DepthFirstLxRxTreeTraverser = exports.TreeTraverser = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * treeTraversal.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Andrea Tino - 2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _tree = __webpack_require__(0);

var tree = _interopRequireWildcard(_tree);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Traverses a tree.
 * Default traversal strategy.
 * 
 * @export
 * @class TreeTraverser
 */
var TreeTraverser = exports.TreeTraverser = function () {
    /**
     * Creates an instance of TreeTraverser.
     * @param {any} node 
     * @memberof TreeTraverser
     */
    function TreeTraverser(node) {
        _classCallCheck(this, TreeTraverser);

        if (!node) throw "node cannot be null or undefined";

        // Default algorithm being used
        this.algorithm = new DepthFirstLxRxTreeTraverser(node);
    }

    /**
     * Traverses the tree and, for every node, executes an action.
     * 
     * @param {any} action A function accepting 2 args: traversed node, type of relation with parent. 
     *                     One more parameter (optional) can be passed: the parent node.
     * @memberof TreeTraverser
     * @return {Number} The number of nodes traversed.
     */


    _createClass(TreeTraverser, [{
        key: "traverse",
        value: function traverse(action) {
            return this.algorithm.traverse(action);
        }
    }]);

    return TreeTraverser;
}();

/**
 * Traverses a tree.
 * Strategy implemented: from first to last node (left to right) + depth-first
 * 
 * @export
 * @class DepthFirstLxRxTreeTraverser
 */


var DepthFirstLxRxTreeTraverser = exports.DepthFirstLxRxTreeTraverser = function () {
    /**
     * Creates an instance of TreeTraverser.
     * @param {any} node 
     * @memberof DepthFirstLxRxTreeTraverser
     */
    function DepthFirstLxRxTreeTraverser(node) {
        _classCallCheck(this, DepthFirstLxRxTreeTraverser);

        if (!node) throw "node cannot be null or undefined";

        this.root = node;
    }

    /**
     * Traverses the tree and, for every node, executes an action.
     * 
     * @param {any} action A function accepting 2 args: traversed node, type of relation with parent.
     *                     One more parameter (optional) can be passed: the parent node.
     * @memberof DepthFirstLxRxTreeTraverser
     * @return {Number} The number of nodes traversed.
     */


    _createClass(DepthFirstLxRxTreeTraverser, [{
        key: "traverse",
        value: function traverse(action) {
            if (!action) throw "action cannot be null or undefined";

            var count = 0;
            var actionWrapper = function actionWrapper(node, type, nodeParent) {
                count++;
                action(node, type, nodeParent);
            };

            // For no relation, we pass -1
            traverseDepthFirstRec(this.root, -1, actionWrapper);

            return count;
        }
    }]);

    return DepthFirstLxRxTreeTraverser;
}();

/**
 * Traverses a tree.
 * Strategy implemented: from first to last node (left to right) + breadth-first
 * 
 * @export
 * @class BreadthFirstLxRxTreeTraverser
 */


var BreadthFirstLxRxTreeTraverser = exports.BreadthFirstLxRxTreeTraverser = function () {
    /**
     * Creates an instance of TreeTraverser.
     * @param {any} node 
     * @memberof BreadthFirstLxRxTreeTraverser
     */
    function BreadthFirstLxRxTreeTraverser(node) {
        _classCallCheck(this, BreadthFirstLxRxTreeTraverser);

        if (!node) throw "node cannot be null or undefined";

        this.root = node;
    }

    /**
     * Traverses the tree and, for every node, executes an action.
     * 
     * @param {any} action A function accepting 2 args: traversed node, type of relation with parent.
     *                     One more parameter (optional) can be passed: the parent node.
     * @memberof BreadthFirstLxRxTreeTraverser
     * @return {Number} The number of nodes traversed.
     */


    _createClass(BreadthFirstLxRxTreeTraverser, [{
        key: "traverse",
        value: function traverse(action) {
            if (!action) throw "action cannot be null or undefined";

            var count = 0;
            var actionWrapper = function actionWrapper(node, type, nodeParent) {
                count++;
                action(node, type, nodeParent);
            };

            // For no relation, we pass -1
            traverseBreadthFirstRec(this.root, -1, actionWrapper, 0);

            return count;
        }
    }]);

    return BreadthFirstLxRxTreeTraverser;
}();

/**
 * Recursively performs traversal in a depth first manner.
 * 
 * @param {any} node 
 * @param {any} type 
 * @param {any} action 
 * @param {any} parentNode (optional) 
 */


function traverseDepthFirstRec(node, type, action, parentNode) {
    if (!node) throw "node cannot be null or undefined";
    if (!Number.isInteger(type)) throw "type not valid";

    // Execute action
    action(node, type, parentNode);

    // Recurse
    for (var i = 1; i <= node.count; i++) {
        var child = node.child(i).node;
        if (!child) continue;

        var arc = node.child(i).arc;
        if (!arc) throw "Missing arc info";

        var relationType = arc.type;

        traverseDepthFirstRec(child, relationType, action, node);
    }
}

/**
 * Recursively performs traversal in a breadth first manner.
 * TODO
 * 
 * @param {any} node 
 * @param {any} type 
 * @param {any} action 
 * @param {any} isFirstIteration 
 * @param {any} parentNode (optional) 
 */
function traverseBreadthFirstRec(node, type, action, iteration, parentNode) {
    if (!node) throw "node cannot be null or undefined";
    if (!Number.isInteger(type)) throw "type not valid";

    // Execute action
    if (iteration === 0) action(node, type, parentNode);

    // Apply action to all children
    for (var i = 1; i <= node.count; i++) {
        var child = node.child(i).node;
        if (!child) continue;

        var arc = node.child(i).arc;
        if (!arc) throw "Missing arc info";

        var relationType = arc.type;

        action(node, relationType, parentNode);
    }

    // Recurse
    for (var _i = 1; _i <= node.count; _i++) {
        var _child = node.child(_i).node;
        if (!_child) continue;

        var _arc = node.child(_i).arc;
        if (!_arc) throw "Missing arc info";

        var _relationType = _arc.type;

        traverseBreadthFirstRec(_child, _relationType, action, false, node);
    }
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Box = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * box.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Andrea Tino - 2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

exports.hitTest = hitTest;

var _utils = __webpack_require__(2);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Describes a generic content bock, thus a box.
 * 
 * @export
 * @class Box
 */
var Box = exports.Box = function () {
    /**
     * Creates an instance of Box.
     * @memberof Box
     */
    function Box(id) {
        _classCallCheck(this, Box);

        if (!id) {
            id = generateId();
        }

        this._id = id;
        this._width = 0;
        this._height = 0;
        this._x = 0;
        this._y = 0;
    }

    /**
     * Gets the id.
     * 
     * @readonly
     * @memberof Box
     */


    _createClass(Box, [{
        key: "id",
        get: function get() {
            return this._id;
        }

        /**
         * Sets the id.
         * 
         * @memberof Box
         */
        ,
        set: function set(value) {
            if (!value) throw "value cannot be null or undefined";
            this._id = value;
        }

        /**
         * Gets the width.
         * 
         * @readonly
         * @memberof Box
         */

    }, {
        key: "width",
        get: function get() {
            return this._width;
        }

        /**
         * Sets the width.
         * 
         * @memberof Box
         */
        ,
        set: function set(value) {
            if (!Number.isInteger(value)) throw "Invalid value " + value + " for property width";
            if (!checkSizeValue(value)) throw "Value must be a positive (or null) integer! Value " + value + " is not valid";

            this._width = value;
        }

        /**
         * Gets the height.
         * 
         * @readonly
         * @memberof Box
         */

    }, {
        key: "height",
        get: function get() {
            return this._height;
        }

        /**
         * Sets the height.
         * 
         * @memberof Box
         */
        ,
        set: function set(value) {
            if (!Number.isInteger(value)) throw "Invalid value " + value + " for property height";
            if (!checkSizeValue(value)) throw "Value must be a positive (or null) integer! Value " + value + " is not valid";

            this._height = value;
        }

        /**
         * Gets the x coordinate (from upper left corner).
         * 
         * @readonly
         * @memberof Box
         */

    }, {
        key: "x",
        get: function get() {
            return this._x;
        }

        /**
         * Sets the x coordinate (from upper left corner).
         * 
         * @memberof Box
         */
        ,
        set: function set(value) {
            if (!Number.isInteger(value)) throw "Invalid value " + value + " for property x";
            if (!checkCoordValue(value)) throw "Value must be a positive (or null) integer! Value " + value + " is not valid";

            this._x = value;
        }

        /**
         * Gets the y coordionate (from upper left corner).
         * 
         * @readonly
         * @memberof Box
         */

    }, {
        key: "y",
        get: function get() {
            return this._y;
        }

        /**
         * Sets the y coordinate (from upper left corner).
         * 
         * @memberof Box
         */
        ,
        set: function set(value) {
            if (!Number.isInteger(value)) throw "Invalid value " + value + " for property y";
            if (!checkCoordValue(value)) throw "Value must be a positive (or null) integer! Value " + value + " is not valid";

            this._y = value;
        }
    }]);

    return Box;
}();

/**
 * Tests hot between two boxes.
 * 
 * @export
 * @param {any} box1 
 * @param {any} box2 
 */


function hitTest(box1, box2) {
    if (!box1) throw "box1 cannot be null or undefined";
    if (!box2) throw "box2 cannot be null or undefined";

    return utils.hitTest(box1.x, box1.x + box1.width, box1.y, box1.y + box1.height, box2.x, box2.x + box2.width, box2.y, box2.y + box2.height);
}

/**
 * Returns a value indicating whether the size value is correct (positive or null integer).
 * 
 * @param {any} value 
 * @returns 
 */
function checkSizeValue(value) {
    if (!Number.isInteger(value)) return false;

    return Number.isInteger(value) && value >= 0;
}

/**
 * Returns a value indicating whether the coordinate value is correct (positive or null integer).
 * 
 * @param {any} value 
 * @returns 
 */
function checkCoordValue(value) {
    return Number.isInteger(value);
}

/**
 * Generates a rnadom hex id.
 * 
 * @returns 
 */
function generateId() {
    var letters = '0123456789abcdef'.split('');
    var r = 'box-';
    for (var i = 0; i < 6; i++) {
        r += letters[Math.floor(Math.random() * 10)];
    }
    return r;
}

/***/ })
/******/ ]);