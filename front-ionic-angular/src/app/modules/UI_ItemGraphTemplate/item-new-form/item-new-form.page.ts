import { Component, OnInit } from '@angular/core';
import Game from '../../../../../../common/src/models/game';
import { Location } from '@angular/common';
import { GamesGqlService } from 'src/app/services/games-gql.service';

@Component({
  selector: 'app-item-new-form',
  templateUrl: './item-new-form.page.html',
  styleUrls: ['./item-new-form.page.scss'],
})
export class ItemNewFormPage implements OnInit {
  public newGame: Game = {name: 'name', price: 0.0, category: 'cat'};
   
  constructor(private dataService: GamesGqlService, private location: Location) { }


  ngOnInit() {
  }

  saveHandler() {
    this.dataService.Upsert(this.newGame).subscribe(r=>{
      this.location.back();
    });
  }

}
