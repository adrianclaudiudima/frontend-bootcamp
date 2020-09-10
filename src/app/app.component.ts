import {Component, OnInit} from '@angular/core';
import {LoadingService} from './services/loading.service';
import {LoadingOverlayService} from './services/overlay/loading-overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'endava-fb';
  showProductList = true;

  constructor(private loadingService: LoadingService, private cdkOverlayService: LoadingOverlayService) {

  }

  ngOnInit(): void {
    this.loadingService.count$.subscribe(v => {
      console.log(v);
    });
  }

}
