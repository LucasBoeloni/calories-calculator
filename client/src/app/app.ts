import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('client');
  protected userChanged = signal(false);

  onUserChanged(){
    this.userChanged.update( user => !user)
    setTimeout(() => {
    this.userChanged.update( user => !user)
    });
  }
}
