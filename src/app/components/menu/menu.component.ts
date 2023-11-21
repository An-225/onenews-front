// menu.component.ts
import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isDarkTheme = false;

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkTheme.subscribe((isDark) => {
      this.isDarkTheme = isDark;
    });
  }

  toggleDarkTheme() {
    this.themeService.toggleDarkTheme();
  }
}
