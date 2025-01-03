import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const AddBook = ({ onAddBook }) => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    year: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    author: '',
    year: '',
  });

  const validateField = (name, value) => {
    if (!value.trim()) {
      return `${name} is required`;
    }

    // Validate Year to be numeric and a valid 4-digit number
    if (name === 'Year') {
      if (!/^\d{4}$/.test(value)) {
        return 'Year must be a valid 4-digit number';
      }
    }

    // Validate text fields to only allow non-numeric characters
    if ((name === 'Title' || name === 'Author') && /\d/.test(value)) {
      return `${name} cannot contain numbers`;
    }

    return '';
  };

  const handleInputChange = (field, value) => {
    // If the field is 'year', we ensure it only contains numeric values
    if (field === 'year' && !/^\d*$/.test(value)) {
      return; // Prevent non-numeric input for 'Year'
    }

    const error = validateField(field, value);
    setErrors((prevErrors) => ({ ...prevErrors, [field.toLowerCase()]: error }));
    setBook((prevBook) => ({ ...prevBook, [field.toLowerCase()]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      title: validateField('Title', book.title),
      author: validateField('Author', book.author),
      year: validateField('Year', book.year),
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    const newBook = {
      id: Date.now(),
      volumeInfo: {
        title: book.title,
        authors: [book.author],
        publishedDate: book.year,
      },
    };

    onAddBook(newBook);
    setBook({ title: '', author: '', year: '' });
    setErrors({ title: '', author: '', year: '' }); // Clear errors
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-6 p-6 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Add New Book</h2>

      {['title', 'author', 'year'].map((field) => (
        <div key={field} className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={book[field]}
              onChange={(e) => handleInputChange(field.charAt(0).toUpperCase() + field.slice(1), e.target.value)}
              className={`p-3 w-full border-2 rounded-md focus:outline-none ${
                errors[field]
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                  : 'border-green-300 focus:ring-2 focus:ring-green-500'
              }`}
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              {errors[field] ? (
                <FaExclamationCircle className="text-red-500" />
              ) : book[field] ? (
                <FaCheckCircle className="text-green-500" />
              ) : null}
            </div>
          </div>
          {errors[field] && (
            <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-purple-600 text-white font-semibold p-3 rounded-md hover:bg-purple-700 transition duration-200"
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBook;
