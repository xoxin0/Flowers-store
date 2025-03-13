import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators
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
import { TuiInputNumber } from '@taiga-ui/kit';
import { TuiCurrencyPipe } from '@taiga-ui/addon-commerce';
import { inject } from '@angular/core';

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

  public flowerForm = new FormGroup({
    price: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
    color: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  })

  private flowerService = inject(PostFlowerService);

  constructor() {}

  public create(): void {
    this.flowerService.postFlower(this.flowerForm.getRawValue())
      .subscribe();
  }
}
