import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CommunicationService } from 'src/app/communication.service';
import { I18nService } from 'src/app/i18n.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  breadcrumbs: string[] = ['LOGIN.TEXT'];
  private sessionLangObservable: Subscription;

  constructor(
    private route: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private communicationService: CommunicationService,
    private i18nService: I18nService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
        ],
      ],
    });
    this.sessionLangObservable =
      this.communicationService.sessionLangData.subscribe((lang: string) => {
        this.translate.use(lang);
      });
  }

  // convenient getter for easy access to form fields
  get f() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    let data = {
      email: this.f.email.value,
      password: this.f.password.value,
    };
    this.spinner.show();
    this.userService.login(data).subscribe(
      (response) => {
        this.spinner.hide();
        if (response.status) {
          this.toastr.info('Login successful.');
          localStorage.setItem('authToken', response.authToken);
          localStorage.setItem('username', response.userName);
          let data = {
            loginStatus: true,
            username: response.userName,
          };
          this.communicationService.setLoggedIn(data);
          this.route.navigate(['/']);
        } else {
          this.toastr.error('Username or password is wrong.');
        }
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error('Some error occured.');
      }
    );
  }

  ngOnDestroy() {
    this.sessionLangObservable.unsubscribe();
  }
}
