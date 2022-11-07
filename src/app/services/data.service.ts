import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(public http: HttpClient) { }
  
  sesion$ = new EventEmitter<boolean>();
  sesion: boolean = false;

  tipo$ = new EventEmitter<string>();


  uri = 'https://api-piltzintli.azurewebsites.net/';

   registrar(user){
    return this.http.post(this.uri + 'registro', user);
  }
  ingresar(user){
    return this.http.post(this.uri + 'ingresar', user);
  }

  uploadFile(formData){
    return this.http.post('https://api-piltzintli.azurewebsites.net/subir_img', formData);
  }
  
  deleteFile(nombre_img:string){
    return this.http.post(`https://api-piltzintli.azurewebsites.net/borrar_img/${nombre_img}`, nombre_img);
  }

  //falta modificar esto
  nuevo_tema(titulo: string, texto: string, img: any, usuario: any){
    return this.http.post('https://api-piltzintli.azurewebsites.net/nuevo_tema/', {titulo,texto, img, usuario});
  }

  //obtener temas para el celular
  getTemas(){
    return this.http.get(this.uri + 'temas')
  }

  //eliminar tema
  eliminarTema(id){
    return this.http.delete(`https://api-piltzintli.azurewebsites.net/eliminar_tema/${id}`)
  }

  //obtener tema
  getTema(id){
    return this.http.get(`https://api-piltzintli.azurewebsites.net/tema/${id}`)
  }

  //actualizar tema
  actualizar_tema(id, titulo, texto){
    return this.http.put(`https://api-piltzintli.azurewebsites.net/actualizar_tema/${id}`, {titulo,texto})
  }

  //actualizar tema
  actualizar_tema2(id, titulo, texto, img){
    return this.http.put(`https://api-piltzintli.azurewebsites.net/actualizar_tema2/${id}`, {titulo,texto, img})
  }

  //nuevo evento
  nuevo_evento(nombre, descripcion, fecha, img, usuario){
    return this.http.post('https://api-piltzintli.azurewebsites.net/nuevo_evento/', {nombre,descripcion, fecha, img, usuario})
  }

  //obtener eventos
  get_Eventos(){
    return this.http.get('https://api-piltzintli.azurewebsites.net/eventos')
  }

  //eliminar tema
  eliminarEvento(id){
    return this.http.delete(`https://api-piltzintli.azurewebsites.net/eliminar_evento/${id}`)
  }

   //obtener un evento
   getEvento(id){
    return this.http.get(`https://api-piltzintli.azurewebsites.net/evento/${id}`)
  }

  //actualizar evento
  actualizar_evento(id, nombre, descripcion, fecha){
    return this.http.put(`https://api-piltzintli.azurewebsites.net/actualizar_evento/${id}`, {nombre,descripcion, fecha})
  }

   //actualizar evento 2
   actualizar_evento2(id, nombre, descripcion, fecha, img){
    return this.http.put(`https://api-piltzintli.azurewebsites.net/${id}`, {nombre,descripcion, fecha, img})
  }

  
}
