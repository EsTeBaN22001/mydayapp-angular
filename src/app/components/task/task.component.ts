import { Component, Input } from '@angular/core';
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

  constructor(
    private tasksService: TasksService
  ){}
  
  checkTask(): void{
    const response = this.tasksService.changeStatus(this.task)

    if(response != null) alert(response)
  }

  deleteTask(){
    this.tasksService.deleteTask(this.task.id)
  }

}
