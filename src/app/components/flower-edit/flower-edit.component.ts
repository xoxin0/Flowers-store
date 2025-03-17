import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  TuiAppearance,
  TuiButton,
  TuiLabel,
  TuiTextfieldComponent,
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

import { TuiCurrencyPipe } from '@taiga-ui/addon-commerce';
import { TuiInputNumber } from '@taiga-ui/kit';
import { Flower } from '../../interfaces/flower';
import { PatchFlowerService } from '../../services/patch-flower.service';

@Component({
  selector: 'app-flower-edit',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    TuiButton,
    TuiCurrencyPipe,
    TuiInputNumber,
    TuiLabel,
    TuiTextfieldComponent,
    TuiAppearance,
    TuiCardLarge,
    TuiForm,
    TuiHeader,
    TuiTitle
  ],
  templateUrl: './flower-edit.component.html',
  styleUrl: './flower-edit.component.scss'
})

export class FlowerEditComponent implements OnInit {

  public selectedFlower: Flower = {
    id: 0,
    name: '',
    color: '',
    price: 0,
  };

  public editForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    color: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
  });

  private patchFlowerService = inject(PatchFlowerService);
  private router = inject(Router)

  constructor() {}

  ngOnInit() {
     this.selectedFlower = history.state.selectedFlower;
     this.editForm.patchValue({
           name: this.selectedFlower.name,
           color: this.selectedFlower.color,
           price: this.selectedFlower.price
     })
  }

  public updateFlower(): void {
    const editData: Flower = this.editForm.getRawValue();
    editData.price = Number(editData.price);

    this.patchFlowerService.patchFlower(this.selectedFlower.id!, editData)
      .subscribe();

    this.router.navigate(['/'])
      .then(r => console.debug(r));
  }
}
