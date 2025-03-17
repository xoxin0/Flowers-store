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

export class PatchFlowerService {

  private flowersUrl = 'http://localhost:3000/api/flowers/flower';

  private http = inject(HttpClient);

  public patchFlower(id: number, flower: Flower): Observable<Flower> {
    return this.http.patch<Flower>(`${this.flowersUrl}/${id}`, flower)
  }
}
