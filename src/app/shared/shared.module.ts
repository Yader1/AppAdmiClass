import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { ListDataComponent } from './list-data/list-data.component';

@NgModule({
  declarations: [ListDataComponent],
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule.forChild()
  ],
  exports:[
    ListDataComponent
  ]
})
export class SharedModule { }
