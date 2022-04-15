import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { ListDataComponent } from './list-data/list-data.component';
import { FilterComponent } from './filter/filter.component';
import { FilterPageComponent } from './filter/filter-page/filter-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListDataComponent, FilterComponent, FilterPageComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule.forChild()
  ],
  exports:[
    ListDataComponent,
    FilterComponent,
    FilterPageComponent
  ]
})
export class SharedModule { }
