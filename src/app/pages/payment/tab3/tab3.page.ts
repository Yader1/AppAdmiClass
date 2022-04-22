import { Component, ViewChild } from '@angular/core';
import { ListPaymentComponent } from '../list-payment/list-payment.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild (ListPaymentComponent) listpayments: ListPaymentComponent;
  constructor() {}

  ionViewWillEnter(){
    if(this.listpayments){
      this.listpayments.getPayments();
    }
  }

}
