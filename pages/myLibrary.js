const myLibrary = [];

function loadLibraryFromLocalStorage() {
  const storedLibraryString = localStorage.getItem("myLibrary");
  if (storedLibraryString) {
    storedLibraryArray = JSON.parse(storedLibraryString);
    myLibrary.push(...storedLibraryArray);
  }
  for (let i = 0; i < myLibrary.length; i++) {
    const currentBook = myLibrary[i];
    addBookToTable(currentBook);
  }
}

function updateLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function editBookObject(book) {
  const bookId = book.id;

  for (let i = 0; i < myLibrary.length; i++) {
    const currentBook = myLibrary[i];
    if (currentBook.id === bookId) {
      myLibrary[i] = { ...currentBook, ...book };
      updateLocalStorage();
      break;
    }
  }
}

function addBookToLibrary(book) {
  book.id = createBookId();
  myLibrary.push(book);
  updateLocalStorage();
}


function createBookId() {
  let id, foundIndex;
  do {
    id = Math.floor(Math.random() * (myLibrary.length * 2));
    foundIndex = myLibrary.findIndex((book) => book.id === id);
  } while (foundIndex >= 0);

  return id;
}

function removeBookFromLibrary(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  myLibrary.splice(index, 1);
  updateLocalStorage();
}

function changeBookReadStatus(id) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === id) {
      myLibrary[i].isRead = !myLibrary[i].isRead;
      console.log("isRead state:", myLibrary[i].isRead);
      updateLocalStorage();
      break;
    }
  }
}

module.exports = {
  myLibrary,
  addBookToLibrary,
  removeBookFromLibrary,
  changeBookReadStatus,
  updateLocalStorage,
  loadLibraryFromLocalStorage,
  editBookObject,
};
