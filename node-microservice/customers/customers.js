const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
require("./customer");

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Customers',()=>{
    console.log('database is connected');
})

const Customer=mongoose.model('Customer');

app.post('/customer',(req,res)=>{
    var customer=new Customer(req.body);
    customer.save().then(()=>{
        console.log('New customer is created');
        res.send(req.body);
    }).catch((err)=>{
        if(err){throw err;}
    })
});

app.get('/customers',(req,res)=>{
    Customer.find().then((customers)=>{
        res.send(customers)
    }).catch((err)=>{
        if(err){throw err;}
    })
});

app.get('/customer/:id',(req,res)=>{
    Customer.findById(req.params.id).then((customers)=>{
        res.send(customers)
    }).catch((err)=>{
        if(err){throw err;}
    })
});

app.delete('/customer/:id',(req,res)=>{
    Customer.findOneAndDelete(req.params.id).then((customers)=>{
        res.send(customers)
    }).catch((err)=>{
        if(err){throw err;}
    })
});

app.listen(4001,()=>{
    console.log('server is running on 4001')
})
