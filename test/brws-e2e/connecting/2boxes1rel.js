import snap from "snapsvg";
import * as conn from "../../../src/connector.js";
import * as boxes from "../../../src/box.js";

window.addEventListener("load", function() {
    let connector = new conn.Connector(document.body);

    let box0 = createBox("box0");
    let box1 = createBox("box1");

    connector.connect(box0, box1);
});

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
