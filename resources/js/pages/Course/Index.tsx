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
import AppLayout from '@/layouts/app-layout';
import course from '@/routes/course';
import type { BreadcrumbItem, Course, Teacher, Tenant } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Eye, Loader2, PenBox, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: course.index().url,
    },
];

const emptyForm = { teacher_id: '', tenant_id: '', course_name: '' };
type FormState = typeof emptyForm & { id?: number };

export default function Index() {
    const { courses, tenants, teachers } = usePage<{
        courses?: Course[];
        tenants?: Tenant[];
        teachers?: Teacher[];
        sukses?: string;
    }>().props;
    const coursesList = courses ?? [];

    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const form = useForm<FormState>(emptyForm);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleOpenAdd = () => {
        form.setData(emptyForm);
        setIsEdit(false);
        setOpen(true);
        setIsAdd(true);
        setIsShow(false)
    };

    const handleOpenEdit = (course: Course) => {
        form.setData({
            id: course.id,
            tenant_id: course.tenant_id,
            teacher_id: course.teacher_id,
            course_name: course.course_name,
        });
        setSelectedId(course.id);
        setIsShow(false)
        setIsEdit(true);
        setOpen(true);
        setIsAdd(false);
    };

    const handleOpenShow = (course: Course) => {
        form.setData({
            id: course.id,
            tenant_id: course.tenant_id,
            teacher_id: course.teacher_id,
            course_name: course.course_name,
        });
        setIsShow(true);
        setOpen(true);
        setIsAdd(false);
        setIsEdit(false);
    };

    const handleClose = () => {
        setOpen(false);
        setIsAdd(false);
        setIsEdit(false);
        setIsShow(false);
        setSelectedId(null)
        form.reset();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && selectedId) {
            form.put(route('course.update', selectedId), {
                onSuccess: handleClose,
            });
        } else if (isAdd) {
            form.post(route('course.store'), {
                onSuccess: handleClose,
            });
        }
    };
    const handleDelete = (id: number) => {
        setSelectedId(id);
        setConfirm(true);
    };
    const confirmDelete = () => {
        if (selectedId) {
            form.delete(route('course.destroy', selectedId), {
                onSuccess: () => setSelectedId(null),
            });
        }
        setConfirm(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Course" />
            <Card className="overflow-hidden rounded-t-none border-t-0 px-7 py-5 pb-7 max-md:p-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Course List</h2>
                    <Button
                        onClick={handleOpenAdd}
                        className="w-fit cursor-pointer max-md:mt-2 md:justify-self-end"
                    >
                        <PlusCircle /> Add Course
                    </Button>
                </div>
                <div className="overflow-x-auto rounded-md">
                    <table className="tabel">
                        <thead className="uppercase">
                            <tr>
                                <th>id</th>
                                <th>Course Name</th>
                                <th>School Name</th>
                                <th>Teacher Name</th>
                                <th className="text-center">aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coursesList.map((course) => (
                                <tr
                                    key={course.id}
                                    onClick={() => handleOpenShow(course)}
                                    className="cursor-pointer border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700 capitalize"
                                >
                                    <td>{course.id}</td>
                                    <td>{course.course_name}</td>
                                    <td>{course.tenant?.school_name}</td>
                                    <td>{course.teacher?.nama_lengkap}</td>
                                    <td className='pointer-events-none'>
                                        <div className="flex items-center justify-center gap-3 ">
                                            <Eye
                                                className="btn-show"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleOpenShow(course)
                                                }}
                                            />
                                            <PenBox
                                                className="btn-edit"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleOpenEdit(course)
                                                }}
                                            />
                                            <Trash2
                                                className="btn-delete"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleDelete(course.id)
                                                }}
                                            />
                                        </div>
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
                                ? 'Update Course'
                                : isAdd
                                  ? 'Add Course'
                                  : 'Course Information'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="mt-2 flex flex-col space-y-3">
                            <Label htmlFor="course_name">Course Name</Label>
                            <Input
                                id="course_name"
                                name="course_name"
                                value={form.data.course_name}
                                onChange={(e) =>
                                    form.setData('course_name', e.target.value)
                                }
                                disabled={isShow}
                            />
                            {form.errors.course_name && (
                                <div className="text-sm text-red-500">
                                    {form.errors.course_name}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Label htmlFor="tenant_id">School Name</Label>
                            <select
                                id="tenant_id"
                                name="tenant_id"
                                value={form.data.tenant_id}
                                onChange={(e) =>
                                    form.setData('tenant_id', e.target.value)
                                }
                                disabled={isShow}
                                className="cursor-pointer rounded-md border px-3 py-2 text-sm focus:outline-0 disabled:cursor-auto disabled:text-gray-500 dark:bg-neutral-950"
                            >
                                {!isEdit && (
                                    <option value="">Choose School</option>
                                )}
                                {tenants?.map((tenant) => (
                                    <option
                                        key={tenant.id}
                                        value={String(tenant.id)}
                                    >
                                        {tenant.school_name}
                                    </option>
                                ))}
                            </select>
                            {form.errors.tenant_id && (
                                <div className="text-sm text-red-500">
                                    {form.errors.tenant_id}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Label htmlFor="teacher_id">Teacher's Name</Label>
                            <select
                                id="teacher_id"
                                name="teacher_id"
                                value={form.data.teacher_id}
                                onChange={(e) =>
                                    form.setData('teacher_id', e.target.value)
                                }
                                // required={isEdit && isAdd}
                                disabled={isShow}
                                className="cursor-pointer rounded-md border px-3 py-2 text-sm focus:outline-0 disabled:cursor-auto disabled:text-gray-500 dark:bg-neutral-950"
                            >
                                {!isEdit && (
                                    <option value="">
                                        Choose Teacher's Name
                                    </option>
                                )}
                                {teachers?.map((teacher) => (
                                    <option
                                        key={teacher.id}
                                        value={String(teacher.id)}
                                    >
                                        {teacher.nama_lengkap}
                                    </option>
                                ))}
                            </select>
                            {form.errors.teacher_id && (
                                <div className="text-sm text-red-500">
                                    {form.errors.teacher_id}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end gap-3">
                            {(isEdit || isAdd) && (
                                <Button
                                    type="submit"
                                    className="cursor-pointer"
                                    disabled={form.processing}
                                >
                                    {form.processing
                                        ? isEdit
                                            ? 'Updating...'
                                            : 'Saving...'
                                        : isEdit
                                          ? 'Update'
                                          : 'Add'}
                                    {form.processing && (
                                        <Loader2 className="animate-spin" />
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
                open={confirm}
                onConfirm={confirmDelete}
                onClose={() => setConfirm(false)}
            />
        </AppLayout>
    );
}
