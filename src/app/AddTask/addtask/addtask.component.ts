import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskService } from '../../../../service/task.service';
import { MatDialog } from '@angular/material/dialog';
import { ITask } from '../../../../service/task.interface';
import { Priority } from '../../priority.enum';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addtask',
  imports: [MatFormFieldModule, CommonModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './addtask.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './addtask.component.css'
})
export class AddtaskComponent {
  @ViewChild('nameText') nameText!: ElementRef<HTMLInputElement>;
  @ViewChild('descriptionText') descriptionText!: ElementRef<HTMLInputElement>;
  @ViewChild('priorityText') priorityText!: ElementRef<HTMLInputElement>;
  @ViewChild('statusText') statusText!: ElementRef<HTMLInputElement>;
  @ViewChild('beginDateText') beginDateText!: ElementRef<HTMLInputElement>;
  @ViewChild('endDateText') endDateText!: ElementRef<HTMLInputElement>;
  tasks: ITask[] = [];
  taskData: ITask = {
    TaskID: 0,
    Name: '',
    Description: '',
    Priority: 0,
    Status: '',
    BeginDate: new Date(),
    EndDate: new Date()
  };  // Initialize taskData object
  
  addTaskForm: FormGroup;

  constructor(private taskService: TaskService, 
              private readonly matDialog: MatDialog,
              private formBuilder: FormBuilder) {
                this.addTaskForm = this.formBuilder.group ({
                  // Validations
                  name: ['', [Validators.required, Validators.minLength(3)]],
                  description: ['', [Validators.required, Validators.minLength(5)]],
                })
              }

  saveTask(event: any) {
    event.preventDefault();
    this.setValues();

    if (this.addTaskForm.valid) {


      if (this.taskData) {
        this.taskService.saveTask(this.taskData).subscribe({
          next: (response) => {
            console.log('Task saved successfully:', response);
          },
          error: (error) => {
            console.error('Error saving task:', error);
          }
        });
      }
    }
    else
      console.log("form is invalid");

  const formElement = document.getElementById("addTaskForm") as HTMLFormElement;
    formElement.reset();
    
    this.closeTaskModal();
  }

getAllTasks() {
  this.taskService.getAllTasks().subscribe((task: any) => {
    this.tasks = task;
  })
}

setValues() {
  const priorityValue = this.priorityText.nativeElement.value;
  const priorityEnumValue = Priority[priorityValue.toLowerCase() as keyof typeof Priority];

  this.taskData = {
    TaskID: 0,
    Name: this.nameText.nativeElement.value,
    Description: this.descriptionText.nativeElement.value,
    Priority: priorityEnumValue,
    Status: this.statusText.nativeElement.value,
    BeginDate: new Date(this.beginDateText.nativeElement.value),
    EndDate: new Date(this.endDateText.nativeElement.value),
  }
}

closeTaskModal() {
  this.matDialog.closeAll();
}

}
