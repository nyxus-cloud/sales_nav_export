async function exportLeads() {
  const getName = function (cell) {
    const leadNameElement = cell.querySelector("*[aria-label='Nome do lead");
    const jobTitleElement = cell.querySelector("*[data-anonymize='job-title");

    const name = leadNameElement.textContent.trim();
    const jobTitle = jobTitleElement.textContent.trim();

    return `${name} - ${jobTitle}`;
  };

  const mapRow = function (row) {
    const cells = row.querySelectorAll("td");
    return [
      getName(cells[0]),
      ...Array.from(cells)
        .slice(1)
        .map((e) => e.textContent.trim()),
    ];
  };

  const getPage = function () {
    const table = document.getElementById("lead-lists").querySelector("table");
    const rows = table.querySelectorAll("tbody tr");
    return Array.from(rows).map(mapRow);
  };

  const getLeads = async function () {
    const table = document.getElementById("lead-lists").querySelector("table");
    const columns = table.querySelectorAll("thead th");
    const leads = [];

    while (true) {
      const pageLeads = getPage();
      leads.push(...pageLeads);

      if (hasNextPage() === true) {
        await goToNextPage();
      } else {
        break;
      }
    }

    return {
      columns: Array.from(columns).map((column) => column.textContent.trim()),
      content: leads,
    };
  };

  const prepareDocument = function (result) {
    exportToCsv(result);
  };

  const result = await getLeads();
  prepareDocument(result);
}

document.getElementById("read-content").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        func: exportLeads,
      })
      .then(() => console.log("SalesNav Initialized."));
  });
});
