const { db } = require('../database/config');


exports.getAllBooks = () =>  new Promise((resolve, reject) => {
    var sql_string = 'SELECT * FROM Books';

    db.all(sql_string, [], (err, rows) => {
        if (err) {
            console.log(err.message);
            reject(err);
        }
        else {
            resolve(rows);
        }
    });
});

exports.getBook = (id) => new Promise((resolve, reject) => {

    var sql_string = 'SELECT * FROM Books WHERE Book_ID=?';

    db.get(sql_string, id, (err, row) => {
        if (err) {
            console.log(err.message);
            reject(err);
        }
        else {
            // res.render('books/edit-book', {
            //     title: 'Edit the book',
            //     book: row
            // });
            resolve(row)
        }
    })
}
)
// let id = req.params.id;


// var sql_string = 'SELECT * FROM Books WHERE Book_ID=?';

// db.get(sql_string, id, (err, row) => {
// if (err)
// console.log(err.message);
// else {
// res.render('books/edit-book', {
//     title: 'Edit the book',
//     book: row
// });

// }
// });
// }

exports.addBook = (Book_Title, Book_Author, Book_Comments) => {
    console.log("Add a new book request");
    const sql = "INSERT INTO Books (Title, Author, Comments) VALUES (?, ? , ?)";
    const book = [Book_Title, Book_Author, Book_Comments];
    db.run(sql, book, err => {
        if (err) {
            console.error(err.message);
        }


    });
};


exports.editbook = (Book_Title, Book_Author, Book_Comments,book_id) => new Promise((resolve, reject) => {
    // let id = req.params.id;

    // console.log(req.body);
    console.log(`Edit book with id ${book_id} request`);

    const sql = "UPDATE Books SET Title=? , Author = ? , Comments = ? WHERE Book_ID = ? ";
    const book = [Book_Title, Book_Author, Book_Comments,book_id];

    db.run(sql, book, err => {
        if (err) {
            return console.error(err.message);
        }
    });
     resolve();
})

exports.deleteBook = (bookid,res) => {
    // let id = req.params.id;
    let id = bookid
    // let compfirmed = confirm("Are you sure?");

    const sql = "DELETE FROM Books WHERE Book_ID=?";

    // if (compfirmed === true) {
    db.run(sql, id, (err) => {
        if (err) {
            return console.error(err.message);
        }
        // else{
            res.redirect(`/books`);
    });
 
    // } else
    // return;
}
