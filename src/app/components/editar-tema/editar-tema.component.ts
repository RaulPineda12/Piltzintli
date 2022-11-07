import { Component, OnInit } from "@angular/core";
import { Form, FormControl, FormGroup, Validators } from "@angular/forms";
import { DataService } from "src/app/services/data.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

// ES6 Modules or TypeScript
import Swal from "sweetalert2";

@Component({
  selector: "app-editar-tema",
  templateUrl: "./editar-tema.component.html",
  styleUrls: ["./editar-tema.component.css"],
})
export class EditarTemaComponent implements OnInit {
  tema: any = [];
  id: any;
  img_tema: any;
  uploadedFiles: Array<File>; //se guarda el archivo cargado
  upload = false;
  path: any;
  seleccion_file = "";

  constructor(
    public service: DataService,
    public router: Router,
    private router2: ActivatedRoute
  ) {}

  ngOnInit(): void {

    //obtenemos el id del tema
    this.router2.params.subscribe(async (params) => {
      this.id = await params["id"];

      //obtenemos la informacion del tema
      this.service.getTema(this.id).subscribe(async (res) => {
        this.tema = res;
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
    this.img_tema = null;
  }

  //reactive form
  form = new FormGroup({
    titulo: new FormControl("", [Validators.required, Validators.minLength(4)]),
    texto: new FormControl("", [Validators.required, Validators.minLength(4)]),
    img: new FormControl(""),
  });

  actualizar() {
    //usuario que crea el nuevo tema
    //var usuario = JSON.parse(sessionStorage.getItem("sesion"));
    
    //si no se subio nada al campo de la imagen se usara esto
    if (this.form.value["img"] == "") {
      this.service.actualizar_tema(this.id, this.form.value["titulo"],this.form.value["texto"]).subscribe((res) => {
          if (res =="Ya existe un un Titulo o Pregunta identica, por favor ingrese un@ diferente") {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "" + res,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Éxito al guardar",
              text: "" + res,
            });

            this.router.navigate(["/foro"]);
          }
        });
        
      //si el campo de la imagen venia vacio y se le agrego apenas una imagen se hara esto
    } else if(this.form.value["img"]!="" && this.tema.img ==null) {
      
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
        this.service.actualizar_tema2(this.id, this.form.value["titulo"],this.form.value["texto"], this.path.path ).subscribe((res) => {
            //respondemos la respuesta del servidor
            if (res =="Ya existe un un Titulo o Pregunta identica, por favor ingrese un@ diferente") {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "" + res,
              });
            } else {
              Swal.fire({
                icon: "success",
                title: "Éxito al guardar",
                text: "" + res,
              });
              this.router.navigate(["/foro"]);
            }
          });
      });

      //si el tema ya tenia una foto y se cambio, entonces se hara esto
    } else if(this.form.value["img"]!="" && this.tema.img !=null) {
      
      this.service.deleteFile(this.tema.img).subscribe(async (res)=>{
        await console.log("imagen antigua eliminada")
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
        this.service.actualizar_tema2(this.id, this.form.value["titulo"],this.form.value["texto"], this.path.path ).subscribe((res) => {
            //respondemos la respuesta del servidor
            if (res =="Ya existe un un Titulo o Pregunta identica, por favor ingrese un@ diferente") {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "" + res,
              });
            } else {
              Swal.fire({
                icon: "success",
                title: "Éxito al guardar",
                text: "" + res,
              });
              this.router.navigate(["/foro"]);
            }
          });
      });
    }
  }
}
