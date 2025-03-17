import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
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

import {
  Router,
  RouterLink
} from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { TuiInputModule } from '@taiga-ui/legacy';
import { GetAllFlowerService } from '../../services/get-all-flower.service';
import { Flower } from '../../interfaces/flower';
import { TuiButtonClose } from '@taiga-ui/kit';
import { DeleteFlowerService } from '../../services/delete-flower.service';

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
    TuiButtonClose,
  ],
  templateUrl: './flowers-table.component.html',
  styleUrl: './flowers-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FlowersTableComponent implements OnInit {

  public selectedFlower: Flower = {
    name: '',
    color: '',
    price: 0,
  };

  public flowers$: Observable<Flower[]> = new Observable();

  private getAllFlowerService = inject(GetAllFlowerService);
  private deleteFlowerService = inject(DeleteFlowerService);
  private router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    this.loadFlowers();
  }

  giveSelectedFlower() {
    const selectedFlower = this.selectedFlower;
    this.router.navigate(['/flower-edit'], {
      state: { selectedFlower }
    }).then(r => console.debug(r));
  }

  public getSelectedFlower(flower: Flower): void {
    this.selectedFlower = flower;

    this.giveSelectedFlower();
  }

  public loadFlowers(): void {
    this.flowers$ = this.getAllFlowerService.getAllFlowers();
  }

  public deleteFlower(flower: Flower): void {
    this.deleteFlowerService.deleteFlowerInDataBase(flower.id!)
      .subscribe();

    window.location.reload();
  }
}
