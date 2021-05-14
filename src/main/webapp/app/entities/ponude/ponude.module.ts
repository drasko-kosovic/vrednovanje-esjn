import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { PonudeComponent } from './list/ponude.component';
import { PonudeDetailComponent } from './detail/ponude-detail.component';
import { PonudeUpdateComponent } from './update/ponude-update.component';
import { PonudeDeleteDialogComponent } from './delete/ponude-delete-dialog.component';
import { PonudeRoutingModule } from './route/ponude-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    SharedModule,
    PonudeRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatTableExporterModule,
    MatSortModule,
    MatInputModule,
  ],
  declarations: [PonudeComponent, PonudeDetailComponent, PonudeUpdateComponent, PonudeDeleteDialogComponent],
  entryComponents: [PonudeDeleteDialogComponent],
})
export class PonudeModule {}
