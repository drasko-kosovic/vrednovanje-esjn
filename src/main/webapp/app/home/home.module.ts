import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE]), MatFormFieldModule, MatInputModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
