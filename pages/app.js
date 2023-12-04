document.addEventListener("DOMContentLoaded", () => {
  loadLibraryFromLocalStorage();
});

function Book(author, title, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;

  let id = null;
}

function addBookToTable(book) {
  const table = document.getElementById("books-table");
  const row = table.insertRow();
  row.setAttribute("row-id", book.id);

  const cell1 = row.insertCell(0);
  cell1.textContent = book.author;
  cell1.addEventListener("click", () => editBookCell(cell1));
  const cell2 = row.insertCell(1);
  cell2.textContent = book.title;
  cell2.addEventListener("click", () => editBookCell(cell2));
  const cell3 = row.insertCell(2);
  cell3.textContent = book.pages;
  cell3.addEventListener("click", () => editBookCell(cell3));
  const cell4 = row.insertCell(3);
  cell4.appendChild(createReadButton(book.isRead, book.id));
  const cell5 = row.insertCell(4);
  cell5.appendChild(createRemoveBtn(book.id));
}

function editBookCell(cell) {
  cell.contentEditable = true;

  cell.addEventListener("blur", () => {
    const rowId = cell.parentNode.getAttribute("row-id");
    const cellIndex = cell.cellIndex;

// this will eventually go on a sepparated function since is not implicit to the editBookCell function.
    if (cellIndex === 0) {
      myLibrary[rowId].author = cell.textContent;
    } else if (cellIndex === 1) {
      myLibrary[rowId].title = cell.textContent;
    } else if (cellIndex === 2) {
      myLibrary[rowId].pages = cell.textContent;
    }

    updateLocalStorage();
  });
}

function removeBookFromTable(id) {
  const table = document.getElementById("books-table");
  const rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const rowId = currentRow.getAttribute("row-id");

    if (rowId && rowId === id.toString()) {
      currentRow.parentNode.removeChild(currentRow);
      break;
    }
  }
}

function createReadButton(isRead, id) {
  const button = document.createElement("input");
  button.setAttribute("type", "checkbox");
  button.checked = isRead;
  button.addEventListener("click", () => {
    changeBookReadStatus(id);
  });
  return button;
}

function createRemoveBtn(id) {
  const button = document.createElement("button");
  button.textContent = "Delete";
  button.addEventListener("click", () => {
    removeBookFromLibrary(id);
    removeBookFromTable(id);
  });
  return button;
}

function toggleFormVisibility() {
  let form = document.getElementById("addBookForm");
  form.style.display = form.style.display === "block" ? "none" : "block";
}

function eraseInputsValue() {
  const author = document.getElementById("author");
  const book = document.getElementById("book");
  const pages = document.getElementById("pages");

  author.value = "";
  book.value = "";
  pages.value = "";
}

function createBook() {
  event.preventDefault();

  const author = document.getElementById("author").value;
  const book = document.getElementById("book").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;

  if (author.length > 0 && book.length > 0 && pages.length > 0) {
    const newBook = new Book(author, book, pages, isRead);
    addBookToLibrary(newBook);
    addBookToTable(newBook);
    eraseInputsValue();
  } else {
    alert("Please fill all the fields.");
  }
}