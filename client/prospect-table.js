const table = document.querySelector("#prospect-table");

function createProspectTable(prospects) {
  const columnHeaderArray = Object.keys(prospects[0]).map(key => {
    return key.charAt(0).toUpperCase() + key.slice(1, key.length);
  });

  createTableHeader(columnHeaderArray);
  createTableBody(prospects);
}

function createHeaderColumns(headerTextArray) {
  return headerTextArray.map(headerText => {
    const headerRow = document.createElement("th");

    const textNode = document.createTextNode(headerText);
    headerRow.appendChild(textNode);

    return headerRow;
  });
}

function createTableHeader(headerTextArray) {
  const childNodes = createHeaderColumns(headerTextArray);

  const theadEl = document.createElement("thead");
  childNodes.forEach(child => theadEl.appendChild(child));
  const editColumn = document.createElement("th");
  theadEl.appendChild(editColumn);

  table.appendChild(theadEl);
}

function createTableBody(prospects) {
  const tbodyEl = document.createElement("tbody");
  table.appendChild(tbodyEl);

  prospects.forEach(prospect => {
    const rowData = createDataRow(prospect);
    tbodyEl.appendChild(rowData);
  });
}

function createDataRow(prospect) {
  const dataRow = document.createElement("tr");

  Object.keys(prospect).map(key => {
    const dataCell = document.createElement("td");
    dataCell.setAttribute("name", key);

    dataRow.appendChild(dataCell);

    const textNode = document.createTextNode(prospect[key]);
    dataCell.appendChild(textNode);

    return dataRow;
  });

  const buttonCell = document.createElement("td");
  const editIcon = document.createElement("i");
  editIcon.setAttribute("class", "fas fa-pencil-alt icon-btn");
  editIcon.setAttribute("data-toggle", "tooltip");
  editIcon.setAttribute("data-placement", "top");
  editIcon.setAttribute("title", "Edit");
  editIcon.onclick = e => {
    console.log(e);
  };
  buttonCell.appendChild(editIcon);
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash-alt icon-btn");
  deleteIcon.setAttribute("data-toggle", "tooltip");
  deleteIcon.setAttribute("data-placement", "top");
  deleteIcon.setAttribute("title", "Edit");
  deleteIcon.onclick = e => {
    console.log(e);
  };
  buttonCell.appendChild(deleteIcon);
  dataRow.appendChild(buttonCell);

  return dataRow;
}