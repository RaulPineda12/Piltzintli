import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DimensionComponent } from './components/dimension/dimension.component';
import { StronglyComponent } from './components/strongly/strongly.component';
import { HomeComponent } from './components/home/home.component';
import { IntroComponent } from './components/intro/intro.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ConocenosComponent } from './components/conocenos/conocenos.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ForoComponent } from './components/foro/foro.component';
import { NuevoTemaComponent } from './components/nuevo-tema/nuevo-tema.component';
import { EditarTemaComponent } from './components/editar-tema/editar-tema.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { NuevoEventoComponent } from './components/nuevo-evento/nuevo-evento.component';
import { EditarEventoComponent } from './components/editar-evento/editar-evento.component';

@NgModule({
  declarations: [
    AppComponent,
    DimensionComponent,
    StronglyComponent,
    HomeComponent,
    IntroComponent,
    NavbarComponent,
    NoticiasComponent,
    ConocenosComponent,
    ContactoComponent,
    LoginComponent,
    ForoComponent,
    NuevoTemaComponent,
    EditarTemaComponent,
    EventosComponent,
    NuevoEventoComponent,
    EditarEventoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
