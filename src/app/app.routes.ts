import { Routes } from '@angular/router';
import {FlowersTableComponent} from './components/flowers-table/flowers-table.component';
import {FlowerCreateComponent} from './components/flower-create/flower-create.component';
import {FlowerEditComponent} from './components/flower-edit/flower-edit.component';

export const routes: Routes = [
  { path: '', component: FlowersTableComponent, title: 'Каталог цветов' },
  { path: 'flower-create', component: FlowerCreateComponent, title: 'Добавление цветов' },
  { path: 'flower-edit', component: FlowerEditComponent, title: 'Изменение цветов' }
];
