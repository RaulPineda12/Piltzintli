import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConocenosComponent } from './components/conocenos/conocenos.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { HomeComponent } from './components/home/home.component';
import { IntroComponent } from './components/intro/intro.component';
import { LoginComponent } from './components/login/login.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ForoComponent } from './components/foro/foro.component';
import { NuevoTemaComponent } from './components/nuevo-tema/nuevo-tema.component';
import { EditarTemaComponent } from './components/editar-tema/editar-tema.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { NuevoEventoComponent } from './components/nuevo-evento/nuevo-evento.component';
import { EditarEventoComponent } from './components/editar-evento/editar-evento.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'intro', component: IntroComponent},
  {path: 'noticias', component: NoticiasComponent},
  {path: 'conocenos', component: ConocenosComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'foro', component: ForoComponent},
  {path: 'nuevo-tema', component: NuevoTemaComponent},
  {path: 'editar-tema/:id', component: EditarTemaComponent},
  {path: 'eventos', component: EventosComponent},
  {path: 'nuevo-evento', component: NuevoEventoComponent},
  {path: 'editar-evento/:id', component: EditarEventoComponent},
  {path: '**', pathMatch:'full', redirectTo: 'intro'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
