const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
require("./book");

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Books',()=>{
    console.log('database is connected');
})

const Book=mongoose.model('Book');

app.get('/',(req,res)=>{
    res.send('This is get book service')
})

app.post('/book',(req,res)=>{
    // console.log('This is book post');
    // res.send(req.body)
    var book=new Book(req.body);
    book.save().then(()=>{
        console.log('New book is created');
        res.send(req.body);
    }).catch((err)=>{
        if(err){throw err;}
    })
});

app.get('/books',(req,res)=>{
    Book.find().then((books)=>{
        res.send(books)
    }).catch((err)=>{
        if(err){throw err;}
    })
});

app.get('/book/:id',(req,res)=>{
    Book.findById(req.params.id).then((books)=>{
        res.send(books)
    }).catch((err)=>{
        if(err){throw err;}
    })
});

app.delete('/book/:id',(req,res)=>{
    Book.findOneAndDelete(req.params.id).then((books)=>{
        res.send(books)
    }).catch((err)=>{
        if(err){throw err;}
    })
});

app.listen(4000,()=>{
    console.log('server is running on 4000')
})