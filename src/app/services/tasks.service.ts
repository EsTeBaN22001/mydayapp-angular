import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Task } from '../interfaces/task';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasksBS = new BehaviorSubject<Task[]>([])
  tasks$ = this.tasksBS.asObservable()

  private filterBS = new BehaviorSubject<string>('all')
  currentFilter$ = this.filterBS.asObservable()
  
  constructor(
    private localStorageService: LocalStorageService
  ){
    
    const localTasks = localStorageService.getItem()

    if(localTasks){
      this.tasksBS.next(localTasks)
    }

  }

  setFilter(filter: string){
    this.filterBS.next(filter)
  }

  newTask(task: Task){
    
    const currentTasks = this.tasksBS.value

    if (task) currentTasks.push(task)

    this.tasksBS.next(currentTasks)

    this.localStorageService.setItem(this.tasksBS.value)

  }
}
