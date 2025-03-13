import {
  inject,
  Injectable
} from '@angular/core';

import { Flower } from '../interfaces/flower';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GetAllFlowerService {

  private getAllFlowersUrl = 'http://localhost:3000/api/flowers/getAll'

  private http = inject(HttpClient);

  constructor() { }

  public getAllFlowers(): Observable<Flower[]> {
    return this.http.get<Flower[]>(this.getAllFlowersUrl);
  }
}
