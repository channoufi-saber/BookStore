const mongoose = require('mongoose');
const {
  findAuthorById,
  saveAuthor,
  findAuthors,
  updateAuthor,
  deleteAuthor,
} = require('../db/authorDb');
const Author = require('../models/authorModel');
const errorTemplate = require('../templates/errorTemplate');
const successTemplate = require('../templates/successTemplate');
const messages = require('../messages/messages');

exports.postAuthor = async (req, res) => {
  try {
    const author = await findAuthorById({
      name: req.body.name,
      book: req.body.bookId,
    });
    if (author) {
      throw new Error(messages.author_exist);
    }
    else {
      const newAuthor = new Author({
        _id: mongoose.Types.ObjectId(),
      });
      const assignedAuthor = Object.assign(newAuthor, req.body);
      const savedAuthor = await saveAuthor(assignedAuthor);
      return successTemplate(res, savedAuthor, messages.author_saved, 201);
    }
 
  } catch (e) {
    errorTemplate(res, e, e.message, 501);
  }
};

exports.getAuthors = async (req, res) => {
  try {
    const authors = await findAuthors({});
    if (authors.length > 0) {
      return successTemplate(res, authors, messages.authors_found, 200);
    } else {
      throw new Error(messages.no_author_found);
    }
  } catch (e) {
    return errorTemplate(res, e, e.message, 500);
  }
};

exports.getAuthorsById = async (req, res) => {
  try {
    const id = req.params.authorId;
    const author = await findAuthorById({ _id: id });
    if (author) {
      return successTemplate(res, author, messages.author_found, 200);
    } else {
      throw new Error(messages.no_author_found);
    }
  } catch (e) {
    return errorTemplate(res, e, e.message, 500);
  }
};

exports.patchAuthor = async (req, res) => {
  try {
    const id = req.params.authorId;
    const author = new Author();
    const update = Object.assign(author, req.body);
    const result = await updateAuthor({ _id: id }, update);
    return successTemplate(res, result, messages.author_updated, 200);
  } catch (e) {
    return errorTemplate(res, e, messages.author_not_updated, 500);
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const id = req.params.authorId;
    const result = await deleteAuthor({
      _id: id,
    });
    return successTemplate(res, result, messages.author_deleted, 200);
  } catch (e) {
    return errorTemplate(res, e, messages.author_not_deleted, 500);
  }
};