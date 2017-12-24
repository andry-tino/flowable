/**
 * tableProvider.js
 * Andrea Tino - 2017
 */

import * as boxFactory from "./boxFactory.js";
import * as relation from "./relation.js";
import * as relationsTable from "./relationsTable.js";

/**
 * Describes a table provider.
 * 
 * @export
 * @class TableProvider
 */
export class TableProvider {
    /**
     * Creates an instance of TableProvider.
     * 
     * @memberof RelationsTable
     * @param {*} root 
     */
    constructor(root) {
        if (!root) {
            throw "root cannot be null or undefined!";
        }

        this.root = root;
    }

    /**
     * Gets the table by looking in the element.
     * 
     * @memberof TableProvider
     * @returns A table with relations already filled.
     */
    get() {
        var table = new relationsTable.RelationsTable();

        var id2boxDict = {};
        var factory = new boxFactory.BoxFactory();
        var searchElement = this.root;

        let getBox = function(element) {
            if (!element) throw "element cannot be null or undefined!";

            var id = element.id;
            if (!id) throw "element id cannot be null or undefined!";

            var box = id2boxDict[id];
            if (!box) {
                box = factory.createFromElement(element);
                id2boxDict[id] = box;
            }

            return box;
        };

        let scanElements = function(action) { // action accepts: (element, id, relDir, relId)
            for (let i = 0; i < searchElement.children.length; i++) {
                let child = searchElement.children[i];
    
                let idAttribute = child.attributes[TableProvider.DataAttributeId].value;
                let relDirAttribute = child.attributes[TableProvider.DataAttributeRelationDirection].value;
                let relIdAttribute = child.attributes[TableProvider.DataAttributeRelationId].value;

                let idAttributeCond = idAttribute && idAttribute.length > 0;
                let relDirAttributeCond = typeof(relDirAttribute) !== "undefined";
                let relIdAttributeCond = typeof(relIdAttribute) !== "undefined";
    
                // We check only the id as the root element does not have the other two attributes
                if (idAttributeCond && relDirAttributeCond && relIdAttributeCond) {
                    action(child, idAttribute, relDirAttribute, relIdAttribute);
                }
            }
        };

        // First scan for elements
        scanElements(function(element, id, relDir, relId) {
            getBox(element); // First time, box is created
        });

        // Second, make relations
        scanElements(function(element, id, relDir, relId) {
            var curBox = id2boxDict[id];
            var targetBox = id2boxDict[relId];

            if (!curBox) throw `Could not find box with id ${id}`;
            if (!targetBox) return; // An element which has no relation on LHS

            // Direction as letter, convert
            var direction = relation.Relation.parseDirection(relDir);

            var rel = new relation.Relation(targetBox, curBox, direction);
            table.add(rel);
        });

        return table;
    }

    /**
     * Gets the name of the attribute to use to specify the direction (LHS).
     * 
     * @readonly
     * @static
     * @memberof TableProvider
     */
    static get DataAttributeRelationDirection() { return "data-flowable-rel-dir"; }

    /**
     * Gets the name of the attribute to use to specify the associated node in the relation (LHS).
     * 
     * @readonly
     * @static
     * @memberof TableProvider
     */
    static get DataAttributeRelationId() { return "data-flowable-rel-id"; }

    /**
     * Gets the name of the attribute to use to specify one node's id.
     * 
     * @readonly
     * @static
     * @memberof TableProvider
     */
    static get DataAttributeId() { return "id"; }
}
