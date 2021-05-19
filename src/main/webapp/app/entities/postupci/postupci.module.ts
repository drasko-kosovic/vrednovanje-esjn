import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { PostupciComponent } from './list/postupci.component';
import { PostupciDetailComponent } from './detail/postupci-detail.component';
import { PostupciUpdateComponent } from './update/postupci-update.component';
import { PostupciDeleteDialogComponent } from './delete/postupci-delete-dialog.component';
import { PostupciRoutingModule } from './route/postupci-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  imports: [
    SharedModule,
    PostupciRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
  declarations: [PostupciComponent, PostupciDetailComponent, PostupciUpdateComponent, PostupciDeleteDialogComponent],
  entryComponents: [PostupciDeleteDialogComponent],
})
export class PostupciModule {}
