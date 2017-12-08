import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/Observable'

import { AuthService } from "./auth.service";

// TODO: maybe  extends HttpClient
@Injectable()
export class HttpAuthClient {
    constructor(
        private http: HttpClient,
        private auth: AuthService
    ) { }

    get<T>(url: string, params?: HttpParams): Observable<T> {
        let options = {
            headers: new HttpHeaders().set('Authorization', this.auth.getToken()),
            params: params
        }

        console.log('options', options);
        console.log('url', url);
        return this.http.get<T>(url, options)
    }
}