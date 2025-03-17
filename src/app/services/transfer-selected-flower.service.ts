import { Injectable } from '@angular/core';
import { Flower } from '../interfaces/flower';

@Injectable({
  providedIn: 'root'
})

export class TransferSelectedFlowerService {

  public selectedFlower: Flower = {
    id: 0,
    name: '',
    color: '',
    price: 0,
  };
}
