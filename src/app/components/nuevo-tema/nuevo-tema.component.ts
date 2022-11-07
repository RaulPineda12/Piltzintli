import { Component, OnInit } from "@angular/core";
import { Form, FormControl, FormGroup, Validators } from "@angular/forms";
import { DataService } from "src/app/services/data.service";
import { Router } from '@angular/router';


// ES6 Modules or TypeScript
import Swal from "sweetalert2";

// CommonJS
// CommonJS
@Component({
  selector: "app-nuevo-tema",
  templateUrl: "./nuevo-tema.component.html",
  styleUrls: ["./nuevo-tema.component.css"],
})
export class NuevoTemaComponent implements OnInit {
  img_tema: any;
  uploadedFiles: Array<File>; //se guarda el archivo cargado
  upload = false;
  path: any;
  seleccion_file = "";

  constructor(public data: DataService, public router: Router) {}

  ngOnInit(): void {}

  //reactive form
  form = new FormGroup({
    titulo: new FormControl("", [Validators.required, Validators.minLength(5)]),
    texto: new FormControl("", [Validators.required, Validators.minLength(5)]),
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
    this.img_tema = null;
  }

  agregar() {

    //usuario que crea el nuevo tema
    var usuario= JSON.parse(sessionStorage.getItem('sesion'))
    

    if (this.form.value["img"] == "") {

      this.data.nuevo_tema(this.form.value["titulo"], this.form.value["texto"], null, usuario.usuario).subscribe(res=>{

        if( res == "Ya existe un un Titulo o Pregunta identica, por favor ingrese un@ diferente"){
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
          
          this.router.navigate(['/foro']);

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
      this.data.uploadFile(formData).subscribe((res) => {
        this.upload = true;
        this.path = res;
        this.path.path = this.path.path.replace("public\\", "");

        //llamamos a la api
        this.data.nuevo_tema(this.form.value["titulo"], this.form.value["texto"], this.path.path,usuario.usuario).subscribe(res=>{
          //respondemos la respuesta del servidor
          if( res == "Ya existe un un Titulo o Pregunta identica, por favor ingrese un@ diferente"){
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
            this.router.navigate(['/foro']);

          }

        })

      });
    }


  }
}
