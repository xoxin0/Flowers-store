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
import { TransferSelectedFlowerService } from '../../services/transfer-selected-flower.service';

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

  public selectedFlowerInEdit: Flower = {
    name: '',
    color: '',
    price: 0,
  };

  public editForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    color: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
  });

  private _patchFlowerService = inject(PatchFlowerService);
  private _router = inject(Router)
  private _transferSelectedFlowerService = inject(TransferSelectedFlowerService);

  ngOnInit() {
     this.selectedFlowerInEdit = {...this._transferSelectedFlowerService.selectedFlower};
     this.editForm.setValue({
           name: this.selectedFlowerInEdit.name,
           color: this.selectedFlowerInEdit.color,
           price: this.selectedFlowerInEdit.price
     })
  }

  public updateFlower(): void {
    const editData: Flower = this.editForm.getRawValue();
    editData.price = Number(editData.price);

    this._patchFlowerService.patchFlower(this.selectedFlowerInEdit.id!, editData)
      .subscribe();

    this._router.navigate(['/'])
      .then(r => console.debug(r));
  }
}
