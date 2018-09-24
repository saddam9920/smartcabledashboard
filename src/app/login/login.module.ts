import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginSigninComponent } from './login.signin.component';
import { LoginRoutingModule} from './login.routing';

@NgModule({
  declarations: [
    LoginSigninComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    LoginRoutingModule,
  ]
})
export class LoginModule { }
