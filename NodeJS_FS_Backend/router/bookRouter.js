const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  postBook,
  updateBook,
  deleteBook,
} = require('../services/bookService');
const auth = require('../auth/authorization');
//router.get('/', [auth, getAllBooks]);
router.get('/', getAllBooks);
//router.get('/:bookId', [auth, getBookById]);
router.get('/:bookId', getBookById);
//router.post('/', [auth, postBook]);
router.post('/', postBook);
router.put('/:bookId', [auth, updateBook]);
router.delete('/:bookId', [auth, deleteBook]);

module.exports = router;