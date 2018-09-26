import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './home/home.component';
import { HomeLandingComponent } from './home/home.landing.component';
import { LoginComponent } from './login/login.component';
import { LocalStorageModule } from 'angular-2-local-storage';
import { LoginSigninComponent } from './login/login.signin.component';
import { BannerMasterComponent } from './banner/bannermaster.component';
import { BannerSearchComponent } from './banner/bannersearch.component';
import { UserSearchComponent } from './profile/usersearch.component';
import { UserMasterComponent } from './profile/usermaster.component';
import { CategorySearchComponent } from './category/categorysearch.component';
import { SubCategorySearchComponent } from './subcategory/subcategorysearch.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/authinterceptor';
import { AuthService } from './services/authservice';
import { UserService } from './services/userservice';
import { CommonUtil } from './util/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import {ToastyModule} from 'ng2-toasty';
import { ReactiveFormsModule } from '@angular/forms';
import {DatePipe} from '@angular/common';
import { UiSwitchModule } from 'ngx-ui-switch';
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeLandingComponent,
    LoginComponent,
    LoginSigninComponent,
    BannerMasterComponent,
    BannerSearchComponent,
    UserSearchComponent,
    UserMasterComponent,
    CategorySearchComponent,
    SubCategorySearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    UiSwitchModule,
    FileUploadModule,
    SlimLoadingBarModule.forRoot(),
    ToastyModule.forRoot(),
    MyDatePickerModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      // storageType: 'localStorage',
      storageType: 'sessionStorage'
    })
  ],
  providers: [DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,UserService,CommonUtil,LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
