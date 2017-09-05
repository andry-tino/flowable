import snap from "snapsvg";
import * as conn from "../../../src/connector.js";
import * as boxes from "../../../src/box.js";

window.addEventListener("load", function() {
    create2Boxes1Rel("box10", "box11");
    create2Boxes1Rel("box20", "box21");
    create2Boxes1Rel("box30", "box31");
    create2Boxes1Rel("box40", "box41");
});

function create2Boxes1Rel(id0, id1) {
    let connector = new conn.Connector();

    let box0 = createBox(id0);
    let box1 = createBox(id1);

    connector.connect(box0, box1);
}

function createBox(id) {
    let box = new boxes.Box();
    let el = document.getElementById(id);

    if (!el) throw `Could not find element ${id}`;

    let rect = el.getBoundingClientRect();

    box.x = rect.left;
    box.y = rect.top;
    box.width = rect.width;
    box.height = rect.height;

    return box;
}
