/* eslint-disable no-undef */
function handleFileLoad(event) {
  fetch("/admin/guests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: event.target.result }),
  });
}

function handleFileSelect(event) {
  const reader = new FileReader();
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0]);
}

// eslint-disable-next-line no-unused-vars
function onload() {
  document
    .getElementById("fileInput")
    .addEventListener("change", handleFileSelect, false);
}
