import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared-service.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  showCards: boolean = false;
  articles: any[] = [];
  displayedArticles: any[] = [];
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  currentPage: number = 1;
  isDarkTheme = false;

  constructor(private sharedService: SharedService, private themeService: ThemeService, private router: Router) {
    this.sharedService.showCards$.subscribe((value) => {
      this.showCards = value;
    });
    this.sharedService.articles$.subscribe((articles) => {
      this.showCards = true;
      this.articles = articles;
      this.loadArticles();
    });
    this.themeService.isDarkTheme.subscribe((isDark) => {
      this.isDarkTheme = isDark;
    });
  }

  ngOnInit(): void {}

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadArticles();
  }

  loadArticles(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedArticles = this.articles.slice(startIndex, endIndex);
  }

  redirectToDetail(article: any): void {
    if (article && article.url) {
      window.open(article.url, '_blank');
    }
  }
}
