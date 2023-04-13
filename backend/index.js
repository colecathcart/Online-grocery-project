//Some basic axios setup based on this tutorial video:
//https://youtu.be/fPuLnzSjPLE

import express, { request, response } from "express"
import mysql from "mysql"
import cors from "cors"

var cart = []

var workerloguname = ""

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

app.get("/cart",(request, response)=>{
    return response.json(cart)
})

app.get("/manhome",(request, response)=>{
    const sups = request.query.sups || ""
    if(sups !== ""){
        const q = "SELECT * FROM `supplied_by`"
        db.query(q,(err,data)=>{
            if(err) return response.json(err)
            return response.json(data)
        })
    } else {
        const q = "SELECT * FROM `item`"
        db.query(q,(err,data)=>{
            if(err) return response.json(err)
            return response.json(data)
        })
    }
})

app.post("/manhome",(request, response)=>{
    const item_code = request.body.item_code
    const to_add = request.body.to_add
    const q = "UPDATE `item` SET `remaining_num` = `remaining_num` + "+to_add+" WHERE `item_code` = "+item_code
    db.query(q,(err,data)=>{
        if(err) console.log(err)
        return response.json("quantity increased")
    })
})

app.post("/cart",(request, response)=>{
    const res = request.body[0] || ""
    if(res === "checkout"){
        const q = "UPDATE `item` SET `remaining_num` = `remaining_num` - 1 WHERE `name` = ? AND `remaining_num` > 0"
        for(let i = 0; i < cart.length; i++){
            let r = cart[i].remaining_num
            for(let j = 0; j < r; j++){
                db.query(q,[cart[i].name],(err, data)=>{
                    if(err) console.log(err)
                    //return response.json("quantity reduced")
                })
            }
        }
        cart = []
    }else {
        for(let i = 0; i < cart.length; i++){
            if(cart[i].name === request.body.name && cart[i].remaining_num === request.body.remaining_num && cart[i].remaining_num > 0){
                if(cart[i].remaining_num > 1){
                    cart[i].remaining_num--
                    return
                } else {
                    cart.splice(i, 1)
                    return
                }
            }
        }
    }
})

app.get("/home",(request, response)=>{
    const name = request.query.name || ""
    const min = request.query.min || 0
    const max = request.query.max || 100
    const sale = request.query.sale || true
    const bakery = request.query.bakery || true
    const deli = request.query.deli || true
    const meat = request.query.meat || true
    const produce = request.query.produce || true
    console.log(request.query)
    if(name !== ""){
        const q = "SELECT * FROM `item` WHERE `name` LIKE '"+name+"%'"
        
        db.query(q,(err,data)=>{
            //if(err) return response.json(err)
            //console.log(data.body)
            if(err) console.log(err)
            return response.json(data)
        })
    }else{
        var q = "SELECT * FROM `item` WHERE `price` >= "+min+" AND `price` <= "+max
        if(sale === 'true' || bakery === 'true' || deli === 'true' || meat === 'true' || produce === 'true'){
            q = q.concat(" AND (")
            if(sale === 'true'){
                q = q.concat(" `sale_num` IS NOT NULL OR")
            }
            if(meat === 'true'){
                q = q.concat(" `dep_name` = 'meat' OR")
            }
            if(produce === 'true'){
                q = q.concat(" `dep_name` = 'produce' OR")
            }
            if(bakery === 'true'){
                q = q.concat(" `dep_name` = 'bakery' OR")
            }
            if(deli === 'true'){
                q = q.concat(" `dep_name` = 'deli' OR")
            }
            q = q.concat(" false )")
        }
            console.log(q)
            db.query(q,(err,data)=>{
            if(err) return response.json(err)
            console.log("tttttt")
            return response.json(data)
        })
    }
})

app.get("/create",(request, response)=>{
    const uname = request.query.username
    const q = "SELECT * FROM `user` WHERE `username` = ?"
    const vals = [
        uname
    ]
    db.query(q,vals,(err,data)=>{
        if(err) return response.json(err)
        return response.json(data)
    })
})

app.get("/info",(request, response)=>{
    const id = request.query.id || ""
    const getid = request.query.getid || ""
    console.log(id)
    if(getid !== ""){
        console.log(workerloguname)
        const q = "SELECT `id` FROM `staff` WHERE `username` = '"+workerloguname+"'"
        db.query(q,(err,data)=>{
            if(err) return response.json(err)
            console.log(data)
            return response.json(data)
        })
    } else{
        const q = "SELECT * FROM `worker` WHERE `w_id` = "+id
        db.query(q,(err,data)=>{
            if(err) return response.json(err)
            //console.log(data.body)
            return response.json(data)
        })
    }
})

app.get("/employees",(request, response)=>{
    const staff = request.query.staff || ""
    if(staff !== ""){
        //console.log("here")
        const q = "SELECT * FROM `staff`"
        db.query(q,(err,data)=>{
            if(err) return response.json(err)
            //console.log(data)
            return response.json(data)
        })
    } else{
        const q = "SELECT * FROM `worker`"
        db.query(q,(err,data)=>{
            if(err) return response.json(err)
            return response.json(data)
        })
    }
})

app.post("/employees",(request,response)=>{
    const dname = request.body.d_name
    const id = request.body.w_id
    const q = "UPDATE `worker` SET `d_name` = '"+dname+"' WHERE `w_id` = "+id
    db.query(q,(err,data)=>{
        if(err) return response.json(err)
        return response.json(data)
    })
})

app.post("/login", (request, response)=>{
    workerloguname = request.body.susername
    console.log(workerloguname)
    return response.json("logged in")
})

app.get("/login",(request, response)=>{
    console.log(request.query)
    const uname = request.query.username || ""
    const pword = request.query.password || ""
    const isman = request.query.isman || ""
    if(isman !== ""){
        const qs = "SELECT * FROM `staff` WHERE `username` = ? AND `position` = 'manager'"
        const cvals = [
            uname
        ]
        db.query(qs, cvals, (err,data)=>{
            if(err) return response.json(err)
            return response.json(data)
        })
    } else {
        const cvals = [
            uname,
            pword
        ]
        const qc = "SELECT * FROM `user` WHERE `username` = ? AND `password` = ?"

        db.query(qc,cvals,(err,data)=>{
            if(err) return response.json(err)
            return response.json(data)
        })
    } 
    
})

app.post("/home", (request, response)=>{
    cart = cart.concat(request.body)
    return response.json("item added")
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