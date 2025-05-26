import { Component ,inject, ViewChild} from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import {FormsModule, NgForm} from "@angular/forms"
import {computed} from "@angular/core"
import { ErrormessageComponent } from '../errormessage/errormessage.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-form',
  imports: [FormsModule,ErrormessageComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @ViewChild('empform') empform!:NgForm
  snackBar=inject(MatSnackBar)
  data=inject(EmployeeService)
  currentuser=computed(()=>this.data.currentuser())
  showError=false
  hideform(event:any){
    event.preventDefault()
    this.data.setemp(null)
    this.data.showform.set(false)
  }
  submit(user:any){
    if(this.empform.valid){

   
    if(this.currentuser()){
      const updateuser={id:this.currentuser().id,...user}
      this.data.updateemp(updateuser).subscribe((res:any)=>{
        if(res.success){
          this.data.emps.set(res.emps)
          this.data.showform.set(false)
          return
        }
        
         this.data.showform.set(false)
      alert("An Error Occured while Execeuting the program see the full error in console")
      console.error(res)
      })
      return
    }
    this.data.addemp(user).subscribe((res:any)=>{
      if(res.success){
        this.data.emps.set(res.emps)
        this.data.showform.set(false)
        return
      }
      this.data.showform.set(false)
      // alert("An Error Occured while Execeuting the program see the full error in console")
      this.snackBar.open(res.msg+' plz use another email','OK',{
        duration:3000
      })
      console.error(res)
    })
     }
     this.showError=true
  }

  
}
