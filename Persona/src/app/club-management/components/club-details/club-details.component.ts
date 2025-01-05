import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClubService } from '../../services/club.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NgZorroModule } from '../../../shared/Ng-ZorroModules';

@Component({
  selector: 'app-club-details',
  standalone: true,
  imports: [NgZorroModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './club-details.component.html',
  styleUrl: './club-details.component.scss',
  providers: [ClubService, NzMessageService]
})
export class ClubDetailsComponent implements OnInit {
  @Output() clubAdded = new EventEmitter<void>();

  clubForm!: FormGroup;
  suffixId: string = '';
  allLocations: any[] = [];
  selectedLocation: string | null = null;
  allStates: any[] = [];
  selectedStates: string | null = null;
  allSubjects: any[] = []
  allDepartments: any[] = []
  allClubs: any[] = []
  allCategories: any [] = []

  constructor(
    private fb: FormBuilder,
    private clubService: ClubService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.fetchAllClubs();
    this.clubForm = this.fb.group({
      employeeName: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.email]],
      mobile: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      gender: [null, [Validators.required]],
      addressLine1: [null, [Validators.required]],
      addressLine2: [null, [Validators.required]],
      locationId: [null, [Validators.required]],
      stateId: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      departmentId: [null, [Validators.required]],
      subjectId: [null, [Validators.required]],
      clubId: [null, [Validators.required]],
    });
  }

  saveclub(): void {
    if (this.clubForm.valid) {
      console.log(this.clubForm.value)
      const clubData = this.clubForm.value;
      this.clubService.addClubs(clubData).subscribe(
        (response) => {
          this.message.success('Logged out successfully');
          console.log("inside",this.clubForm.value)
          this.clubAdded.emit(); 
          this.ngOnInit();
        },
        (error) => {
          console.error('Error adding employee:', error);
        }
      );
    } else {
      this.message.error('Failed to add employee!')
      console.log('Form is invalid');
    }
  }

  // fetchAllLocations() {
  //   this.locationService.getAllLocations().subscribe((data) => {
  //     this.allLocations = data;
  //     //console.log("locations", this.allLocations)
  //   })
  // }

  // fetchAllStates() {
  //   this.stateService.getAllStates().subscribe((res) => {
  //     this.allStates = res;
  //   }, (error) => {
  //     console.log(error)
  //   })
  // }

  // fetchAllSubjects() {
  //   this.subjectService.getAllSubjects().subscribe((data) => {
  //     this.allSubjects = data;
  //   })
  // }

  // fetchAllDepartments() {
  //   this.departmentService.getAllDepartments().subscribe((data) => {
  //     this.allDepartments = data;
  //   })
  // }

  fetchAllClubs() {
    this.clubService.getAllClubs().subscribe((data) => {
      this.allClubs = data;
    })
  }

  // fetchAllCategories() {
  //   this.categoryService.getAllCategories().subscribe((data) => {
  //     this.allCategories = data;
  //   })
  // }
}
