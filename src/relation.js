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
export class Relation {
    /**
     * Creates an instance of Relation.
     * @param {any} lhs 
     * @param {any} rhs 
     * @memberof Relation
     */
    constructor(lhs, rhs) {
        if (!lhs) throw "lhs cannot be null or undefined";
        if (!rhs) throw "rhs cannot be null or undefined";

        this.lhs = lhs;
        this.rhs - rhs;
    }

    /**
     * Gets the value for DOWN relation type.
     * 
     * @readonly
     * @static
     * @memberof Arc
     */
    static get D() { return 0; }

    /**
     * Gets the value for UP relation type.
     * 
     * @readonly
     * @static
     * @memberof Arc
     */
    static get U() { return 1; }

    /**
     * Gets the value for LEFT relation type.
     * 
     * @readonly
     * @static
     * @memberof Arc
     */
    static get L() { return 2; }

    /**
     * Gets the value for RIGHT relation type.
     * 
     * @readonly
     * @static
     * @memberof Arc
     */
    static get R() { return 3; }
}
