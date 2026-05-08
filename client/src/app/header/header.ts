import { Component, inject, OnInit, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from '../user/user';
import { finalize } from 'rxjs';
import { UserModel } from '../user/user.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIcon,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    FormsModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  protected service = inject(User);
  protected users = signal<UserModel[]>([]);
  protected isLoading = signal(false);
  protected selectedUser = signal<UserModel>(null);
  public userChanged = output();
  private router = inject(Router);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.service
      .getAll()
      .pipe(finalize(() => {}))
      .subscribe({
        next: (value) => {
          this.users.set(value);
          this.isLoading.set(false);
          const selectedUser = localStorage.getItem('selectedUser');
          if (!!selectedUser) {
            const parsedUser = JSON.parse(selectedUser);
            this.selectedUser.set(this.users().filter(a => a.id === parsedUser.id)[0]);
          }
        },
      });
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  onSelect() {
    localStorage.setItem('selectedUser', JSON.stringify(this.selectedUser()));
    this.userChanged.emit();
  }
}
