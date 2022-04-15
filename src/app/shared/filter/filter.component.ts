import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FilterPageComponent } from './filter-page/filter-page.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  constructor(public popoverController: PopoverController) { }

  async createPopover(ev: any){
    const popover = await this.popoverController.create({
      component: FilterPageComponent,
      backdropDismiss: true,
      event: ev,
      componentProps: {

      }
    });

    popover.onDidDismiss().then( event => {

    });

    await popover.present();
  }

  ngOnInit() {
    this.createPopover(null);
  }

}
