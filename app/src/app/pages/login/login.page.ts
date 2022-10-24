import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { map, Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UnsubscribeOnDestroyAdapter } from '../../shared/unsub-on-destroy';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

const emailField = ['', [Validators.required, Validators.email]];
const passwordField = ['', [Validators.required, Validators.minLength(5)]];

@Component({
  selector: 'bm-login.page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends UnsubscribeOnDestroyAdapter implements OnInit {
  protected errorMessage: string = '';
  protected loading: boolean = false;
  protected loginMode$: Observable<boolean> | undefined;
  protected userForm: FormGroup = this.fb.group({
    email: emailField,
    password: passwordField,
  });

  constructor(
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.url
      .pipe(
        map((segments: UrlSegment[]) => {
          return segments
            .map((segment): string =>
              segment.parameters['email'] ? segment.parameters['email'] : '',
            )
            .join('');
        }),
      )
      .subscribe((email) => {
        this.userForm.get('email')?.setValue(email);
      });
    this.loginMode$ = this.route.url.pipe(
      map((segments: UrlSegment[]) => {
        return segments.map((segment) => segment.path).includes('login');
      }),
    );
    this.loginMode$.subscribe((loginMode) => {
      if (loginMode) {
        this.userForm.removeControl('name');
      } else {
        this.userForm.addControl('name', new FormControl());
      }
    });
  }

  submit() {
    this.loading = true;
    this.errorMessage = '';
    let impliedName = '';
    this.subs.add(
      this.loginMode$?.subscribe((loginMode: boolean) => {
        if (loginMode) {
          this.subs.add(
            this.userService.login(this.userForm.value).subscribe({
              error: (err: HttpErrorResponse) => {
                if (err.status.toString().startsWith('4')) {
                  this.errorMessage = 'Invalid Login';
                }
                if (err.status.toString().startsWith('5')) {
                  this.errorMessage = 'Something went wrong 🙁';
                }
                this.loading = false;
              },
              complete: () => {
                this.errorMessage = '';
                this.loading = false;
              },
            }),
          );
        } else {
          if (this.userForm.get('name')?.value === '') {
            impliedName = (this.userForm.get('email')?.value as string).split(
              '@',
            )[0];
            this.userForm.patchValue({
              name: impliedName,
            });
          }
          this.userService.register(this.userForm.value);
        }
      }),
    );
  }
}
