import ModalKonfirmasi from '@/components/tambahan/confirm-modal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import type {
    BreadcrumbItem,
    Course,
    Enrollment,
    Student,
    Tenant,
} from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Eye, PenBox, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Enrollment',
        href: route('enrollment.index'),
    },
];

interface FormState {
    id?: number;
    tenant_id?: number;
    student_id?: number;
    course_id?: number;
    name?: string;
    enrollment_date?: string;
}
const emptyForm: FormState = {
    id: undefined,
    tenant_id: undefined,
    student_id: undefined,
    course_id: undefined,
    enrollment_date: '',
};

export default function Index() {
    const { enrollments, students, courses, tenants } = usePage<{
        enrollments?: Enrollment[];
        students?: Student[];
        tenants?: Tenant[];
        courses?: Course[];
    }>().props;
    const enrollmentList = enrollments ?? [];

    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const form = useForm<FormState>(emptyForm);

    const normalizeDate = (date?: string) => {
        if (!date) return '';
        return date.split('T')[0];
    };
    const handleOpenAdd = () => {
        form.reset();
        setIsEdit(false);
        setIsShow(false);
        setIsAdd(true);
        setOpen(true);
    };

    const handleOpenEdit = (enrollment: Enrollment) => {
        form.setData({
            id: enrollment.id,
            tenant_id: enrollment.tenant_id,
            student_id: enrollment.student_id,
            course_id: enrollment.course_id,
            enrollment_date: normalizeDate(enrollment.enrollment_date),
        });
        setIsShow(false);
        setIsEdit(true);
        setOpen(true);
    };

    const handleOpenShow = (enrollment: Enrollment) => {
        form.setData({
            id: enrollment.id,
            tenant_id: enrollment.tenant_id,
            student_id: enrollment.student_id,
            course_id: enrollment.course_id,
            enrollment_date: normalizeDate(enrollment.enrollment_date),
        });
        setIsShow(true);
        setIsEdit(false);
        setIsAdd(false);
        setOpen(true);
    };

    const handleClose = () => {
        form.reset();
        setOpen(false);
        setIsAdd(false);
        setIsEdit(false);
        setIsShow(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && form.data.id) {
            form.put(route('enrollment.update', form.data.id), {
                onSuccess: () => (handleClose(), form.reset()),
            });
        } else if (isAdd) {
            form.post(route('enrollment.store'), {
                onSuccess: () => handleClose(),
            });
        }
    };

    function handelDelete(id: number) {
        setSelectedId(id);
        setIsConfirm(true);
    }
    function confirmDelete() {
        if (selectedId) {
            form.delete(route('enrollment.destroy', selectedId), {
                onSuccess: () => setSelectedId(null),
            });
        }
        setIsConfirm(false);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Enrollment" />
            <Card className="h-full rounded-t-none border-t-0 p-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                        Enrollment Information
                    </h3>
                    <Button onClick={handleOpenAdd} className="cursor-pointer">
                        Add enrollment
                    </Button>
                </div>
                <div className="overflow-x-auto rounded-md">
                    <table className="tabel">
                        <thead className="uppercase">
                            <tr>
                                <th>id</th>
                                <th>School name</th>
                                <th>students</th>
                                <th>courses</th>
                                <th>enrollment date</th>
                                <th className="text-center">aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrollmentList.map((enrollment) => (
                                <tr
                                    key={enrollment.id}
                                    onClick={() => handleOpenShow(enrollment)}
                                    className="cursor-pointer border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700"
                                >
                                    <td>{enrollment.id}</td>
                                    <td>{enrollment.tenant?.school_name}</td>
                                    <td>{enrollment.student?.nama_lengkap}</td>
                                    <td>{enrollment.course?.course_name}</td>
                                    <td>
                                        {normalizeDate(
                                            enrollment.enrollment_date,
                                        )}
                                    </td>
                                    <td className="pointer-events-none flex items-center justify-center gap-3">
                                        <Eye
                                            className="btn-delete"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenShow(enrollment);
                                            }}
                                        />
                                        <PenBox
                                            className="btn-edit"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenEdit(enrollment);
                                            }}
                                        />
                                        <Trash2
                                            className="btn-delete"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handelDelete(enrollment.id);
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle className="text-center">
                            {isEdit
                                ? 'Update Enrollment'
                                : isAdd
                                  ? 'Add Enrollment'
                                  : 'Enrollment Information'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col space-y-3">
                            <Label htmlFor="tenant_id">School Name</Label>
                            <select
                                id="tenant_id"
                                name="tenant_id"
                                value={form.data.tenant_id}
                                onChange={(e) => form.setData('tenant_id', Number(e.target.value))}
                                disabled={isShow}
                                className="input-select"
                            >
                                {!isEdit && (
                                    <option value="">--Choose School--</option>
                                )}
                                {tenants?.map((t, i) => (
                                    <option key={i} value={t.id}>
                                        {t.school_name}
                                    </option>
                                ))}
                            </select>
                            {form.errors.tenant_id && (
                                <div className="mt-1 text-sm text-red-500">
                                    {form.errors.tenant_id}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Label htmlFor="student_id">Student Name</Label>
                            <select
                                id="student_id"
                                name="student_id"
                                value={form.data.student_id}
                                onChange={(e) => form.setData('student_id', Number(e.target.value))}
                                disabled={isShow}
                                className="input-select"
                            >
                                {!isEdit && (
                                    <option value="">--Choose Student Name--</option>
                                )}
                                {students?.map((student, i) => (
                                    <option key={i} value={student.id}>
                                        {student.nama_lengkap}
                                    </option>
                                ))}
                            </select>
                            {form.errors.student_id && (
                                <div className="mt-1 text-sm text-red-500">
                                    {form.errors.student_id}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Label htmlFor="course_id">Course Name</Label>
                            <select
                                id="course_id"
                                name="course_id"
                                value={form.data.course_id}
                                onChange={(e) => form.setData('course_id', Number(e.target.value))}
                                disabled={isShow}
                                className="input-select"
                            >
                                {!isEdit && (
                                    <option value="">--Choose Course Name--</option>
                                )}
                                {courses?.map((course, i) => (
                                    <option key={i} value={course.id}>
                                        {course.course_name}
                                    </option>
                                ))}
                            </select>
                            {form.errors.course_id && (
                                <div className="mt-1 text-sm text-red-500">
                                    {form.errors.course_id}
                                </div>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="enrollment_date">
                                Enrollment Date
                            </Label>
                            <Input
                                id="enrollment_date"
                                name="enrollment_date"
                                type="date"
                                value={form.data.enrollment_date}
                                onChange={(e) => form.setData('enrollment_date', e.target.value)}
                                disabled={isShow}
                            />
                            {form.errors.enrollment_date && (
                                <div className="mt-1 text-sm text-red-500">
                                    {form.errors.enrollment_date}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end gap-3">
                            {!isShow && (
                                <Button
                                    type="submit"
                                    className="cursor-pointer"
                                    disabled={form.processing}
                                >
                                    {form.processing ? (
                                        <>
                                            {isEdit
                                                ? 'Updating...'
                                                : 'Saving...'}
                                            <Spinner />
                                        </>
                                    ) : isEdit ? (
                                        'Update'
                                    ) : (
                                        'Add'
                                    )}
                                </Button>
                            )}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                className="cursor-pointer"
                            >
                                {isShow ? 'Close' : 'Cancel'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <ModalKonfirmasi
                open={isConfirm}
                onConfirm={confirmDelete}
                onClose={() => setIsConfirm(false)}
            />
        </AppLayout>
    );
}
