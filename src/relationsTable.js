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
        this.boxes = {}; // We keep a dictionary of boxes: id -> box
    }

    /**
     * Adds a relation to the table.
     * 
     * @param {any} relation 
     * @memberof RelationsTable
     */
    add(relation) {
        if (!relation) throw "relation cannot be null or undefined";
        if (!relation.rhs) throw "relation's RHS cannot be null or undefined";
        if (!relation.lhs) throw "relation's LHS cannot be null or undefined";

        this.relations.push(relation);
        
        if (!this.boxes[relation.rhs.id]) this.boxes[relation.rhs.id] = relation.rhs;
        if (!this.boxes[relation.lhs.id]) this.boxes[relation.lhs.id] = relation.lhs;
    }

    /**
     * Gets a box by providing the id.
     * 
     * @param {String} id 
     * @memberof RelationsTable
     */
    getBox(id) {
        if (!id) throw "id cannot be null or undefined";

        let box = this.boxes[id];
        if (!box) return null;

        return box;
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
     * Gets the length of the table (number of relations).
     * 
     * @readonly
     * @memberof RelationsTable
     */
    get size() { return this.relations.length; }
}
