const express = require("express");
const app = express();
const path =require("path");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { log } = require("console");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./build")));
mongoose.connect(process.env.URL);
const port = process.env.PORT || 8080;
log
let bookSchema = new mongoose.Schema({
    bookId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    publication: {
        type: String,
    },
})

let Book = mongoose.model("Book", bookSchema);

// function saveBooks() {
//     for(let i=0;i<emojipedia.length;i++){
//         let newBook = new Book({
//             bookId:emojipedia[i].id,
//             name:emojipedia[i].name,
//             author:emojipedia[i].author,
//             publication:emojipedia[i].pub
//         });
//         newBook.save();
//     };

//     console.log('save success');
// }

// saveBooks();


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.get("/getBooks", async function (req, res) {
    let data = await Book.find({});
    // console.log(data);
    res.send(data)
})

app.listen(port, function () {
    console.log("server running at "+port);
})