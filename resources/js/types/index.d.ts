import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
    subItem?: SubItem[];
}
// adding type
interface SubItem {
    subTitle?: string;
    href?: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    created_at: string;
    updated_at: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    [key: string]: unknown; // This allows for additional properties...
}

export type DashboardType = {
    schoolName: string;
    enrollment?: number;
    totalCourses?: number;
    totalStudents?: number;
    totalTeachers?: number;
    totalSubjects?: number;
};

export interface Tenant {
    id: number;
    address?: string;
    school_name: string;
    school_email?: string;
}

// khusus karena Teacher index menggunakan useState utk form
export interface Teacher {
    id: number;
    nama_lengkap: string;
}

export interface Student {
    id: number;
    nama_lengkap: string;
    panggilan?: string;
    grade?: string;
    tenant?: Tenant | null;
    tenant_id?: string;
}

export interface Course {
    id: number;
    course_name: string;
    teacher_id?: string;
    tenant_id?: string;
    teacher?: Teacher | null;
    tenant?: Tenant | null;
}

export interface Enrollment {
    id: number;
    course?: Course;
    tenant?: Tenant;
    student?: Student;
    tenant_id: number;
    course_id?: number;
    student_id?: number;
    enrollment_date?: string;
}
