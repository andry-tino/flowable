/**
 * connector.js
 * Andrea Tino - 2017
 */

import * as blocks from "./box.js";
import snap from "snapsvg";

/**
 * Describes the component responsible for connecting blocks.
 * 
 * @export
 * @class Connector
 */
export class Connector {
    /**
     * Creates an instance of Connector.
     * @memberof Connector
     */
    constructor() {
    }

    /**
     * Connects two boxes via a line.
     * 
     * @param {Box} A 
     * @param {Box} B 
     * @memberof Connector
     */
    connect(A, B) {
        if (!A) throw "A cannot be null or undefined";
        if (!B) throw "B cannot be null or undefined";

        if (B.y >= A.y + A.height && B.x >= A.x + A.width) {
            console.log("connector", "running B.y >= A.y + A.height && B.x >= A.x + A.widt");
            let element = connect_a_top_left_b_bottom_right(A, B);
            return;
        }

        if (B.y >= A.y + A.height && B.x + B.width <= A.x) {
            console.log("connector", "running B.y >= A.y + A.height && B.x + B.width <= A.x");
            let element = connect_a_top_right_b_bottom_left(A, B);
            return;
        }

        if (B.y + B.height <= A.y && B.x + B.width <= A.x) {
            console.log("connector", "running B.y + B.height <= A.y && B.x + B.width <= A.xx");
            let element = connect_a_bottom_right_b_top_left(A, B);
            return;
        }

        if (B.y + B.height < A.y && B.x >= A.x + A.width) {
            console.log("connector", "running B.y + B.height < A.y && B.x >= A.x + A.width");
            let element = connect_a_bottom_left_b_top_right(A, B);
            return;
        }

        if (B.x >= A.x + A.width && B.y < A.y + A.height) {
            console.log("connector", "running B.x >= A.x + A.width && B.y < A.y + A.height", "not implemented");
            return;
        }
        if (B.x >= A.x + A.width && B.y + B.height < A.y) { // Useless, covered by previous, here for safety
            console.log("connector", "running B.x >= A.x + A.width && B.y + B.height < A.y", "not implemented");
            return;
        }

        if (B.x + B.width <= A.x && B.y < A.y + A.height) {
            console.log("connector", "running B.x + B.width <= A.x && B.y < A.y + A.height", "not implemented");
            return;
        }
        if (B.x + B.width <= A.x && B.y + B.height < A.y) { // Useless, covered by previous, here for safety
            console.log("connector", "running B.x + B.width <= A.x && B.y + B.height < A.y", "not implemented");
            return;
        }

        console.log("connector", "unsupported configuration");
    }
}

/**
 * Connects two boxes.
 * 
 * @param {Box} A 
 * @param {Box} B 
 * @return {Element} The svg element
 */
function connect_a_top_left_b_bottom_right(A, B) {
    let q = quantities(A, B);

    let x = q.xa1 + Math.floor(A.width / 2);
    let y = q.ya2;

    return generateLine(q.w, q.h, y, x, 0, 0, q.w, q.h);
}

/**
 * Connects two boxes.
 * 
 * @param {Box} A 
 * @param {Box} B 
 * @return {Element} The svg element
 */
function connect_a_top_right_b_bottom_left(A, B) {
    let q = quantities(A, B);

    let x = q.xb1 + Math.floor(B.width / 2);
    let y = q.ya2;

    return generateLine(q.w, q.h, y, x, 0, q.h, q.w, 0);
}

/**
 * Connects two boxes.
 * 
 * @param {Box} A 
 * @param {Box} B 
 * @return {Element} The svg element
 */
function connect_a_bottom_right_b_top_left(A, B) {
    return connect_a_top_left_b_bottom_right(B, A);
}

/**
 * Connects two boxes.
 * 
 * @param {Box} A 
 * @param {Box} B 
 * @return {Element} The svg element
 */
function connect_a_bottom_left_b_top_right(A, B) {
    return connect_a_top_right_b_bottom_left(B, A);
}

function quantities(A, B) {
    return {
        xa1: A.x,
        ya1: A.y,
        xb1: B.x,
        yb1: B.y,
        xa2: A.x + A.width,
        ya2: A.y + A.height,
        xb2: B.x + B.width,
        yb2: B.y + B.height,
        w: Math.abs(B.x - A.x),
        h: Math.abs(B.y - (A.y + A.height)),
        w1: Math.abs(B.x - A.x),
        h1: Math.abs(B.y + B.height - A.y)
    }
}

function generateLine(w, h, top, left, l1, l2, l3, l4) {
    let svg = snap(w, h);
    let svgId = `conn${generateId()}`;
    svg.attr({ id: svgId });

    let svgElement = document.getElementById(svgId);
    svgElement.style.position = "absolute";
    svgElement.style.top = `${top}px`;
    svgElement.style.left = `${left}px`;

    let line = svg.line(l1, l2, l3, l4);
    line.attr({
        "stroke": "#000",
        "stroke-width": "2"
    });

    return svgElement;
}

function generateId() {
    let letters = '0123456789abcdef'.split('');
    let r = 'box-';
    for (let i = 0; i < 6; i++) {
        r += letters[Math.floor(Math.random() * 10)];
    }
    return r;
}
