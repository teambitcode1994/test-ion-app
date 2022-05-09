import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { PreviewModalHandler } from './handlers/preview-modal.handler';
import { AbstractModalComponentHandler } from '../common/component-handlers/abstract-modal-component.handler';
import { GlobalEventHandller } from '../common/services/global-event.handller';
import { AbstractPopoverComponentHandler } from '../common/component-handlers/abstract-popover-component.handler';
import { PopoverModalHandler } from './handlers/popover-component.handler';
import { CustomListComponent } from '../common/widgets/custom-list/custom-list.component';
import { GlobalUiEvent } from '../common/enums/global-event.enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isSearchView = false;
  isResultView = true;
  public categories = [];
  public featuredProducts = [];
  public bestSellProducts = [];
  userId = null;
  modal: HTMLElement;
  previewModalHandler: AbstractModalComponentHandler;
  popoverModalHandler: AbstractPopoverComponentHandler;
  todoList = [
    {
      itemPriority: 'high',
      itemDueDate: new Date(),
      itemCategory: 'Fun day'
    },
    {
      itemPriority: 'low',
      itemDueDate: new Date(),
      itemCategory: 'Sport week'
    },
    {
      itemPriority: 'meddle',
      itemDueDate: new Date(),
      itemCategory: 'Dinner out'
    },
    {
      itemPriority: 'meddle',
      itemDueDate: new Date(),
      itemCategory: 'Take to the peace'
    },
    {
      itemPriority: 'high',
      itemDueDate: new Date(),
      itemCategory: 'Go with light'
    }
  ]
  constructor(
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private angularFireAuth: AngularFireAuth,
    public modalController: ModalController,
    private globalEventHandller: GlobalEventHandller,
    private popoverController: PopoverController
  ) {
    this.previewModalHandler = new PreviewModalHandler(modalController, globalEventHandller);
    this.previewModalHandler.component = ProfilePage;
    this.previewModalHandler.inputdata = new Map();
    this.previewModalHandler.outputEvent.subscribe((data) => {
      console.log('emit modal')
    });

    this.popoverModalHandler = new PopoverModalHandler(popoverController, globalEventHandller);
    this.popoverModalHandler.component = CustomListComponent;
    this.popoverModalHandler.inputdata = new Map();
    this.popoverModalHandler.outputEvent.subscribe((data) => {
      console.log('emit popover');
    });
    globalEventHandller.$globalUiEventHandller.subscribe(data=>{
      if(data && data.event == GlobalUiEvent.POPOVER_CLOSE){
         if(data.data === 'cal-view'){
           this.isResultView = false;
         }else{
           this.isResultView = true;
         }
      }
  });
    this.route.data
      .subscribe((result) => {
        let user = result['data'];
        this.userId = user.uid;
      }, (err) => { })

    // this.db.collection('policies').add({
    //   password: "sss",
    //   name: "aaann",
    //   rollno: 12
    // });
  }

  ngOnInit() {
    this.featuredProducts = this.data.getFeaturedProducts();
    this.bestSellProducts = this.data.getBestSellProducts();
  }


  presentModal(){
    this.previewModalHandler.presentModal();
  }

  presentPopover(event){
    this.popoverModalHandler.settingsPopover(event);
  }

  async addNewItem() {

  }

  getAllTask() {
  }

  delete(key) {
  }

  async update(selectedTask) {

  }

  onSearch() {
    this.isSearchView = !this.isSearchView;
  }

  dateSeperator(record, index, list) {


  }



}
