import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuComponent} from '../../components/menu/menu.component';
import {ScreenSizeService} from '../../../services/screen-size.service';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [MenuComponent, RouterOutlet],
})
export class DashboardComponent {
  isMobile = computed(() => this.screenSize.isMobile());

  constructor(private screenSize: ScreenSizeService) {}
}
