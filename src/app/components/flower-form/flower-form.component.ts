import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import {PostFlowerService} from '../../services/post-flower.service';
import {Flower} from '../../interfaces/flower';
import {TuiAppearance, TuiButton, TuiTextfield, TuiTitle} from '@taiga-ui/core';
import {TuiInputNumber, TuiSegmented} from '@taiga-ui/kit';
import {TuiCurrencyPipe} from '@taiga-ui/addon-commerce';
import {TuiCardLarge, TuiForm, TuiHeader} from '@taiga-ui/layout';
import {RouterLink, RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-flower-form',
  imports: [ReactiveFormsModule, TuiTextfield, TuiInputNumber, TuiCurrencyPipe, TuiButton, TuiAppearance, TuiCardLarge, TuiForm, TuiSegmented, TuiHeader, TuiTitle, RouterLink, RouterOutlet],
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

  test(): void {
    console.log(this.flowerForm.getRawValue());
  }
}
