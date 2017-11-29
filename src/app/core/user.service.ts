import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable';

import { User } from './models/user.model'

@Injectable()
export class UserService {
    private readonly baseApiUrl = 'https://ca7o-server.herokuapp.com/api/users'

    constructor(private http: HttpClient) { }

    all(): Observable<Array<User>> {
        return this.http.get<Array<User>>(this.baseApiUrl)
    }

    // public create(hero: Hero): Observable<Hero> {
    //     return this.httpClient.post<Hero>(this.URL, hero);
    // }

    // public delete(hero: Hero): Observable<Hero> {
    //     return this.httpClient.delete<Hero>(`${this.URL}/${hero._id}`);
    // }

    public get(id: string): Observable<User> {
        return this.http.get<User>(`${this.baseApiUrl}/${id}`);
    }

    // public list(): Observable<Array<Hero>> {
    //     return this.httpClient.get<Array<Hero>>(this.URL);
    // }

    // public update(hero: Hero): Observable<Hero> {
    //     return this.httpClient.put<Hero>(`${this.URL}/${hero._id}`, hero);
    // }
}
