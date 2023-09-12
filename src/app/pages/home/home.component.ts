import { Component, OnInit } from '@angular/core';
import { Task } from './../../interfaces/task';
import { TasksService } from './../../services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  tasks!: Task[]
  
  constructor(
    private tasksService: TasksService
  ) { 
    this.tasksService.tasks$.subscribe( tasks => this.tasks = tasks )
  }

  ngOnInit(): void {
    
    this.tasksService.currentFilter$.subscribe()

  }

}
