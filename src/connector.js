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

        let element = connect_a_top_b_bottom(A, B);
    }
}

/**
 * Connects two boxes.
 * 
 * @param {Box} A 
 * @param {Box} B 
 * @return {Element} The svg element
 */
function connect_a_top_b_bottom(A, B) {
    let xa1 = A.x;
    let ya1 = A.y;
    let xb1 = B.x;
    let yb1 = B.y;

    let xa2 = xa1 + A.width;
    let ya2 = ya1 + A.height;
    let xb2 = xb1 + B.width;
    let yb2 = yb1 + B.height;

    let w = Math.abs(xb1 - xa1);
    let h = Math.abs(yb1 - ya2);

    let x = xa1 + Math.floor(A.width / 2);
    let y = ya2;

    let svg = snap(w, h);
    svg.attr({ id: "l1" });

    let svgElement = document.getElementById("l1");
    svgElement.style.position = "absolute";
    svgElement.style.top = `${y}px`;
    svgElement.style.left = `${x}px`;

    let line = svg.line(0, 0, w, h);
    line.attr({
        "stroke": "#000",
        "stroke-width": "2"
    });

    return svgElement;
}
