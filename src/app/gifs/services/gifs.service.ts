import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _apiKey: string = '3c7a9YWTjDywAOppyE8tAObnqGVB1ZAI';
  private _servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  // Resultados de la búsqueda
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  // Inyectar HttpClient
  constructor(private http: HttpClient) {
    // Leer del localStorage
    if (
      localStorage.getItem('historial') &&
      localStorage.getItem('resultados')
    ) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }
  }

  // Función para buscar gifs
  buscarGifs(query: string = '') {
    // Query en minúsculas
    query = query.trim().toLowerCase();

    // Validar que no se repitan los elementos
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      // Guardar en el localStorage
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    // Petición HTTP
    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', query);

    // Llamar al servicio de Giphy
    this.http
      .get<SearchGifsResponse>(`${this._servicioUrl}/search`, {
        params,
      })
      .subscribe((resp) => {
        this.resultados = resp.data;

        // Guardar en el localStorage
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
