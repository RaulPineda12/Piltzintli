import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public service: DataService, private router: Router) { }
  
  logeado: boolean;
  tipo: string;

  ngOnInit(): void {   
    //HERE WE GOT THE SESSION ATTRIBUTES
    var sesion= sessionStorage.getItem('sesion')
    //console.log("sesion: "+sesion)
    
    this.service.sesion$.subscribe(data=>{
      this.logeado = data;
      this.service.sesion = data;
    });    
    this.service.tipo$.subscribe(data=>{
      this.tipo = data;      
      //console.log(this.tipo); 
    }) 

    if(sesion==null){
      this.logeado= false
    }else{
      this.logeado=true
    }
  }
  salir(){
    this.service.sesion$.emit(false);
    this.router.navigate(['/intro']);
    sessionStorage.removeItem('sesion')
    sessionStorage.removeItem('token')
  }
}
