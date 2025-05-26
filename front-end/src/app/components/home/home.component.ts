import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { computed } from '@angular/core';
import { FormComponent } from '../form/form.component';
import {MatIconModule} from '@angular/material/icon'
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormComponent,MatIconModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    data=inject(EmployeeService)
    emps=computed<{id:number,name:string,email:string,department:string,role:string}[]>(()=>this.data.emps())
    showemps=computed(()=>this.emps().length>0)
    showform=computed(()=>this.data.showform())
    snackBar=inject(MatSnackBar)
    searchTerm: string = '';
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
deleteemp(id: number) {
  this.snackBar.open(`Are you sure you want to delete  user with id ${id}?`, 'Yes', {
    duration: 3000,
  }).onAction().subscribe(() => {
    this.data.deleteemp(id).subscribe((res: any) => {
      if (res.success) {
        this.data.emps.set(res.emps)
        return
      }
      alert("An Error Occured while Executing see the error in console")
      console.error(res)
    })
  });
  
}

SearchChange(){
  this.data.search(this.searchTerm)
}

}
