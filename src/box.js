/**
 * box.js
 * Andrea Tino - 2017
 */

import * as utils from "./utils.js";

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
        this._element = null; // Optional connection to the element
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
        if (!Number.isInteger(value)) throw `Invalid value ${value} for property width`;
        if (!checkSizeValue(value)) throw `Value must be a positive (or null) integer! Value ${value} is not valid`;

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
        if (!Number.isInteger(value)) throw `Invalid value ${value} for property height`;
        if (!checkSizeValue(value)) throw `Value must be a positive (or null) integer! Value ${value} is not valid`;

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
        if (!Number.isInteger(value)) throw `Invalid value ${value} for property x`;
        if (!checkCoordValue(value)) throw `Value must be a positive (or null) integer! Value ${value} is not valid`;

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
        if (!Number.isInteger(value)) throw `Invalid value ${value} for property y`; 
        if (!checkCoordValue(value)) throw `Value must be a positive (or null) integer! Value ${value} is not valid`;

        this._y = value;
    }

    /**
     * Gets the element connected to the box.
     * 
     * @readonly
     * @memberof Box
     */
    get element() { return this._element; }

    /**
     * Sets the element connected to the box.
     * 
     * @memberof Box
     */
    set element(value) { this._element = value; }
}

/**
 * Tests hot between two boxes.
 * 
 * @export
 * @param {any} box1 
 * @param {any} box2 
 */
export function hitTest(box1, box2) {
    if (!box1) throw "box1 cannot be null or undefined";
    if (!box2) throw "box2 cannot be null or undefined";

    return utils.hitTest(
        box1.x, 
        box1.x + box1.width, 
        box1.y, 
        box1.y + box1.height, 
        box2.x, 
        box2.x + box2.width, 
        box2.y, 
        box2.y + box2.height);
}

/**
 * Returns a value indicating whether the size value is correct (positive or null integer).
 * 
 * @param {any} value 
 * @returns 
 */
function checkSizeValue(value) {
    if (!Number.isInteger(value)) return false;

    return Number.isInteger(value) && value >= 0;
}

/**
 * Returns a value indicating whether the coordinate value is correct (positive or null integer).
 * 
 * @param {any} value 
 * @returns 
 */
function checkCoordValue(value) {
    return Number.isInteger(value);
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
