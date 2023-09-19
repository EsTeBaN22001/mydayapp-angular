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
  
  constructor(
    private localStorageService: LocalStorageService
  ){
    
    const localTasks = localStorageService.getItem()

    if(localTasks){
      this.tasksBS.next(localTasks)
    }

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

  editTask(editInputValue: string, taskId: string): void{

    const currentTasks = this.tasksBS.value

    const taskIndex = currentTasks.findIndex( t => t.id == taskId)

    if(taskIndex != -1){

      currentTasks[taskIndex].title = editInputValue

      this.tasksBS.next(currentTasks)
      this.localStorageService.setItem(this.tasksBS.value)

    }

  }

  deleteTask(taskId: string){
    
    const currentTasks = this.tasksBS.value
    const updatedTasks = currentTasks.filter( t => t.id != taskId)

    this.tasksBS.next(updatedTasks)
    this.localStorageService.setItem(this.tasksBS.value)

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

  clearCompleted(): void{

    const currentTasks = this.tasksBS.value

    const cleanedTasks = currentTasks.filter( t => !t.completed)

    this.tasksBS.next(cleanedTasks)
    this.localStorageService.setItem(this.tasksBS.value)

  }
  
}
