import { Injectable } from '@angular/core'
// TODO: skal jeg lage en wrapper på http uten auth-headers og ?
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { environment } from '../../environments/environment'
import { ITokenResponse } from './token-response.interface';

@Injectable()
export class AuthService {
    private readonly baseApiUrl = `${environment.apiUrl}/auth`
    private tokenName: string = 'ca7o-token'

    // TODO: implements returnUrl...
    public returnUrl: string

    constructor(private http: HttpClient) {}

    public getToken(): string {
        return localStorage.getItem(this.tokenName)
    }

    public setToken(token: string) {
        localStorage.setItem(this.tokenName, token)
    }

    // TODO: this could be a simple boolean set by login() and logout(), and should check expiry on token
    public isLoggedIn = (): boolean => {
        return !!localStorage.getItem(this.tokenName)
    }

    public login(username: string, password: string): Observable<ITokenResponse> {
        const body = JSON.stringify({ username: username, password: password })
        // TODO: maybe make generic httpclient with content-type built in
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http
            .post<ITokenResponse>(`${this.baseApiUrl}/login`, body, { headers: headers })
            .map(
            (response: ITokenResponse) => {
                if (response.token) {
                    this.setToken(response.token)
                    return response
                } else {
                    return response
                }
            },
            (err) => {
                console.log('err', err)
                return err
            }
            )
    }

    public logout = () => {
        this.setToken(null)
        localStorage.removeItem(this.tokenName)
    }

   private parseJwt = (token: string) => {
        if (token) {
            var base64Url = token.split('.')[1]
            var base64 = base64Url.replace('-', '+').replace('_', '/')
            return JSON.parse(window.atob(base64))
        }
    }

}