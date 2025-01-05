import { Component, OnInit, ViewChild } from '@angular/core';
import { ClubDetailsComponent } from '../club-details/club-details.component';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzTableSize } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from '../../../shared/Ng-ZorroModules';
import { ClubService } from '../../services/club.service';
import { NzTableLayout, NzTablePaginationPosition, NzTablePaginationType } from 'ng-zorro-antd/table';
import { Clubs } from '../../../utils/models';
import { forkJoin, Observable } from 'rxjs';

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
  selector: 'app-club-list',
  standalone: true,
  imports: [NgZorroModule, FormsModule, CommonModule, ReactiveFormsModule, ClubDetailsComponent],
  templateUrl: './club-list.component.html',
  styleUrl: './club-list.component.scss',
  providers: [NzMessageService, NzModalService, NzDrawerService, ClubService]
})
export class ClubListComponent implements OnInit {

  @ViewChild(ClubDetailsComponent) clubDetailsComponent!: ClubDetailsComponent;

  clubDetails: Clubs[] = [];
  studentMembers: any[] = [];
  employeeMembers: any[] = [];
  clubCount: any;
  drawerVisible = false;
  drawerWidth: string = '60%';
  selectedclub: any = null;
  loading = false;
  age: any;
  count: any;

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
    private clubService: ClubService,
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
      footer: [false],
      expandable: [true],
      checkbox: [true],
      fixHeader: [true],
      fixFooter: [true],
      noResult: [true],
      ellipsis: [true],
      simple: [false],
      size: 'small' as NzTableSize,
      paginationType: 'default' as NzTablePaginationType,
      tableScroll: 'scroll' as TableScroll,
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

    this.getclubInfo();

    // Fetch employee members

  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.setDrawerWidth.bind(this));
  }

  getClubStudents(clubId: string) {
    this.clubService.getStudentMembersByClubId(clubId).subscribe(data => {
      this.studentMembers = data.studentMembers;
      this.studentMembers.forEach((student: any) => {
        console.log("student Name:", this.studentMembers);
      });
    });
  }

  getClubEmployees(clubId: string) {
    this.clubService.getEmployeeMembersByClubId(clubId).subscribe((data: any) => {
      this.employeeMembers = data.employeeMembers;
      this.employeeMembers.forEach((employee: any) => {
        console.log("Employee Name:", this.employeeMembers);
      });
    });
  }
  

  getclubInfo(): void {
    this.clubService.getAllClubs().subscribe((data) => {
      this.clubDetails = data;
      this.clubCount = this.clubDetails.length;
      this.count = [];

      const countObservables: Observable<any>[] = [];
      this.clubDetails.forEach(club => {
        const countObservable = this.getTotalCountById(club.clubId.toString());
        countObservables.push(countObservable);
      });
      forkJoin(countObservables).subscribe((counts: any[]) => {
        this.count = counts.map((response: any) => response.totalMembers);
        console.log('Fetched counts:', this.count); // Debugging log
      });
    });
  }



  getTotalCountById(clubId: string): Observable<any> {
    return this.clubService.getTotalCountById(clubId);
  }

  trackByClubId(index: number, club: any): string {
    return club.clubId;
  }


  handleOk(): void {
    this.clubDetailsComponent.saveclub();
    this.clubDetailsComponent.clubAdded.subscribe(() => {
      this.getclubInfo();
      this.isVisible = false;
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  openClubDetails(clubId: any): void {
    this.drawerVisible = true;

    this.clubService.getClubById(clubId).subscribe((data) => {
      this.selectedclub = data
    });

    this.getClubStudents(clubId);
    this.getClubEmployees(clubId);

    //     if (this.selectedclub.dateOfBirth) {
    //       this.selectedclub.age = this.calculateAge(this.selectedclub.dateOfBirth);
    //     } else {
    //       console.warn('Date of birth not available for the selected teacher.');
    //     }

    //     console.log("club details:", this.selectedclub);
    //   },
    //   (error) => {
    //     console.error('Error fetching club details:', error);
    //   }
    // );
  }

  trackByclubId(index: number, club: any): string {
    return club.clubId;
  }

  setDrawerWidth(): void {
    const width = window.innerWidth;

    if (width <= 576) {
      this.drawerWidth = '100%';
    } else if (width <= 768) {
      this.drawerWidth = '90%';
    } else {
      this.drawerWidth = '90%';
    }
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  updateItem() {

  }

  deleteItem() {

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
