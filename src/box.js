/**
 * box.js
 * Andrea Tino - 2017
 */

/**
 * Describes a generic content bock, thus a box.
 * 
 * @export
 * @class Box
 */
export class Box {
    /**
     * Creates an instance of Box.
     * @memberof Box
     */
    constructor(id) {
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
    get id() { return this._id; }

    /**
     * Sets the id.
     * 
     * @memberof Box
     */
    set id(value) {
        if (!value) throw "value cannot be null or undefined";
        this._id = value;
    }

    /**
     * Gets the width.
     * 
     * @readonly
     * @memberof Box
     */
    get width() { return this._width; }

    /**
     * Sets the width.
     * 
     * @memberof Box
     */
    set width(value) { 
        if (!value) throw "Invalid value";
        if (!checkValue(value)) throw "Value must be a positive (or null) integer";

        this._width = value;
    }

    /**
     * Gets the height.
     * 
     * @readonly
     * @memberof Box
     */
    get height() { return this._height; }

    /**
     * Sets the height.
     * 
     * @memberof Box
     */
    set height(value) { 
        if (!value) throw "Invalid value";
        if (!checkValue(value)) throw "Value must be a positive (or null) integer";

        this._height = value;
    }

    /**
     * Gets the x coordinate (from upper left corner).
     * 
     * @readonly
     * @memberof Box
     */
    get x() { return this._x; }

    /**
     * Sets the x coordinate (from upper left corner).
     * 
     * @memberof Box
     */
    set x(value) { 
        if (!value) throw "Invalid value";
        if (!checkValue(value)) throw "Value must be a positive (or null) integer";

        this._x = value;
    }

    /**
     * Gets the y coordionate (from upper left corner).
     * 
     * @readonly
     * @memberof Box
     */
    get y() { return this._y; }

    /**
     * Sets the y coordinate (from upper left corner).
     * 
     * @memberof Box
     */
    set y(value) { 
        if (!value) throw "Invalid value"; 
        if (!checkValue(value)) throw "Value must be a positive (or null) integer";

        this._y = value;
    }
}

/**
 * Returns a value indicating whether the value is correct (positive or null integer).
 * 
 * @param {any} value 
 * @returns 
 */
function checkValue(value) {
    if (!value) return false;

    return Number.isInteger(value) && value >= 0;
}

/**
 * Generates a rnadom hex id.
 * 
 * @returns 
 */
function generateId() {
    let letters = '0123456789abcdef'.split('');
    let r = 'box-';
    for (let i = 0; i < 6; i++) {
        r += letters[Math.floor(Math.random() * 10)];
    }
    return r;
}
