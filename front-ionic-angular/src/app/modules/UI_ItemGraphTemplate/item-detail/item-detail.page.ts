import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksGqlService } from 'src/app/services/task-gql.service';
import Task from '../../../../../../common/src/models/task';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {
  public item: Task;
  public readonly: boolean;
  public editablePrps: Array<string> = ['name', 'status', 'priority'];
  constructor(private activatedRoute: ActivatedRoute, private dataSrv: TasksGqlService, private location: Location) { }

  ngOnInit() {
    var id = this.activatedRoute.snapshot.paramMap.get('id');

    this.readonly = true; 
    // if (this.dataSrv.tasksCache)
    //   this.item = { ... this.dataSrv.tasksCache.find(x => x._id.toString() == id) };
    // else 
      this.dataSrv.GetItem(id).subscribe(i => {
        this.item = i.data;
      });

  }
  
  public updateDataHandler() {
    this.dataSrv.Upsert(this.item).subscribe(r => {
      this.goBack();
    });
  }
  public deleteDataHandler() {
    this.dataSrv.Delete(this.item._id.toString()).subscribe(r => {
      this.goBack();
    });
  }

  public change2EditDataHandler() {
    this.readonly = !this.readonly;
  }

  private goBack() {
    this.location.back();
  }

}
