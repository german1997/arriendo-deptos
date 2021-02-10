import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RealizarreservaPageRoutingModule } from './realizarreserva-routing.module';

import { RealizarreservaPage } from './realizarreserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RealizarreservaPageRoutingModule
  ],
  declarations: [RealizarreservaPage]
})
export class RealizarreservaPageModule {}
