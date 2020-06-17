import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Componentes.
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from "./components/default/default.component";
import { PoesiasNewComponent } from './components/poesias-new/poesias-new.component';
import { PoesiasEditComponent } from './components/poesias-edit/poesias-edit.component';
import { PoesiasDetailComponent } from './components/poesias-detail/poesias-detail.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MensajesComponent } from "./components/mensajes/mensajes.component";
import { NotasDetailComponent } from "./components/notas-detail/notas-detail.component";
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from "./components/category-new/category-new.component";
import { PostNewComponent } from "./components/post-new/post-new.component";
import { PostComponent } from "./components/post/post.component";
import { PostDetailComponent } from "./components/post-detail/post-detail.component";
import { PostEditComponent } from "./components/post-edit/post-edit.component";


const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'personal', component: DefaultComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'logout/:sure', component: LoginComponent},
  {path: 'crear-poesia', component: PoesiasNewComponent},
  {path: 'editar-poesia/:id', component: PoesiasEditComponent},
  {path: 'poesia/:id', component: PoesiasDetailComponent},
  {path: 'notas/:id', component: NotasDetailComponent},
  {path: 'mensajes', component: MensajesComponent},
  {path: 'ajustes', component: UserEditComponent},
  {path: 'crear-categoria', component: CategoryNewComponent},
  {path: 'crear-entrada', component: PostNewComponent},
  {path: 'entradas', component: PostComponent},
  {path: 'entrada/:id', component: PostDetailComponent},
  {path: 'editar-entrada/:id', component: PostEditComponent},
  {path: '**', component: InicioComponent},

];

/* export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes); */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
