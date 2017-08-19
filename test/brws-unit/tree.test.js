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

});
