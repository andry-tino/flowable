/**
 * tree.js
 * Andrea Tino - 2017
 */

import * as relation from "./relation";

/**
 * Describes a node in the tree.
 * Every node only stores information about children, no info for parent is persisted.
 * 
 * @export
 * @class Node
 */
export class Node {
    /**
     * Creates an instance of Node.
     * @param {any} content 
     * @memberof Node
     */
    constructor(content) {
        if (!this.content) throw "content cannot be null or undefined";

        this.children = [];
        this.arcs = [];
        this.content = content;
    }

    /**
     * Gets the content of the node.
     * 
     * @readonly
     * @memberof Node
     */
    get content() { return this.content; }

    /**
     * Gets the id of the content.
     * 
     * @readonly
     * @memberof Node
     */
    get id() { return this.content.id; }

    /**
     * Gets the first child and arc. If no children is present, null is returned.
     * 
     * @readonly
     * @memberof Node
     */
    get firstChild() {
        return this.children.length === 0 ? null : new ChildInfo(this.children[0], this.arcs[0]);
    }

    /**
     * Gets the last child and arc. If no children is present, null is returned.
     * 
     * @readonly
     * @memberof Node
     */
    get lastChild() {
        return this.children.length === 0 
            ? null 
            : new ChildInfo(this.children[this.children.length - 1], this.arcs[this.arcs.length - 1]);
    }

    /**
     * Returns the n-th child and arc. Null if not present.
     * If index is out of bound, null is returned.
     * 
     * @param {Number} n A number representing the index (1-based)
     * @memberof Node
     */
    child(n) {
        return this.children.length === 0 || this.children.length > n 
            ? null 
            : new ChildInfo(this.children[n + 1], this.arcs[n + 1]);
    }

    /**
     * Adds a node as child.
     * 
     * @param {Node} node 
     * @param {Arc} arc 
     * @returns 
     * @memberof Node
     */
    addChild(node, arc) {
        if (!node) return;
        if (!arc) return;

        this.children.push(node);
        this.arcs.push(arc);
    }
}

/**
 * Describes information of a Node's child.
 * 
 * @export
 * @class ChildInfo
 */
export class ChildInfo {
    /**
     * Creates an instance of ChildInfo.
     * @param {Node} node 
     * @param {Arc} arc 
     * @memberof ChildInfo
     */
    constructor(node, arc) {
        if (!node) throw "node cannot be null or undefined";
        if (!arc) throw "arc cannot be null or underfined";

        this.node = node;
        this.arc = arc;
    }

    /**
     * Gets the node.
     * 
     * @readonly
     * @memberof ChildInfo
     */
    get node() { return this.node; }

    /**
     * Gets the arc.
     * 
     * @readonly
     * @memberof ChildInfo
     */
    get arc() { return this.arc; }
}

/**
 * Describes an arc.
 * 
 * @export
 * @class Arc
 */
export class Arc {
    /**
     * Creates an instance of Arc.
     * @param {any} type 
     * @memberof Arc
     */
    constructor(type) {
        if (!type) type = Arc.D;

        this.type = type;
    }

    /**
     * Gets the value for DOWN arc type.
     * 
     * @readonly
     * @static
     * @memberof Arc
     */
    static get D() { return relation.Relation.D; }

    /**
     * Gets the value for UP arc type.
     * 
     * @readonly
     * @static
     * @memberof Arc
     */
    static get U() { return relation.Relation.U; }

    /**
     * Gets the value for LEFT arc type.
     * 
     * @readonly
     * @static
     * @memberof Arc
     */
    static get L() { return relation.Relation.L; }

    /**
     * Gets the value for RIGHT arc type.
     * 
     * @readonly
     * @static
     * @memberof Arc
     */
    static get R() { return relation.Relation.R; }

    /**
     * Gets the type of arc.
     * 
     * @readonly
     * @memberof Arc
     */
    get type() { return this.type; }
}
