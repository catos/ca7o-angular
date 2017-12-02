import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment'
import { User } from './models/user.model'

@Injectable()
export class UserService {
    private readonly baseApiUrl = `${environment.apiUrl}/api/users`

    constructor(private http: HttpClient) { }

    all(q?: string): Observable<Array<User>> {
        let params = {}
        if (q !== undefined) {
            params = new HttpParams().set('q', q)
        }
        return this.http.get<Array<User>>(this.baseApiUrl, { params })
    }

    public create(user: User): Observable<User> {
        return this.http.post<User>(this.baseApiUrl, user);
    }

    public delete(user: User): Observable<User> {
        let result = this.http.delete<User>(`${this.baseApiUrl}/${user._id}`);
        console.log('result', result)
        return result
    }

    public get(id: string): Observable<User> {
        return this.http.get<User>(`${this.baseApiUrl}/${id}`);
    }

    public update(user: User): Observable<User> {
        return this.http.put<User>(`${this.baseApiUrl}/${user._id}`, user);
    }
}
