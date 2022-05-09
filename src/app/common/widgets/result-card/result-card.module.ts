import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultCardRoutingModule } from './result-card-routing.module';
import { CustomListComponent } from './result-card.component';


@NgModule({
  declarations: [CustomListComponent],
  imports: [
    CommonModule,
    ResultCardRoutingModule
  ],
  exports:[CustomListComponent]
})
export class ResultCardModule { }
