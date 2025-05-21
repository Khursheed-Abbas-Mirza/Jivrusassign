import { Component, inject, signal } from '@angular/core';
import { FormService } from '../../services/formservice.service';
import { computed } from '@angular/core';
import { FormComponent } from '../form/form.component';
import {MatIconModule} from '@angular/material/icon'
@Component({
  selector: 'app-home',
  imports: [FormComponent,MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    data=inject(FormService)
    emps=computed<{id:number,name:string,email:string,department:string,role:string}[]>(()=>this.data.emps())
    showemps=computed(()=>this.emps().length>0)
    showform=computed(()=>this.data.showform())
    ngOnInit(){
      this.data.getemployess()
       
    }
  
   
    showeditform(id:number){
      const user=(this.emps()).find((emp:any)=>emp.id==id)
      this.data.setemp(user)
      this.data.showform.set(true)
    }
    showaddform(event:any){
      event.preventDefault()
      this.data.setemp(null)
      this.data.showform.set(true)
    }
    deleteemp(id:number){
    
      this.data.deleteemp(id).subscribe((res:any)=>{
       
        if(res.success){
          
        
          this.data.emps.set(res.emps)
        }
      })
    }
}
