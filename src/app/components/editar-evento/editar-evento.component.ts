import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from "@angular/forms";
import { DataService } from "src/app/services/data.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
// ES6 Modules or TypeScript
import Swal from "sweetalert2";

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css']
})
export class EditarEventoComponent implements OnInit {
  evento: any = [];
  id: any;
  img_evento: any;
  uploadedFiles: Array<File>; //se guarda el archivo cargado
  upload = false;
  path: any;
  seleccion_file = "";

  constructor(public service: DataService, public router: Router, private router2: ActivatedRoute) { }

  ngOnInit(): void {
     //obtenemos el id del evento
     this.router2.params.subscribe(async (params) => {
      this.id = await params["id"];

      //obtenemos la informacion del tema
      this.service.getEvento(this.id).subscribe(async (res) => {
        this.evento = res;
      });
    });
  }

  cambio_archivo(e) {
    //aqui falta validar el tamaño de las imagenes
    console.log(e);
    this.uploadedFiles = e.target.files;
    this.seleccion_file = "imagen cargada";
  }

  limpiar() {
    this.upload = false;
    this.seleccion_file = "";
    this.img_evento = null;
  }

  //reactive form
  form = new FormGroup({
    nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
    descripcion: new FormControl("", [Validators.required, Validators.minLength(4)]),
    fecha: new FormControl("", [Validators.required]),
    img: new FormControl(""),
  });


  actualizar() {

    //si el campo de imagen esta vacio se usara esta opcion
    if (this.form.value["img"] == "") {
      this.service.actualizar_evento(this.id, this.form.value["nombre"],this.form.value["descripcion"],this.form.value["fecha"]).subscribe((res) => {
          if (res =="Ya existe un Evento con ese nombre") {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "" + res,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Éxito al actualizar evento",
              text: "" + res,
            });

            this.router.navigate(["/eventos"]);
          }
        });

      //si el campo de la imagen siempre estuvo vacio y sigue vacio se usara esto
    } else if(this.form.value["img"]!="" && this.evento.img ==null) {
      
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
        this.service.actualizar_evento2(this.id, this.form.value["nombre"],this.form.value["descripcion"],this.form.value["fecha"], this.path.path ).subscribe((res) => {
            //respondemos la respuesta del servidor
            if (res =="Ya existe un Evento con ese nombre") {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "" + res,
              });
            } else {
              Swal.fire({
                icon: "success",
                title: "Éxito al actualizar evento",
                text: "" + res,
              });
              this.router.navigate(["/eventos"]);
            }
          });
      });

      //si el evento ya tenia una foto y se cambio por otra se usara esto
    } else if(this.form.value["img"]!="" && this.evento.img !=null) {
      
      this.service.deleteFile(this.evento.img).subscribe((res)=>{
        console.log("imagen antigua eliminada")
      })

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
        this.service.actualizar_evento2(this.id, this.form.value["nombre"],this.form.value["descripcion"],this.form.value["fecha"], this.path.path ).subscribe((res) => {
            //respondemos la respuesta del servidor
            if (res =="Ya existe un Evento con ese nombre") {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "" + res,
              });
            } else {
              Swal.fire({
                icon: "success",
                title: "Éxito al actualizar evento",
                text: "" + res,
              });
              this.router.navigate(["/eventos"]);
            }
          });
      });
    }
  }

}
