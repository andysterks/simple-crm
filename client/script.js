(function() {

  const table = document.getElementById("prospect-table");
  const columnHeaderArray = ["Name", "Email"];
  createTableHeader(columnHeaderArray);
  
  const tbodyEl = document.createElement("tbody");
  table.appendChild(tbodyEl);
  
  const emptyDataRow = document.createElement("TR");
  const emptyDataCell = document.createElement("TD");
  emptyDataCell.className = 'align-middle';
  emptyDataCell.setAttribute("colspan", 3);
  const spinnerDiv = document.createElement('DIV');
  spinnerDiv.className = 'spinner-border spinner-border-sm mr-2';
  const spinnerSpan = document.createElement('SPAN');
  spinnerSpan.className = 'sr-only';
  spinnerSpan.textContent = 'Loading...';
  spinnerDiv.appendChild(spinnerSpan);
  const textSpan = document.createElement('SPAN');
  textSpan.textContent = 'Loading...';
  emptyDataCell.appendChild(spinnerDiv);
  emptyDataCell.appendChild(textSpan);
  emptyDataRow.appendChild(emptyDataCell);
  tbodyEl.appendChild(emptyDataRow);
  
  //setTableLoading();

})();

fetchProspectTableData().then(tableData => {
  console.log('tableData: ', tableData);
  recreateProspectTable(tableData.prospects);
});

function fetchProspectTableData() {
  return fetch("api/table/prospects").then(res => res.json());
}
