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
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})



export class TiendasComponent implements OnInit {

  tiendas;
  closeResult: string;
  new_nombre:string;
  new_ubicacion:string;
  displayedColumns: string[] = ['nombre','ubicacion'];
  dataSource = this.tiendas;
  constructor(private modalService: NgbModal,private tiendasSvc: TIendasServiceService) { }

  ngOnInit() {
    this.tiendasSvc.getAll('tiendas').subscribe(data => {
      this.tiendas = data['data'];
      console.log("arreglo tiendas",this.tiendas)
      
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
      this.tiendas[id][property] = editField   
      var objeto_a_editar = {
        "tienda": this.tiendas[id]
        }
      this.tiendasSvc.update('tiendas', objeto_a_editar, objeto_a_editar["tienda"].id).subscribe(data => {
               
      });
     
    }

    remove(objeto: any) {
 
      this.tiendasSvc.delete('tiendas', objeto.id).subscribe(data => {
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
      console.log(this.new_nombre, this.new_ubicacion)
      var objeto_nuevo = {
        "tienda":{
          
          "nombre": this.new_nombre,
          "ubicacion":this.new_ubicacion
           }
        }
        
      this.tiendasSvc.create('tiendas', objeto_nuevo).subscribe(data => {

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
