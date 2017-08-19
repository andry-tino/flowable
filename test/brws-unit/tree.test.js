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

        expect(node.firstChild).toBeTruthy();
        expect(node.lastChild).toBeTruthy();
        expect(node.child(1)).toBeTruthy();

        expect(node.firstChild.node).toBeTruthy();
        expect(node.lastChild.node).toBeTruthy();
        expect(node.child(1).node).toBeTruthy();

        expect(node.firstChild.node.id).toBeTruthy();
        expect(node.lastChild.node.id).toBeTruthy();
        expect(node.child(1).node.id).toBeTruthy();
        expect(node.firstChild.node.id).toEqual("box-000001");
        expect(node.lastChild.node.id).toEqual("box-000001");
        expect(node.child(1).node.id).toEqual("box-000001");

        expect(node.count).toEqual(1);
    });

});

describe("TestSuite for Arc", function() {

    it("Default type", function() {
        let arc = new components.Arc();

        expect(arc.type).toEqual(components.Arc.D);
    });

});
