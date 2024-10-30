import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { Produit } from '../models/produit';
import { TriComponent } from '../tri/tri.component';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  imports: [CommonModule, FormsModule, TriComponent],
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {
  produits: Produit[] = [];
  displayedProduits: Produit[] = [];

  rowsPerPage = 10;
  currentPage = 1;
  search = "";

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getProduits().subscribe((data) => {
      this.produits = data;
      this.updateDisplayedProduits();
    });
  }

  updateDisplayedProduits(): void {
    let filtered = this.produits.filter(produit =>
      produit.nom.toLowerCase().includes(this.search.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    this.displayedProduits = filtered.slice(startIndex, startIndex + this.rowsPerPage);
  }

  onSearchTermChange(searchTerm: string): void {
    this.search = searchTerm;
    this.currentPage = 1;
    this.updateDisplayedProduits();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayedProduits();
  }

  onRowsPerPageChange(rowsPerPage: number): void {
    this.rowsPerPage = rowsPerPage;
    this.currentPage = 1;
    this.updateDisplayedProduits();
  }

  get totalPages(): number {
    const filteredLength = this.produits.filter(produit =>
      produit.nom.toLowerCase().includes(this.search.toLowerCase())
    ).length;
    return Math.ceil(filteredLength / this.rowsPerPage) || 1;
  }
}
