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
    // console.log(myLibrary);
}

function addBookToLibrary(book) {
  book.id = myLibrary.length;
  myLibrary.push(book);
  updateLocalStorage();
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
};
