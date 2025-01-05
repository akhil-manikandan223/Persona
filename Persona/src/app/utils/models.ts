import { Type } from "@angular/core";

export interface userregister {
    userName: string;
    name: string;
    phone: string;
    email: string;
    password: string;
}

export interface Widget {
    id: number;
    label: string;
    content: Type<unknown>;
    backgroundColor?: string;
    color?: string;
}

export interface Clubs {
    clubId: number
    clubName: string
}

export interface Categories {
    categoryId: number
    categoryName: string
}

export interface Subjects {
    subjectId: number
    subjectName: string
}

export interface Employees {
    checked: any;
    disabled: any;
    employeeName: string;
    employeeId: number;
    gender: string;
    clubName: string;
    departmentName: string;
    addressLine1: string;
    addressLine2: string;
    mobile: string;
    email: string;
    dateOfBirth?: string | Date;
    categoryName: string;
    departmentId?: number;
    department?: {
        departmentId?: number;
        departmentName: string;
    };
    club?: {
        clubId?: number;
        clubName: string;
    };
    subject?: {
        subjectId?: number;
        subjectName: string;
    };
    location?: {
        locationId?: number;
        locationName: string;
    };
    state?: {
        stateId?: number;
        stateName: string;
    };
}

export interface DisplayColumn {
    def: string;
    label: string;
    hide: boolean;
}

export interface Departments {
    departmentId: number;
    departmentName: string;
}

export interface Clubs {
    clubId: number;
    clubName: string;
}