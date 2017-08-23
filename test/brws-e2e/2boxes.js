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

    table.add(new relations.Relation(box0, box1));

    // Performing arrangement
    let arranger = new components.Arranger(table);
    arranger.run();
});
