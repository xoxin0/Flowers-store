import {
  ReactiveFormsModule,
  FormControl,
  FormGroup
} from '@angular/forms';

import {
  TuiAppearance,
  TuiButton,
  TuiTextfield,
  TuiTitle
} from '@taiga-ui/core';

import {
  TuiCardLarge,
  TuiForm,
  TuiHeader
} from '@taiga-ui/layout';

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostFlowerService } from '../../services/post-flower.service';
import { Flower} from '../../interfaces/flower';
import { TuiInputNumber } from '@taiga-ui/kit';
import { TuiCurrencyPipe } from '@taiga-ui/addon-commerce';


@Component({
  selector: 'app-flower-form',
  imports: [
    ReactiveFormsModule,
    TuiTextfield,
    TuiInputNumber,
    TuiCurrencyPipe,
    TuiButton,
    TuiAppearance,
    TuiCardLarge,
    TuiForm,
    TuiHeader,
    TuiTitle,
    RouterLink
  ],
  templateUrl: './flower-form.component.html',
  styleUrl: './flower-form.component.scss'
})

export class FlowerFormComponent {
  flowerForm = new FormGroup({
    price: new FormControl<number>(0, { nonNullable: true }),
    color: new FormControl<string>('', { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true }),
  })

  flower: Flower = {
    price: 0,
    color: '',
    name: ''
  }

  constructor(private flowerService: PostFlowerService) {}

  create(): void {
    this.flowerService.postFlower(this.flowerForm.getRawValue())
      .subscribe();
  }
}
