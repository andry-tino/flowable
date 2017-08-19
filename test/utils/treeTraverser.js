/**
 * treeTraverser.js
 * Andrea Tino - 2017
 */

/**
 * Traverses a tree.
 * Strategy implemented: fromfirst to last node (left to right) + depth-first
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

        this.root = node;
    }

    /**
     * Traverses the tree and, for every node, executes an action.
     * 
     * @param {any} action A function accepting an argument (the node being traversed).
     * @memberof TreeTraverser
     * @return {Number} The number of nodes traversed.
     */
    traverse(action) {
        if (!action) throw "action cannot be null or undefined";

        let count = 0;
        let actionWrapper = function(node) {
            count++;
            action(node);
        };

        traverseRec(this.root, actionWrapper);

        return count;
    }
}

/**
 * Recursively performs traversal.
 * 
 * @param {any} node 
 * @param {any} action 
 */
function traverseRec(node, action) {
    if (!node) return;

    // Execute action
    action(node);

    // Recurse
    for (let i = 1; i <= node.count; i++) {
        let child = node.child(i).node;
        if (!child) continue;

        traverseRec(child, action);
    }
}
