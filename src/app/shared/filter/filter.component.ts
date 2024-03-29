import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Filter } from 'src/app/models/Filter';
import { FilterPageComponent } from './filter-page/filter-page.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  @Input() filter: Filter;
  @Input() payment = false;
  public showFilters: boolean;
  @Output() filterData: EventEmitter<Filter>;

  constructor(public popoverController: PopoverController) {
    this.showFilters = false;
    this.filterData = new EventEmitter<Filter>();
   }

  async createPopover(ev: any){
    const popover = await this.popoverController.create({
      component: FilterPageComponent,
      backdropDismiss: true,
      event: ev,
      componentProps: {
        "filter": this.filter,
        "payment": this.payment
      }
    });

    popover.onDidDismiss().then(event => {
      this.showFilters = false;
      this.filterData.emit(event.data);
    })

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
