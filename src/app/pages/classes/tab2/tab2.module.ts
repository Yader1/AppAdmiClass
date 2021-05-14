import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { ListClassesComponent } from '../list-classes/list-classes.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormClassesComponent } from '../form-classes/form-classes.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [
    Tab2Page,
    FormClassesComponent,
    ListClassesComponent
  ]
})
export class Tab2PageModule {}
