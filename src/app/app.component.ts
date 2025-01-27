import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScreenSizeService } from '../services/screen-size.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet],
})
export class AppComponent {
  isMobile = computed(() => this.screenSize.isMobile());

  constructor(private screenSize: ScreenSizeService) {}
}
