import { Component, OnInit } from '@angular/core';
import { TIendasServiceService } from '../services/tiendas-service.service';
import swal from 'sweetalert';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


export interface Producto {
  id: number,
  nombre: string,
  descripcion: string,
  precio_unidad: number
}



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})



export class ProductosComponent implements OnInit {

  productos;
  closeResult: string;
  new_nombre:string;
  new_descripcion:string;
  new_precio:string;
  displayedColumns: string[] = ['nombre','descripcion','precio_unidad'];
  dataSource = this.productos;

  constructor(private modalService: NgbModal,private tiendasSvc: TIendasServiceService) { }

  ngOnInit() {
    this.tiendasSvc.getAll('productos').subscribe(data => {
      this.productos = data['data'];
      console.log("arreglo productos",this.productos)
      
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
   

    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.productos[id][property] = editField   
      var objeto_a_editar = {
        "producto": this.productos[id]
        }
      this.tiendasSvc.update('productos', objeto_a_editar, objeto_a_editar["producto"].id).subscribe(data => {
               
      });
     
    }

    remove(objeto: any) {
 
      this.tiendasSvc.delete('productos', objeto.id).subscribe(data => {
            if(data == null){
              swal({
                title: '¡WOW!',
                text: '¡Eliminado correctamente',
              
            }).then(function() {
              location.reload();
            });

            }else{
              swal('Error al eliminar', "", 'error');
            }
              
      });
    }

    add() {
      console.log("hoooli")
      console.log(this.new_nombre, this.new_descripcion, this.new_precio)
      var objeto_nuevo = {
        "producto":{
          
          "nombre": this.new_nombre,
          "descripcion":this.new_descripcion,
          "precio_unidad": parseInt(this.new_precio)
           }
        }
        
      this.tiendasSvc.create('productos', objeto_nuevo).subscribe(data => {

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

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
      console.log("editadooo", this.editField)
    }

}
