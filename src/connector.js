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
        if (B.y >= A.y + A.height && B.x >= A.x) {
            console.log("connector", "running B.y >= A.y + A.height && B.x >= A.x + A.widt");
            let element = connect_a_top_left_b_bottom_right(A, B);
            return;
        }

        if (B.y >= A.y + A.height && B.x + B.width <= A.x) {
            console.log("connector", "running B.y >= A.y + A.height && B.x + B.width <= A.x");
            let element = connect_a_top_right_b_bottom_left(A, B);
            return;
        }
        if (B.y >= A.y + A.height && B.x <= A.x) {
            console.log("connector", "running B.y >= A.y + A.height && B.x + B.width <= A.x");
            let element = connect_a_top_right_b_bottom_left(A, B);
            return;
        }

        if (B.y + B.height <= A.y && B.x + B.width <= A.x) {
            console.log("connector", "running B.y + B.height <= A.y && B.x + B.width <= A.xx");
            let element = connect_a_bottom_right_b_top_left(A, B);
            return;
        }
        if (B.y + B.height <= A.y && B.x <= A.x) {
            console.log("connector", "running B.y + B.height <= A.y && B.x + B.width <= A.xx");
            let element = connect_a_bottom_right_b_top_left(A, B);
            return;
        }

        if (B.y + B.height < A.y && B.x >= A.x + A.width) {
            console.log("connector", "running B.y + B.height < A.y && B.x >= A.x + A.width");
            let element = connect_a_bottom_left_b_top_right(A, B);
            return;
        }
        if (B.y + B.height < A.y && B.x >= A.x) {
            console.log("connector", "running B.y + B.height < A.y && B.x >= A.x + A.width");
            let element = connect_a_bottom_left_b_top_right(A, B);
            return;
        }

        if (B.x >= A.x + A.width && B.y < A.y + A.height) {
            console.log("connector", "running B.x >= A.x + A.width && B.y < A.y + A.height");
            let element = connect_a_left_b_right(A, B);
            return;
        }
        if (B.x >= A.x + A.width && B.y + B.height < A.y) { // Useless, covered by previous, here for safety
            console.log("connector", "running B.x >= A.x + A.width && B.y + B.height < A.y ! 2");
            let element = connect_a_left_b_right(A, B);
            return;
        }

        if (B.x + B.width <= A.x && B.y < A.y + A.height) {
            console.log("connector", "running B.x + B.width <= A.x && B.y < A.y + A.height");
            let element = connect_a_right_b_left(A, B);
            return;
        }
        if (B.x + B.width <= A.x && B.y + B.height < A.y) { // Useless, covered by previous, here for safety
            console.log("connector", "running B.x + B.width <= A.x && B.y + B.height < A.y");
            let element = connect_a_right_b_left(A, B);
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

/**
 * Connects two boxes.
 * 
 * @param {Box} A 
 * @param {Box} B 
 * @return {Element} The svg element
 */
function connect_a_left_b_right(A, B) {
    let q = quantities(A, B);

    let x = q.xa2;
    let y = q.ya1 + Math.floor(A.height / 2) - (A.y <= B.y ? 0 : q.h2);

    return A.y <= B.y 
        ? generateLine(q.w2, q.h2, y, x, 0, 0, q.w2, q.h2) 
        : generateLine(q.w2, q.h2, y, x, 0, q.h2, q.w2, 0);
}

/**
 * Connects two boxes.
 * 
 * @param {Box} A 
 * @param {Box} B 
 * @return {Element} The svg element
 */
function connect_a_right_b_left(A, B) {
    let q = quantities(A, B);

    let x = q.xb2;
    let y = q.yb1 + Math.floor(B.height / 2) - (A.y >= B.y ? 0 : q.h3);

    return A.y >= B.y 
        ? generateLine(q.w3, q.h3, y, x, 0, 0, q.w3, q.h3) 
        : generateLine(q.w3, q.h3, y, x, 0, q.h3, q.w3, 0);
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
        h1: Math.abs(B.y + B.height - A.y),
        w2: Math.abs(B.x - (A.x + A.width)),
        h2: Math.abs(B.y - A.y),
        w3: Math.abs(A.x - (B.x + B.width)),
        h3: Math.abs(B.y - A.y)
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
