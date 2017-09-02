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
     * @param {any} box1 
     * @param {any} box2 
     * @memberof Connector
     */
    connect(box1, box2) {
        if (!box1) throw "box1 cannot be null or undefined";
        if (!box2) throw "box2 cannot be null or undefined";

        // From box1 bottom middle to box2 top middle
        let startx = Math.floor(box1.width / 2) + box1.x;
        let starty = box1.height + box1.y;
        let endx = Math.floor(box2.width / 2) + box2.x;
        let endy = box2.y;
        let w = Math.abs(startx - endx);
        let h = Math.abs(starty - endy);

        let svg = snap(w, h);
        svg.attr({ id: "l1" });

        let svgElement = document.getElementById("l1");
        svgElement.style.position = "absolute";
        svgElement.style.top = `${startx}px`;
        svgElement.style.left = `${starty}px`;

        let line = svg.line(0, 0, w, h);
        line.attr({
            "stroke": "#000",
            "stroke-width": "2"
        });
    }
}
