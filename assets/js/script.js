import { fetchJSONFile, sleep } from "./utils.js";

let itemList = [];
window.addEventListener("load", init);

function init(event) {
    fetchJSONFile('assets/data/items.json', function (data) {
        itemList = data;
        listUpdated();
    });
    console.log("Right, let's go adventuring!");
}

function editClick(idx) {
    editItem(idx);
}

function editItem(idx) {
    alert("editing: " + idx);
}

function deleteClick(idx) {
    deleteItem(idx);
    buildTable();
}

function deleteItem(idx) {
    itemList.splice(idx, 1);
}

function listUpdated() {
    buildTable();
}

function buildTable() {
    let container = document.querySelector("#table-container");

    let table, thead, tbody, tr;

    table = document.querySelector("#table-container table");

    if (!table) {

        table = container.appendChild(document.createElement('table'));
        table.classList.add("table", "table-striped", "table-hover", "table-responsive");
        thead = table.appendChild(document.createElement('thead'));
        thead.classList.add("table-dark");
        tbody = table.appendChild(document.createElement('tbody'));

        if (itemList.length > 0) {
            tr = thead.appendChild(document.createElement("tr"));
            for (let key in itemList[0]) {
                let th = tr.appendChild(document.createElement("th"));
                th.innerText = key;
            }
            console.log('1st', tbody);
        }
    } else {
        // thead = table.getElementsByTagName('thead')[0];
        tbody = table.getElementsByTagName('tbody')[0];
    }
    let rows = []
    if (itemList.length > 0) {
        for (let index in itemList) {
            let item = itemList[index]
            tr = document.createElement("tr");
            rows.push(tr);
            tr.setAttribute("data-internalid", index);

            for (let field in item) {
                let td = tr.appendChild(document.createElement("td"));
                td.innerText = item[field];
            }
            let dataOpsElem = tr.lastChild.appendChild(document.createElement("span"));
            dataOpsElem.classList.add("data-operations")

            let iEdit = dataOpsElem.appendChild(document.createElement("i"));
            // iEdit.classList.add("bi", "bi-pencil-fill", "edit");
            iEdit.classList.add("fa-solid", "fa-edit", "edit");
            iEdit.addEventListener("click", function () { editClick(index); });
            let iDelete = dataOpsElem.appendChild(document.createElement("i"));
            // iDelete.classList.add("bi", "bi-trash", "delete");
            iDelete.classList.add("fa-solid", "fa-trash", "delete");
            iDelete.addEventListener("click", function () { deleteClick(index); });
        }
        let err = container.querySelector(".info");
        if (err) {
            err.remove();
        }
        // table.style.display = "table";
    } else {
        // table.style.display = "none";
        let err = container.appendChild(document.createElement("div"));
        err.classList.add('info');
        err.innerHTML = 'Nincs megjeleníhető elem';
    }
    tbody.replaceChildren(...rows);
}
