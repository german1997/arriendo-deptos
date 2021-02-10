import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PostProvider } from 'src/providers/post-provider';
import { Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})
export class EditarperfilPage implements OnInit {

  objeto: any;

  txtRut = "";
  txtPrimerNombre: string = "";
  txtSegundoNombre = "";
  txtApellidoPaterno = "";
  txtApellidoMaterno = "";
  txtFechaNacimiento = "";
  txtTelefono = "";
  txtDireccion = "";

  constructor(
    private storage: Storage,
    private postPdvr: PostProvider,
    private router: Router,
    private navCtrl: NavController,
    private modalCtrl: ModalController) { }

  ngOnInit() {

    console.log("NgOnit editar perfil")
    this.MostrarDatos();
  }


  ionViewWillEnter() {

    console.log("ion view edita perfil");
  }
    
  MostrarDatos() {

    this.storage.get('session_storage').then((res) => {

      let body = {
        rut_persona: res,
        action: 'cargar_datos'
      }


      this.postPdvr.postData(body, 'api.php').subscribe(data => {


        if (data.success) {


          this.txtPrimerNombre = data.result.primer_nombre,
            this.txtSegundoNombre = data.result.segundo_nombre,
            this.txtApellidoPaterno = data.result.apellido_paterno,
            this.txtApellidoMaterno = data.result.apellido_materno,
            this.txtTelefono = data.result.telefono,
            this.txtDireccion = data.result.direccion

        } else {

        }

      });
    });

  }




  ModificarDatos() {


    this.storage.get('session_storage').then((res) => {


      let body = {

        rut_persona: res,
        primer_nombre: this.txtPrimerNombre,
        segundo_nombre: this.txtSegundoNombre,
        apellido_paterno: this.txtApellidoPaterno,
        apellido_materno: this.txtApellidoMaterno,
        telefono: this.txtTelefono,
        direccion: this.txtDireccion,
        action: 'modificar_usuario'
      }

      this.postPdvr.postData(body, 'api.php').subscribe(data => {

        if (data.success) {

          console.log("Datos cambiado exitosamente");


        } else {

        }

      })





    })



  }


}
