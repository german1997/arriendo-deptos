import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-provider';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  direccion: string;
  departamentos: any = [];

  constructor(
    private postPvdr: PostProvider
  ) { }

  ngOnInit() {

    this.MostrarDepartamentos();
  }

  ionViewWillEnter() {

    console.log('ionwillview buscar');
  }

  MostrarDepartamentos() {

    let body = {
      action: 'mostrar_deptos'
    }

    this.postPvdr.postData(body, 'api.php').subscribe(data => {

      for (let depto of data.result) {

        this.departamentos.push(depto);
      }
    });
  }


}
