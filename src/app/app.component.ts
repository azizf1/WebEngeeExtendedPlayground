import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoreBearsComponent } from './more-bears/more-bears.component';
import { MainArticleComponent } from './main-article/main-article.component';
import { CommentsComponent } from './comments/comments.component';
import { RelatedLinksComponent } from './related-links/related-links.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MainArticleComponent,
    CommentsComponent,
    RelatedLinksComponent,
    MoreBearsComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'bearApp';
}
