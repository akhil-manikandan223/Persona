export interface MenuItem {
    title: string;
    icon?: string;
    route?: string;
    children?: MenuItem[];
    breadcrumb?: { title: string, icon: string | null };  // Add this field
}

export const MENU_ITEMS: MenuItem[] = [
    {
        title: 'Dashboard',
        icon: 'dashboard',
        route: '/layout/admin/dashboard',
        breadcrumb: { title: 'Dashboard', icon: 'dashboard' }
    },
    {
        title: 'Grades',
        icon: 'read',
        route: '/layout/grade-management/grade-list',
        breadcrumb: { title: 'Grades', icon: 'read' }
    },
    {
        title: 'Manage Students',
        icon: 'team',
        route: '/layout/students-management/students-list',
        breadcrumb: { title: 'Manage Students', icon: 'team' }
    },
    {
        title: 'Assignments',
        icon: 'file-text',
        route: '/layout/assignment-management/assignment-list',
        breadcrumb: { title: 'Assignments', icon: 'file-text' }
    },
    {
        title: 'Attendance (Students)',
        icon: 'solution',
        route: '/layout/attendance-management/students-attendance',
        breadcrumb: { title: 'Attendance (Students)', icon: 'solution' }
    },
    {
        title: 'Manage Employees',
        icon: 'fund-projection-screen',
        route: '/layout/teachers-management/teachers-list',
        breadcrumb: { title: 'Manage Employees', icon: 'fund-projection-screen' }
    },
    {
        title: 'Attendance (Teachers)',
        icon: 'schedule',
        route: '/layout/attendance-management/teachers-attendance',
        breadcrumb: { title: 'Attendance (Teachers)', icon: 'schedule' }
    },
    {
        title: 'Clubs',
        icon: 'product',
        route: '/layout/club-management/club-list',
        breadcrumb: { title: 'Clubs', icon: 'product' }
    },
    {
        title: 'Profile',
        icon: 'user',
        route: '/layout/profile-management/profile-view',
        breadcrumb: { title: 'Profile', icon: 'user' }
    }
];
