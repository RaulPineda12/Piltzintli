import { Component, OnInit } from '@angular/core';
import { DataService } from "src/app/services/data.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventos: any
  logeado: boolean;
  tipo_usuario: any;

  constructor(public service: DataService, public router: Router) { }

  ngOnInit(): void {
    //verificamos si el usuario esta logueado
    var sesion = sessionStorage.getItem("sesion");
    //aqui verificamos que tipo de usuario esta logeado
    if (sesion == null) {
      this.logeado = false;
      this.tipo_usuario=""
    } else {
      this.logeado = true;
      this.tipo_usuario = JSON.parse(sesion);
      //console.log("tipo de usuario: "+ this.tipo_usuario['tipo'])
    }

    //obtenemos los eventos
    this.getEventos()

  }

   getEventos(){
     this.service.get_Eventos().subscribe(async (res)=>{
        this.eventos=await res
    })
  }

  //eliminar evento
  async eliminar(evento) {

    Swal.fire({
      title: '¿Estas seguro de querer eliminar el Evento: "'+evento.nombre+'"?',
      icon: 'warning',
      showClass: {
        popup: 'animate__animated animate__rubberBand'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown'
      },
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
         this.service.eliminarEvento(evento._id).subscribe(async (res) => {
    
          await  this.getEventos();
        });
    
        if (evento.img != null) {
          this.service.deleteFile(evento.img).subscribe((res) => {
            console.log("imagen eliminada");
          });
    
          this.service.eliminarEvento(evento._id).subscribe((res) => {
          });
        }
    
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: 'Evento: "'+evento.nombre+'" eliminado correctamente'
        });
    
        this.getEventos() 
      } 
    })   
  }
}
