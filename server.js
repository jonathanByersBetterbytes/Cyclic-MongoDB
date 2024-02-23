
require("dotenv").config({ path: "./config/.env" });
const express = require('express')
const mongoose = require('mongoose')
const Book = require('./models/books')

const app = express()
const PORT = process.env.PORT || 8000

const mainRoutes = require("./routes/main");

//Using EJS for views
app.set("view engine", "ejs");
//Static Folder
app.use(express.static("public"));

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);

mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Conneted: ${conn.connections.host}`)
    } catch (error){
        console.log(error)
        process.exit(1)
    }
}

connectDB().then(()=> {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})


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



