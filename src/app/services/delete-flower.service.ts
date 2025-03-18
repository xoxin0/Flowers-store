import {
  inject,
  Injectable
} from '@angular/core';

import { Flower } from '../interfaces/flower';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DeleteFlowerService {

  private flowersUrl = 'http://localhost:3000/api/flowers/flower';

  private http = inject(HttpClient);

  public deleteFlowerInDataBase(id: number): Observable<Flower> {
    return this.http.delete<Flower>(`${this.flowersUrl}/${id}`);
  }
}
