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
  constructor(private http: Http) {
    const myUserLocal = localStorage.getItem("doctor_patiend_loggedin_user");
    try {
      const localData = JSON.parse(myUserLocal);
      if (localData && "token" in localData) {
        this.currentUserSubject.next(localData);
        this.isAuthenticatedSubject.next(true);
      } else {
        this.doLogout();
      }
    } catch (error) {
      this.doLogout();
    }
  }

  setAuth(user) {
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem("doctor_patiend_loggedin_user", JSON.stringify(user));
  }

  doLogout() {
    this.currentUserSubject.next(new User());
    this.isAuthenticatedSubject.next(false);
    localStorage.setItem("doctor_patiend_loggedin_user", "{}");
  }

  private setHeaders(): any {
    const headersConfig = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: ''
    };
    this.currentUser.subscribe(res => {
      console.log("Headers: ", res);
      headersConfig.Authorization = res.token;
    });
    return new Headers(headersConfig);
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = type === "login" ? "/login" : "/signup";
    return this.post(route, credentials).map(
      data => {
        this.setAuth(data);
        return data;
      },
      err => {
        return err;
      }
    );
  }
  submitAppointment(appointment): Observable<User> {
    return this.post("/new-slot", appointment).map(
      data => {
        return data;
      },
      err => {
        return err;
      }
    );
  }

  loadAppointments(): Observable<any> {
    return this.get("/myAppointments").map(
      data => {
        return data;
      },
      err => {
        return err;
      }
    );
  }

  loadDoctors(): Observable<any> {
    return this.get("/alldoctors").map(
      data => {
        return data;
      },
      err => {
        return err;
      }
    );
  }
  loadDoctorSlots(doctorId): Observable<any> {
    return this.get("/doctor-slots/" + doctorId).map(
      data => {
        return data;
      },
      err => {
        return err;
      }
    );
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

  get(path: string): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, {
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
  bio?: string;
  image?: string;
  name?: string;
}

export class Errors {
  errors: { [key: string]: string } = {};
}
