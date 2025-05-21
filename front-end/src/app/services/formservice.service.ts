import { Injectable,signal ,inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class FormService {
  http=inject(HttpClient)
  emps=signal<{id:number,name:string,email:string,department:string,role:string}[]>([])
  showform=signal(false)
  currentuser:any=signal(null)
  getemployess(){
     this.http.get("http://localhost:3000/api/").subscribe((res:any)=>{
      this.emps.set(res.emps)
    })
  }
  getemp(){
    return this.emps
  }
  setemp(user:any){
    
    if(user){
      this.currentuser.set(user)
      return
    }
    this.http.get("")
    this.currentuser.set(null)
  }
  updateemp(user:any){
    return this.http.put(`http://localhost:3000/api/${user.id}`,user)
  }
   addemp(user:any){
    return this.http.post('http://localhost:3000/api/',user)
  }
  deleteemp(id:number){
    return this.http.delete(`http://localhost:3000/api/${id}`)
  }
}
