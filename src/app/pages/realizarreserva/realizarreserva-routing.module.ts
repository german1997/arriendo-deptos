import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RealizarreservaPage } from './realizarreserva.page';

const routes: Routes = [
  {
    path: '',
    component: RealizarreservaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RealizarreservaPageRoutingModule {}
