import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { ButtonsModule, ModalModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: CreateUserComponent
      },
      {
        path: 'home',
        pathMatch: 'full',
        component: HomeComponent,
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
