import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { IngredientsGrid } from "./ingredients-grid/ingredients-grid";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, IngredientsGrid],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('client');
}
