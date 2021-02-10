import { Component, OnInit, ViewChild } from '@angular/core';

declare var google;
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map;
  lista: any = [];
  lat: any;
  lng: any;

  @ViewChild('mapElement', { static: true }) mapElement; 

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {

      this.dataService.obtenerDireccion('padre tadeo 4588').subscribe( res => {

        this.lista = res;
        console.log(res);
        console.log(this.lista.results['0'].geometry.location.lat);
      })
      
  }


  ngAfterContentInit() {

    var myLatLng = { lat: -33.428490, lng: -70.698850 }
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
  }

  




}
