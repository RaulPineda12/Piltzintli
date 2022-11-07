import { Component, OnInit} from '@angular/core';
import { DataService } from './../../services/data.service';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public service: DataService, public router: Router) { }
  err_ingreso = false;
  email_valido = false;
  email_valido2 = false;
  ingreso = false;
  registro = false;
  err_nv_email = false;
  err_nv_usr = false;
  status = true;

  logeado: boolean;

  ngOnInit(): void {
    //console.log("Entro a login");
    this.logeado = this.service.sesion
    if(this.logeado){
      this.router.navigate(['/intro']);
    }     
  }
  
  email = '';
  pass = '';
  nv_email = '';
  nv_user = '';
  nv_pass = '';
  nv_nom = '';
  nv_sex = '';
  nv_edad:number;

  validar_email(){
    var EMAIL_REGEX = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    var estado = this.email.match(EMAIL_REGEX);
    if(estado==null && this.email !=''){
      this.email_valido = true;
    }else{
      this.email_valido = false;
    } 
  }
  validar_email2(){
    var EMAIL_REGEX = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    var estado = this.nv_email.match(EMAIL_REGEX);
    if(estado==null && this.nv_email !=''){
      this.email_valido2 = true;
    }else{
      this.email_valido2 = false;
    }
  }
  ingresar(){
    var obj = {
      email: this.email,
      pass: this.pass
    }
    //console.log(obj);
    this.service.ingresar(obj).subscribe(res=>{ 
      //console.log(res);
      sessionStorage.setItem('token', res['token'].toString());
      //console.log('Ingreso Valido');
      sessionStorage.setItem('sesion', JSON.stringify(res))

      this.ingreso = true;
      setTimeout(()=>{        
        this.ingreso = false;
        this.limpiar();
        // ---- Falta redirigir a una pagina *******
        this.service.sesion$.emit(true);           
        this.service.tipo$.emit(res['tipo']); 
        this.router.navigate(['/intro']);
      }, 1400);
    }, err=>{
      //console.log(err);
      this.err_ingreso = true;
      setTimeout(()=>{        
        this.err_ingreso = false;
      }, 1400);
    });
  }
  cambio_1(){
    this.status = true;
    document.getElementById('signup').classList.replace('active', 'inactive');
    document.getElementById('signin').classList.replace('inactive', 'active');
    this.limpiar();
  }
  cambio_2(){
    this.status = false;
    document.getElementById('signup').classList.replace('inactive', 'active');
    document.getElementById('signin').classList.replace('active', 'inactive');
    this.limpiar();
  }
  limpiar(){      
    this.email = '';
    this.pass = '';
    this.nv_email = '';
    this.nv_user = '';
    this.nv_pass = '';
    this.nv_nom = '';
    this.nv_sex = '';
    this.nv_edad= null;
  }
    async registrar(){
    var obj = {
      email: this.nv_email,
      usuario: this.nv_user,
      pass: this.nv_pass,
      nombre: this.nv_nom,
      sexo: this.nv_sex,
      edad: this.nv_edad,
      tipo: "usuario"
    }
    //console.log(obj);    
    this.service.registrar(obj).subscribe(async (res)=>{
    //console.log(res);
    await sessionStorage.setItem('token', res['token'].toString());
    this.registro = true;
    setTimeout(()=>{        
      this.registro = false;
      this.router.navigate(['/login']);
      this.limpiar();
    }, 3000);

    }, err=>{
      //console.log(err['status']);
      if(err['status'] == 400){       //error de email
        this.err_nv_email = true;
        setTimeout(()=>{        
          this.err_nv_email = false;
        }, 3000);
      }else{                          //error de usuario
        this.err_nv_usr = true;
        setTimeout(()=>{        
          this.err_nv_usr = false;
        }, 3000);
      }
    }); 
  }

}
