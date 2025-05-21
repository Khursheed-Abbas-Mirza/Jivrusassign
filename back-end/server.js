const express=require("express")
const app=express()
const cors=require("cors")
const employees=require("./routes/employes")
app.use(express.json())
app.use(cors())
app.use("/api",employees)
app.get("/",(req,res)=>{
    res.send("Hello World Backend is working")
})

app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000")
})