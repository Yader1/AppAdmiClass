import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { ListPaymentComponent } from '../list-payment/list-payment.component';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [Tab3Page,  ListPaymentComponent]
})
export class Tab3PageModule {}
