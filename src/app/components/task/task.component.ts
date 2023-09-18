import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Task } from './../../interfaces/task';
import { TasksService } from './../../services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent{

  @Input() task!: Task
  editing: boolean = false
  @ViewChild('editInput') editInput!: ElementRef<HTMLInputElement>;

  constructor(
    private tasksService: TasksService
  ){}
  
  checkTask(): void{
    const response = this.tasksService.changeStatus(this.task)

    if(response != null) alert(response)
  }

  editTask(){

    this.editing = true
    
    setTimeout(() => {
      this.editInput.nativeElement.focus() 
    })
    
  }

  saveEditTask(){

    const editInputValue = this.editInput.nativeElement.value.trim()
    
    this.tasksService.editTask(editInputValue, this.task.id)

    this.editing = false

  }

  cancelEditionTask(){
    this.editing = false
  }

  deleteTask(){
    this.tasksService.deleteTask(this.task.id)
  }

}
