import { Component, OnInit } from '@angular/core';
import { TIendasServiceService } from '../services/tiendas-service.service';

export interface Tienda {
  id: number,
  nombre: string,
  ubicacion: string
}



@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})



export class TiendasComponent implements OnInit {

  tiendas;
  
  displayedColumns: string[] = ['nombre','ubicacion'];
  dataSource = this.tiendas;
  constructor(private tiendasSvc: TIendasServiceService) { }

  ngOnInit() {
    this.tiendasSvc.getAll('tiendas').subscribe(data => {
      this.tiendas = data['data'];
      console.log("arreglo tiendas",this.tiendas)
      
    });
   
  }

}
