/**
 * relationsTable.js
 * Andrea Tino - 2017
 */

/**
 * Describes a table containing relations.
 * This class performs checks on the collection in order to avoid duplicates.
 * 
 * @export
 * @class RelationsTable
 */
export class RelationsTable {
    /**
     * Creates an instance of RelationsTable.
     * @memberof RelationsTable
     */
    constructor() {
        this.relations = [];
    }

    /**
     * Adds a relation to the table.
     * 
     * @param {any} relation 
     * @memberof RelationsTable
     */
    add(relation) {
        if (!relation) throw "relation cannot be null or undefined";
        this.relations.push(relation);
    }

    /**
     * Iterates through the relations.
     * 
     * @param {any} action 
     * @memberof RelationsTable
     */
    each(action) {
        if (!action) throw "action cannot be null or undefined";

        for (let i = 0; i < this.relations.length; i++)
            action(this.relations[i]);
    }

    /**
     * Gets the length of the table.
     * 
     * @readonly
     * @memberof RelationsTable
     */
    get size() { return this.relations.length; }
}
