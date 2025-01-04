import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzTableLayout, NzTablePaginationPosition, NzTablePaginationType, NzTableSize } from 'ng-zorro-antd/table';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { Employees } from '../../../utils/models';
import { EmployeeService } from '../../services/employee.service';
import { NgZorroModule } from '../../../shared/Ng-ZorroModules';



interface ItemData {
  name: string;
  age: number | string;
  address: string;
  checked: boolean;
  expand: boolean;
  description: string;
  disabled?: boolean;
}

type TableScroll = 'unset' | 'scroll' | 'fixed';

interface Setting {
  bordered: boolean;
  loading: boolean;
  pagination: boolean;
  sizeChanger: boolean;
  title: boolean;
  header: boolean;
  footer: boolean;
  expandable: boolean;
  checkbox: boolean;
  fixHeader: boolean;
  fixFooter: boolean;
  noResult: boolean;
  ellipsis: boolean;
  simple: boolean;
  size: NzTableSize;
  tableScroll: TableScroll;
  tableLayout: NzTableLayout;
  position: NzTablePaginationPosition;
  paginationType: NzTablePaginationType;
}

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [NgZorroModule, FormsModule, CommonModule, ReactiveFormsModule, EmployeeDetailsComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  providers: [NzMessageService, NzModalService, NzDrawerService, EmployeeService]
})
export class EmployeeListComponent implements OnInit {

  @ViewChild(EmployeeDetailsComponent) employeeDetailsComponent!: EmployeeDetailsComponent;

  employeeDetails: Employees[] = [];
  employeeCount: any;
  drawerVisible = false;  
  drawerWidth: string = '60%';
  selectedEmployee: any = null;
  loading = false;
  age: any

  settingForm: FormGroup<{ [K in keyof Setting]: FormControl<Setting[K]> }>;
  listOfData: readonly ItemData[] = [];
  displayData: readonly ItemData[] = [];
  allChecked = false;
  indeterminate = false;
  fixedColumn = false;
  scrollX: string | null = null;
  scrollY: string | null = null;
  settingValue: Setting;
  listOfSwitch = [
    { name: 'Bordered', formControlName: 'bordered' },
    { name: 'Loading', formControlName: 'loading' },
    { name: 'Pagination', formControlName: 'pagination' },
    { name: 'PageSizeChanger', formControlName: 'sizeChanger' },
    { name: 'Title', formControlName: 'title' },
    { name: 'Column Header', formControlName: 'header' },
    { name: 'Footer', formControlName: 'footer' },
    { name: 'Expandable', formControlName: 'expandable' },
    { name: 'Checkbox', formControlName: 'checkbox' },
    { name: 'Fixed Header', formControlName: 'fixHeader' },
    { name: 'Fixed Footer', formControlName: 'fixFooter' },
    { name: 'No Result', formControlName: 'noResult' },
    { name: 'Ellipsis', formControlName: 'ellipsis' },
    { name: 'Simple Pagination', formControlName: 'simple' }
  ];

  listOfRadio = [
    {
      name: 'Size',
      formControlName: 'size',
      listOfOption: [
        { value: 'default', label: 'Default' },
        { value: 'middle', label: 'Middle' },
        { value: 'small', label: 'Small' }
      ]
    },
    {
      name: 'Table Scroll',
      formControlName: 'tableScroll',
      listOfOption: [
        { value: 'unset', label: 'Unset' },
        { value: 'scroll', label: 'Scroll' },
        { value: 'fixed', label: 'Fixed' }
      ]
    },
    {
      name: 'Table Layout',
      formControlName: 'tableLayout',
      listOfOption: [
        { value: 'auto', label: 'Auto' },
        { value: 'fixed', label: 'Fixed' }
      ]
    },
    {
      name: 'Pagination Position',
      formControlName: 'position',
      listOfOption: [
        { value: 'top', label: 'Top' },
        { value: 'bottom', label: 'Bottom' },
        { value: 'both', label: 'Both' }
      ]
    },
    {
      name: 'Pagination Type',
      formControlName: 'paginationType',
      listOfOption: [
        { value: 'default', label: 'Default' },
        { value: 'small', label: 'Small' }
      ]
    }
  ];
  data: any;

  currentPageDataChange($event: readonly ItemData[]): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const validData = this.displayData.filter(value => !value.disabled);
    const allChecked = validData.length > 0 && validData.every(value => value.checked);
    const allUnChecked = validData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  generateData(): readonly ItemData[] {
    const data: ItemData[] = [];
    for (let i = 1; i <= 100; i++) {
      data.push({
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        checked: false,
        expand: false
      });
    }
    return data;
  }

  constructor(private formBuilder: NonNullableFormBuilder,
    private modal: NzModalService,
    private employeeService: EmployeeService,
    private nzMessageService: NzMessageService,
    private nzDrawerService: NzDrawerService
  ) {
    this.settingForm = this.formBuilder.group({
      bordered: [false],
      loading: [false],
      pagination: [true],
      sizeChanger: [false],
      title: [true],
      header: [true],
      footer: [true],
      expandable: [true],
      checkbox: [true],
      fixHeader: [true],
      fixFooter: [true],
      noResult: [true],
      ellipsis: [true],
      simple: [false],
      size: 'small' as NzTableSize,
      paginationType: 'default' as NzTablePaginationType,
      tableScroll: 'unset' as TableScroll,
      tableLayout: 'auto' as NzTableLayout,
      position: 'bottom' as NzTablePaginationPosition
    });

    this.settingValue = this.settingForm.value as Setting;
  }

  ngOnInit(): void {
    this.setDrawerWidth();
    window.addEventListener('resize', this.setDrawerWidth.bind(this));
    this.settingForm.valueChanges.subscribe(value => {
      this.settingValue = value as Setting;
    });
    this.settingForm.controls.tableScroll.valueChanges.subscribe(scroll => {
      this.fixedColumn = scroll === 'fixed';
      this.scrollX = scroll === 'scroll' || scroll === 'fixed' ? '100vw' : null;
    });
    this.settingForm.controls.fixHeader.valueChanges.subscribe(fixed => {
      this.scrollY = fixed ? '240px' : null;
    });
    this.settingForm.controls.noResult.valueChanges.subscribe(empty => {
      if (empty) {
        this.listOfData = [];
      } else {
        this.listOfData = this.generateData();
      }
    });
    this.listOfData = this.generateData();

    this.getEmployeeInfo()
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.setDrawerWidth.bind(this));
  }

  getEmployeeInfo(): void {
    this.employeeService.getAllEmployees().subscribe((data) => {
      this.employeeDetails = data;
      this.employeeCount = this.employeeDetails.length;
    });
  }

  handleOk(): void {
    this.employeeDetailsComponent.saveEmployee();
    this.employeeDetailsComponent.employeeAdded.subscribe(() => {
      this.getEmployeeInfo(); // Refresh teacher list
      this.isVisible = false; // Close the modal
    });
  }

  handleCancel(): void {
    this.isVisible = false; // Close the modal
  }

  openPersonnelDetails(employeeId: any): void {
    this.drawerVisible = true;

    this.employeeService.getEmployeeById(employeeId).subscribe(
      (data: any) => {
        this.selectedEmployee = data;

        // Calculate age if dateOfBirth is available
        if (this.selectedEmployee.dateOfBirth) {
          this.selectedEmployee.age = this.calculateAge(this.selectedEmployee.dateOfBirth);
        } else {
          console.warn('Date of birth not available for the selected teacher.');
        }

        console.log("Employee details:", this.selectedEmployee);
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }

  trackByEmployeeId(index: number, employee: any): string {
    return employee.employeeId;
  }

  setDrawerWidth(): void {
    const width = window.innerWidth;

    // Adjust drawer width based on screen size
    if (width <= 576) {
      this.drawerWidth = '100%'; // Full width for small screens
    } else if (width <= 768) {
      this.drawerWidth = '90%'; // 90% width for medium screens
    } else {
      this.drawerWidth = '60%'; // Default width for larger screens
    }
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  updateItem() {

  }

  deleteItem() {

  }

  calculateAge(dateOfBirth: string | Date): number {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  determineAge(index: number) {
    if (this.employeeDetails[index]?.dateOfBirth) {
      this.age = this.calculateAge(this.employeeDetails[index].dateOfBirth);
    } else {
      console.error('Date of birth is not available for the employee at index:', index);
      this.age = 0; // Or handle it appropriately
    }
  }

  getGenderImage(gender: string | undefined): string {
    if (!gender) {
      console.log(gender)
      return 'assets/images/default.png'; // Provide a default image if gender is undefined
    }
    return gender.toLowerCase() === 'male' ? 'assets/images/male.png' : 'assets/images/female.png';
  }

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

}
