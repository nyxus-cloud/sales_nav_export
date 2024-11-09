function doTheThing(rows) {
  console.log("Rows", rows);
  return [];
}

function getLeads() {
  const table = document.getElementById("lead-lists").querySelector("table");

  const columns = table.querySelectorAll("thead th");
  const content = table.querySelectorAll("tbody tr");

  let result = {
    columns: Array.from(columns).map((column) => column.textContent.trim()),
    content: doTheThing(content),
  };

  console.log("result", result);
}
