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
     * @param {Box} lhs 
     * @param {Box} rhs 
     * @param {any} type 
     * @memberof Relation
     */
    constructor(lhs, rhs, type) {
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
    get rhs() { return this._rhs; }

    /**
     * Gets the LHS.
     * 
     * @readonly
     * @memberof Relation
     */
    get lhs() { return this._lhs; }

    /**
     * Gets the type of relation.
     * 
     * @readonly
     * @memberof Relation
     */
    get type() { return this._type; }

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

    /**
     * Gets correct numerical value out of the letter for the arc type.
     * 
     * @readonly
     * @static
     * @memberof Arc
     */
    static parseDirection(type) { 
        if (!type) throw "type cannot be null or undefined!";

        if (type.length != 1) throw `Invalid type: ${type}`;

        if (type.toLowerCase() == "d") return Relation.D;
        if (type.toLowerCase() == "u") return Relation.U;
        if (type.toLowerCase() == "l") return Relation.L;
        if (type.toLowerCase() == "r") return Relation.R;

        throw `Invalid type: ${type}`;
    }
}
