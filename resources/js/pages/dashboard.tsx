import DashboardCard from '@/components/tambahan/DashboardCard';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type DashboardType, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    BookOpen,
    ClipboardList,
    GraduationCap,
    LibraryBig,
    UsersRound,
} from 'lucide-react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const {
        totalStudents,
        totalTeachers,
        totalSubjects,
        schoolName,
        totalCourses,
        enrollment,
    } = usePage<DashboardType>().props;

    const dashboardItem = [
        {
            href: route('student.index'),
            title: 'Student',
            sum: totalStudents,
            icon: <UsersRound className='text-red-400 size-5'/>,
        },
        {
           href: route('course.index'),
            title: 'Course',
            sum: totalCourses,
            icon: <BookOpen className='dark:text-yellow-300 text-yellow-600 size-5'/>,
        },
        {
           href: route('teacher.index'),
            title: 'Teachers',
            sum: totalTeachers,
            icon: <GraduationCap className='text-blue-400 size-5'/>,
        },
        {
           href: route('teacher.index'),
            title: 'Subjects',
            sum: totalSubjects,
            icon: <LibraryBig className='text-amber-400 size-5'/>,
        },
        {
           href: route('enrollment.index'),
            title: 'Enrollment',
            sum: enrollment,
            icon: <ClipboardList className='text-green-400 size-5'/>,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 lg:p-8">
                <div className="mb-3 ml-3 max-w-fit">
                    <h1 className="inline-block bg-linear-to-r from-blue-400 dark:to-blue-100 bg-neutral-700 bg-clip-text text-xl font-semibold text-transparent md:text-2xl">
                        {schoolName ?? 'Unkown'}
                    </h1>
                    <div className="mt-1 h-1 w-[105%] -skew-x-[50deg] bg-linear-to-r from-neutral-700  dark:from-blue-100 to-blue-400 md:h-[.3rem]" />
                </div>
                <div className="dashboard-info">
                    {dashboardItem.map((item, i) => (
                        <DashboardCard
                            key={i}
                            href={item.href}
                            title={item.title}
                            sum={item.sum}
                        >
                            {item.icon}
                        </DashboardCard>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
