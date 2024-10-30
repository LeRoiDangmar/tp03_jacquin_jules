import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tri',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tri.component.html',
  styleUrls: ['./tri.component.css']
})
export class TriComponent {
  @Output() searchTermChange = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() rowsPerPageChange = new EventEmitter<number>();

  @Input() totalPages: number = 1;

  rowsPerPage = 10;
  currentPage = 1;
  search = "";

  changeRows(count: number): void {
    this.rowsPerPage = count;
    this.currentPage = 1;
    this.rowsPerPageChange.emit(this.rowsPerPage);
    this.pageChange.emit(this.currentPage);
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.searchTermChange.emit(this.search);
    this.pageChange.emit(this.currentPage);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }
}
