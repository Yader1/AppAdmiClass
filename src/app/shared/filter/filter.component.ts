import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FilterPageComponent } from './filter-page/filter-page.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  public showFilters: boolean;

  constructor(public popoverController: PopoverController) {
    this.showFilters = false;
   }

  async createPopover(ev: any){
    const popover = await this.popoverController.create({
      component: FilterPageComponent,
      backdropDismiss: true,
      event: ev,
      componentProps: {

      }
    });

    popover.onDidDismiss().then( event => {
      this.showFilters = false;
    });

    await popover.present();
  }

  showHideFilters($event){
    this.showFilters = !this.showFilters;

    if(this.showFilters){
      this.createPopover($event);
    }
  }

  ngOnInit() {
    
  }

}
