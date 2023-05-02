
// taken from dicoding
const getBooks = (req, h) => {
  const {
    reading,
    finished,
    name,
  } = req.query;

  if (reading) {
    const filteredBooks = books.filter((book) => book.reading === true)
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
    return h.response({
      status: 'success',
      data: {
        books: filteredBooks,
      },
    })
      .code(200);
  } if (finished) {
    const filteredBooks = books.filter((book) => book.finished === true)
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
    return h.response({
      status: 'success',
      data: {
        books: filteredBooks,
      },
    })
      .code(200);
  } if (name) {
    const filteredBooks = books.filter((book) => book.name.toLowerCase()
      .includes(name.toLowerCase()))
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
    return h.response({
      status: 'success',
      data: {
        books: filteredBooks,
      },
    })
      .code(200);
  }
  const response = h.response({
    status: 'success',
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const getBookById = (req, h) => {
  const { bookId } = req.params;

  const book = books.filter((n) => n.id === bookId)[0];

  if (book !== undefined) {
    return h.response({
      status: 'success',
      data: {
        book,
      },
    });
  }

  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  })
    .code(404);
};


const editBookByIdHandler = (req, h) => {
  const { bookId } = req.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    })
      .code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    })
      .code(400);
  }

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished: pageCount === readPage,
      updatedAt: new Date().toISOString(),
    };

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  }

  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  })
    .code(404);
};

const deleteBookByIdHandler = (req, h) => {
  const { bookId } = req.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  })
    .code(404);
};
