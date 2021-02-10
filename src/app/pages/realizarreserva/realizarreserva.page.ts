import { Component, OnInit } from '@angular/core';

import { PostProvider } from 'src/providers/post-provider';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-realizarreserva',
  templateUrl: './realizarreserva.page.html',
  styleUrls: ['./realizarreserva.page.scss'],
})
export class RealizarreservaPage implements OnInit {

  id_depto: any = this.activatedRoute.snapshot.paramMap.get('id_depto');
  rut_persona: string = "";

  id_metodo_pago: number= 0;
  

  txt_fecha_inicio: Date  ;
  txt_fecha_termino: Date ;

  servicios: any = [];
  metodos_pagos: any = [];

  suma_servicios: number = 0;
  cant_dias: number = 0;
  valor_depto: number = 0;

  servicios_seleccionados: any = [];

  constructor(
    private postPrvd: PostProvider,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private toastCtrl: ToastController
  ) { }

  

  ngOnInit() {

    this.RutSesion();
    this.ListarServicios();
    this.ListarMetodosPagos();
    this.CargarValorDepto();
    console.log('este rtt', this.rut_persona)
    
  }

  ionViewDidEnter(){
    
    console.log('este es el valor depto', this.valor_depto)
  }

  RutSesion(){

    this.storage.get('session_storage').then((res) => {
      this.rut_persona = res;
    });
  }

  checkboxClick(event, entry) {

    console.log(event.detail, entry)

    if (event.detail.checked) {

      this.servicios_seleccionados.push(entry.id_servicio)
      this.suma_servicios += Number.parseInt(entry.valor_servicio);
      console.log(this.suma_servicios)

    } else {

      this.servicios_seleccionados.pop(entry.id_servicio)
      this.suma_servicios -= Number.parseInt(entry.valor_servicio);
      console.log(this.suma_servicios)
    }
  }

  calcularDias() {

    let ini = moment(this.txt_fecha_inicio);
    let fin = moment(this.txt_fecha_termino);
    this.cant_dias = fin.diff(ini, 'days') + 1;

  }


  ListarServicios() {

    let body = {

      action: 'mostrar_servicios'
    };


    this.postPrvd.postData(body, 'api.php').subscribe(data => {

      this.servicios.push(data.result);
    });
  }

  ListarMetodosPagos() {

    let body = {

      action: 'mostrar_metodos_pagos'
    };


    this.postPrvd.postData(body, 'api.php').subscribe(data => {

      this.metodos_pagos.push(data.result);
      console.log(this.metodos_pagos);

    });
  }

  async CrearReserva() {

    let body = {

      cant_dias: this.cant_dias,
      inicio_reserva: moment(this.txt_fecha_inicio).format("YYYY-MM-DD"),
      termino_reserva: moment(this.txt_fecha_termino).format("YYYY-MM-DD"),
      garantia: ((this.valor_depto* this.cant_dias)+ this.suma_servicios)*0.19,
      total_servicios: this.suma_servicios,
      id_metodo_pago: this.id_metodo_pago,
      rut_persona: this.rut_persona,
      id_departamento: this.id_depto,
      estado_reserva: 1,
      action: 'agregar_reserva',

      servicios: this.servicios_seleccionados
    };

    console.log(body)

    this.postPrvd.postData(body, 'api.php').subscribe( async data => {

      if (data.success) {

        console.log(data);
        const toast = await this.toastCtrl.create({
          message: 'Reserva creada exitosamente',
          duration: 1500
        });
        toast.present();

      } else {

        console.log(data);
        const toast = await this.toastCtrl.create({
          message: 'Fallo al crear reserva',
          duration: 1500
        });
        toast.present();

      }

    });
  };


   CargarValorDepto() {

    let body = {

      id_depto: this.id_depto,
      action: 'detalle_depto'
    };

    this.postPrvd.postData(body, 'api.php').subscribe(data => {

      this.valor_depto = data.result.valor;

    });


  };

  onClick(event){

    console.log(event.target.value)
    this.id_metodo_pago = event.target.value;

  }
}


