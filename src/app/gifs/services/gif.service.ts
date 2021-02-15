import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResGifs } from '../interfaces/gif.interface';
import { SelectorMatcher } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private _historial: string[] = [];
  private serviUrl = 'https://api.giphy.com/v1/gifs';
  public resultados: any[] = [];

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  get historial() {
    return [...this._historial];
  }

  buscarGifs( query: string = '' ) {
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes( query )) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial',JSON.stringify( this._historial ));
    }

    const params = new HttpParams()
    .set('api_key',environment.apiKey)
    .set('q',query)
    .set('limit','10');

    console.log(`${this.serviUrl}/search`,{ params })
    this.http.get<ResGifs>(`${this.serviUrl}/search`,{ params })
    .subscribe((resp) => {
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify( this.resultados ));
    });

  }
}
