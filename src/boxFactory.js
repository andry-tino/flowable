/**
 * boxFactory.js
 * Andrea Tino - 2017
 */

import * as content from "./box.js";

/**
 * Describes a factory for boxes.
 * 
 * @export
 * @class BoxFactory
 */
export class BoxFactory {
    /**
     * Creates an instance of BoxFactory.
     * 
     * @memberof BoxFactory
     */
    constructor() {
    }

    /**
     * Creates a box from an element.
     * 
     * @memberof BoxFactory
     * @returns A box.
     */
    createFromElement(element) {
        if (!element) {
            throw "element cannot be null or undefined!";
        }

        let id = (!element.id || element.id.length == 0) 
            ? null 
            : `fromel-${element.id}`;

        let box = new content.Box(id); // If null, rnd will be assigned

        let rect = element.getBoundingClientRect();

        box.x = 0;
        box.y = 0;
        box.width = Math.ceil(rect.width);
        box.height = Math.ceil(rect.height);
        box.element = element;

        return box;
    }
}
