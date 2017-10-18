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
     */
    let dict = {
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
    };

    // Returns all the boxes on the row and column line and makes intersection
    let getDictEntry = function(x, y) {
        var boxes_x = dict.x[`${x}`] || [];
        var boxes_y = dict.y[`${y}`] || [];
        var res = [];

        for (let i = 0; i < boxes_x.length; i++) {
            for (let j = 0; j < boxes_x.length; j++) {
                if (boxes_x[i].id === boxes_x[j].id) {
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

    let hitTest = function(box) {
        return !!dict[getDictEntry(box.x, box.y)];
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
            // The box stays at (0, 0)
        } else if (type === tree.Arc.D) { // Current node is DOWN with its parent
            // Try to place the block down and check whether the block hits something
            for (box.y += parentBox.height + my; hitTest(box); /* Nothing */) {
                let hitBox = getDictEntry(box.x, box.y);

                // Take the box further down
                box.y += hitBox.height + my;
            }
        } else if (type === tree.Arc.U) { // Current node is UP with its parent
            // TODO
        } else if (type === tree.Arc.L) { // Current node is LEFT with its parent
            // Try to place the block to the left and check whether the block hits something
            for (box.x += parentBox.width + mx; hitTest(box); /* Nothing */) {
                let hitBox = getDictEntry(box.x, box.y);

                // Take the box further down
                box.x += hitBox.width + mx;
            }
        } else if (type === tree.Arc.R) { // Current node is RIGHT with its parent
            // TODO
        } else {
            throw `Unrecognized relation type: ${type}`;
        }

        addBoxToDict(box);
    });
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
