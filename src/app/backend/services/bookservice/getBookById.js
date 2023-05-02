
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
  
  