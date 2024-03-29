import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  createList(title: string){
    //we want to send req. to create a list
    return this.webReqService.post('lists',{title});
  }

  getList(){
    return this.webReqService.get('lists');
  }

  deleteList(id: string) {
    return this.webReqService.delete(`lists/${id}`);
  }

  updateList(id: string, title: string){
     return this.webReqService.patch(`lists/${id}`, { title});
  }


  getTasks(listId: string){
    return this.webReqService.get(`lists/${listId}/tasks  `);
  }

  createTask(title: string,listId: string){
    //we want to send req. to create a list
    return this.webReqService.post(`lists/${listId}/tasks`,{title});
  }

  deleteTask(listId: string, taskId: string) {
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  updateTask(listId: string, taskId: string, title: string) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, { title });
  }


  completed(task: Task){
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`,{
      completed: !task.completed
    });
  }
}
