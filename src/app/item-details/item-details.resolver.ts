import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { GlobalUiEvent } from '../common/enums/global-event.enums';
import { FirebaseAuthService } from '../common/services/firebase-auth.service';
import { GlobalEventHandller } from '../common/services/global-event.handller';

@Injectable()
export class ItemDetailsPageResolver implements Resolve<any> {

  constructor(private firebaseAuthService: FirebaseAuthService, private globalEventHandller: GlobalEventHandller) {}

  resolve() {
    this.globalEventHandller.triggerUiEvent(false, GlobalUiEvent.MAIN_MENUE_VISIBILITY);
    return this.firebaseAuthService.getProfileDataSource();
  }
  
}