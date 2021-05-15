import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { I18nService } from '../i18n.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [NgxSpinnerService, ToastrService, I18nService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {}
