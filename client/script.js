const prospects = [new Prospect("Andy S", "andy@email.com")];

const table = document.querySelector("#prospect-table");

prospects.forEach(prospect => {
  const columnData = createHeaderColumns();

  const tableHead = createTheadElement(columnData);
  table.appendChild(tableHead);

  const rowData = createDataColumns();

  const tableBody = createTbodyElement(rowData);
  table.appendChild(tableBody);
});

function createHeaderColumns() {
  return Object.keys(prospects[0]).map(key => {
    const headerRow = document.createElement("th");

    const columnValue = key.charAt(0).toUpperCase() + key.slice(1, key.length);
    const textNode = document.createTextNode(columnValue);
    headerRow.appendChild(textNode);

    return headerRow;
  });
}

function createTheadElement(childNodes) {
  const theadEl = document.createElement("thead");
  childNodes.forEach(child => theadEl.appendChild(child));
  const editColumn = document.createElement("th");
  theadEl.appendChild(editColumn);

  return theadEl;
}

function createDataColumns() {
  var dataRows = prospects.map(prospect => {
    const tableRow = document.createElement("tr");

    const cells = Object.keys(prospect).map(key => {
      const dataCell = document.createElement("td");
      dataCell.setAttribute("name", key);

      tableRow.appendChild(dataCell);

      const textNode = document.createTextNode(prospect[key]);
      dataCell.appendChild(textNode);

      return tableRow;
    });

    const buttonCell = document.createElement("td");
    const editIcon = document.createElement("i");
    editIcon.setAttribute("class", "fas fa-pencil-alt icon-btn");
    editIcon.setAttribute("data-toggle", "tooltip");
    editIcon.setAttribute("data-placement", "top");
    editIcon.setAttribute("title", "Edit");
    editIcon.onclick = (e) => {
      console.log(e);
    }
    buttonCell.appendChild(editIcon);
    const deleteIcon = document.createElement('i');
    deleteIcon.setAttribute("class", "fas fa-trash-alt icon-btn");
    deleteIcon.setAttribute("data-toggle", "tooltip");
    deleteIcon.setAttribute("data-placement", "top");
    deleteIcon.setAttribute("title", "Edit");
    deleteIcon.onclick = (e) => {
      console.log(e);
    }
    buttonCell.appendChild(deleteIcon);
    tableRow.appendChild(buttonCell);

    return cells;
  });

  return dataRows;
}

function createTbodyElement(childNodes) {
  const tbodyEl = document.createElement("tbody");
  childNodes.forEach(child => {
    child.forEach(grandChild => {
      tbodyEl.appendChild(grandChild);
    });
  });

  return tbodyEl;
}