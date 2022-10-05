import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/services/task.service';
import Task from '../../../../../../common/src/models/task';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-new-form',
  templateUrl: './item-new-form.page.html',
  styleUrls: ['./item-new-form.page.scss'],
})
export class ItemNewFormPage implements OnInit {
  public newTask: Task = {name: 'name', priority: 0.0, status: 'To DO'};

  constructor(private dataService: TasksService, private location: Location) { }


  ngOnInit() {
  }

  saveHandler() {
    this.dataService.Create(this.newTask).subscribe(r=>{
      this.location.back();
    });
  }

}
