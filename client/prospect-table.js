const table = document.querySelector("#prospect-table");

function createProspectTable(prospects) {
  /* const columnHeaderArray = Object.keys(prospects[0]).map(key => {
    if (key === 'id') return;
    return key.charAt(0).toUpperCase() + key.slice(1, key.length);
  }); */

  const columnHeaderArray = Object.keys(prospects[0]).reduce((headerList, key) => {
    if (key !== 'id'){
      headerList.push(key.charAt(0).toUpperCase() + key.slice(1, key.length));   
    }   
    return headerList;
  }, []);

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
  dataRow.setAttribute("data-id", prospect.id);

  Object.keys(prospect).map(key => {
    if (key !== 'id') {
      const dataCell = document.createElement("td");
      dataCell.setAttribute("name", key);
  
      dataRow.appendChild(dataCell);
  
      const textNode = document.createTextNode(prospect[key]);
      dataCell.appendChild(textNode);
  
      return dataRow;
    }
  });

  const buttonCell = document.createElement("td");
  const editIcon = document.createElement("i");
  editIcon.setAttribute("class", "fas fa-pencil-alt icon-btn");
  editIcon.setAttribute("data-toggle", "tooltip");
  editIcon.setAttribute("data-placement", "top");
  editIcon.setAttribute("title", "Edit Prospect");
  editIcon.onclick = e => {
    console.log(e);
    editProspectModal.open(prospect);
  };
  buttonCell.appendChild(editIcon);
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash-alt icon-btn");
  deleteIcon.setAttribute("data-toggle", "tooltip");
  deleteIcon.setAttribute("data-placement", "top");
  deleteIcon.setAttribute("title", "Delete Prospect");
  deleteIcon.onclick = e => {
    console.log(e);
    const isDeleted = confirm(`Do you want to delete ${prospect.name}?`);
    if (isDeleted) {
      fetch(`api/prospects/${prospect.id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        console.log('user is deleted!');
      })
    }
  };
  buttonCell.appendChild(deleteIcon);
  dataRow.appendChild(buttonCell);

  return dataRow;
}