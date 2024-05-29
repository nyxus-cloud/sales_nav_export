function addQuotes(str) {
  return `"${str}"`;
}

function exportToCsv(data) {
  const separator = ",";

  let csvContent = "data:text/csv;charset=utf-8,";

  const header = data["columns"];
  const content = data["content"];

  csvContent += header.map(addQuotes).join(separator) + "\n";
  csvContent += content
    .map((row) => row.map(addQuotes).join(separator))
    .join("\n");

  const encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
}
