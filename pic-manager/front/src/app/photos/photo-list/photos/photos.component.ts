import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Photo } from "../../photo/photo";

@Component({
  selector: "app-photos",
  templateUrl: "./photos.component.html",
  styleUrls: ["./photos.component.css"]
})
/**
 * When we implements onChanges we will have a react component
 */
export class PhotosComponent implements OnChanges {
  @Input() photos: Photo[] = [];
  rows: any[] = [];

  constructor() {}

  //changes include all Input properties, so we have to verify what the exactly variable change
  ngOnChanges(changes: SimpleChanges) {
    if (changes.photos) {
      this.rows = this.groupColumns(this.rows);
    }
  }

  groupColumns(photos: Photo[]) {
    const newRows = [];
    for (let index = 0; index < photos.length; index += 3) {
      newRows.push(photos.slice(index, index + 3));
    }
    return newRows;
  }
}
