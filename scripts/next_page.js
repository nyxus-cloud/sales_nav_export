function sleep(time) {
  return new Promise((r) => setTimeout(r, time));
}

function hasNextPage() {
  const nextButton = document
    .getElementById("lead-lists")
    .querySelector("button[aria-label='Avançar']");
  return nextButton != null && !nextButton.className.includes("disabled");
}

async function goToNextPage() {
  const nextButton = document
    .getElementById("lead-lists")
    .querySelector("button[aria-label='Avançar']");
  nextButton.click();
  await sleep(5000);
}
