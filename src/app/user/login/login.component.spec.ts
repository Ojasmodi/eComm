import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { HttpLoaderFactory } from 'src/app/app.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('form invalid when empty', () => {
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let email = component.signUpForm.controls['email'];
    expect(email.valid).toBeFalse();

    let errors = {};
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue('test');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeTruthy();

    email.setValue('test@example.com');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};
    let password = component.signUpForm.controls['password'];

    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue('123456');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    password.setValue('123456789');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });

  it('submitting a valid form', () => {
    expect(component.signUpForm.valid).toBeFalsy();
    component.signUpForm.controls['email'].setValue('test@test.com');
    component.signUpForm.controls['password'].setValue('12341234');
    expect(component.signUpForm.valid).toBeTruthy();
  });
});
