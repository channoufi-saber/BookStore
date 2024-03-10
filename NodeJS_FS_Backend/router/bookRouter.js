const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  postBook,
  updateBook,
  deleteBook,
  getAllBookIds,
} = require('../services/bookService');
const auth = require('../auth/authorization');

router.get('/', [auth, getAllBooks]);

router.get('/books', [auth, getAllBookIds]);

router.get('/:bookId', [auth, getBookById]);

router.post('/', [auth, postBook]);

router.put('/:bookId', [auth, updateBook]);

router.delete('/:bookId', [auth, deleteBook]);

module.exports = router;
