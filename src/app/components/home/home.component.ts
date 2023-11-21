import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isDarkTheme = false;

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkTheme.subscribe((isDark) => {
      this.isDarkTheme = isDark;
    });
  }
}
