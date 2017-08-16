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
    constructor() {
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
    }

    /**
     * Gets the width.
     * 
     * @readonly
     * @memberof Box
     */
    get width() { return this.width; }

    /**
     * Sets the width.
     * 
     * @memberof Box
     */
    set width(value) { 
        if (!value) throw "Invalid value";
        if (!checkValue(value)) throw "Value must be a positive (or null) integer";

        this.width = value;
    }

    /**
     * Gets the height.
     * 
     * @readonly
     * @memberof Box
     */
    get height() { return this.height; }

    /**
     * Sets the height.
     * 
     * @memberof Box
     */
    set height(value) { 
        if (!value) throw "Invalid value";
        if (!checkValue(value)) throw "Value must be a positive (or null) integer";

        this.height = value;
    }

    /**
     * Gets the x coordinate (from upper left corner).
     * 
     * @readonly
     * @memberof Box
     */
    get x() { return this.x; }

    /**
     * Sets the x coordinate (from upper left corner).
     * 
     * @memberof Box
     */
    set x(value) { 
        if (!value) throw "Invalid value";
        if (!checkValue(value)) throw "Value must be a positive (or null) integer";

        this.x = value;
    }

    /**
     * Gets the y coordionate (from upper left corner).
     * 
     * @readonly
     * @memberof Box
     */
    get y() { return this.y; }

    /**
     * Sets the y coordinate (from upper left corner).
     * 
     * @memberof Box
     */
    set y(value) { 
        if (!value) throw "Invalid value"; 
        if (!checkValue(value)) throw "Value must be a positive (or null) integer";

        this.y = value;
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
