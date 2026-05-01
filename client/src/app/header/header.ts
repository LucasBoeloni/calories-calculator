import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from '../user/user';
import { finalize } from 'rxjs';
import { UserModel } from '../user/user.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIcon, MatButtonModule, MatSelectModule, MatTooltipModule, MatProgressSpinnerModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  protected service = inject(User);
  protected users = signal<UserModel[]>([]);
  protected isLoading = signal(false);
  private router = inject(Router)

  ngOnInit(): void {
    this.isLoading.set(true);
    this.service
      .getAll()
      .pipe(finalize(() => {}))
      .subscribe({
        next: (value) => {
          this.users.set(value);
          this.isLoading.set(false);
        },
      });
  }

  navigate(route: string){
    this.router.navigate([route])
  }
}
