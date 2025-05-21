import { Component,Input } from '@angular/core';
import { FormsModule, NgForm ,NgModel} from '@angular/forms';
@Component({
  selector: 'form-errormessage',
  imports: [],
  templateUrl: './errormessage.component.html',
  styleUrl: './errormessage.component.css'
})
export class ErrormessageComponent {
  @Input() field!:NgModel
  @Input() name:string=""
}
