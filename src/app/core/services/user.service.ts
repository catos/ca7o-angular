import { Injectable } from '@angular/core'
// TODO: remove HttpClient maybe
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

import { environment } from '../../../environments/environment'
import { User } from '../models/user.model'
import { HttpAuthClient } from '../services/http-auth-client';

@Injectable()
export class UserService {
    private readonly baseApiUrl = `${environment.apiUrl}/api/users`

    constructor(
        private httpAuth: HttpAuthClient,
        private http: HttpClient) { }

    all(q?: string): Observable<Array<User>> {
        let params = new HttpParams()
        if (q !== undefined) {
            params.set('q', q)
        }
        return this.httpAuth.get<Array<User>>(this.baseApiUrl, params)
    }

    public create(user: User): Observable<User> {
        return this.http.post<User>(this.baseApiUrl, user)
    }

    public delete(user: User): Observable<User> {
        let result = this.http.delete<User>(`${this.baseApiUrl}/${user._id}`)
        console.log('result', result)
        return result
    }

    public get(id: string): Observable<User> {
        return this.httpAuth.get<User>(`${this.baseApiUrl}/${id}`)
    }

    public update(user: User): Observable<User> {
        return this.httpAuth.put<User>(`${this.baseApiUrl}/${user._id}`, user)
    }

}
