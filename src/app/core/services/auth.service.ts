import { Injectable } from '@angular/core'
// TODO: skal jeg lage en wrapper på http uten auth-headers og ?
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { environment } from '../../../environments/environment'
import { ITokenResponse } from '../models/token-response.interface';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
    private readonly baseApiUrl = `${environment.apiUrl}/auth`
    private tokenName: string = 'ca7o-token'

    // TODO: implements returnUrl...
    returnUrl: string
    currentUser: User = null

    constructor(private http: HttpClient) {
        this.currentUser = this.parseJwt(this.getToken())
    }

    getSessionUser(): any {
        const token = this.getToken()
        if (token) {
            return this.parseJwt(token)
        }        
        return null
    }

    getToken(): string {
        return localStorage.getItem(this.tokenName)
    }

    setToken(token: string) {
        localStorage.setItem(this.tokenName, token)
    }

    // TODO: this could be a simple boolean set by login() and logout(), and should check expiry on token
    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.tokenName)
    }

    login(username: string, password: string): Observable<ITokenResponse> {
        const body = JSON.stringify({ username: username, password: password })
        // TODO: maybe make generic httpclient with content-type built in
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http
            .post<ITokenResponse>(`${this.baseApiUrl}/login`, body, { headers: headers })
            .map(
            (response: ITokenResponse) => {
                if (response.token) {
                    this.setToken(response.token)
                    this.currentUser = this.parseJwt(response.token)
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

    logout() {
        this.setToken(null)
        localStorage.removeItem(this.tokenName)
        this.currentUser = null
    }

    private parseJwt(token: string) {
        if (token) {
            var base64Url = token.split('.')[1]
            var base64 = base64Url.replace('-', '+').replace('_', '/')
            return JSON.parse(window.atob(base64))
        }
    }

}