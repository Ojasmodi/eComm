import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('will login', fakeAsync(() => {
    let response = {
      status: true,
      authToken: 'dummyTokenWillBeDifferentForAllUsers',
      userName: 'Admin',
    };
    let loginData = {
      email: 'admin@admin.com',
      password: '12341234',
    };

    service.login(loginData);

    const req = httpTestingController.expectNone(
      'http://localhost:4200/assets/responses/login.json'
    );

    tick();

    expect(response.authToken).toBe('dummyTokenWillBeDifferentForAllUsers');
    expect(response.status).toBe(true);
    expect(response.userName).toBe('Admin');
  }));
});
