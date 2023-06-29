import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any;
  tasks: any;
  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params.listId){
         console.log(params);
         this.taskService.getTasks(params.listId).subscribe((tasks: Object) => {
             this.tasks = tasks as any[];
         })
        }else
        {
          this.tasks = undefined;
        }
      }
    )
    this.taskService.getList().subscribe((lists: Object) => {
        this.lists = lists as any[];
    })  

    
  }

  onTaskClick(task: Task){
    this.taskService.completed(task).subscribe(() => {
      console.log("completed successfully");
      task.completed = !task.completed;
    })
  }

 

}
