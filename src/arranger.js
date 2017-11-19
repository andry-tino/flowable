/**
 * arranger.js
 * Andrea Tino - 2017
 */

import * as relationsTable from "./relationsTable.js";
import * as treeTableConversions from "./table2tree.js";
import * as tree from "./tree.js";
import * as traversal from "./treeTraversal.js";
import * as utils from "./utils.js";

/**
 * Describes the arranging algorithm.
 * The algorithm takes as input a table of boxes, those 
 * boxes will be modified, not copied.
 * 
 * @export
 * @class Arranger
 */
export class Arranger {
    /**
     * Creates an instance of Arranger.
     * @param {relationsTable.RelationsTable} table 
     * @memberof Arranger
     */
    constructor(table) {
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
    get marginX() { return this._marginX; }

    /**
     * Sets the horizontal margin.
     * 
     * @memberof Arranger
     */
    set marginX(value) { this._marginX = value; }

    /**
     * Gets the vertical margin.
     * 
     * @memberof Arranger
     */
    get marginY() { return this._marginY; }

    /**
     * Sets the vertical margin.
     * 
     * @memberof Arranger
     */
    set marginY(value) { this._marginY = value; }

    /**
     * Runs the algorithm.
     * 
     * @memberof Arranger
     */
    run() {
        if (!this.root) {
            this.root = new treeTableConversions.Table2Tree(this.table).convert();
            if (!this.root) throw "Error during table2tree conversion";
        }

        // Using dummy grid as default algorithm
        //arrangeInDummyGrid(this.root, { marginx: 10, marginy: 10 });
        // Using dictionary grid as default algorithm
        arrangeInDictionaryGrid(this.root, { marginx: 10, marginy: 10 });
    }
}

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
    let traverser = new traversal.TreeTraverser(node);

    // Initialize
    traverser.traverse(function(node, type) {
        let box = node.content;
        if (!box) throw "Node content (box) not present";

        box.x = 0;
        box.y = 0;

        // TODO: Add checks for dimensions
    });

    let my = config.marginy;
    let mx = config.marginx;

    /*
     * The dictionary will contain single column associations to boxes
     * x, y: string(int) -> [box]
     */
    let dict = {
        minx: 0,
        miny: 0,
        maxx: 0,
        maxy: 0,
        x: {},
        y: {}
    };

    let addBoxToDict = function(box) {
        if (!box) throw "box cannot be null or undefined";

        var x1 = box.x,
            x2 = box.x + box.width,
            y1 = box.y,
            y2 = box.y + box.height;

        for (let i = x1; i <= x2; i++) {
            dict.x[`${i}`] = dict.x[`${i}`] || [];
            dict.x[`${i}`].push(box);
        }
        for (let j = y1; j <= y2; j++) {
            dict.y[`${j}`] = dict.y[`${j}`] || [];
            dict.y[`${j}`].push(box);
        }

        // Update min and max
        dict.minx = x1 < dict.minx ? x1 : dict.minx;
        dict.miny = y1 < dict.miny ? y1 : dict.miny;
        dict.maxx = x2 > dict.maxx ? x2 : dict.maxx;
        dict.maxy = y2 > dict.maxy ? y2 : dict.maxy;
    };

    let buildReverseGrid = function(dict, minx, miny, maxx, maxy) {
        // Validates that the space of integers is contiguous and extract min and max
        // Returns { min: int, max: int }
        var extractExtremes = function(values) {
            if (values.length == 1) {
                return { min: values[0], max: values[0] };
            }

            var sortedValues = values.sort(function(a,b) { return a - b; });

            for (let k = 1; k < sortedValues.length; k++) {
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

        for (let i = minx; i <= maxx; i++) {
            let entries = dict.x[`${i}`];
            if (!entries || entries.length == 0) continue;

            for (let k = 0; k < entries.length; k++) {
                let box = entries[k];

                revdict.x[box.id] = revdict.x[box.id] || [];
                revdict.x[box.id].push(i);
            }
        }
        for (let j = miny; j <= maxy; j++) {
            let entries = dict.y[`${j}`];
            if (!entries || entries.length == 0) continue;

            for (let k = 0; k < entries.length; k++) {
                let box = entries[k];

                revdict.y[box.id] = revdict.y[box.id] || [];
                revdict.y[box.id].push(j);
            }
        }

        //console.log("revdict before reassign", revdict);

        // Process each array to get extremes
        for (let k = 0; k < Object.keys(revdict.x).length; k++) {
            let boxid = Object.keys(revdict.x)[k];
            let values = revdict.x[boxid];

            // Reassign
            revdict.x[boxid] = extractExtremes(values);
        }
        for (let k = 0; k < Object.keys(revdict.y).length; k++) {
            let boxid = Object.keys(revdict.y)[k];
            let values = revdict.y[boxid];

            // Reassign
            revdict.y[boxid] = extractExtremes(values);
        }

        return revdict;
    };

    let renderDictGrid = function(dict, element) {
        var el = element || window.document.body;
        var revdict = buildReverseGrid(dict, dict.minx, dict.miny, dict.maxx, dict.maxy);

        console.log("Dict is:", dict);
        console.log("Reverse dict is:", revdict);
        console.log("Consistency test:", Object.keys(revdict.x).length === Object.keys(revdict.x).length ? "PASS" : "FAIL");

        for (let k = 0; k < Object.keys(revdict.x).length; k++) {
            let boxid = Object.keys(revdict.x)[k];
            let extremesx = revdict.x[boxid];
            let extremesy = revdict.y[boxid];

            if (!extremesx || !extremesy) {
                throw "One element in X does not found in Y or vice versa";
            }

            let div = document.createElement("div");
            div.style.width = `${extremesx.max - extremesx.min}px`;
            div.style.height = `${extremesy.max - extremesy.min}px`;
            div.style.position = "absolute";
            div.style.opacity = ".25";
            div.style.backgroundColor = "#ff9900";
            div.style.left = `${extremesx.min}px`;
            div.style.top = `${extremesy.min}px`;

            el.appendChild(div);
        }
    };

    // Returns all the boxes on the row and column line and makes intersection
    let getDictEntry = function(x, y) {
        var boxes_x = dict.x[`${x}`] || [];
        var boxes_y = dict.y[`${y}`] || [];
        var res = [];

        for (let i = 0; i < boxes_x.length; i++) {
            for (let j = 0; j < boxes_y.length; j++) {
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
    let hitTest = function(box) {
        // Top and bottom side
        for (let i = box.x; i <= box.x + box.width; i++) {
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
        for (let j = box.y; j <= box.y + box.height; j++) {
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
    traverser.traverse(function(node, type, parentNode) {
        let box = node.content;
        let parentBox = parentNode ? parentNode.content : null;
        if (!box) throw "Node content (box) not present";

        // Make inherit the node its parent's coordinates for starters
        // The parent has already been positioned
        // The coordinates will be refined later.
        if (parentBox) {
            box.x = parentBox.x;
            box.y = parentBox.y;
        }

        const maxAttemptsNumber = 10;
        if (type === -1) { // Current node is the root
            // The box stays at (0, 0)
        } else if (type === tree.Arc.D) { // Current node is DOWN with its parent
            // Try to place the block down and check whether the block hits something
            let attemptsCounter = 0;
            for (box.y += parentBox.height + my; hitTest(box) && attemptsCounter < maxAttemptsNumber; attemptsCounter++) {
                let hitInfo = hitTest(box);
                let hitBox = hitInfo.hitBox;

                // Take the box further down
                box.y += hitBox.height + my;

                console.log("Pos DOWN", `box ${box.id}`, box, `failed hit test on box ${hitBox.id}:`, hitInfo, "attempt", attemptsCounter);
            }
        } else if (type === tree.Arc.U) { // Current node is UP with its parent
            // TODO
        } else if (type === tree.Arc.L) { // Current node is LEFT with its parent
            // TODO
        } else if (type === tree.Arc.R) { // Current node is RIGHT with its parent
            // Try to place the block to the left and check whether the block hits something
            let attemptsCounter = 0;
            for (box.x += parentBox.width + mx; hitTest(box) && attemptsCounter < maxAttemptsNumber; attemptsCounter++) {
                let hitInfo = hitTest(box);
                let hitBox = hitInfo.hitBox;

                // Take the box further down
                box.x += hitBox.width + mx;

                console.log("Pos RIGHT", `box ${box.id}`, box, `failed hit test on box ${hitBox.id}:`, hitInfo, "attempt", attemptsCounter);
            }
        } else {
            throw `Unrecognized relation type: ${type}`;
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
    let maxX = 0,
        minX = 0,
        maxY = 0,
        minY = 0;

    // Here we should have the tree
    let traverser = new traversal.TreeTraverser(node);

    // Initialize
    traverser.traverse(function(node, type) {
        let box = node.content;
        if (!box) throw "Node content (box) not present";

        box.x = 0;
        box.y = 0;

        // TODO: Add checks for dimensions
    });

    let my = config.marginy;
    let mx = config.marginx;

    let logger = function() {
        return `maxX=${maxX} minX=${minX} maxY=${maxY} minY=${minY}`;
    };

    // Arrange
    traverser.traverse(function(node, type, parentNode) {
        let box = node.content;
        let parentBox = parentNode ? parentNode.content : null;
        if (!box) throw "Node content (box) not present";

        // Make inherit the node its parent's coordinates for starters
        // The parent has already been positioned
        // The coordinates will be refined later.
        if (parentBox) {
            box.x = parentBox.x;
            box.y = parentBox.y;
        }

        if (type === -1) { // Current node is the root
            // Update position variable
            maxX += (box.width + mx);
            maxY += (box.height + my);
            minX -= (0 + mx);
            minY -= (0 + my);

            console.log("arranger", "root node:", box, "info:", logger());
            return;
        }

        if (type === tree.Arc.D) { // Current node is DOWN with its parent
            // Update node's position
            box.y = maxY;

            // Update position variable
            maxY += (box.height + my);

            console.log("arranger", "DOWN node:", box, "parent:", parentNode, "info:", logger());
            return;
        }

        if (type === tree.Arc.U) { // Current node is UP with its parent
            // Update node's position
            box.y = minY;

            // Update position variable
            minY -= (box.height + my);

            console.log("arranger", "UP node:", box, "parent:", parentNode, "info:", logger());
            return;
        }

        if (type === tree.Arc.L) { // Current node is LEFT with its parent
            // Update node's position
            box.x = minX;

            // Update position variable
            minX -= (box.width + mx);

            console.log("arranger", "LEFT node:", box, "parent:", parentNode, "info:", logger());
            return;
        }

        if (type === tree.Arc.R) { // Current node is RIGHT with its parent
            // Update node's position
            box.x = maxX;

            // Update position variable
            maxX += (box.width + mx);

            console.log("arranger", "RIGHT node:", box, "parent:", parentNode, "info:", logger());
            return;
        }

        throw `Unrecognized relation type: ${type}`;
    });
}
