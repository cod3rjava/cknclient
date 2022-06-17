var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var url = "mongodb://127.0.0.1:27017";
var app = express();
var cors = require("cors");
var cron = require("node-cron")
app.use(cors())
var bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");

app.use(bodyParser.urlencoded({
    extended : true
}));
cron.schedule('* * * * * *',()=>{
    // dailyEmptyObject()
    // console.log("successs Daily")
})

var dataBaseName = "ckndb"
var categoryName = "category"
var dailyExpense = "dailyExpense"
var  borrower = "borrower"

app.use(bodyParser.json());
app.get("/getCategory", function(req, res){
    mongoClient.connect(url, function(err, clientObj){
        if(!err) {
            var database = clientObj.db(dataBaseName);
            database.collection(categoryName).find().toArray(function (err, documents){
                if(!err) {
                    res.send(documents);
                    console.log("Get Success")
                }
            })
        }
    })
});

app.post("/addCategory",function(req,res){
    mongoClient.connect(url,function(err,clientObj){
        if(!err){
        
            var db = clientObj.db(dataBaseName);
            var data = {
                Name : req.body.Name,
                Condition : req.body.Condition
            }
            db.collection(categoryName).insertOne(data,
            function(err,result){debugger
                if(!err){
                   console.log("Recorted Inserted")
                   res.send('Record inserted')
                }else{
                    // console.log(err.message)
                    res.send(err.message)
                }

            })
            
        }
    })
})



app.delete("/deleteCategoryById/:id",function(req,res){
    mongoClient.connect(url,function(err,clientObj){
        if(!err){
            var db = clientObj.db(dataBaseName);
            var Id = req.params.id;
            db.collection(categoryName).deleteOne({"_id": ObjectId(Id)}).then(function(result,err){
                if(!err){
                    console.log("Record Delete")
                    res.send("Record Delete")
                }else{
                    console.log("Delete Method Not Working")
                    res.send("Delete Method Not Working")
                }
            })
        }
    })
})

app.put("/updateCategoryById/:id",function(req,res){
    mongoClient.connect(url,function(err,clientObj){
        if(!err){
            var Id = req.params.id;
            var db = clientObj.db(dataBaseName);
            console.log(req.body)
            db.collection(categoryName).updateOne({"_id":new ObjectId(Id)},{$set:req.body}).then(resp=>{
                console.log("updateCategoryById update")
                res.send("updateCategoryById update")
            },err=>{
                console.log("Not Change Border")
                res.send("Not Change Border")
            })
        }
    })
})

//////// Daily Expense /////

// app.post("/addcost",function(req,res){
//     mongoClient.connect(url,function(err,clientObj){
//         if(!err){
//             var db = clientObj.db(dataBaseName);
//             var data = {
//                 Name : req.body.Name,
//                 Cost : req.body.Cost
//             }
//             db.collection(dailyExpense).insertOne(data,
//             function(err,result){debugger
//                 if(!err){
//                    console.log("Cost Inserted")
//                    res.send('Cost inserted')
//                 }else{
//                     console.log(err.message)
//                     res.send(err.message)
//                 }
//             })
//         }
//     })
// })


app.get('/getDailyExpenseByDate', function(req,res){
    mongoClient.connect(url,function(err,clientObj){
        if(!err){
            var db = clientObj.db(dataBaseName);

            var date = new Date().toLocaleDateString()
            db.collection(dailyExpense).find({"Date":date}).toArray(function (err, documents){
                if(!err) {
                    res.send(documents);
                    // console.log(documents)
                    console.log("Cureent day Success")
                }
            })
        }
    })
})

app.put("/updateDailyExpenseByDate/:date",function(req,res){
    mongoClient.connect(url,function(err,clientObj){
        if(!err){
            var date = req.params.date.replaceAll("-","/");
            console.log(date)
            var db = clientObj.db(dataBaseName);

            console.log(req.body)

            db.collection(dailyExpense).updateOne({"Date":date},{$set:req.body}).then(resp=>{

                console.log("last data updata")
                res.send("last data updata")
            },
            err=>{
                console.log("Not update")
                res.send(err.message)
            })
        } 
    })
})

app.put("/updateAllExpense",function(req,res){
    mongoClient.connect(url,function(err,clientObj){
        if(!err){
            var Id = req.params.id;
            var db = clientObj.db(dataBaseName);
            console.log(req.body)
            db.collection(dailyExpense).updateMany({},{$set:req.body}).then(resp=>{
                console.log("Update All Expense update")
                res.send("Update All Expense update")
            },err=>{
                console.log("Not All Expense Update")
                res.send("Not All Expense Update")
            })
        }
    })
})
////// Daily Empty Object //////

app.post("/getEmptyObject",(req,res)=>dailyEmptyObject(req,res))

       function dailyEmptyObject(req,res){
            mongoClient.connect(url,function(err,clientObj){
                if(!err){
                    var db = clientObj.db(dataBaseName);

                    var data = {Date : new Date().toLocaleDateString()}

                    db.collection(categoryName).find().toArray(function (err, documents){
                        if(!err){
                            var dd = documents.map(cp=>cp.Name)

                            dd.forEach(i => data[i]=0)

                            db.collection(dailyExpense).insertOne(data,
                                function(err,result){debugger
                                    if(!err){
                                    console.log("Empty Object Create")
                                    res.send("Create Empty Object Success")
                                    }else{
                                        console.log(err.message)
                                        console.log("Failed Empty Object")
                                    }
                                })
                      
                    }}
                    )
                    
            
                  
                   
                }
            })
        }



//////// ADD Borrow //////


                app.get("/getBorrower", function(req, res){
                    mongoClient.connect(url, function(err, clientObj){
                        if(!err) {
                            var database = clientObj.db(dataBaseName);
                            database.collection(borrower).find().toArray(function (err, documents){
                                if(!err) {
                                    res.send(documents);
                                    console.log("Get Borrow")
                                }
                            })
                        }
                    })
                });

        app.post("/addBorrower",function(req,res){
            mongoClient.connect(url,function(err,clientObj){
                if(!err){
                    var db = clientObj.db(dataBaseName);
                    var data = {
                        Name : req.body.Name,
                        Condition : req.body.Condition,
                        Amount :0,
                        Description:"",
                    }
                    db.collection(borrower).insertOne(data,
                    function(err,result){debugger
                        if(!err){
                        console.log("Borrow Inserted")
                        res.send('Borrow inserted')
                        }else{
                            console.log(err.message)
                            res.send(err.message)
                        }
                    })
                }
            })
        })


        app.delete("/deleteBorrowerById/:id",function(req,res){
            mongoClient.connect(url,function(err,clientObj){    
                if(!err){
                    var db = clientObj.db(dataBaseName);
                    var Id = req.params.id;
                    db.collection(borrower).deleteOne({"_id": ObjectId(Id)}).then(function(result,err){
                        if(!err){
                            console.log("Borrow Record Delete")
                            res.send(" Borrow Record Delete")
                        }else{
                            console.log("Delete Method Borrow Not Working")
                            res.send("Delete Method Borrow Not Working")
                        }
                    })
                }
            })
        })

        app.put("/updateBorrowName/:id",function(req,res){
            mongoClient.connect(url,function(err,clientObj){
                if(!err){
                    var Id = req.params.id;
                    var db = clientObj.db(dataBaseName);
        
                    console.log(req.body)
        
                    db.collection(borrower).updateOne({"_id":new ObjectId(Id)},{$set:req.body}).then(resp=>{
        
                        console.log("updata borrow Name")
                        res.send("updata borrow Name")
                    },
                    err=>{
                        console.log("Not update")
                        res.send(err.message)
                    })
                }
            })
        })


        app.get("/getBorrowById/:id", function(req, res){
            mongoClient.connect(url, function(err, clientObj){
                var Id = req.params.id
                if(!err) {
                    var database = clientObj.db(dataBaseName);
                    database.collection(borrower).find({"_id":new ObjectId(Id)}).toArray(function (err, documents){
                        if(!err) {
                            res.send(documents);
                            console.log("Get Borrow")
                        }
                    })
                }
            })
        });
        
        app.put("/updateBorrowAmountById/:id",function(req,res){
            mongoClient.connect(url,function(err,clientObj){
                if(!err){
                    var Id = req.params.id;
                    var db = clientObj.db(dataBaseName);
        
                    console.log(req.body)
        
                    db.collection(borrower).updateOne({"_id":new ObjectId(Id)},{$set:req.body}).then(resp=>{
        
                        console.log("updata borrow Amount , Description")
                        res.send("updata borro  Amount")
                    },
                    err=>{
                        console.log("Not update")
                        res.send(err.message)
                    })
                }
            })
        })

app.listen(8888);
console.log("Server Started: http://127.0.0.1:8888");