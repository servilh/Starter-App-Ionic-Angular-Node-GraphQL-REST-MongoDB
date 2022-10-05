import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';
import Game from '../../../../../../common/src/models/game';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-new-form',
  templateUrl: './item-new-form.page.html',
  styleUrls: ['./item-new-form.page.scss'],
})
export class ItemNewFormPage implements OnInit {
  public newGame: Game = {name: 'name', price: 0.0, category: 'cat'};

  constructor(private dataService: GamesService, private location: Location) { }


  ngOnInit() {
  }

  saveHandler() {
    this.dataService.Create(this.newGame).subscribe(r=>{
      this.location.back();
    });
  }

}
