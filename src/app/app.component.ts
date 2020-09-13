import {Component, OnInit} from '@angular/core';
import {LoadingService} from './services/loading.service';
import {LoadingOverlayService} from './services/overlay/loading-overlay.service';
import {MockAuthService} from './services/mock-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'endava-fb';
  showProductList = true;

  constructor(private authMock: MockAuthService, private loadingService: LoadingService, private cdkOverlayService: LoadingOverlayService) {

  }

  ngOnInit(): void {
    this.authMock.login('custom');
    this.loadingService.count$.subscribe(v => {
      console.log(v);
    });
  }

}
