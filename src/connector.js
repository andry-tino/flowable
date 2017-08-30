/**
 * connector.js
 * Andrea Tino - 2017
 */

import * as blocks from "./box.js";

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
    constructor(element) {
        if (!element) throw "element cannot be null or undefined";

        /*
        this.twoctx = new two.Two({
            type: "svg",
            fullscreen: true
        });
        this.twoctx.appendTo(element);
        */
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

        //let line = this.twoctx.makeLine(box1.x, box1.y, box2.x, box2.y);

        //this.twoctx.update();
    }
}
