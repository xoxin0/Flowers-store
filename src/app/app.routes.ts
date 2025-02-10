import { Routes } from '@angular/router';
import {FlowersTableComponent} from './components/flowers-table/flowers-table.component';
import {FlowerFormComponent} from './components/flower-form/flower-form.component';

export const routes: Routes = [
  { path: '', component: FlowerFormComponent, title: 'Добавление цветов' },
  { path: 'flowers-table', component: FlowersTableComponent, title: 'Таблица цветов' }
];
