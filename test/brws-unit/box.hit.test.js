/**
 * box.test.js
 * Andrea Tino - 2017
 */

import * as components from "../../src/box.js";

describe("TestSuite for Box hit-testing", function() {

    it("Non hitting boxes", function() {
        test(0,   0,   100, 100, 
             200, 200, 100, 100,
             false);
    });

    it("Hitting boxes", function() {
        test(0,   0,   100, 100, 
             50,  50,  100, 100,
             true);
    });

    it("Edge hitting boxes", function() {
        // Edges: east + west
        test(0,   0,   100, 100, 
             100, 0,   100, 100,
             true);
            
        // Edges: south + north
        test(0,   0,   100, 100, 
             0,   100, 100, 100,
            true);
    });

});

function test(x1, y1, w1, h1, x2, y2, w2, h2, expected) {
    let box1 = createBox(x1, y1, w1, h1);
    let box2 = createBox(x2, y2, w2, h2);

    // Hitting is commutative
    expect(components.hitTest(box1, box2)).toEqual(expected);
    expect(components.hitTest(box2, box1)).toEqual(expected);
}

function createBox(x, y, w, h) {
    var box = new components.Box();

    box.x = x;
    box.y = y;
    box.width = w;
    box.height = h;

    return box;
}
