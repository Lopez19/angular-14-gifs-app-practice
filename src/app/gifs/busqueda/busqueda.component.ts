import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {
  // Referencia al elemento del DOM
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  buscar = (): void => {
    if (this.txtBuscar.nativeElement.value.trim().length === 0) {
      return;
    } else {
      // Obtener el valor del input
      const valor = this.txtBuscar.nativeElement.value;
      this.gifsService.buscarGifs(valor);
      // Limpiar el input
      this.txtBuscar.nativeElement.value = '';
    }
  };
}
