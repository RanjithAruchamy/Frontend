import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sport } from './sport.model';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  constructor(private http: HttpClient) { }

  getSports(){
    const headers = new HttpHeaders(({'Authorization': 'Bearer ' + environment.adminToken, 'NoAuth': 'True'} ));
    return this.http.get(environment.apiBaseUrl+'/sports', {headers: headers})
  }
}
