import snap from "snapsvg";
import * as conn from "../../../src/connector.js";

window.addEventListener("load", function() {
    let connector = new conn.Connector(document.body);

    connector.connect({ x: 50, y: 100 }, { x: 50, y: 150 });
});
