import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';

@Component({
  standalone: true,
  imports: [RouterOutlet, ListeComponent, CommonModule, HttpClientModule],
  providers: [ApiService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private apiService = inject(ApiService);

  constructor() {
    // Now ApiService can be used directly
    this.apiService.getProduits().subscribe(data => {
      console.log(data);
    });
  }
}

