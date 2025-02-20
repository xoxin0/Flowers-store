import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  TuiAppearance,
  TuiButton,
  TuiDialog,
  TuiTitle
} from '@taiga-ui/core';

import {
  AsyncPipe,
  CurrencyPipe,
  NgForOf,
  NgIf
} from '@angular/common';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiAutoFocus } from '@taiga-ui/cdk';

import { TuiInputModule } from '@taiga-ui/legacy';
import { PatchFlowerService } from '../../services/patch-flower.service';
import { GetAllFlowerService } from '../../services/get-all-flower.service';
import { Flower } from '../../interfaces/flower';

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
    TuiDialog,
    ReactiveFormsModule,
    TuiInputModule,
    TuiAutoFocus,
    NgIf
  ],
  templateUrl: './flowers-table.component.html',
  styleUrl: './flowers-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FlowersTableComponent implements OnInit {
  selectedFlower: Flower = {
    name: '',
    color: '',
    price: 0,
  };

  flowers$: Observable<Flower[]> = new Observable();

  protected open = false;

  editForm = new FormGroup({
    name: new FormControl(''),
    color: new FormControl(''),
    price: new FormControl(),
  });

  constructor(
    private getAllFlowerService: GetAllFlowerService,
    private patchFlowerService: PatchFlowerService
  ) { }

  ngOnInit(): void {
    this.loadFlowers();
  }

  loadFlowers(): void {
    this.flowers$ = this.getAllFlowerService.getAllFlowers();
  }

  showSelectModal(flower: Flower): void {
    this.open = true;
    this.selectedFlower = flower;
    console.log(this.selectedFlower);
  }

  editFlower(): void {
    this.selectedFlower.name = <string>this.editForm.value.name;
    this.selectedFlower.color = <string>this.editForm.value.color;
    this.selectedFlower.price = Number(this.editForm.value.price);

    this.editForm.reset();
  }

  updateFlower(id: number): void {

    this.editFlower();

    this.patchFlowerService.patchFlower(id, this.selectedFlower).subscribe()
  }
}
