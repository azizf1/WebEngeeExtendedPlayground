import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedLinksComponent } from './related-links.component';

describe('CommentsComponent', () => {
  let component: RelatedLinksComponent;
  let fixture: ComponentFixture<RelatedLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedLinksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RelatedLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
