import snap from "snapsvg";
import * as conn from "../../../src/connector.js";
import * as boxes from "../../../src/box.js";

window.addEventListener("load", function() {
    create2Boxes1Rel("box-a", "box-b");
    create2Boxes1Rel("box-a", "box-c");
    create2Boxes1Rel("box-b", "box-d");
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

    box.x = Math.ceil(rect.left);
    box.y = Math.ceil(rect.top);
    box.width = Math.ceil(rect.width);
    box.height = Math.ceil(rect.height);

    return box;
}
