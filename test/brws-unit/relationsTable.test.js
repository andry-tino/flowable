/**
 * relationsTable.test.js
 * Andrea Tino - 2017
 */

import * as tables from "../../src/relationsTable";
import * as boxes from "../../src/box";
import * as relations from "../../src/relation";

describe("TestSuite for RelationsTable", function() {

    it("Size", function() {
        let table = new tables.RelationsTable();

        let box0 = new boxes.Box("box-000000");
        let box1 = new boxes.Box("box-000001");
        let box2 = new boxes.Box("box-000002");
        let box3 = new boxes.Box("box-000003");

        // Adding relations
        table.add(new relations.Relation(box0, box1));
        table.add(new relations.Relation(box1, box2));
        table.add(new relations.Relation(box2, box3));

        expect(table.size).toEqual(3);
    });

    it("Get box", function() {
        let table = new tables.RelationsTable();

        let box0 = new boxes.Box("box-000000");
        let box1 = new boxes.Box("box-000001");
        let box2 = new boxes.Box("box-000002");
        let box3 = new boxes.Box("box-000003");

        // Adding relations
        table.add(new relations.Relation(box0, box1));
        table.add(new relations.Relation(box1, box2));
        table.add(new relations.Relation(box2, box3));

        // Getting boxes
        let retrievedBox0 = table.getBox("box-000000");
        expect(retrievedBox0).toBeTruthy();
        expect(box0 == retrievedBox0).toEqual(true);
        expect(retrievedBox0.id).toEqual("box-000000");
    });

    it("Get non-existing box", function() {
        let table = new tables.RelationsTable();

        let box0 = new boxes.Box("box-000000");
        let box1 = new boxes.Box("box-000001");

        // Adding relations
        table.add(new relations.Relation(box0, box1));

        // Getting boxes
        let retrievedBox = table.getBox("box-111111");
        expect(retrievedBox).toBeNull();
    });

});
