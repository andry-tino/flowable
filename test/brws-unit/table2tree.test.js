/**
 * table2tree.test.js
 * Andrea Tino - 2017
 */

import * as components from "../../src/tree.js";
import * as boxes from "../../src/box.js";
import * as treeTableConversions from "../../src/table2tree.js";
import * as tables from "../../src/relationsTable.js";
import * as relations from "../../src/relation.js";

import * as treeTraversalUtils from "../utils/treeTraverser.js";

describe("TestSuite for conversion from table to tree", function() {

    it("Nodes encapsulating boxes keep references to boxes", function() {
        let table = new tables.RelationsTable();

        let box0 = new boxes.Box("box-000000");
        let box1 = new boxes.Box("box-000001");

        // Adding relations
        table.add(new relations.Relation(box0, box1));

        // Convert
        var root = new treeTableConversions.Table2Tree(table).convert();

        /*
         * The boxes encapsulated in the nodes are the same references to 
         * the initial boxes, no dulication involved
         */
        expect(root).toBeTruthy();
        expect(root.id).toEqual("box-000000");
        expect(root.content == box0).toEqual(true);

        expect(root.firstChild).toBeTruthy();
        expect(root.firstChild.node.id).toEqual("box-000001");
        expect(root.firstChild.node.content == box1).toEqual(true);
    });

    it("Linear tree with two nodes", function() {
        let table = new tables.RelationsTable();

        let box0 = new boxes.Box("box-000000");
        let box1 = new boxes.Box("box-000001");

        // Adding relations
        table.add(new relations.Relation(box0, box1));

        // Convert
        var root = new treeTableConversions.Table2Tree(table).convert();

        // Root should be correctly identified
        expect(root).toBeTruthy();
        expect(root.id).toEqual("box-000000");

        testTreeTraverse(root, "box-000000;box-000001;", 2);
    });
    
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

    it("Binary tree with 2 levels", function() {
        let table = new tables.RelationsTable();

        let box0 = new boxes.Box("box-000000");
        let box11 = new boxes.Box("box-000011");
        let box12 = new boxes.Box("box-000012");
        let box21 = new boxes.Box("box-000021");
        let box22 = new boxes.Box("box-000022");
        let box23 = new boxes.Box("box-000023");
        let box24 = new boxes.Box("box-000024");

        // Adding relations
        table.add(new relations.Relation(box0, box11));
        table.add(new relations.Relation(box0, box12));
        table.add(new relations.Relation(box11, box21));
        table.add(new relations.Relation(box11, box22));
        table.add(new relations.Relation(box12, box23));
        table.add(new relations.Relation(box12, box24));

        // Convert
        var root = new treeTableConversions.Table2Tree(table).convert();

        // Root should be correctly identified
        expect(root).toBeTruthy();
        expect(root.id).toEqual("box-000000");

        testTreeTraverse(root, "box-000000;box-000011;box-000021;box-000022;box-000012;box-000023;box-000024;", 7);
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
