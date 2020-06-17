import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AngularFileUploaderComponent, AngularFileUploaderModule } from 'angular-file-uploader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';
import { PoesiasNewComponent } from './components/poesias-new/poesias-new.component';
import { PoesiasEditComponent } from './components/poesias-edit/poesias-edit.component';
import { PoesiasDetailComponent } from './components/poesias-detail/poesias-detail.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { NotasDetailComponent } from './components/notas-detail/notas-detail.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostComponent } from './components/post/post.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    PoesiasNewComponent,
    PoesiasEditComponent,
    PoesiasDetailComponent,
    InicioComponent,
    MensajesComponent,
    NotasDetailComponent,
    UserEditComponent,
    CategoryNewComponent,
    PostNewComponent,
    PostComponent,
    PostDetailComponent,
    PostEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FroalaViewModule.forRoot(),
    FroalaEditorModule.forRoot(),
    AngularFileUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
