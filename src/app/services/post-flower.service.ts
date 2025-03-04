import { Injectable } from '@angular/core';
import { Flower } from '../interfaces/flower';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PostFlowerService {
  private flowersUrl = 'http://localhost:3000/api/flowers/flower';

  constructor(private http: HttpClient) { }

  public postFlower(flower: Flower): Observable<Flower> {
    return this.http.post<Flower>(this.flowersUrl, flower);
  }
}
