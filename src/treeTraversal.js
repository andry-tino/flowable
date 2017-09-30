/**
 * treeTraversal.js
 * Andrea Tino - 2017
 */

import * as tree from "./tree.js";

/**
 * Traverses a tree.
 * Default traversal strategy.
 * 
 * @export
 * @class TreeTraverser
 */
export class TreeTraverser {
    /**
     * Creates an instance of TreeTraverser.
     * @param {any} node 
     * @memberof TreeTraverser
     */
    constructor(node) {
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
    traverse(action) {
        return this.algorithm.traverse(action);
    }
}

/**
 * Traverses a tree.
 * Strategy implemented: from first to last node (left to right) + depth-first
 * 
 * @export
 * @class DepthFirstLxRxTreeTraverser
 */
export class DepthFirstLxRxTreeTraverser {
    /**
     * Creates an instance of TreeTraverser.
     * @param {any} node 
     * @memberof DepthFirstLxRxTreeTraverser
     */
    constructor(node) {
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
    traverse(action) {
        if (!action) throw "action cannot be null or undefined";

        let count = 0;
        let actionWrapper = function(node, type, nodeParent) {
            count++;
            action(node, type, nodeParent);
        };

        // For no relation, we pass -1
        traverseDepthFirstRec(this.root, -1, actionWrapper);

        return count;
    }
}

/**
 * Traverses a tree.
 * Strategy implemented: from first to last node (left to right) + breadth-first
 * 
 * @export
 * @class BreadthFirstLxRxTreeTraverser
 */
export class BreadthFirstLxRxTreeTraverser {
    /**
     * Creates an instance of TreeTraverser.
     * @param {any} node 
     * @memberof BreadthFirstLxRxTreeTraverser
     */
    constructor(node) {
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
    traverse(action) {
        if (!action) throw "action cannot be null or undefined";

        let count = 0;
        let actionWrapper = function(node, type, nodeParent) {
            count++;
            action(node, type, nodeParent);
        };

        // For no relation, we pass -1
        traverseBreadthFirstRec(this.root, -1, actionWrapper, 0);

        return count;
    }
}

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
    for (let i = 1; i <= node.count; i++) {
        let child = node.child(i).node;
        if (!child) continue;

        let arc = node.child(i).arc;
        if (!arc) throw "Missing arc info";

        let relationType = arc.type;

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
    if (iteration === 0) 
        action(node, type, parentNode);

    // Apply action to all children
    for (let i = 1; i <= node.count; i++) {
        let child = node.child(i).node;
        if (!child) continue;

        let arc = node.child(i).arc;
        if (!arc) throw "Missing arc info";

        let relationType = arc.type;

        action(node, relationType, parentNode);
    }

    // Recurse
    for (let i = 1; i <= node.count; i++) {
        let child = node.child(i).node;
        if (!child) continue;

        let arc = node.child(i).arc;
        if (!arc) throw "Missing arc info";

        let relationType = arc.type;

        traverseBreadthFirstRec(child, relationType, action, false, node);
    }
}
