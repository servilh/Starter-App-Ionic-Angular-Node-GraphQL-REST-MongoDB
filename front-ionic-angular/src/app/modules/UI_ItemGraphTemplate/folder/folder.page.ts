import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksGqlService } from 'src/app/services/task-gql.service';
import Task from '../../../../../../common/src/models/Task';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public listItems: Array<Task> = [];
  public loading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private TaskSrv: TasksGqlService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.TaskSrv.GetItems().subscribe(res=>{
      this.listItems = res.data; 
      this.loading = res.loading; 
    });
  }

  getColor(status: String): String {
    if(status == "Done") {
      return "success";
    }
    if(status == "To Do") {
      return "primary";
    }
    return "warning";
  }
}
