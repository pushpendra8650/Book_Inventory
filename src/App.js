import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import BookDetail from './components/BookDetails';
import BookTable from './components/BookTable';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  // Fetch book data
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=20&key=AIzaSyBJx4qIfE20LFd41Z5nawqPepEY5TBrpvU');
      const data = await response.json();
      setBooks(data.items || []);  // Store books in the state properly
    };
    fetchBooks();
  }, []);

  // Add a new book
  const handleAddBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  // Edit an existing book
  const handleEditBook = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setSelectedBook(null);  // Close the EditBook form after saving
  };

  // Delete a book
  const handleDeleteBook = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  return (
    <Router>
    <div className="container mx-auto p-4">
    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 drop-shadow-lg mb-6">
  Book Inventory Management
</h1>

      
      <AddBook onAddBook={handleAddBook} />
      {selectedBook && <EditBook book={selectedBook} onEditBook={handleEditBook} />}
      
      <Routes>
        <Route path="/" element={<BookTable books={books} onDeleteBook={handleDeleteBook} onEditBook={setSelectedBook} />} />
        <Route path="/book/:bookId" element={<BookDetail />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
