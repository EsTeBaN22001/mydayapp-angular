import { Component } from '@angular/core';
import { TasksService } from './../../services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(
    private tasksService: TasksService,
    private router: Router
  ){}
  
  setFilter(filter: string){
    this.tasksService.setFilter(filter)
    this.router.navigate([filter])
  }
}
