import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { environment } from '../../environments/environment'
import { ILoginResponse } from './login-response.interface';

@Injectable()
export class AuthService {
    private readonly baseApiUrl = `${environment.apiUrl}/auth`

    // TODO: implements returnUrl...
    public returnUrl: string

    private tokenName: string = 'ca7o-token'

    constructor(private http: HttpClient) {
        // var currentUser = JSON.parse(localStorage.getItem(this.tokenName))
        // this.token = currentUser && currentUser.token
    }

    public getToken(): string {
        return localStorage.getItem(this.tokenName)
    }

    public setToken(token: string) {
        localStorage.setItem(this.tokenName, token)
    }

    public currentUser = () => {
        const parsedToken = this.parseJwt(this.getToken())
        return JSON.stringify({
            id: parsedToken.id,
            name: parsedToken.name,
            username: parsedToken.username
        })
    }

    // TODO: this could be a simple boolean set by login() and logout(), and should check expiry on token
    public isLoggedIn = (): boolean => {
        return !!localStorage.getItem(this.tokenName)
    }

    public logout = () => {
        this.setToken(null)
        localStorage.removeItem(this.tokenName)
    }

    public login(username: string, password: string): Observable<boolean> {
        const body = JSON.stringify({ username: username, password: password })
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        console.log('${this.baseApiUrl}/login', `${this.baseApiUrl}/login`);
        return this.http
            .post<ILoginResponse>(`${this.baseApiUrl}/login`, body, { headers: headers })
            .map(
                tokenResponse => {
                    this.setToken(tokenResponse.token)
                    console.log('tokenResponse', tokenResponse)
                    return true
                }
                // ,
                // (err: ILoginResponse) => {
                //     console.log('err', err)
                //     return false
                // }
            )
    }

    private parseJwt = (token: string) => {
        if (token) {
            var base64Url = token.split('.')[1]
            var base64 = base64Url.replace('-', '+').replace('_', '/')
            return JSON.parse(window.atob(base64))
        }
    }

}