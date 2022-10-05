import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/task.service';
import Task from '../../../../../../common/src/models/task';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public listItems: Array<Task> = [];

  constructor(private activatedRoute: ActivatedRoute, private taskSrv: TasksService) { }

  ngOnInit() { 
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.taskSrv.GetItems().subscribe(p=>{
      this.listItems = p; 
    });
  }
  
}
