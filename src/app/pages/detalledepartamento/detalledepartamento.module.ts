import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalledepartamentoPageRoutingModule } from './detalledepartamento-routing.module';

import { DetalledepartamentoPage } from './detalledepartamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalledepartamentoPageRoutingModule
  ],
  declarations: [DetalledepartamentoPage]
})
export class DetalledepartamentoPageModule {}
