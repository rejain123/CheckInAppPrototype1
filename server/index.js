//Comments
//Used mySql database
//To run the server side -> in terminal write commands : 
// cd server
//npm run devStart

//To run the Client Side -> In terminal write commands:
// cd client 
//npm start

const express=require("express")
const app=express()
const mysql=require("mysql")
const cors=require("cors")
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'password',
    database:'CRUDataBase'
})
app.use(cors())
app.use(express.json())


app.post('/insert/newUser',(req,res)=>{
    const sqlInsert="INSERT INTO event_attendees (bookingID,name,email,check_ins,party,event) VALUES (?,?,?,?,?,?);"
    console.log(req.body)
    console.log([req.body.bookingID,req.body.name,req.body.email,req.body.check_ins,req.body.event])
    db.query(sqlInsert,[req.body.bookingID,req.body.name,req.body.email,req.body.check_ins,req.body.PartyNumber,req.body.event],(err,result)=>{
        console.log(result)
    })
   
})
app.put('/update',(req,res)=>{
    const name=req.body.name;
    const bookingID=req.body.bookingID;
    const mainUserCheckIn=req.body.check_ins
    const PartyNumber=req.body.PartyNumber

    const sqlUpdate="UPDATE event_attendees SET check_ins= ?, party=? WHERE name=? AND bookingID=?;"
    db.query(sqlUpdate,[mainUserCheckIn,PartyNumber,name,bookingID],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
        }
    })
})

app.delete('/delete',(req,res)=>{
    const sqlDelete="DELETE FROM event_attendees"
    db.query(sqlDelete,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
        }
    })
})

app.get('/data',(req,res)=>{
    const sqlGet="SELECT * from event_attendees;"
    db.query(sqlGet,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
        }
    )
})


//server port
app.listen(3001,()=>{
    console.log("server is running on port 3001")
})