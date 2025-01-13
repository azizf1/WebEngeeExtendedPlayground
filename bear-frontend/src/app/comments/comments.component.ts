import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  showComments = true;
  name = '';
  comment = '';
  comments: Array<{ name: string; comment: string }> = [
    {
      name: 'Bob Fossil',
      comment:
        'Oh I am so glad you taught me all about the big brown angry guys in the woods. With their sniffing little noses and their bad attitudes, they can sure be a menace — I was thinking of putting them all in a truck and driving them outta here. I run a zoo, you know.',
    },
  ];

  toggleComments(): void {
    this.showComments = !this.showComments;
  }

  addComment(): void {
    if (this.name !== '' && this.comment !== '') {
      this.comments.push({ name: this.name, comment: this.comment });
      this.name = '';
      this.comment = '';
    }
  }
}
