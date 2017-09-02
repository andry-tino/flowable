import snap from "snapsvg";
import * as conn from "../../../src/connector.js";

window.addEventListener("load", function() {
    let connector = new conn.Connector(document.body);

    connector.connect(
        { x: 50, y: 50, height: 100, width: 100 }, 
        { x: 200, y: 200, height: 100, width: 100 }
    );
});
