import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsComponent } from '../src/app/comments/comments.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

xdescribe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, CommentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;

    component.comments = [
      { name: 'Bob Fossil', comment: 'This is a test comment' },
    ];

    fixture.detectChanges();
  });

  it('should render the initial comment list', () => {
    fixture.detectChanges();
    const list = compiled.querySelectorAll('.comment-container li');

    expect(list.length).toBe(1);
    expect(list[0].textContent).toContain('Bob Fossil');
  });

  it('should add a comment to the list when form is submitted with valid inputs', () => {
    const nameInput = fixture.debugElement.query(By.css('#name'))
      .nativeElement as HTMLInputElement;
    const commentInput = fixture.debugElement.query(By.css('#comment'))
      .nativeElement as HTMLInputElement;
    const submitButton = fixture.debugElement.query(
      By.css('input[type="submit"]')
    ).nativeElement as HTMLInputElement;

    nameInput.value = 'Max Mustermann';
    commentInput.value = 'This is a test comment';
    nameInput.dispatchEvent(new Event('input'));
    commentInput.dispatchEvent(new Event('input'));

    submitButton.click();
    fixture.detectChanges();

    const list = compiled.querySelectorAll('.comment-container li');
    expect(list.length).toBe(2);
    expect(list[1].textContent).toContain('Max Mustermann');
    expect(list[1].textContent).toContain('This is a test comment');
  });

  it('should not add a comment if input fields are empty', () => {
    component.name = '';
    component.comment = '';
    component.addComment();
    fixture.detectChanges();

    const list = compiled.querySelectorAll('.comment-container li');
    expect(list.length).toBe(1);
  });
});
