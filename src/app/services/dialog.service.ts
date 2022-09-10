import { ConfirmDialogComponent } from './../admin/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(){
    this.dialog.open(ConfirmDialogComponent);
  }
}
