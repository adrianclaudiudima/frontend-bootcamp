import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {
  }

  public showGenericErrorSnackBar(): void {
    this.snackBar.open('Something has happened to your request.', 'Okay', {
      duration: 2000
    });
  }
}
