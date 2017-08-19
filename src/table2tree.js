/**
 * table2tree.js
 * Andrea Tino - 2017
 */

import * as relationsTable from "./relationsTable";
import * as tree from "./tree";

/**
 * Converts a table into a tree.
 * 
 * @export
 * @class Table2Tree
 */
export class Table2Tree {
    /**
     * Creates an instance of Table2Tree.
     * @param {relationsTable.RelationsTable} table 
     * @memberof Table2Tree
     */
    constructor(table) {
        if (!table) throw "table cannot be null or undefined";

        this.table = table; // Table of relations (box -> box)
        this.nodes = {}; // Dictionary of nodes out of boxes

        this.parentChildDict = null; // parent.id -> child
        this.childParentDict = null; // child.id -> parent
    }

    /**
     * Converts the table into a tree.
     * 
     * @returns {tree.Node}
     * @memberof Table2Tree
     */
    convert() {
        if (!this.childParentDict) 
            this.childParentDict = populateChildParentDict(this.table);
        if (!this.parentChildDict) 
            this.parentChildDict = populateParentChildDict(this.table);

        let keys = Object.keys(this.childParentDict);

        /*
         * From whatever node, the childParent dictionary is used to 
         * traverse up until a node is found which does not figure 
         * in the keys of the dictionary.
         * Recursive function.
         */
        let locateRoot = function(id) {
            let next = this.childParentDict[id];
            return next ? locateRoot(next.id) : id;
        };

        for (let i = 0; i < keys.length; i++) {
            let parent = this.childParentDict[keys[i]]; // Box
            let child = this.parentChildDict[keys[i]]; // Box (should look in table)

            // Generate nodes and index them
            if (!this.nodes[parent.id])
                this.nodes[parent.id] = new tree.Node(parent);
            if (!this.nodes[child.id])
                this.nodes[child.id] = new tree.Node(child);

            // Creating tree relation
            this.nodes[parent.id].addChild(this.nodes[child.id], new tree.Arc());
        }

        return locateRoot(keys[0]);
    }
}

/**
 * Populates the dictionary for building the tree.
 * 
 * @param {any} table 
 * @returns 
 */
function populateChildParentDict(table) {
    let dict = {};

    table.each(function(relation) {
        dict[relation.rhs.id] = relation.lhs;
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
    let dict = {};

    table.each(function(relation) {
        dict[relation.lhs.id] = relation.rhs;
    });

    return dict;
}
