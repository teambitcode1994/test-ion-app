import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Animation, AnimationController } from '@ionic/angular';
import Quill from 'quill';
import { FIREBASE_COLLECTION } from '../common/enums/firebase-collection.enum';
import { GlobalUiEvent } from '../common/enums/global-event.enums';
import { RequestMethodEnum } from '../common/enums/request-method.model';
import { ApiRequestDataModel } from '../common/models/api-request-data.model';
import { AuthDataModel } from '../common/models/auth-data.model';
import { JournalEntry } from '../common/models/journal-entry.model';
import { FileUploadHandler } from '../common/services/file-upload.handler';
import { FirebaseFcadeService } from '../common/services/firebase-facade.service';
import { GlobalEventHandller } from '../common/services/global-event.handller';
import { QuillConfiguration } from '../common/util/quill-configuration.util';
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit, OnDestroy {
  selectedSize: number;
  selectedColor: number;
  activeVariation: string;
  editorForm: FormGroup;
  contentData: string = '';
  isEdit = true;
  modules = {};
  quillInstanse:any = null;
  oldQuill = null;
  newQuill = null;
  private quillConfiguration: QuillConfiguration;
  constructor(
    private animatioCntrl: AnimationController,
    private globalEventHandller: GlobalEventHandller,
    private firebaseFcadeService: FirebaseFcadeService,
    private fileUploadHandler: FileUploadHandler
  ) {
    this.quillConfiguration = new QuillConfiguration();
    this.modules = this.quillConfiguration.getConfig(globalEventHandller);
    this.quillConfiguration.importIcons(Quill);
    
  }
  ngOnDestroy(): void {
    this.globalEventHandller.triggerUiEvent(true, GlobalUiEvent.MAIN_MENUE_VISIBILITY);
  }

  ngOnInit() {

    this.globalEventHandller.$globalUiEventHandller.subscribe(data=>{
      if(data && data.event == GlobalUiEvent.FILE_UPLOAD){
         console.log(data);
         this.fileUploadHandler.uploadFile(data.data[0], this.quillInstanse);
      }
  });
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
    this.activeVariation = 'size';
  }


  onEditorCreated(quill){
    console.log(quill);
    this.quillInstanse = quill;
  }
  segmentChanged(e: any) {
    this.isEdit = !this.isEdit;
    // this.activeVariation = e.detail.value;

    // if (this.activeVariation == 'color') {
    //   this.animatioCntrl.create()
    //   .addElement(document.querySelector('.sizes'))
    //   .duration(500)
    //   .iterations(1)
    //   .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
    //   .fromTo('opacity', '1', '0.2')
    //   .play();

    //   this.animatioCntrl.create()
    //   .addElement(document.querySelector('.colors'))
    //   .duration(500)
    //   .iterations(1)
    //   .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
    //   .fromTo('opacity', '0.2', '1')
    //   .play();
    // } else {
    //   this.animatioCntrl.create()
    //   .addElement(document.querySelector('.sizes'))
    //   .duration(500)
    //   .iterations(1)
    //   .fromTo('transform', 'translateX(100%)', 'translateX(0)')
    //   .fromTo('opacity', '0.2', '1')
    //   .play();

    //   this.animatioCntrl.create()
    //   .addElement(document.querySelector('.colors'))
    //   .duration(500)
    //   .iterations(1)
    //   .fromTo('transform', 'translateX(0px)', 'translateX(-100%)')
    //   .fromTo('opacity', '1', '0.2')
    //   .play();
    // }
  }

  changeSize(size: number) {
    this.selectedSize = size;
  }

  changeColor(color: number) {
    this.selectedColor = color;
  }
  changeContent(data) {
    // console.log(data);
    // this.oldQuill = data.oldDelta;
    // this.newQuill = data.delta;
    // let diff =this.oldQuill.diff(this.newQuill);
    this.contentData = this.editorForm.get('editor').value;
  }

  onFilesChanged(event){
    const inputElement:any = document.getElementsByClassName("ql-image")[0];
    // const inputElement = document.getElementById("input");
  inputElement.addEventListener("change", function handleFiles(data) {
    // const fileList = this.files; /* now you can work with the file list */
    console.log(data);
  }, false);
  }

  async save(): Promise<any>{
    const images = [];
    [...this.fileUploadHandler.getCurrentUplodedFilesMap().values()].forEach((data)=>{
      images.push(data.url);
    });
    const apiRequestDataModel = new ApiRequestDataModel<JournalEntry>();
    apiRequestDataModel.collection = FIREBASE_COLLECTION.JOURNAL_ENTRY;
    apiRequestDataModel.method = RequestMethodEnum.POST;
    const journalEntry = new JournalEntry(this.firebaseFcadeService.getFirebaseAuthService);
    journalEntry.description = "desc psad sfds dsfdsf dsfdsaf dsfsdfds <h1><b> Dilupa </h1></b>. sadsad sasdsa";
    journalEntry.images = images;
    journalEntry.tags = ['Sport','Fun day'];
    journalEntry.shortTitle = 'Badminton play';
    apiRequestDataModel.payload = journalEntry;
    const result = await this.firebaseFcadeService.saveItem(apiRequestDataModel);
    return result;
  }
}


