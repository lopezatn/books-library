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
  cell1.setAttribute("field-name", 'author');
  cell1.textContent = book.author;
  cell1.addEventListener("mousedown", () => editBookCell(cell1));
  const cell2 = row.insertCell(1);
  cell2.setAttribute("field-name", 'title');
  cell2.textContent = book.title;
  cell2.addEventListener("mousedown", () => editBookCell(cell2));
  const cell3 = row.insertCell(2);
  cell3.setAttribute("field-name", 'pages');
  cell3.textContent = book.pages;
  cell3.addEventListener("mousedown", () => editBookCell(cell3));
  const cell4 = row.insertCell(3);
  cell4.appendChild(createReadButton(book.isRead, book.id));
  const cell5 = row.insertCell(4);
  cell5.appendChild(createRemoveBtn(book.id));
}

function editBookCell(cell) {
  cell.contentEditable = true;

  cell.addEventListener("blur", () => {
    const rowId = cell.parentNode.getAttribute("row-id");
    const key = cell.getAttribute("field-name");
    const value = cell.textContent;
    if(key === 'pages' && isNaN(value)) {
      alert('The value of pages must be a number');
      return;
  } else if ((key === 'title' || key === 'author') && /\d/.test(value)){
    alert('There can be no numbers in ' + key);
    console.log(key, value)
  } else {
    const modifiedBook = {
      id: parseInt(rowId),
      [key]: value,
    };
    editBookObject(modifiedBook);
    return;
  }
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

  if (/\d/.test(author) || /\d/.test(book)) {
    alert('Numbers are allowed only in the pages.');
    return;
  } else if (/-\d/.test(pages)) {
    alert('Negative numbers are not allowed, check your pages.');
    return;
  }
   else if (author.length == 0 || book.length == 0 || pages.length == 0) {
    alert('Please fill in all the fields');
    return;
  } else {
    const newBook = new Book(author, book, pages, isRead);
    addBookToLibrary(newBook);
    addBookToTable(newBook);
    eraseInputsValue();
  }

}

module.exports = {
  editBookCell,
};