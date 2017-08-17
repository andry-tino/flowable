/**
 * arranger.js
 * Andrea Tino - 2017
 */

import * as relationsTable from "./relationsTable";

/**
 * Describes the arranging algorithm.
 * The algorithm takes as input a table of boxes, those 
 * boxes will be modified, not copied.
 * 
 * @export
 * @class Arranger
 */
export class Arranger {
    /**
     * Creates an instance of Arranger.
     * @param {relationsTable.RelationsTable} table 
     * @memberof Arranger
     */
    constructor(table) {
        if (!table) throw "table cannot be null or undefined";

        this.table = table;
    }

    /**
     * Runs the algorithm.
     * 
     * @memberof Arranger
     */
    run() {

    }
}
