import { Component, Input, OnInit } from '@angular/core';
import { Task } from './../../interfaces/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{

  @Input() task!: Task
  editing: boolean = false

  ngOnInit(): void {
    console.log(`Task: ${JSON.stringify(this.task)}`)
  }

}
