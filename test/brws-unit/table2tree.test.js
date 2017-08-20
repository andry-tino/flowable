/**
 * table2tree.test.js
 * Andrea Tino - 2017
 */

import * as components from "../../src/tree";
import * as boxes from "../../src/box";
import * as treeTableConversions from "../../src/table2tree";
import * as tables from "../../src/relationsTable";
import * as relations from "../../src/relation";

import * as treeTraversalUtils from "../utils/treeTraverser";

describe("TestSuite for conversion from table to tree", function() {

    it("Linear tree", function() {
        let table = new tables.RelationsTable();

        let box0 = new boxes.Box("box-000000");
        let box1 = new boxes.Box("box-000001");
        let box2 = new boxes.Box("box-000002");
        let box3 = new boxes.Box("box-000003");

        // Adding relations
        table.add(new relations.Relation(box0, box1));
        table.add(new relations.Relation(box1, box2));
        table.add(new relations.Relation(box2, box3));

        // Convert
        var root = new treeTableConversions.Table2Tree(table).convert();

        // Root should be correctly identified
        expect(root).toBeTruthy();
        expect(root.id).toEqual("box-000000");

        testTreeTraverse(root, "box-000000;box-000001;box-000002;box-000003;", 4);
    });

});

function testTreeTraverse(root, expectedOutput, expectedCount) {
    let output = "";
    let action = function(node) {
        output += node.id;
        output += ";";
    };

    let traverser = new treeTraversalUtils.TreeTraverser(root);
    let count = traverser.traverse(action);

    expect(output).toEqual(expectedOutput);
    expect(count).toEqual(expectedCount);
}
