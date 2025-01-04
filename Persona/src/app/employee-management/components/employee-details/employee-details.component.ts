import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgZorroModule } from '../../../shared/Ng-ZorroModules';
import { EmployeeService } from '../../services/employee.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DepartmentService } from '../../../department-management/services/department.service';
import { ClubService } from '../../../club-management/services/club.service';
import { SubjectService } from '../../../subject-management/services/subject.service';
import { StateService } from '../../../state-management/services/state.service';
import { LocationService } from '../../../location-management/services/location.service';
import { CategoryService } from '../../../category-management/services/category.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [NgZorroModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  providers: [EmployeeService, LocationService, StateService, NzMessageService]
})
export class EmployeeDetailsComponent implements OnInit {
  @Output() employeeAdded = new EventEmitter<void>();

  employeeForm!: FormGroup;
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
    private employeeService: EmployeeService,
    private locationService: LocationService,
    private stateService: StateService,
    private subjectService: SubjectService,
    private departmentService: DepartmentService,
    private clubService: ClubService,
    private categoryService: CategoryService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.fetchAllLocations();
    this.fetchAllStates();
    this.fetchAllSubjects();
    this.fetchAllDepartments();
    this.fetchAllClubs();
    this.fetchAllCategories();
    this.employeeForm = this.fb.group({
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

  saveEmployee(): void {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value)
      const employeeData = this.employeeForm.value;
      this.employeeService.addEmployee(employeeData).subscribe(
        (response) => {
          this.message.success('Logged out successfully');
          console.log("inside",this.employeeForm.value)
          this.employeeAdded.emit(); 
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

  fetchAllLocations() {
    this.locationService.getAllLocations().subscribe((data) => {
      this.allLocations = data;
      //console.log("locations", this.allLocations)
    })
  }

  fetchAllStates() {
    this.stateService.getAllStates().subscribe((res) => {
      this.allStates = res;
      //console.log("states", this.allStates)
    }, (error) => {
      console.log(error)
    })
  }

  fetchAllSubjects() {
    this.subjectService.getAllSubjects().subscribe((data) => {
      this.allSubjects = data;
      //console.log("Subjects", this.allSubjects)
    })
  }

  fetchAllDepartments() {
    this.departmentService.getAllDepartments().subscribe((data) => {
      this.allDepartments = data;
      //console.log("Departments", this.allDepartments)
    })
  }

  fetchAllClubs() {
    this.clubService.getAllClubs().subscribe((data) => {
      this.allClubs = data;
      //console.log("Clubs", this.allClubs)
    })
  }

  fetchAllCategories() {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.allCategories = data;
      //console.log("Categories", this.allCategories)
    })
  }
}
