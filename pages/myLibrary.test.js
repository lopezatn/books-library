const myLibraryModule = require("./myLibrary");

const updateLocalStorageSpy = jest.spyOn(myLibraryModule, 'updateLocalStorage');

describe('myLibrary', () => {
  afterEach(() => {
    jest.clearAllMocks();
    myLibraryModule.myLibrary.length = 0;
  });

  describe('addBookToLibrary', () => {
    it('should add a book to the library', () => {
      const newBook = { author: 'Author1', title: 'Title1', pages: 100, isRead: true };
      
      myLibraryModule.addBookToLibrary(newBook);

      expect(myLibraryModule.myLibrary[0]).toEqual(newBook);
    });

    // it('should update local storage', () => {
    //   const newBook = { author: 'Author1', title: 'Title1', pages: 100, isRead: true };
    //   // console.log(jest.spyOn(myLibraryModule, 'updateLocalStorage'))
    //   myLibrary.addBookToLibrary(newBook);
  
    //   expect(updateLocalStorageSpy).toHaveBeenCalled()
    // });
  })

  describe('removeBookFromLibrary', () => {
    it('Should remove a book from the library', () => {
      const newBook = { author: 'Author1', title: 'Title1', pages: 100, isRead: true };

      myLibraryModule.addBookToLibrary(newBook);

      expect(myLibraryModule.myLibrary.length).toEqual(1);

      myLibraryModule.removeBookFromLibrary(0);

      expect(myLibraryModule.myLibrary.length).toEqual(0);
    })
  })

  describe('changeBookReadStatus', () => {
    it('Should change the read status of the book', () => {
      const newBook = { author: 'Author1', title: 'Title1', pages: 100, isRead: false };

      myLibraryModule.addBookToLibrary(newBook);

      expect(myLibraryModule.myLibrary[0].isRead).toEqual(false);

      myLibraryModule.changeBookReadStatus(0);

      expect(myLibraryModule.myLibrary[0].isRead).toEqual(true);

    })

  })
});