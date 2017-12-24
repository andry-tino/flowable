import * as arranger from "./arranger.js";
import * as box from "./box.js";
import * as boxFactory from "./boxFactory.js";
import * as connector from "./connector.js";
import * as relation from "./relation.js";
import * as relationsTable from "./relationsTable.js";
import * as tableProvider from "./tableProvider.js";
import * as table2tree from "./table2tree.js";
import * as tree from "./tree.js";
import * as treeTraversal from "./treeTraversal.js";

export var arrangement = {
    Arranger: arranger.Arranger
};

export var content = {
    Box: box.Box,
    BoxFactory: boxFactory.BoxFactory,
    Relation : relation.Relation,
    RelationsTable: relationsTable.RelationsTable,
    TableProvider: tableProvider.TableProvider
};

export var trees = {
    Table2Tree: table2tree.Table2Tree,
    Node: tree.Node,
    ChildInfo: tree.ChildInfo,
    Arc: tree.Arc,
    traverse: {
        TreeTraverser: treeTraversal.TreeTraverser,
        BreadthFirstLxRxTreeTraverser: treeTraversal.BreadthFirstLxRxTreeTraverser,
        DepthFirstLxRxTreeTraverser: treeTraversal.DepthFirstLxRxTreeTraverser
    }
};

export var connectivity = {
    Connector: connector.Connector
};
