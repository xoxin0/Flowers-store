import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {TuiAppearance, TuiFormatNumberPipe, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';
import {GetAllFlowerService} from '../../services/get-all-flower.service';
import {Flower} from '../../interfaces/flower';
import {AsyncPipe, CurrencyPipe, NgForOf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {TuiTable} from '@taiga-ui/addon-table';

@Component({
  selector: 'app-flowers-table',
  imports: [
    TuiAppearance,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    NgForOf,
    MatCardModule,
    MatButtonModule,
    TuiTable,
    AsyncPipe,
    TuiFormatNumberPipe,
    CurrencyPipe
  ],
  templateUrl: './flowers-table.component.html',
  styleUrl: './flowers-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})

export class FlowersTableComponent implements OnInit{
  flowers: Flower[] = [];
  readonly columns = ['name', 'color', 'price'];

  constructor(private getAllFlowerService: GetAllFlowerService) { }

  ngOnInit(): void {
    this.loadFlowers()
  }

  loadFlowers(): void {
    this.getAllFlowerService.getAllFlowers().subscribe({
      next: (flowers) => this.flowers = flowers
    })
  }
}
