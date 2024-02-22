
require("dotenv").config({ path: "./config/.env" });
const express = require('express')
const mongoose = require('mongoose')
const Book = require('./models/books')

const app = express()
const PORT = process.env.PORT || 3000

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

app.get('/', (req, res) => { // homepage
    res.send({title: 'Books'})
})
app.get('/add-note', async (req,res) => {
    try{
        await Book.insertMany([
            {
                title: 'Game of Thrones',
                body: 'Body text goes here...'
            },
            {
                title: 'Sons Of Anarchy',
                body: 'Body text goes here...'
            }
        ])
    } catch (error){

    }
})
app.get('/books', async (req,res)=>{
    const book = await Book.find();
    if(book) res.json(book)
    else res.send('Something went wrong.')
})

connectDB().then(()=> {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})



