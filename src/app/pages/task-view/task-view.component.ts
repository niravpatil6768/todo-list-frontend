import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any;
  tasks: any;

  selectedListId: string|any;
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params.listId){
          this.selectedListId = params.listId;
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

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter((val: { _id: string; }) => val._id !== id);
      console.log(res);
    })
  }

 

}
