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

import {
  Router,
  RouterLink
} from '@angular/router';

import { Component } from '@angular/core';
import { PostFlowerService } from '../../services/post-flower.service';
import { TuiInputNumber } from '@taiga-ui/kit';
import { TuiCurrencyPipe } from '@taiga-ui/addon-commerce';
import { inject } from '@angular/core';

@Component({
  selector: 'app-flower-create',
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
  templateUrl: './flower-create.component.html',
  styleUrl: './flower-create.component.scss'
})

export class FlowerCreateComponent {

  public flowerForm = new FormGroup({
    price: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
    color: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  })

  private _flowerService = inject(PostFlowerService);
  private _router = inject(Router);

  public create(): void {
    this._flowerService.postFlower(this.flowerForm.getRawValue())
      .subscribe();

    this._router.navigate(['/'])
      .then(r => console.debug(r));
  }
}
