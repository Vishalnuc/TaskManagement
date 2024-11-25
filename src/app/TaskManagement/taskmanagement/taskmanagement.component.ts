import { Component } from '@angular/core';
import { TaskService } from '../../../../service/task.service';
import { MatTableModule} from '@angular/material/table'
import { AddtaskComponent } from '../../AddTask/addtask/addtask.component';
import { MatDialog } from '@angular/material/dialog'
import { MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-taskmanagement',
  imports: [MatTableModule, MatIconModule],
  providers: [],
  templateUrl: './taskmanagement.component.html',
  styleUrl: './taskmanagement.component.css',
})
export class TaskManagementComponent {
  constructor(private taskService: TaskService, private readonly matDialog: MatDialog) { };
  tasks: any;

  displayedColumns = ['name','priority','description','status','beginDate','endDate', 'actions'];
  
  ngOnInit() {
    this.getAllTasks();
  }
  
  getAllTasks() {
    this.taskService.getAllTasks().subscribe((task: any) => {
      this.tasks = task;
    })
  }
  
  openAddTask() {
    this.matDialog
      .open(AddtaskComponent, {
        width: '50%',
        maxWidth: '100vw', 
        disableClose: true,
        panelClass: 'custom-dialog',
      })
      .afterClosed()
      .subscribe(() => {
        this.getAllTasks();
      });
  }

  deleteTask(taskData: any)
  {
    console.log(taskData.taskID);

    if(taskData && taskData.taskID) {
      this.taskService.deleteTask(taskData.taskID).subscribe((response:any) => {
          this.tasks = this.tasks.filter((task:any) => task.taskID != taskData.taskID);

      });
      console.log(taskData);
    }
  }


}
