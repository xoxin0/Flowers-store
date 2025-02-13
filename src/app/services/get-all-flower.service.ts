import { Injectable } from '@angular/core';
import { Flower } from '../interfaces/flower';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GetAllFlowerService {
  private getAllFlowersUrl = 'http://localhost:3000/api/flowers/getAll'

  constructor(private http: HttpClient) { }

  getAllFlowers(): Observable<Flower[]> {
    return this.http.get<Flower[]>(this.getAllFlowersUrl);
  }
}
