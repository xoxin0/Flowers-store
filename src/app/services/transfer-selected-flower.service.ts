import { Injectable } from '@angular/core';
import { Flower } from '../interfaces/flower';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TransferSelectedFlowerService {

  public selectedFlower$ = new BehaviorSubject<Flower>({
    id: 0,
    name: '',
    color: '',
    price: 0
  });
}
