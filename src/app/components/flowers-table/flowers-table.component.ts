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
  ReactiveFormsModule, Validators
} from '@angular/forms';

import {
  TuiCardLarge,
  TuiHeader
} from '@taiga-ui/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiInputModule } from '@taiga-ui/legacy';
import { PatchFlowerService } from '../../services/patch-flower.service';
import { GetAllFlowerService } from '../../services/get-all-flower.service';
import { Flower } from '../../interfaces/flower';
import { RouterLink } from '@angular/router';

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
    NgIf,
    RouterLink
  ],
  templateUrl: './flowers-table.component.html',
  styleUrl: './flowers-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FlowersTableComponent implements OnInit {

  selectedFlowerID: number = 0;
  selectedFlower: Flower = {
    name: '',
    color: '',
    price: 0,
  };

  protected open = false;

  flowers$: Observable<Flower[]> = new Observable();

  editForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    color: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
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
    this.selectedFlowerID = flower.id!;

    this.editForm.patchValue({
      name: flower.name,
      color: flower.color,
      price: flower.price
    })
  }

  updateFlower(): void {
    const editData: Flower = this.editForm.getRawValue();
    editData.price = Number(editData.price);

    this.patchFlowerService.patchFlower(this.selectedFlowerID, editData)
      .subscribe();
  }
}
