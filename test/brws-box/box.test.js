/**
 * box.test.js
 * Andrea Tino - 2017
 */

import * as components from "../../src/box";

describe("TestSuite for Box", function() {
    let box = new components.Box();

    it("Random id generation", function() {
        expect(box.id).not.toBeNull();
    });

});
