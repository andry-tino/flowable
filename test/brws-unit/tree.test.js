/**
 * tree.test.js
 * Andrea Tino - 2017
 */

import * as components from "../../src/tree";
import * as boxes from "../../src/box";

describe("TestSuite for Node", function() {

    it("Id taken from content object", function() {
        let box = new boxes.Box();
        let node = new components.Node(box);

        let id = node.id;

        // Check not null or undefined
        expect(id).not.toBeNull();
        expect(id).not.toBeUndefined();
        expect(id).toBeTruthy();

        // Check length
        expect(id.length).toBeTruthy();
        expect(id.length).toEqual(10);
    });

    it("Id updated", function() {
        let box = new boxes.Box();
        let node = new components.Node(box);

        let id = node.id;
        expect(id).toBeTruthy();
        expect(id.length).toEqual(10);
        expect(id).not.toEqual("box-000000");

        // Change the id
        box.id = "box-000000";
        let id2 = node.id;

        expect(id2).toEqual("box-000000");
    });

    it("No children", function() {
        let box = new boxes.Box();
        let node = new components.Node(box);

        expect(node.firstChild).toBeNull();
        expect(node.lastChild).toBeNull();
        expect(node.count).toEqual(0);
    });

    it("One child", function() {
        let node = new components.Node(new boxes.Box("box-000000"));
        let child = new components.Node(new boxes.Box("box-000001"));

        node.addChild(child, new components.Arc());

        testFirstChild(node, "box-000001");
        testLastChild(node, "box-000001");
        testNthChild(node, 1, "box-000001");

        expect(node.count).toEqual(1);
    });

    it("Two children", function() {
        let node = new components.Node(new boxes.Box("box-000000"));
        let child1 = new components.Node(new boxes.Box("box-000001"));
        let child2 = new components.Node(new boxes.Box("box-000002"));

        node.addChild(child1, new components.Arc());
        node.addChild(child2, new components.Arc());

        testFirstChild(node, "box-000001");
        testLastChild(node, "box-000002");
        testNthChild(node, 1, "box-000001");
        testNthChild(node, 2, "box-000002");

        expect(node.count).toEqual(2);
    });

    it("Get child out of bounds", function() {
        let node = new components.Node(new boxes.Box("box-000000"));
        let child1 = new components.Node(new boxes.Box("box-000001"));
        let child2 = new components.Node(new boxes.Box("box-000002"));

        node.addChild(child1, new components.Arc());
        node.addChild(child2, new components.Arc());

        expect(node.child(0)).toBeNull();
        expect(node.child(1)).not.toBeNull();
        expect(node.child(2)).not.toBeNull();
        expect(node.child(3)).toBeNull();
    });

});

describe("TestSuite for Arc", function() {

    it("Default type", function() {
        let arc = new components.Arc();

        expect(arc.type).toEqual(components.Arc.D);
    });

});

function testFirstChild(node, expectedId) {
    expect(node.firstChild).toBeTruthy();
    expect(node.firstChild.node).toBeTruthy();
    expect(node.firstChild.node.id).toBeTruthy();
    expect(node.firstChild.node.id).toEqual(expectedId);
}

function testLastChild(node, expectedId) {
    expect(node.lastChild).toBeTruthy();
    expect(node.lastChild.node).toBeTruthy();
    expect(node.lastChild.node.id).toBeTruthy();
    expect(node.lastChild.node.id).toEqual(expectedId);
}

function testNthChild(node, n, expectedId) {
    expect(node.child(n)).toBeTruthy();
    expect(node.child(n).node).toBeTruthy();
    expect(node.child(n).node.id).toBeTruthy();
    expect(node.child(n).node.id).toEqual(expectedId);
}
