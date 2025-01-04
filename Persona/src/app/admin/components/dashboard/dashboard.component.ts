import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { NgZorroModule } from '../../../shared/Ng-ZorroModules';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgZorroModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  isMobileView: boolean = false;

  ngOnInit(): void {
    this.checkScreenSize();
  }

  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  // Method to check screen size
  checkScreenSize(): void {
    this.isMobileView = window.innerWidth <= 576;
  }
}