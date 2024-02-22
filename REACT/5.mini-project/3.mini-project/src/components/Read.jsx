import React from "react";

export const Read = ({ readProp }) => {
  return (
    <div>
      <h2>READ</h2>
      <p>Title: {readProp.title}</p>
      <p>
        Author: {readProp.authorName} {readProp.authorSurname}
      </p>
      <p>Birthday: {readProp.authorBirthday}</p>
      <p>Genre: {readProp.genre}</p>
      <p>Release: {readProp.dateOfPublication}</p>
      <ul>
        Other Books:
        {readProp.otherBooks.map((book) => (
          <li key={book.title}>Title: {book.title}</li>
        ))}
      </ul>
    </div>
  );
};
