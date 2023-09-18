import { Component, OnInit } from '@angular/core';
import { Task } from './../../interfaces/task';
import { TasksService } from './../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  tasks!: Task[]
  filter: string = 'all'
  
  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.route.url.pipe(
      switchMap( segments => {
        this.filter = segments.length == 0 ? '' : segments[0].path
        return this.tasksService.tasks$
      })
    ).subscribe(tasks => {

      if(this.filter === 'all'){
        this.tasks = tasks
      }

      if(this.filter === 'pending'){
        this.tasks = tasks.filter( task => !task.completed)
      }
      
      if(this.filter === 'completed'){
        this.tasks = tasks.filter( task => task.completed)
      }

      if(this.filter === ''){
        this.tasks = tasks
      }
    })

  }

}
