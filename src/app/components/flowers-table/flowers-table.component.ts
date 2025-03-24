import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';

import {
  TuiAppearance,
  TuiButton,
  TuiTitle
} from '@taiga-ui/core';

import {
  AsyncPipe,
  CurrencyPipe,
  NgForOf
} from '@angular/common';

import {
  TuiCardLarge,
  TuiHeader
} from '@taiga-ui/layout';

import {
  Router,
  RouterLink
} from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { TuiInputModule } from '@taiga-ui/legacy';
import { GetAllFlowerService } from '../../services/get-all-flower.service';
import { Flower } from '../../interfaces/flower';
import { TuiButtonClose } from '@taiga-ui/kit';
import { DeleteFlowerService } from '../../services/delete-flower.service';
import { TransferSelectedFlowerService } from '../../services/transfer-selected-flower.service';

@Component({
  selector: 'app-flowers-table',
  imports: [
    NgForOf,
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
    TuiButtonClose
  ],
  templateUrl: './flowers-table.component.html',
  styleUrl: './flowers-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FlowersTableComponent implements OnInit {

  public selectedFlower: Flower = {
    id: 0,
    name: '',
    color: '',
    price: 0
  };

  public flowers$: Observable<Flower[]> = new Observable();

  private _getAllFlowerService = inject(GetAllFlowerService);
  private _deleteFlowerService = inject(DeleteFlowerService);
  private _router = inject(Router);
  private _transferSelectedFlowerService = inject(TransferSelectedFlowerService);

  ngOnInit(): void {
    this.loadFlowers();
  }

  public giveSelectedFlower() {
    this._transferSelectedFlowerService.selectedFlower$
      .subscribe({
        next: flower => {
          flower.id = this.selectedFlower.id
          flower.name = this.selectedFlower.name;
          flower.color = this.selectedFlower.color;
          flower.price = this.selectedFlower.price;
        }
      });

    this._router.navigate(['/flower-edit'])
      .then(r => console.debug(r));
  }

  public getSelectedFlower(flower: Flower): void {
    this.selectedFlower = flower;

    this.giveSelectedFlower();
  }

  public loadFlowers(): void {
    this.flowers$ = this._getAllFlowerService.getAllFlowers();
  }

  public deleteFlower(flower: Flower): void {
    this._deleteFlowerService.deleteFlowerInDataBase(flower.id!)
      .subscribe();

    this.loadFlowers();
  }
}
