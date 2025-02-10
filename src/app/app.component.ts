import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';
import { FlowerFormComponent } from './components/flower-form/flower-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, FlowerFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
