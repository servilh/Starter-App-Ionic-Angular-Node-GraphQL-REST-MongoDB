import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';
import Game from '../../../../../../common/src/models/game';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public listItems: Array<Game> = [];

  constructor(private activatedRoute: ActivatedRoute, private gameSrv: GamesService) { }

  ngOnInit() { 
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.gameSrv.GetItems().subscribe(p=>{
      this.listItems = p; 
    });
  }
  
}
