import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { HomePageResolver } from './home.page.resolver';
import { FullPageCalenderModule } from '../common/widgets/full-page-calender/full-page-calender.module';
import { ResultCardModule } from '../common/widgets/result-card/result-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FullPageCalenderModule,
    ResultCardModule
  ],
  declarations: [HomePage],
  providers: [HomePageResolver]
})
export class HomePageModule {}
