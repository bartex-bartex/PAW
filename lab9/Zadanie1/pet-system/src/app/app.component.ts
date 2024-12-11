import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimalListComponent } from '../components/animal-list/animal-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AnimalListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pet System';
}
