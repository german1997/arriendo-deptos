import { Component, OnInit } from '@angular/core';

import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-provider';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  txt_email: string = "";
  txt_contrasena: string = "";

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    public toastCtrl: ToastController,
    private storage: Storage
  ) { }

  ngOnInit() {
  }


  async IniciarSesion() {
    let body = {
      email: this.txt_email,
      contraseña: this.txt_contrasena,
      action: 'iniciar_sesion'
    };
    this.postPvdr.postData(body, 'api.php').subscribe(async data => {

      var alertmsg = data.msg;

      if (data.success) {

        this.storage.set('session_storage', data.result.rut_persona);

        console.log(data);
        this.storage.get('session_storage').then((res) => {
          console.log("Rut Sesion:", res);
        });

        this.router.navigate(['/inicio/buscar']);
        const toast = await this.toastCtrl.create({
          message: 'Auteticación Exitosa',
          duration: 2000
        });
        toast.present();

      } else {

        console.log(data);
        const toast = await this.toastCtrl.create({
          message: alertmsg,
          duration: 2000
        });
        toast.present();

      }
    })
  }

}
