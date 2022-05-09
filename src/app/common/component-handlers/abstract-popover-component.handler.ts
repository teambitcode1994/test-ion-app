import { EventEmitter } from "@angular/core";
import { PopoverController } from "@ionic/angular";

import { ModalComponentInputData } from "../enums/modal-input-data.enum";
import { GlobalEventHandller } from "../services/global-event.handller";

export abstract class AbstractPopoverComponentHandler{
    
constructor(protected popoverController: PopoverController, protected globalUiEventHandller: GlobalEventHandller){
    this.popoverController = popoverController;
    this.outputEvent = new EventEmitter<any>()
}

    component: any;
    outputEvent: EventEmitter<any>;
    inputdata: Map<ModalComponentInputData, any>;
    abstract dismiss();
    abstract settingsPopover(ev: any);
    
}