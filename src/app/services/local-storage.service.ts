import { Injectable } from '@angular/core';
import { Task } from './../interfaces/task'


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(tasks: Task[]){
    localStorage.setItem('mydayapp-angular', JSON.stringify(tasks))
  }

  getItem(){
    const tasks = localStorage.getItem('mydayapp-angular')
    return !tasks ? null : JSON.parse(tasks)
  }
}
