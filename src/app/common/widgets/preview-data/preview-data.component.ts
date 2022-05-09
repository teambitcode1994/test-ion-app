import { Component, Input, OnInit } from "@angular/core";
@Component({
    selector: 'preview-data',
    templateUrl: './preview-data.component.html',
    styleUrls: ['./preview-data.scss'],
})
  export class PreviewDataComponent implements OnInit {
    @Input() contentData: any = '';
  
    constructor(){}
    ngOnInit(): void {
    }
  }