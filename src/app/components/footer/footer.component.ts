import { Component } from '@angular/core';
import { TasksService } from './../../services/tasks.service';
import { Router } from '@angular/router';
import { Filter } from './../../interfaces/filter';

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
  
  setFilter(filter: Filter): void{
    this.tasksService.setFilter(filter)
    this.router.navigate([filter])
  }
}
