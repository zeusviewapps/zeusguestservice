import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private urlguestservice:string;
  constructor(public navCtrl: NavController, private iab: InAppBrowser, private qrScanner: QRScanner) {
  
  }

  gotozeuswebcheckin() {
      //const browser = this.iab.create('http://169.46.167.242:8095/default.aspx?zic=ZEUSTEST', '_self', { location: 'no' });

       this.iab.create(this.urlguestservice, '_self', { location: 'no' });

  }

  capturarQR() {
    debugger;
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.urlguestservice=text;
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

}
