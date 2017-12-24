import * as components from "../../../src/arranger.js";
import * as tableProvider from "../../../src/tableProvider.js";
import * as tables from "../../../src/relationsTable.js";

window.addEventListener("load", function() {
    let table = new tableProvider.TableProvider(document.body).get();

    // Performing arrangement
    let arranger = new components.Arranger(table, true);
    arranger.run();
});
