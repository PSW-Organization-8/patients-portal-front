import { Injectable } from '@angular/core';
import { serverPort } from '../app.consts';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
  export class EventService {
    private _url = serverPort;

    constructor(private http: HttpClient,) {}

    public sendEvent(event: any){
      return this.http.post<any>(this._url + 'event', event)
    }

    public getPromotions(): any {
      return this.http.get<any>(this._url + 'medcation/promotions');
    }

  }