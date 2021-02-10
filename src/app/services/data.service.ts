import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  obtenerDireccion(direccion: string) {

    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCTOw0eddhzJALx1PKmKXmJg1_Q14HcsvQ&address="' + direccion + '"');
  }


}
