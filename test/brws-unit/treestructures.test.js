/**
 * treestructures.test.js
 * Andrea Tino - 2017
 */

import * as components from "../../src/tree";
import * as boxes from "../../src/box";

import * as treeTraversalUtils from "../utils/treeTraverser";

describe("TestSuite targeting composition of trees", function() {

    it("Linear tree", function() {
        let root = new components.Node(new boxes.Box("box-000000"));
        let node1 = new components.Node(new boxes.Box("box-000001"));
        let node2 = new components.Node(new boxes.Box("box-000002"));
        let node3 = new components.Node(new boxes.Box("box-000003"));

        root.addChild(node1, new components.Arc()); // root -> node1
        node1.addChild(node2, new components.Arc()); // node1 -> node2
        node2.addChild(node3, new components.Arc()); // node2 -> node3

        testTreeTraverse(root, "box-000000;box-000001;box-000002;box-000003;", 4);
    });

    it("Binary tree with 2 levels", function() {
        let root = new components.Node(new boxes.Box("box-000000"));
        let node11 = new components.Node(new boxes.Box("box-000011"));
        let node12 = new components.Node(new boxes.Box("box-000012"));
        let node21 = new components.Node(new boxes.Box("box-000021"));
        let node22 = new components.Node(new boxes.Box("box-000022"));
        let node23 = new components.Node(new boxes.Box("box-000023"));
        let node24 = new components.Node(new boxes.Box("box-000024"));

        root.addChild(node11, new components.Arc()); // root -> node11
        root.addChild(node12, new components.Arc()); // root -> node12
        node11.addChild(node21, new components.Arc()); // node11 -> node21
        node11.addChild(node22, new components.Arc()); // node11 -> node22
        node12.addChild(node23, new components.Arc()); // node12 -> node23
        node12.addChild(node24, new components.Arc()); // node12 -> node24

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
