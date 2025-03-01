import { Routes } from '@angular/router';
import {FlowersTableComponent} from './components/flowers-table/flowers-table.component';
import {FlowerFormComponent} from './components/flower-form/flower-form.component';

export const routes: Routes = [
  { path: 'flower-form', component: FlowerFormComponent, title: 'Добавление цветов' },
  { path: '', component: FlowersTableComponent, title: 'Каталог цветов' }
];
