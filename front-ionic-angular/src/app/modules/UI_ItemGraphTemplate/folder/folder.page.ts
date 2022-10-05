import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesGqlService } from 'src/app/services/games-gql.service';
import Game from '../../../../../../common/src/models/game';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public listItems: Array<Game> = [];
  public loading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private gameSrv: GamesGqlService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.gameSrv.GetItems().subscribe(res=>{
      this.listItems = res.data; 
      this.loading = res.loading; 
    });
  }
}
