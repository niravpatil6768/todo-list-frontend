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

  getTasks(listId: string){
    return this.webReqService.get(`lists/${listId}/tasks  `);
  }

  createTask(title: string,listId: string){
    //we want to send req. to create a list
    return this.webReqService.post(`lists/${listId}/tasks`,{title});
  }

  completed(task: Task){
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`,{
      completed: !task.completed
    });
  }
}
