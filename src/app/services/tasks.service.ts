import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { Task } from '../interfaces/task';
import { LocalStorageService } from './local-storage.service';
import { Filter } from '../interfaces/filter';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasksBS = new BehaviorSubject<Task[]>([])
  tasks$ = this.tasksBS.asObservable()

  private filterBS = new BehaviorSubject<Filter>('all')
  currentFilter$ = this.filterBS.asObservable()
  
  constructor(
    private localStorageService: LocalStorageService
  ){
    
    const localTasks = localStorageService.getItem()

    if(localTasks){
      this.tasksBS.next(localTasks)
    }

  }

  setFilter(filter: Filter): void{
    this.filterBS.next(filter)
  }

  newTask(title: string):string | null{

    if (title == '') return 'La tarea no puede ser vacía'
    
    const currentTasks = this.tasksBS.value

    let ultimateTasksId = 0
    
    if(currentTasks.length > 0){
      ultimateTasksId = parseInt(currentTasks[currentTasks.length - 1].id)
    }
    
    const newTask: Task = {
      id: (ultimateTasksId + 1).toString(),
      title: title,
      completed: false
    }

    if (newTask) {
      currentTasks.push(newTask)
      this.tasksBS.next(currentTasks)
      this.localStorageService.setItem(this.tasksBS.value)
      return null
    }

    return 'Hubo un problema al crear la tarea'

  }

  changeStatus(task: Task): string | null{
    
    const currentTasks = this.tasksBS.value

    const taskIndex = currentTasks.findIndex( t => t.id == task.id)

    if(taskIndex != -1){

      currentTasks[taskIndex].completed = !currentTasks[taskIndex].completed

      this.tasksBS.next(currentTasks)
      this.localStorageService.setItem(this.tasksBS.value)

      return null

    }

    return 'Hubo un problema al cambiar el estado de la tarea'

  }

  deleteTask(taskId: string){
    
    const currentTasks = this.tasksBS.value
    const updatedTasks = currentTasks.filter( t => t.id != taskId)

    this.tasksBS.next(updatedTasks)
    this.localStorageService.setItem(this.tasksBS.value)

  }
  
}
