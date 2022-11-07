import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-foro",
  templateUrl: "./foro.component.html",
  styleUrls: ["./foro.component.css"],
})
export class ForoComponent implements OnInit {
  constructor(private service: DataService, public sanitizer: DomSanitizer,public router: Router) {}

  logeado: boolean;
  temas: any;
  imagen: any;
  imagePath: any;
  tipo_usuario: any;


  ngOnInit(): void {
    var sesion = sessionStorage.getItem("sesion");
    //console.log("sesion: " + sesion);

    if (sesion == null) {
      this.logeado = false;
      this.tipo_usuario=""
    } else {
      this.logeado = true;
      this.logeado = true;
      this.tipo_usuario = JSON.parse(sesion);
      //console.log("tipo de usuario: "+ this.tipo_usuario['tipo'])
    }

    this.get_Temas();
  }

  get_Temas() {
    this.service.getTemas().subscribe(async (res) => {
      this.temas = await res;
    });
  }

  eliminar(tema) {
    Swal.fire({
      title: '¿Estas seguro de querer eliminar el Tema: "'+tema.titulo+'"?',
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
        this.service.eliminarTema(tema._id).subscribe((res) => {
          this.get_Temas();
        });
    
        if (tema.img != null) {
          this.service.deleteFile(tema.img).subscribe((res) => {
            console.log("imagen eliminada");
          });
    
          this.service.eliminarTema(tema._id).subscribe((res) => {
          });
        }
    
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: 'Tema: "'+tema.titulo+'" eliminado correctamente'
        });
    
        this.get_Temas() 
      } 
    })   
  }

}
