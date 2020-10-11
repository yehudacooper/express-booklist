const Book = require('../Models/Book');


exports.index = async function (req, res) {

    let rows = [];
    // Old way ES5
    // Book.getAllBooks.then(function (rows) {
        // console.log(rows)

    //     res.render('books/list-books', {
    //         title: 'List of books',
    //         model: rows
    //     });
    // }).catch(function (err) {
    //     console.log(err.message)
    // });
    // console.log("yehuda")
    // New way ES6
    try {
        rows = await Book.getAllBooks()
        console.log(rows);
    } catch (error) {
        console.log(error.message)
    }

    res.render('books/list-books', {
        title: 'List of books',
        model: rows
    });

}


exports.add_new_book_form = function (req, res) {
    res.render('books/add-book', {
        title: 'Add a new book'
    });
}

exports.add_new_book =  function (req, res) {
    const book_title = req.body.Title;
    const book_author = req.body.Author;
    const book_comments = req.body.Comments;

    try {
        Book.addBook(book_title, book_author, book_comments);
    } catch (error) {
        console.log(error.message)
    }

    res.redirect(`/books`);

}


exports.edit_book_form =async function (req, res) {

    // let id = req.params.id;

     row = await Book.getBook(req.params.id);
    // var sql_string = 'SELECT * FROM Books WHERE Book_ID=?';

    // db.get(sql_string, id, (err, row) => {
    //     if (err)
    //         console.log(err.message);
    //     else {
    //         res.render('books/edit-book', {
    //             title: 'Edit the book',
    //             book: row
    //         });
    //     }
    // });
    res.render('books/edit-book', {
        title: 'Edit the book',
        book: row
    });

}

exports.update_book_data = async function (req, res) {
    // Book_Title, Book_Author, Book_Comments,book_id
    const book_title = req.body.Title;
    const book_author = req.body.Author;
    const book_comments = req.body.Comments;
    const book_id = req.params.id;
    // let id = req.params.id;
      await Book.editbook(book_title,book_author,book_comments,book_id);
    // console.log(req.body);
    // console.log(`Edit book with id ${id} request`);

    // const sql = "UPDATE Books SET Title=? , Author = ? , Comments = ? WHERE Book_ID = ? ";
    // const book = [req.body.Title, req.body.Author, req.body.Comments, id];

    // db.run(sql, book, err => {
    //     if (err) {
    //         return console.error(err.message);
    //     }
    //     res.redirect(`/books`);
    // });
    res.redirect(`/books`);

}

exports.delete_the_book = function (req, res) {
    // let id = req.params.id;
    // // let compfirmed = confirm("Are you sure?");
    try {
        Book.deleteBook(req.params.id,res);
    } catch (error) {
        console.log(error.message);
    }
    // const sql = "DELETE FROM Books WHERE Book_ID=?";

    // // if (compfirmed === true) {
    // db.run(sql, id, err => {
    //     if (err) {
    //         return console.error(err.message);
    //     }
    //     res.redirect(`/books`);
    // });
    // res.redirect(`/books`);

    // } else
    // return;

}
