const express = require('express');
const cors = require('cors');
const userRouter = require('../router/userRouter');
const bookRouter = require('../router/bookRouter');
const authorRouter = require('../router/authorRouter');
const { connect } = require('../db/db');
const swaggerUi = require('swagger-ui-express');
const document = require('../config/swaggerOptions.json');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Service is up' });
});

// routers
app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use('/authors', authorRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(document));
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
});

connect();

module.exports = app;
