import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController:AlertController
  ) { }

  async alertSuccess(header: string, message: string){
    const alert = await this.alertController.create({
      header, message, buttons:['OK']
    });
    await alert.present();
  }

}
