/**
 * box.test.js
 * Andrea Tino - 2017
 */

import * as components from "../../src/box.js";

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

    it("Construct with id", function() {
        let namedBox = new components.Box("box-000000");

        expect(namedBox.id).toBeTruthy();
        expect(namedBox.id).toEqual("box-000000");
    });

    it("Multiple random id generation", function() {
        for (let i = 0; i < 100; i++) {
            let box = new components.Box();

            // Check not null or undefined
            expect(box.id).toBeTruthy();

            // Check length
            expect(box.id.length).toBeTruthy();
            expect(box.id.length).toEqual(10);
        }
    });

    it("Id assignment", function() {
        let box = new components.Box();
        expect(box.id).toBeTruthy();

        box.id = "box-000000";
        expect(box.id).toEqual("box-000000");
    });

    it("Assign falsy id", function() {
        let box = new components.Box();
        expect(box.id).toBeTruthy();

        let assignNull = function() {
            box.id = null;
        };
        let assignUndefined = function() {
            box.id = undefined;
        };
        let assignProper = function() {
            box.id = "box-000000";
        };
        
        expect(assignNull).toThrow();
        expect(assignUndefined).toThrow();
        expect(assignProper).not.toThrow();
    });

});
