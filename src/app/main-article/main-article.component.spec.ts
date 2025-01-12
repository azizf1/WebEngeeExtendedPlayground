import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { MainArticleComponent } from './main-article.component';

describe('ArticleComponent', () => {
  let component: MainArticleComponent;
  let fixture: ComponentFixture<MainArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainArticleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
