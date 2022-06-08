const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/views/date")

const app = express();

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

var items = ["Book Read", "EJS Module", "Salutations"]
workList=[]

app.get("/", (req, res)=>{
   
    var day = date.getDate();
   
    res.render("list", {listTitle : day, listItems : items})

});

app.post("/", (req, res)=>{
    let item = req.body.item
    if(req.body.list === "Work"){
        workList.push(item)
        res.redirect("/work")
    }else{
        items.push(item)
        res.redirect("/")
    }
})

app.get("/work", (req, res)=>{
    res.render("list",{listTitle : "Work List",listItems : workList })
})

app.listen(4000)