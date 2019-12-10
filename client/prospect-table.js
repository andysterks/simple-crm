const table = document.querySelector("#prospect-table");

function recreateProspectTable(prospects) {
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
  createProspectTable(prospects);
}

function createProspectTable(prospects) {
  const columnHeaderArray = prospects.length === 0 
    ? ['Name', 'Email'] 
    : Object.keys(prospects[0]).reduce((headerList, key) => {
      if (key !== 'id'){
        console.log('headerList: ', headerList);
        console.log('key: ', key);
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

    // TODO: Set id of the <th></th>
    // element to match the id of the
    // column so it can be edited
    headerRow.setAttribute("data-id", 'derp');
    // TODO: Create class that will 
    // turn cursor to select text
    // to indicate header can be edited
    //headerRow.className = 'TBD';
    const textNode = document.createTextNode(headerText);
    headerRow.appendChild(textNode);

    return headerRow;
  });
}

function createTableHeader(headerTextArray) {
  const childNodes = createHeaderColumns(headerTextArray);

  const theadEl = document.createElement("thead");
  theadEl.className = 'thead-dark';
  childNodes.forEach(child => theadEl.appendChild(child));
  const editColumn = document.createElement("th");
  const editColumnSpan = document.createElement('SPAN');
  editColumnSpan.className = 'float-right';
  const addProspectIcon = document.createElement('I');
  addProspectIcon.className = 'fas fa-plus-circle fa-lg icon-btn';
  editColumn.onclick = (e) => {
    console.log('add prospect!');
    createProspectModal.open();
  };
  editColumnSpan.appendChild(addProspectIcon);
  editColumn.appendChild(editColumnSpan);
  theadEl.appendChild(editColumn);

  table.appendChild(theadEl);
}

function createTableBody(prospects) {
  const tbodyEl = document.createElement("tbody");
  table.appendChild(tbodyEl);

  if (prospects.length === 0) {
    const emptyDataRow = document.createElement('TR');
    const emptyDataCell = document.createElement('TD');
    emptyDataCell.textContent = 'No prospects found!';
    emptyDataCell.setAttribute('colspan', 3);
    emptyDataRow.appendChild(emptyDataCell);
    tbodyEl.appendChild(emptyDataRow);

    return;
  }

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
  const iconSpan = document.createElement('SPAN');
  iconSpan.className = 'float-right';
  const editIcon = document.createElement("i");
  editIcon.setAttribute("class", "fas fa-pencil-alt icon-btn");
  editIcon.setAttribute("data-toggle", "tooltip");
  editIcon.setAttribute("data-placement", "top");
  editIcon.setAttribute("title", "Edit Prospect");
  editIcon.onclick = e => {
    console.log(e);
    editProspectModal.open(prospect);
  };
  iconSpan.appendChild(editIcon);
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
      .then(res => {
        console.log('user is deleted!');
        fetchProspects().then(updatedProspects => {
          recreateProspectTable(updatedProspects);
        });
      });
    }
  };
  iconSpan.appendChild(deleteIcon);
  buttonCell.appendChild(iconSpan);
  dataRow.appendChild(buttonCell);

  return dataRow;
}