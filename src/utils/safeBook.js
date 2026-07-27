 function safeBook(bookData) {
    if (Array.isArray(bookData)) {
        return bookData.map(book => {
            const { user, createdAt, updatedAt, __v, ...bookRead } = book.toObject();
            return bookRead;
        });
    }

    const { user, createdAt, updatedAt, __v, ...bookRead } = bookData.toObject();
    return bookRead;
}

export default safeBook;