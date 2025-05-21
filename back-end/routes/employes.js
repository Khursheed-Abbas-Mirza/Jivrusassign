const Router=require("express").Router()
const {checkSchema,validationResult}=require("express-validator")
const {empSchema}=require("../schemas/employeeSchema")
let emps=[
  {
    id:1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    department: "Engineering",
    role: "Frontend Developer"
  },
  {
    id:2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    department: "Engineering",
    role: "Backend Developer"
  },
  {
    id:3,
    name: "Carol Lee",
    email: "carol.lee@example.com",
    department: "Marketing",
    role: "Content Strategist"
  },
  {
    id:4,
    name: "David Kim",
    email: "david.kim@example.com",
    department: "Human Resources",
    role: "HR Manager"
  },
  {
    id:5,
    name: "Eva Martinez",
    email: "eva.martinez@example.com",
    department: "Sales",
    role: "Account Executive"
  }
];
let id=emps.length
Router.get("/",(req,res)=>{
    res.send({emps:emps})
})
Router.get("/:id",(req,res)=>{
    const {id}=req.params
    const finduser=emps.find((user)=>user.id==id)
    if(!finduser){
        return res.send({success:false,msg:"No user Found with this id"})
    }
    res.send({success:true,emps:emps})
})
Router.post("/",checkSchema(empSchema),(req,res)=>{
    try {
        const validateresult=validationResult(req)
        if(!validateresult.isEmpty()){
            return res.send({success:false,error:validateresult.errors[0].msg})
        }
       
        const userdata=req.body
        const email=userdata.email
        const finduser=emps.find((emp)=>emp.email===email)
        if(finduser){
            return res.send({success:false,msg:"A user already exists"})
        }
        emps.push({id:++id,...userdata})

        res.send({success:true,emps:emps})
    } catch (error) {
        console.log(error)
        res.send({msg:"A Internal Server Error"})
    }

})
Router.put("/:id",checkSchema(empSchema),(req,res)=>{
    try {
        const validationresult=validationResult(req)
        if(!validationresult.isEmpty()){
            return res.send({success:false,errors:validationresult.errors[0].msg})
        }
        const {id}=req.params
        const updatedata=req.body
        const findemployee=emps.findIndex((user)=>user.id==id)
        if(findemployee<0){
            return res.send({success:false,msg:"No user Found"})
        }
        emps[findemployee]={id:id,...updatedata}
        res.send({success:true,emps:emps})
    } catch (error) {
        console.log(error)
        res.send("An Internal Server error",error)
    }
})
Router.delete("/:id",(req,res)=>{
    const {id}=req.params
    const finduser=emps.find((user)=>user.id==id)
    if(!finduser){
        return res.send({success:false,msg:"No user Found with this id"})
    }
    emps=emps.filter((user)=>user.id!=id)
    res.send({success:true,emps:emps})
})
module.exports=Router