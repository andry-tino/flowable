/**
 * utils.js
 * Andrea Tino - 2017
 */

/**
 * Gets a value indicating whether two rectangles overlaps each other or not.
 * 
 * @export
 * @param {any} xa1 
 * @param {any} xa2 
 * @param {any} ya1 
 * @param {any} ya2 
 * @param {any} xb1 
 * @param {any} xb2 
 * @param {any} yb1 
 * @param {any} yb2 
 */
export function hitTest(xa1, xa2, ya1, ya2, xb1, xb2, yb1, yb2) {
    assert(xa1 <= xa2);
    assert(ya1 <= ya2);
    assert(xb1 <= xb2);
    assert(yb1 <= yb2);

    var r1 = { x1: xa1, x2: xa2, y1: ya1, y2: ya2 };
    var r2 = { x1: xb1, x2: xb2, y1: yb1, y2: yb2 };

    // The rectangles don't overlap if
    // one rectangle's minimum in some dimension 
    // is greater than the other's maximum in
    // that dimension.
    var noOverlap = r1.x1 > r2.x2 ||
                    r2.x1 > r1.x2 ||
                    r1.y1 > r2.y2 ||
                    r2.y1 > r1.y2;

    return !noOverlap;
}

/**
 * Asserts.
 * 
 * @export
 * @param {any} prop 
 */
export function assert(prop) {
    if (prop === true) {
        return;
    }

    if (prop === false) {
        throw `Assert failure on: ${prop}`;
    }

    throw `Assert (type) failure on: ${prop}`;
}
