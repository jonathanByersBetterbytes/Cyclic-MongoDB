const express = require("express");
//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");

const pdf2excel = require("pdf-to-excel");
const XLSX = require('xlsx')
let fs = require('fs'), PDFParser = require("pdf2json");

const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const testingRoutes = require("./routes/testing");

const Book = require('./models/books')


// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/testing", testingRoutes);


//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch up!");
  
  //loopPDFFiles()
  //processExcelFiles()
  //processExcel()
  //pdfToJson()
  //pdfToJson()
});
// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI)
//         console.log(`MongoDB Conneted: ${conn.connections.host}`)
//     } catch (error){
//         console.log(error)
//         process.exit(1)
//     }
// }

// connectDB().then(()=> {
//     app.listen(PORT, () => {
//         console.log(`Listening on port ${PORT}`)
//         //loopPDFFiles()
//     })
// })

// app.get('/', (req, res) => { // homepage
//     res.send({title: 'Books4'})
// })
// app.get('/add-note', async (req,res) => {
//     try{
//         await Book.insertMany([
//             {
//                 title: 'Game of Thrones',
//                 body: 'Body text goes here...'
//             },
//             {
//                 title: 'Sons Of Anarchy',
//                 body: 'Body text goes here...'
//             }
//         ])
//         res.send('Books Added...')
//     } catch (error){

//     }
// })
// app.get('/books', async (req,res)=>{
//     const book = await Book.find();
//     if(book){
//         const books = res.json(book) // return the books in JSON
//         console.log('Got the books:')
//         // console.log(books)
//     }else res.send('Something went wrong.')
// })



