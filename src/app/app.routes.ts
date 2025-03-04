import { Routes } from '@angular/router';
import {FlowersTableComponent} from './components/flowers-table/flowers-table.component';
import {FlowerFormComponent} from './components/flower-form/flower-form.component';
import {FlowerEditComponent} from './components/flower-edit/flower-edit.component';

export const routes: Routes = [
  { path: '', component: FlowersTableComponent, title: 'Каталог цветов' },
  { path: 'flower-form', component: FlowerFormComponent, title: 'Добавление цветов' },
  { path: 'flower-edit', component: FlowerEditComponent, title: 'Изменение цветов' }
];
