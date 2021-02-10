import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/post-provider';
declare var google;
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-detalledepartamento',
  templateUrl: './detalledepartamento.page.html',
  styleUrls: ['./detalledepartamento.page.scss'],
})
export class DetalledepartamentoPage implements OnInit {


  private id_depto: any;
  private departamento: any = [];

  map;
  latitud: any;
  longitud: any;

  @ViewChild('mapElement', { static: true }) mapElement; // hacemos referencia al elemento del html en la variable {mapElement}


  sliderConfig = {          //configuraciones para hacer el slide de las imagenes

    spaceBetween: 1,
    centeredSlides: false,
    slidesPerView: 1.09
  }

  constructor(
    private activatedRoute: ActivatedRoute, // Creamos la referencia para utilizar el rescate de variables por url
    private postPrvd: PostProvider, // Creamos la referencia para utilizar la api
    private dataService: DataService // Creamos la referencia para utilizar los servicios
  ) { }



  ngOnInit() {

    this.id_depto = this.activatedRoute.snapshot.paramMap.get('id_depto'); // Rescatar variable por la url
    this.DetalleDepartamento();

  }

  DetalleDepartamento() {

    let body = {

      id_depto: this.id_depto,
      action: 'detalle_depto'
    };

    this.postPrvd.postData(body, 'api.php').subscribe(data => {

      console.log(data.result.direccion);
      this.departamento.push(data.result);

      this.dataService.obtenerDireccion(data.result.direccion).subscribe(res => {

        this.latitud = res['results']['0'].geometry.location.lat;
        this.longitud = res['results']['0'].geometry.location.lng;
  
        var myLatLng = { lat: this.latitud, lng: this.longitud }
        this.map = new google.maps.Map(
          this.mapElement.nativeElement, {
          center: myLatLng,
          zoom: 15
        });
  
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: this.map,
          title: 'Hello World!'
        });
  
      });

    });
  };



    
  

}
