import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from "@angular/forms";
import { DataService } from "src/app/services/data.service";
import { Router } from '@angular/router';

// ES6 Modules or TypeScript
import Swal from "sweetalert2";


@Component({
  selector: 'app-nuevo-evento',
  templateUrl: './nuevo-evento.component.html',
  styleUrls: ['./nuevo-evento.component.css']
})
export class NuevoEventoComponent implements OnInit {

  img_evento: any;
  uploadedFiles: Array<File>; //se guarda el archivo cargado
  upload = false;
  path: any;
  seleccion_file = "";

  constructor(public service: DataService, public router: Router) { }

  ngOnInit(): void {
  }

  //reactive form
  form = new FormGroup({
    nombre: new FormControl("", [Validators.required, Validators.minLength(5)]),
    descripcion: new FormControl("", [Validators.required, Validators.minLength(10)]),
    fecha: new FormControl("", [Validators.required]),
    img: new FormControl(""),
  });

  cambio_archivo(e) {
    //aqui falta validar el tamaño de las imagenes
    console.log(e)
    this.uploadedFiles = e.target.files;
    this.seleccion_file = "imagen cargada";
  }

  limpiar() {
    this.upload = false;
    this.seleccion_file = "";
    this.img_evento = null;
  }

  agregar() {
    //usuario que crea el nuevo tema
    var usuario= JSON.parse(sessionStorage.getItem('sesion'))
    if (this.form.value["img"] == "") {

      this.service.nuevo_evento(this.form.value["nombre"], this.form.value["descripcion"],this.form.value["fecha"], null, usuario.usuario).subscribe(res=>{

        if( res == "Ya existe un Evento con el mismo nombre"){
          Swal.fire({
            icon: "error",
            title: "Error",
            text: ""+res
          });
        }else{
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: ""+res
          });
          
          this.router.navigate(['/eventos']);

        }
      })

    } else {
      console.log("imagen cargada");
      let formData = new FormData();
      formData.append(
        "uploads[]",
        this.uploadedFiles[0],
        this.uploadedFiles[0].name
      );
      this.service.uploadFile(formData).subscribe((res) => {
        this.upload = true;
        this.path = res;
        this.path.path = this.path.path.replace("public\\", "");

        //llamamos a la api
        this.service.nuevo_evento(this.form.value["nombre"], this.form.value["descripcion"],this.form.value["fecha"], this.path.path,usuario.usuario).subscribe(res=>{
          //respondemos la respuesta del servidor
          if( res == "Ya existe un Evento con el mismo nombre"){
            Swal.fire({
              icon: "error",
              title: "Error",
              text: ""+res
            });
          }else{
            Swal.fire({
              icon: "success",
              title: "Éxito Al Guardar",
              text: ""+res
            });
            this.router.navigate(['/eventos']);

          }

        })

      });
    }

  }

}
