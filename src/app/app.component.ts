import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SqliteServiceService } from './service/sqlite-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization/ngx'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

public load: boolean;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private sqliteServices: SqliteServiceService,
    private globalization: Globalization,
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang('es');
    this.initializeApp();
  }

  initializeApp() {
    let self = this;
    this.platform.ready().then(() => {

      this.globalization.getPreferredLanguage().then( res => {
        console.log(res);

        if(res){
          if(res.value.includes('-')){
            this.translate.use(res.value.split('-')[0]);
          }else{
            this.translate.use(res.value);
          }
        }
      }).catch(e => console.error(e));

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.sqliteServices.createDatabase().then( ()=>{
        self.load = true;
        console.log("Bases de datos cargado");
      });
    });
  }
}
