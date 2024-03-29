import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/Observable'

import { AuthService } from "./auth.service";

// TODO: maybe  extends HttpClient
@Injectable()
export class HttpAuthClient {

    private headers;

    constructor(
        private http: HttpClient,
        private auth: AuthService
    ) {
        this.headers = new HttpHeaders().set('Authorization', this.auth.getToken())
    }

    get<T>(url: string, params?: HttpParams): Observable<T> {
        let options = {
            headers: this.headers,
            params: params
        }
        return this.http.get<T>(url, options)
    }

    put<T>(url: string, body: any) {
        console.log('url', url);
        return this.http.put<T>(url, body, { headers: this.headers })
    }
}