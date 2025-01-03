import React from 'react';
import { Link } from 'react-router-dom';

const BookTable = ({ books, onDeleteBook, onEditBook }) => {
  return (
    <table className="table-auto w-full mt-4 border-collapse bg-white shadow-lg rounded-lg">
      <thead>
        <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <th className="px-4 py-2 text-left font-semibold">Title</th>
          <th className="px-4 py-2 text-left font-semibold">Author</th>
          <th className="px-4 py-2 text-left font-semibold">Year</th>
          <th className="px-4 py-2 text-left font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => {
          const volumeInfo = book.volumeInfo || {}; // Ensure volumeInfo is defined
          const title = volumeInfo.title || 'No Title';
          const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author';
          const year = volumeInfo.publishedDate || 'Unknown Year';

          return (
            <tr
              key={book.id}
              className={`${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'
              } hover:bg-gray-200 transition duration-150`}
            >
              <td className="px-4 py-3 text-gray-700 font-medium">
                <Link to={`/book/${book.id}`} className="text-blue-600 hover:underline">
                  {title}
                </Link>
              </td>
              <td className="px-4 py-3 text-gray-600">{authors}</td>
              <td className="px-4 py-3 text-gray-600">{year}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onEditBook(book)}
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-150 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteBook(book.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-150"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BookTable;
