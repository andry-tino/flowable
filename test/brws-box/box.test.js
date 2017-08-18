/**
 * box.test.js
 * Andrea Tino - 2017
 */

import * as components from "../../src/box";

describe("TestSuite for Box", function() {
    let box = new components.Box();

    it("Random id generation", function() {
        // Check not null or undefined
        expect(box.id).not.toBeNull();
        expect(box.id).not.toBeUndefined();
        expect(box.id).toBeTruthy();

        // Check length
        expect(box.id.length).toBeTruthy();
        expect(box.id.length).toEqual(10);
    });

    it("Id assignment", function() {
        let box = new components.Box();
        expect(box.id).toBeTruthy();

        box.id = "box-000000";
        expect(box.id).toEqual("box-000000");
    });

});
