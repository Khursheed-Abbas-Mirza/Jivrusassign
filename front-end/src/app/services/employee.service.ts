import { Injectable,signal ,inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  http=inject(HttpClient)
  emps=signal<{id:number,name:string,email:string,department:string,role:string}[]>([])
  showform=signal(false)
  currentuser:any=signal(null)
  constructor(){
    this.getemp()
  }
  
  getemp(){
    this.http.get("/api/").subscribe((res:any)=>{
    this.emps.set(res.emps)
  })
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
    return this.http.put(`/api/${user.id}`,user)
  }
   addemp(user:any){
    return this.http.post('/api/',user)
  }
  deleteemp(id:number){
    return this.http.delete(`/api/${id}`)
  }
  search(searchTerm: string) {
   if (searchTerm.trim() !== '') {
        this.http.get(`/api/search?q=${searchTerm}`)
        .subscribe((response:any) => {
          this.emps.set( response.emps);
        });
        return
    }
    this.getemp()
  

 

}
}
