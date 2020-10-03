import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  public showGenericErrorSnackBar(): void {
    this.snackBar.open('Something has happened to your request.', 'Okay', {
      duration: 2000,
    });
  }

  public showCustomSnackBar(text: string): void {
    this.snackBar.open(text, 'Okay', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  public showErrorSnackBar(text): void {
    this.snackBar.open(text, 'Okay', {
      duration: 3000,
    });
  }
}
