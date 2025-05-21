import { Component ,inject} from '@angular/core';
import { FormService } from '../../services/formservice.service';
import {FormsModule} from "@angular/forms"
import {computed} from "@angular/core"
import { ErrormessageComponent } from '../errormessage/errormessage.component';
@Component({
  selector: 'app-form',
  imports: [FormsModule,ErrormessageComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  data=inject(FormService)
  currentuser=computed(()=>this.data.currentuser())
  hideform(event:any){
    event.preventDefault()
    this.data.setemp(null)
    this.data.showform.set(false)
  }
  submit(user:any){

    if(this.currentuser()){
      const updateuser={id:this.currentuser().id,...user}
      this.data.updateemp(updateuser).subscribe((res:any)=>{
        if(res.success){
          this.data.emps.set(res.emps)
          this.data.showform.set(false)
        }
      })
      return
    }
    this.data.addemp(user).subscribe((res:any)=>{
      if(res.success){
        this.data.emps.set(res.emps)
        this.data.showform.set(false)
      }
    })
  }

  
}
