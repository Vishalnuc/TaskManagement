import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskManagementComponent } from "./TaskManagement/taskmanagement/taskmanagement.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskManagementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'web';
}
