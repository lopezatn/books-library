const appModule = require("./app");


escribe('app', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('editBookCell', () => {
        it('should test the inputs', () => {
        // Create a mock cell
        const cell = document.createElement('div');
        cell.contentEditable = true;
        cell.textContent = 'Valid Value';
        parentNode = document.createElement('div');
        parentNode.setAttribute('row-id', '123');
        cell.setAttribute('field-name', 'someKey');

        parentNode.appendChild(cell);

        // Mock the editBookObject function
        const mockEditBookObject = jest.fn();

        // Call the function
        appModule.editBookCell(cell, mockEditBookObject);

        // Assert that editBookObject was called
        expect(mockEditBookObject).toHaveBeenCalledWith({ id: 123, someKey: 'Valid Value' });
        });
    });
});