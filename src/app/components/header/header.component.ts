import { Component } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  inputNewTask: string = ''.trim()

  constructor(
    private tasksService: TasksService
  ){}

  createNewTask(){

    if(this.inputNewTask == ''){
      return alert('La tarea no puede estar vacía')
    }

    const title = this.inputNewTask.trim()
    
    const response: string | null = this.tasksService.newTask(title)

    if(response != null) alert(response)

    this.inputNewTask = ''

  }

}
