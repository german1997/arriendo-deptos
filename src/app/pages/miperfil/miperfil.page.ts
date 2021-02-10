import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PostProvider } from 'src/providers/post-provider';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {

  anggota: any;

  txtRut = "";
  txtPrimerNombre = "";
  txtSegundoNombre = "";
  txtApellidoPaterno = "";
  txtApellidoMaterno = "";
  txtFechaNacimiento = "";
  txtTelefono = "";
  txtDireccion = "";

  constructor(
    private storage: Storage,
    private postPdvr: PostProvider,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {

    console.log("ngONit Mi perfil");
    this.MostrarDatos();
  }

  ionViewWillEnter() {

    console.log("ionViewWill mi perfil");
    this.MostrarDatos();
  }
  ionViewCanEnter(){
    console.log('ionviewcan mi perfil');
  }


  MostrarDatos() {

    this.storage.get('session_storage').then((res) => {

      let body = {
        rut_persona: res,
        action: 'cargar_datos'
      }


      this.postPdvr.postData(body, 'api.php').subscribe(data => {


        if (data.success) {

          this.txtRut = res,
            this.txtPrimerNombre = data.result.primer_nombre,
            this.txtSegundoNombre = data.result.segundo_nombre,
            this.txtApellidoPaterno = data.result.apellido_paterno,
            this.txtApellidoMaterno = data.result.apellido_materno,
            this.txtTelefono = data.result.telefono,
            this.txtDireccion = data.result.direccion,
            this.txtFechaNacimiento = data.result.fecha_nacimiento

        } else {

        }
        
      });
    });

  }


}
