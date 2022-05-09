import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ComponentRef } from "@ionic/core";
import { CalendarMode, Step } from "ionic2-calendar/calendar";
import { ProfilePage } from "src/app/profile/profile.page";
import { AbstractModalComponentHandler } from "../../component-handlers/abstract-modal-component.handler";
import { ModalComponentInputData } from "../../enums/modal-input-data.enum";
import { GlobalEventHandller } from "../../services/global-event.handller";

@Component({
  selector: 'controller-modal',
  templateUrl: './controller-modal.component.html',
  styleUrls: ['./controller-modal.scss'],
})
export class ControllerModalComponent implements OnInit {
  @Input() componentHandller: AbstractModalComponentHandler;

  constructor(public modalController: ModalController) { }

  ngOnInit(): void {

  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: this.componentHandller.component,
      cssClass: this.componentHandller.inputdata.has(ModalComponentInputData.CSS_CLASS) ? this.componentHandller.inputdata.get(ModalComponentInputData.CSS_CLASS) : '',
    });
    modal.onDidDismiss().then(data => {
      console.log('Modal closed');
      this.componentHandller.dismiss();
    });
    return await modal.present();
  }
}