import { Component, OnInit } from '@angular/core';
import Task from '../../../../../../common/src/models/task';
import { Location } from '@angular/common';
import { TasksGqlService } from 'src/app/services/task-gql.service';
import { ApolloModule, APOLLO_NAMED_OPTIONS, NamedOptions } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

@Component({
  selector: 'app-item-new-form',
  templateUrl: './item-new-form.page.html',
  styleUrls: ['./item-new-form.page.scss'],
})
export class ItemNewFormPage implements OnInit {
  public newTask: Task = {name: 'name', priority: 0.0, status: 'To Do'};
   
  constructor(private dataService: TasksGqlService, private location: Location) { }


  ngOnInit() {
  }

  saveHandler() {
    this.dataService.Upsert(this.newTask).subscribe(r=>{
      this.location.back();
    });
  }

}
