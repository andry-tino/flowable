import * as components from "../../src/arranger.js";
import * as boxes from "../../src/box.js";
import * as tables from "../../src/relationsTable.js";
import * as relations from "../../src/relation.js";

window.addEventListener("load", function() {
    let table = new tables.RelationsTable();

    let box0 = new boxes.Box("box-000000");
    box0.width = 100;
    box0.height = 100;

    let box1 = new boxes.Box("box-000001");
    box1.width = 100;
    box1.height = 100;

    let box2 = new boxes.Box("box-000002");
    box2.width = 100;
    box2.height = 100;

    let box3 = new boxes.Box("box-000003");
    box3.width = 100;
    box3.height = 100;

    table.add(new relations.Relation(box0, box1));
    table.add(new relations.Relation(box1, box2));
    table.add(new relations.Relation(box2, box3));

    // Performing arrangement
    let arranger = new components.Arranger(table);
    arranger.run();

    // Apply coordinates
    let box0Element = document.getElementById("box0");
    let box1Element = document.getElementById("box1");
    let box2Element = document.getElementById("box2");
    let box3Element = document.getElementById("box3");
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
    console.log("Calculated coordinates", "box3", box3.x, box3.y);
});
