import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage,
    children:[
      {
        path: 'miperfil',
        loadChildren: '../miperfil/miperfil.module#MiperfilPageModule'
      },
      {
        path: 'configuraciones',
        loadChildren: '../configuraciones/configuraciones.module#ConfiguracionesPageModule'
      },
      {
        path: 'buscar',
        loadChildren: '../buscar/buscar.module#BuscarPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
