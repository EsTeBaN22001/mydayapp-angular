import { Component, OnInit } from '@angular/core';
import { TasksService } from './../../services/tasks.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  taskCount: number = 0
  completedTasks: boolean = false
  
  constructor(
    private tasksService: TasksService,
  ){}

  ngOnInit(): void {
    this.tasksService.tasks$.subscribe(
      tasks => { 
        this.taskCount = tasks.length
        this.completedTasks = tasks.some( t => t.completed)
      }
    )
  }

  cleanCompletedTasks(){
    this.tasksService.clearCompleted()
  }
}
