import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ReplaySubject } from "rxjs/ReplaySubject";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Headers, Http, Response, URLSearchParams } from "@angular/http";

@Injectable()
export class DataService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject
    .asObservable()
    .distinctUntilChanged();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  constructor(private http: Http) {}

  setAuth(user: User) {
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  private setHeaders(): Headers {
    const headersConfig = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    return new Headers(headersConfig);
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = type === "login" ? "/login" : "/signup";
    return this.post(route, { user: credentials }).map(data => {
      this.setAuth(data.user);
      return data;
    });
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders()
      })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }
}

export class User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export class Errors {
  errors: { [key: string]: string } = {};
}
