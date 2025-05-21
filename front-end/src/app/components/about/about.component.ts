import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-about',
  imports: [MatIconModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  standalone: true
})
export class AboutComponent {

}
@Component({
  selector:'no-route',
  template:"<h1>404 Not Found The route does not exist</h1>",
  styles: 'h1{color: aqua;margin:45px}'
})
export class NoRouteComponent{}