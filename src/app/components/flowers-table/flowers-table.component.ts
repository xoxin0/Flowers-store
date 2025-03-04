import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject, Input
} from '@angular/core';

import {
  TuiAppearance,
  TuiButton,
  TuiTitle
} from '@taiga-ui/core';

import {
  AsyncPipe,
  CurrencyPipe,
  NgForOf,
} from '@angular/common';

import {
  ReactiveFormsModule
} from '@angular/forms';

import {
  TuiCardLarge,
  TuiHeader
} from '@taiga-ui/layout';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { TuiInputModule } from '@taiga-ui/legacy';
import { GetAllFlowerService } from '../../services/get-all-flower.service';
import { Flower } from '../../interfaces/flower';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-flowers-table',
  imports: [
    NgForOf,
    MatCardModule,
    MatButtonModule,
    AsyncPipe,
    CurrencyPipe,
    TuiTitle,
    TuiHeader,
    TuiCardLarge,
    TuiAppearance,
    TuiButton,
    ReactiveFormsModule,
    TuiInputModule,
    RouterLink,
  ],
  templateUrl: './flowers-table.component.html',
  styleUrl: './flowers-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FlowersTableComponent implements OnInit {

  public selectedFlowerID: number = 0;
  public selectedFlower: Flower = {
    name: '',
    color: '',
    price: 0,
  };

  public flowers$: Observable<Flower[]> = new Observable();

  private getAllFlowerService = inject(GetAllFlowerService);

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadFlowers();
  }

  giveSelectedFlower() {
    const selectedFlower = this.selectedFlower;
    this.router.navigate(['/flower-edit'], {
      state: { selectedFlower }
    }).then(r => console.log(r));
  }

  public getSelectedFlower(flower: Flower): void {
    this.selectedFlower = flower;

    this.giveSelectedFlower();
  }

  public loadFlowers(): void {
    this.flowers$ = this.getAllFlowerService.getAllFlowers();
  }
}
