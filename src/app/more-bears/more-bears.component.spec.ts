import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoreBearsComponent } from './more-bears.component';

describe('MoreBearsComponent', () => {
  let component: MoreBearsComponent;
  let fixture: ComponentFixture<MoreBearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreBearsComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MoreBearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
