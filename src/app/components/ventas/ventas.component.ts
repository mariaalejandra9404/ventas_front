import { Component, OnInit } from '@angular/core';
import { TIendasServiceService } from '../services/tiendas-service.service';
import swal from 'sweetalert';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


export interface Tienda {
  id: number,
  nombre: string,
  ubicacion: string
}



@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})



export class VentasComponent implements OnInit {

  ventas;
  productos;
  tiendas;
  selected_row;
  total_productos_x_venta = [];
  closeResult: string;

  new_fecha:string;
  new_valor:string;
  new_tienda_id:string;
  new_cantidad:string;
  new_producto_id: string;

  constructor(private modalService: NgbModal,private tiendasSvc: TIendasServiceService) { }

  ngOnInit() {
    this.tiendasSvc.getAll('ventas').subscribe(data => {
      this.ventas = data['data'];
            
    });

    this.tiendasSvc.getAll('productos').subscribe(data => {
      this.productos = data['data'];
           
    });
    
    this.tiendasSvc.getAll('tiendas').subscribe(data => {
      this.tiendas = data['data'];
     
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  editField: string;
   
    add() {
     
      var objeto_nuevo = {
        "venta":{
          "fecha": new Date(''+this.new_fecha["year"]+'-'+this.new_fecha["month"]+'-'+this.new_fecha["day"]),
          "valor":parseInt(this.new_valor),
          "tienda_id": parseInt(this.new_tienda_id)
           }
        }
        
     
      this.tiendasSvc.create('ventas', objeto_nuevo).subscribe(data => {

        if(data != null){
          swal({
            title: '¡WOW!',
            text: '¡Creado correctamente',
          
        }).then(function() {
          location.reload();
        });

        }else{
          swal('Error al crear', "", 'error');
        }
          
    });
    }

    get_row(objeto:any){
      this.selected_row = objeto;
    }

    add_producto() {
      var objeto_nuevo = {
        "producto_venta":{
          "cantidad": this.new_cantidad,
          "producto_id":parseInt(this.new_producto_id),
          "venta_id": parseInt(this.selected_row["id"])
           }
        }
        
     this.tiendasSvc.create('producto_venta', objeto_nuevo).subscribe(data => {

        if(data != null){
          swal({
            title: '¡WOW!',
            text: '¡Agregado correctamente',
          
        }).then(function() {
          location.reload();
        });

        }else{
          swal('Error al crear', "", 'error');
        }
          
    });
    }

    onChange(value: any){
      this.new_producto_id = JSON.parse(value);

    }

    ver_productos(venta_id){

    }

    traer_datos_productos(){

    }

    

}



