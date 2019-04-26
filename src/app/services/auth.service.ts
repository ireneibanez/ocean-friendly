import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  private userLoggedSubject: Subject<User> = new Subject<User>();
  public userLoggedObservable: Observable<User> = this.userLoggedSubject.asObservable()

  constructor(private http: HttpClient) { }

  set token(value: string) {
    window.localStorage.token = value;
  }

  get token() {
    return window.localStorage.token;
  }

  login(data) {
    console.log('llamando a login');
    return this.http.post(`${environment.apiOcean}/auth/sign-in`, data).toPromise().then((res: any) => {
      if (res.token) {
        this.token = res.token;
      }
    }).then(res => {
      return this.getUser();
    });
  }

  getUser(): Promise<object>  {
    console.log('llamando a getUser');
    return this.http.get(`${environment.apiOcean}/me`).toPromise().then((user: User)=> {
      this.user = user;
      this.userLoggedSubject.next(user);
      return user;
    });
  }

  registerUser(data: any) {
    console.log('llamando a registro');
    return this.http.post(`${environment.apiOcean}/auth/sign-up`, data).toPromise();
  }

  getUserLogged() {
    return this.user;
  }
}
