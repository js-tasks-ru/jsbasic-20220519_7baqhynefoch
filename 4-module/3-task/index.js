function highlight(table) {
  for (let row of table.tBodies[0].rows) {
    let availability = row.cells[3].dataset["available"];

    switch (availability) {
      case "true":
        row.classList.add("available");
        break;
      case "false":
        row.classList.add("unavailable");
        break;
      case undefined:
        row.hidden = true;
        break;
    }

    row.cells[2].textContent == "m"
      ? row.classList.add("male")
      : row.classList.add("female");

    if (row.cells[1].textContent < "18") {
      row.style.textDecoration = "line-through";
    }
  }
}
