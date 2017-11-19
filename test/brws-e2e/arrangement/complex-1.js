import * as components from "../../../src/arranger.js";
import * as boxes from "../../../src/box.js";
import * as tables from "../../../src/relationsTable.js";
import * as relations from "../../../src/relation.js";

window.addEventListener("load", function() {
    let table = new tables.RelationsTable();

    let box0 = createBox("box-a");
    let box1 = createBox("box-b");
    let box2 = createBox("box-c");
    let box3 = createBox("box-d");

    table.add(new relations.Relation(box0, box1, relations.Relation.D));
    table.add(new relations.Relation(box0, box2, relations.Relation.R));
    table.add(new relations.Relation(box2, box3, relations.Relation.D));

    // Performing arrangement
    let arranger = new components.Arranger(table);
    arranger.run();

    // Apply coordinates
    let box0Element = document.getElementById("box-a");
    let box1Element = document.getElementById("box-b");
    let box2Element = document.getElementById("box-c");
    let box3Element = document.getElementById("box-d");

    box0Element.style.top = `${box0.y}px`;
    box0Element.style.left = `${box0.x}px`;
    console.log("Calculated coordinates", "box0", box0.x, box0.y);

    box1Element.style.top = `${box1.y}px`;
    box1Element.style.left = `${box1.x}px`;
    console.log("Calculated coordinates", "box1", box1.x, box1.y);

    box2Element.style.top = `${box2.y}px`;
    box2Element.style.left = `${box2.x}px`;
    console.log("Calculated coordinates", "box2", box2.x, box2.y);

    box3Element.style.top = `${box3.y}px`;
    box3Element.style.left = `${box3.x}px`;
    console.log("Calculated coordinates", "box1", box3.x, box3.y);
});

function createBox(id) {
    let box = new boxes.Box(`fromel-${id}`);
    let el = document.getElementById(id);

    if (!el) throw `Could not find element ${id}`;

    let rect = el.getBoundingClientRect();

    box.x = 0;
    box.y = 0;
    box.width = Math.ceil(rect.width);
    box.height = Math.ceil(rect.height);

    return box;
}
