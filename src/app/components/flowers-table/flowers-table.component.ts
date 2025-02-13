import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {GetAllFlowerService} from '../../services/get-all-flower.service';
import {Flower} from '../../interfaces/flower';
import {
  AsyncPipe,
  CurrencyPipe,
  NgForOf,
  NgIf
} from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {TuiTable} from '@taiga-ui/addon-table';
import {Observable} from 'rxjs';
import {TuiAppearance, TuiButton, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiCell, TuiHeader} from '@taiga-ui/layout';
import {TuiRepeatTimes} from '@taiga-ui/cdk';

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
    TuiButton
  ],
  templateUrl: './flowers-table.component.html',
  styleUrl: './flowers-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FlowersTableComponent implements OnInit {
  flowers$: Observable<Flower[]> = new Observable()

  constructor(private getAllFlowerService: GetAllFlowerService) { }

  ngOnInit(): void {
    this.loadFlowers();
  }

  loadFlowers(): void {
    this.flowers$ = this.getAllFlowerService.getAllFlowers();
  }
}
