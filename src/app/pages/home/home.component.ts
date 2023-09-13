import { Component, OnInit } from '@angular/core';
import { Task } from './../../interfaces/task';
import { TasksService } from './../../services/tasks.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  tasks!: Task[]
  
  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) { 
    this.tasksService.tasks$.subscribe( tasks => {
      this.tasks = tasks
      console.log(this.tasks)
    } )
  }

  ngOnInit(): void {

    this.route.url.subscribe()
    
    this.tasksService.currentFilter$.subscribe()

  }

}
