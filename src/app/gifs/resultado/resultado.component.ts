import { Component, OnInit } from '@angular/core';
import { GifService } from '../services/gif.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  constructor( private gifsService: GifService ) { }

  ngOnInit(): void {
  }

  get resultados() {
    return this.gifsService.resultados;
  }


}
