import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class GlobalService {
  constructor(private http: HttpClient) {}

  signup(params: any) {
    return this.http.post("http://localhost:3000/api/signup", params);
  }

  login(creds: any) {
    return this.http.post("http://localhost:3000/api/login", creds);
  }

  createDoctorSlots(params: any) {
    return this.http.post("http://localhost:3000/api/setSlots", params);
  }

  getDoctorSlots() {
    return this.http.get("http://localhost:3000/api/slots");
  }
}
