import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
   // access route parameters from the URL
  const { bookId } = useParams(); // Get book ID from URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch detailed book info using the bookId
    const fetchBookDetails = async () => {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
      const data = await response.json();
      setBook(data);
    };
    fetchBookDetails();
  }, [bookId]);

  if (!book) return <div className="text-center text-gray-600 text-lg">Loading...</div>;

  const volumeInfo = book.volumeInfo || {};
  const title = volumeInfo.title || 'No Title';
  const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author';
  const year = volumeInfo.publishedDate || 'Unknown Year';
  const publisher = volumeInfo.publisher || 'Unknown Publisher';
  const description = volumeInfo.description || 'No description available';

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-4">{title}</h2>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold text-purple-600">Author(s):</span> {authors}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold text-purple-600">Published Date:</span> {year}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold text-purple-600">Publisher:</span> {publisher}
      </p>
      <p className="text-lg text-gray-700 mb-4">
        <span className="font-semibold text-purple-600">Description:</span> {description}
      </p>
    </div>
  );
};

export default BookDetail;
