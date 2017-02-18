import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { ButtonsModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ButtonsModule.forRoot(),
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
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
