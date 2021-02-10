import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-provider';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  txt_rut: string = "";
  txt_primer_nombre: string = "";
  txt_segundo_nombre: string = "";
  txt_paterno: string = "";
  txt_materno: string = "";
  txt_fecha: string = "";
  txt_fono: number;
  txt_direccion: string = "";
  txt_email: string = "";
  txt_contrasena: string = "";

  constructor(private postPvdr: PostProvider, private datePipe: DatePipe ) { }

  ngOnInit() {
  }

  
  async RegistrarUsuario() {

  
    var date = this.datePipe.transform(this.txt_fecha,"yyyy-MM-dd");

    let body = {
      rut: this.txt_rut,
      primer_nombre: this.txt_primer_nombre,
      segundo_nombre: this.txt_segundo_nombre,
      apellido_paterno: this.txt_paterno,
      apellido_materno: this.txt_materno,
      fecha_nacimiento: date,
      telefono: this.txt_fono,
      direccion: this.txt_direccion,
      email: this.txt_email,
      contraseña: this.txt_contrasena,
      action: 'registro'
    };
    console.log(body);

    this.postPvdr.postData(body, 'api.php').subscribe(data => {

      if (data.success) {

        console.log(data);

      } else {

      }
    })
  }

}
