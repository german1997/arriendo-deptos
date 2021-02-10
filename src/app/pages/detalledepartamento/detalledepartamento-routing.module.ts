import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalledepartamentoPage } from './detalledepartamento.page';

const routes: Routes = [
  {
    path: '',
    component: DetalledepartamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalledepartamentoPageRoutingModule {}
