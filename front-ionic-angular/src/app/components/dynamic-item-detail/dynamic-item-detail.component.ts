import { Component, Input, OnInit } from '@angular/core'; 
@Component({
  selector: 'app-dynamic-item-detail',
  templateUrl: './dynamic-item-detail.component.html',
  styleUrls: ['./dynamic-item-detail.component.scss'],
})
export class DynamicItemDetailComponent implements OnInit {
  @Input('item') item: Object;
  @Input('keys2show') keys2show: Array<string>;
  @Input('keysAlwaysReadOnly') keysAlwaysReadOnly: Array<string>;
  @Input('readonly') readonly: boolean;
  @Input('itemType') itemType:string;
  public keyLanguage: string;

  constructor() { }

  ngOnInit() { 
    this.keyLanguage = "entity." + this.itemType; 
  }

  public getEntries() {
    //if keys2show have keys return if not we show all of the object
    if(this.keys2show)
      return this.keys2show;
    return Object.keys(this.item);
  }

  public getItemType(prp: string) {
    if(typeof(this.item[prp]) == "number")
      return "number"
    return "string";
    //"date" ｜ "datetime-local" ｜ "email" ｜ "month" ｜ "number" ｜ "password" ｜ "search" ｜ "tel" ｜ "text" ｜ "time" ｜ "url" ｜ "week"
  }

}
