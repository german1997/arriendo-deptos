import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
})
export class ConfiguracionesPage implements OnInit {


  rut_sesion = this.storage.get('session_storage').then((res) => {

    this.rut_sesion = res
  });


  constructor(
    private storage: Storage,
    private ctrlAlert: AlertController,
    private router: Router,
    private toastCtrl: ToastController) { }

  ngOnInit() {

    console.log("ioInit configuraciones")

  }

  ionViewWillEnter(){
    
    console.log("ion view configuraciones");
  }


  async MostrarAlerta() {
    const alert = await this.ctrlAlert.create({
      // header: 'Alert',
      // subHeader: 'Subtitle',
      message: '¿Salir de la cuenta de ' + this.rut_sesion + '?',
      buttons: [
        {
          text: 'Cancelar',
          handler: (blah) => {

          }
        },
        {
          text: 'Salir',
          handler: async (blah) => {

            this.storage.clear();
            this.router.navigate(['/login']);

            const toast = await this.toastCtrl.create({
              message: 'Cierre de sesión exitoso',
              duration: 2000
            });

            toast.present();
          }
        }
      ]
    });

    await alert.present();
  }

}
