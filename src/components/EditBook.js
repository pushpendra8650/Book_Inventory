import React, { useState, useEffect } from 'react';

const EditBook = ({ book, onEditBook }) => {
  const [editedBook, setEditedBook] = useState(book);

  useEffect(() => {
    setEditedBook(book);
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBook = {
      ...editedBook,
      volumeInfo: {
        ...editedBook.volumeInfo,
        title: editedBook.volumeInfo?.title?.trim() || 'No Title',
        authors: editedBook.volumeInfo?.authors || [],
        publishedDate: editedBook.volumeInfo?.publishedDate || 'Unknown Year',
      },
    };
    onEditBook(updatedBook); // Send updated book data to parent
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-6 p-6 bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-extrabold text-orange-700 mb-4">Edit Book</h2>
      <input
        type="text"
        value={editedBook.volumeInfo?.title || ''} // Safe access to volumeInfo
        onChange={(e) =>
          setEditedBook({
            ...editedBook,
            volumeInfo: {
              ...editedBook.volumeInfo,
              title: e.target.value,
            },
          })
        }
        placeholder="Title"
        className="p-3 w-full mb-4 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <input
        type="text"
        value={editedBook.volumeInfo?.authors?.join(', ') || ''} // Safe access to authors
        onChange={(e) =>
          setEditedBook({
            ...editedBook,
            volumeInfo: {
              ...editedBook.volumeInfo,
              authors: e.target.value.split(', '),
            },
          })
        }
        placeholder="Authors (comma-separated)"
        className="p-3 w-full mb-4 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <input
        type="text"
        value={editedBook.volumeInfo?.publishedDate || ''} // Safe access to publishedDate
        onChange={(e) =>
          setEditedBook({
            ...editedBook,
            volumeInfo: {
              ...editedBook.volumeInfo,
              publishedDate: e.target.value,
            },
          })
        }
        placeholder="Published Date"
        className="p-3 w-full mb-4 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <button
        type="submit"
        className="w-full bg-orange-600 text-white font-bold p-3 rounded-md hover:bg-orange-700 transition duration-200"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditBook;
