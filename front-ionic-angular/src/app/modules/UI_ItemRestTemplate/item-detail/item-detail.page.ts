import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { GamesService } from 'src/app/services/games.service'; 
import Game from '../../../../../../common/src/models/game';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {
  public item: Game;
  public readonly: boolean;
  public editablePrps: Array<string> = ['name', 'category', 'price'];
  constructor(private activatedRoute: ActivatedRoute, private dataSrv: GamesService, private location: Location) { }

  ngOnInit() {
    var id = this.activatedRoute.snapshot.paramMap.get('id');   
    this.readonly = true;

    if (this.dataSrv.gamesCache)
      this.item = this.dataSrv.gamesCache.find(x => x._id.toString() == id);
    else
      this.dataSrv.GetItem(id).subscribe(i => {
        this.item = i;
      });
  }  

  public updateDataHandler() {
    this.dataSrv.Update(this.item._id, this.item).subscribe(r=>{
      this.goBack();
    });
  }

  public deleteDataHandler() {
    this.dataSrv.Delete(this.item._id).subscribe(r=>{
      this.goBack();
    });
  }

  public change2EditDataHandler(){
    this.readonly = !this.readonly;
  }
  
  private goBack() {
    this.location.back();
  }

}
