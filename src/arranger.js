/**
 * arranger.js
 * Andrea Tino - 2017
 */

import * as relationsTable from "./relationsTable.js";
import * as treeTableConversions from "./table2tree.js";
import * as tree from "./tree.js";

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

        // Variables used to keep track of the max values for the positions in the 4 directions
        let maxX = 0,
            minX = 0,
            maxY = 0,
            minY = 0;

        // Here we should have the tree
        let traverser = new TreeTraverser(this.root);

        // Initialize
        traverser.traverse(function(node, type) {
            let box = node.content;
            if (!box) throw "Node content (box) not present";

            box.x = 0;
            box.y = 0;

            // TODO: Add checks for dimensions
        });

        // Arrange
        traverser.traverse(function(node, type) {
            let box = node.content;
            if (!box) throw "Node content (box) not present";

            if (type === -1) { // Current node is the root
                // Update position variable
                maxX += box.width;
                maxY += box.height;
                minX += 0;
                minY += 0;

                return;
            }

            if (type === tree.Arc.D) { // Current node is DOWN with its parent
                // Update node's position
                box.y = maxY;

                // Update position variable
                maxY += (box.height + this.marginY);

                return;
            }

            if (type === tree.Arc.U) { // Current node is UP with its parent
                // Update node's position
                box.y = minY;

                // Update position variable
                minY -= (box.height + this.marginY);

                return;
            }

            if (type === tree.Arc.L) { // Current node is LEFT with its parent
                // Update node's position
                box.x = maxX;

                // Update position variable
                maxX += (box.width + this.marginX);

                return;
            }

            if (type === tree.Arc.R) { // Current node is RIGHT with its parent
                // Update node's position
                box.x = minX;

                // Update position variable
                minX -= (box.width + this.marginX);

                return;
            }

            throw `Unrecognized relation type: ${type}`;
        });
    }
}

/**
 * Traverses a tree.
 * Strategy implemented: from first to last node (left to right) + depth-first
 * 
 * @class TreeTraverser
 */
class TreeTraverser {
    /**
     * Creates an instance of TreeTraverser.
     * @param {any} node 
     * @memberof TreeTraverser
     */
    constructor(node) {
        if (!node) throw "node cannot be null or undefined";

        this.root = node;
    }

    /**
     * Traverses the tree and, for every node, executes an action.
     * 
     * @param {any} action A function accepting 2 args: traversed node, type of relation with parent.
     * @memberof TreeTraverser
     * @return {Number} The number of nodes traversed.
     */
    traverse(action) {
        if (!action) throw "action cannot be null or undefined";

        let count = 0;
        let actionWrapper = function(node, type) {
            count++;
            action(node, type);
        };

        // For no relation, we pass -1
        traverseRec(this.root, -1, actionWrapper);

        return count;
    }
}

/**
 * Recursively performs traversal.
 * 
 * @param {any} node 
 * @param {any} type 
 * @param {any} action 
 * @returns 
 */
function traverseRec(node, type, action) {
    if (!node) return;
    if (!type) return;

    // Execute action
    action(node, type);

    // Recurse
    for (let i = 1; i <= node.count; i++) {
        let child = node.child(i).node;
        if (!child) continue;

        let arc = node.child(i).arc;
        if (!arc) throw "Missing arc info";

        let relationType = arc.type;

        traverseRec(child, relationType, action);
    }
}
