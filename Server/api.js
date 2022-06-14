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
cron.schedule('43 11 * * *',()=>{
    dailyEmptyObject()
    console.log("successs Daily")
})

app.use(bodyParser.json());


app.get("/getcategory", function(req, res){
    mongoClient.connect(url, function(err, clientObj){
        if(!err) {
            var database = clientObj.db("cknclient");
            database.collection("ckncategory").find().toArray(function (err, documents){
                if(!err) {
                    res.send(documents);
                    console.log("Get Success")
                }
            })
        }
    })
});

app.post("/addcategory",function(req,res){
    mongoClient.connect(url,function(err,clientObj){
        if(!err){
        
            var db = clientObj.db("cknclient");
            var data = {
                Name : req.body.Name,
                Condition : req.body.Condition
            }
            db.collection("ckncategory").insertOne(data,
            function(err,result){debugger
                if(!err){
                   console.log("Recorted Inserted")
                   res.send('Record inserted')
                }else{
                    // console.log(err.message)
                    res.send(err.message)
                }

            })
            var date = new Date().toLocaleDateString();
            db.collection("ckncost").find({"Date":date}).toArray(function(err,documents){
               if(!err){
                   var doc = documents[0];
                    var Id = doc._id
               }
               var data = {
                [req.body.Name] : 0
               }
               console.log(data)
               db.collection("ckncost").updateOne({"_id":new ObjectId(Id)},{$set:data}).then(resp=>{
                //    console.log(resp.message)
                   console.log("new category name add value 0")
               })
            })
        }
    })
})


app.delete("/detetecategory/:id",function(req,res){
    mongoClient.connect(url,function(err,clientObj){
        if(!err){
            var db = clientObj.db("cknclient");
            var Id = req.params.id;
            db.collection("ckncategory").deleteOne({"_id": ObjectId(Id)}).then(function(result,err){
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

app.put("/changeborder/:id",function(req,res){
    mongoClient.connect(url,function(err,clientObj){
        if(!err){
            var Id = req.params.id;
            var db = clientObj.db("cknclient");
            console.log(req.body)
            db.collection("ckncategory").updateOne({"_id":new ObjectId(Id)},{$set:req.body}).then(resp=>{
                console.log("Changeborder update")
                res.send("Changeborder update")
            },err=>{
                console.log("Not Change Border")
                res.send("Not Change Border")
            })
        }
    })
})

//////// Cost Api /////

app.post("/addcost",function(req,res){
    mongoClient.connect(url,function(err,clientObj){
        if(!err){
            var db = clientObj.db("cknclient");
            var data = {
                Name : req.body.Name,
                Cost : req.body.Cost
            }
            db.collection("ckncost").insertOne(data,
            function(err,result){debugger
                if(!err){
                   console.log("Cost Inserted")
                   res.send('Cost inserted')
                }else{
                    console.log(err.message)
                    res.send(err.message)
                }
            })
        }
    })
})


app.get('/getLastRecord', function(req,res){
    mongoClient.connect(url,function(err,clientObj){
        if(!err){
            var db = clientObj.db("cknclient");

            var date = new Date().toLocaleDateString()
            db.collection("ckncost").find({"Date":date}).toArray(function (err, documents){
                if(!err) {
                    res.send(documents);
                    console.log(documents)
                    console.log("Cureent day Success")
                }
            })
        }
    })
})

app.put("/updateLastRecord/:id",function(req,res){
    mongoClient.connect(url,function(err,clientObj){
        if(!err){
            var Id = req.params.id;
            var db = clientObj.db("cknclient");

            console.log(req.body)

            db.collection("ckncost").updateOne({"_id":new ObjectId(Id)},{$set:req.body}).then(resp=>{

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

////// Daily Empty Object //////

       function dailyEmptyObject(){
            mongoClient.connect(url,function(err,clientObj){
                if(!err){
                    var db = clientObj.db("cknclient");
                    var date = new Date().toLocaleDateString()
                    var data = {
                        "Date" : date,
                        
                        // "Debit" : {
                        //         "Food" : 0,
                        //         "Drink" : 0
                        // },
                        // "Credit" : {
                        //         "Paytm" : 0,
                        //         "Cash" : 0
                        // }
                    }
                    db.collection("ckncost").insertOne(data,
                    function(err,result){debugger
                        if(!err){
                        console.log("Empty Object Create")
                        }else{
                            console.log(err.message)
                            console.log("Failed Empty Object")
                        }
                    })
                }
            })
        }



//////// ADD Borrow //////


                app.get("/getBorrow", function(req, res){
                    mongoClient.connect(url, function(err, clientObj){
                        if(!err) {
                            var database = clientObj.db("cknclient");
                            database.collection("cknborrow").find().toArray(function (err, documents){
                                if(!err) {
                                    res.send(documents);
                                    console.log("Get Borrow")
                                }
                            })
                        }
                    })
                });

        app.post("/addBorrow",function(req,res){
            mongoClient.connect(url,function(err,clientObj){
                if(!err){
                    var db = clientObj.db("cknclient");
                    var data = {
                        Name : req.body.Name,
                        Condition : req.body.Condition,
                        Amount :0,
                        Description:"",
                    }
                    db.collection("cknborrow").insertOne(data,
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


        app.delete("/deteteBorrow/:id",function(req,res){
            mongoClient.connect(url,function(err,clientObj){
                if(!err){
                    var db = clientObj.db("cknclient");
                    var Id = req.params.id;
                    db.collection("cknborrow").deleteOne({"_id": ObjectId(Id)}).then(function(result,err){
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
                    var db = clientObj.db("cknclient");
        
                    console.log(req.body)
        
                    db.collection("cknborrow").updateOne({"_id":new ObjectId(Id)},{$set:req.body}).then(resp=>{
        
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
                    var database = clientObj.db("cknclient");
                    database.collection("cknborrow").find({"_id":new ObjectId(Id)}).toArray(function (err, documents){
                        if(!err) {
                            res.send(documents);
                            console.log("Get Borrow")
                        }
                    })
                }
            })
        });
        
        app.put("/updateBorrowAmount/:id",function(req,res){
            mongoClient.connect(url,function(err,clientObj){
                if(!err){
                    var Id = req.params.id;
                    var db = clientObj.db("cknclient");
        
                    console.log(req.body)
        
                    db.collection("cknborrow").updateOne({"_id":new ObjectId(Id)},{$set:req.body}).then(resp=>{
        
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