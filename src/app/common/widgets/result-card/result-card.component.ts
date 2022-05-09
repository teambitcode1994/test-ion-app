import { Component, Input, OnInit } from "@angular/core";
import { ModalController, PopoverController } from "@ionic/angular";
import { DataService } from "src/app/data.service";
import { PreviewModalHandler } from "src/app/home/handlers/preview-modal.handler";
import { ProfilePage } from "src/app/profile/profile.page";
import { AbstractModalComponentHandler } from "../../component-handlers/abstract-modal-component.handler";
import { GlobalUiEvent } from "../../enums/global-event.enums";
import { GlobalEventHandller } from "../../services/global-event.handller";
import { PreviewDataComponent } from "../preview-data/preview-data.component";
@Component({
    selector: 'result-card',
    templateUrl: './result-card.component.html',
    styleUrls: ['./result-card.scss'],
})
  export class CustomListComponent implements OnInit {
    @Input() resultList: any[] = [];
    categories = [];
    previewModalHandler: AbstractModalComponentHandler;

    constructor(    
      public modalController: ModalController,
      private globalEventHandller: GlobalEventHandller,
      private data: DataService){
      this.previewModalHandler = new PreviewModalHandler(modalController, globalEventHandller);
      this.previewModalHandler.component = PreviewDataComponent;
      let prv = new Map();
      prv.set('contentData','<h1>My Data:  12022</h1>')
      this.previewModalHandler.inputdata = prv;
      this.previewModalHandler.outputEvent.subscribe((data) => {
        console.log('emit modal')
      });
    }
    ngOnInit(): void {
      this.categories = this.data.getCategories()
        // throw new Error("Method not implemented.");
    }

    presentModal(){
      this.previewModalHandler.presentModal();
    }

  }