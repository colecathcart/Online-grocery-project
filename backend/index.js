import express from "express"
import mysql from "mysql"
import cors from "cors"


const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"grocery_store"
})

app.use(express.json())
app.use(cors())

app.get("/", (request,response)=>{
    response.json("backend")
})

app.get("/home",(request, response)=>{
    const q = "SELECT * FROM item"
    db.query(q,(err,data)=>{
        if(err) return response.json(err)
        return response.json(data)
    })
})

app.get("/create",(request, response)=>{
    const q = "SELECT * FROM user"
    db.query(q,(err,data)=>{
        if(err) return response.json(err)
        return response.json(data)
    })
})

app.get("/login",(request, response)=>{
    console.log(request.query)
    const uname = request.query.username || ""
    const pword = request.query.password || ""
    const isman = request.query.isman || ""
    if(isman !== ""){

    } else {
        console.log("made it")
        const cvals = [
            uname,
            pword
        ]
        const qc = "SELECT * FROM `user` WHERE `username` = ? AND `password` = ?"

        db.query(qc,cvals,(err,data)=>{
            
            if(err) return response.json(err)
            console.log("here")
            return response.json(data)
        })


    } 
    
})

app.post("/create", (request, response)=>{
    const q2 = "INSERT INTO customer (`uname`,`address`) VALUES (?)"
    const values2 = [request.body.username, request.body.address]
    const q = "INSERT INTO user (`username`,`password`,`fname`,`m_init`,`l_name`) VALUES (?)"
    const values = [
        request.body.username,
        request.body.password,
        request.body.fname,
        request.body.m_init,
        request.body.lname]
    db.query(q,[values],(err, data)=>{
        if(err) return response.json(err)
        //return response.json("account created!")
    })
    db.query(q2,[values2],(err, data)=>{
        if(err) return response.json(err)
        return response.json("account created!")
    })
})

app.listen(8080, ()=>{
    console.log("connected to backend")
})