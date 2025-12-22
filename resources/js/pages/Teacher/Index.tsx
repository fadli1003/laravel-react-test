import ModalKonfirmasi from '@/components/tambahan/confirm-modal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Eye, PenBox, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teacher',
        href: route('teacher.index'),
    },
];
interface Tenant {
    id: number;
    school_name: string;
}
interface Teacher {
    id: number;
    tenant_id: string;
    nama_lengkap: string;
    panggilan: string;
    subject: string;
    tenant: Tenant | null;
}
interface FormErrors {
  nama_lengkap?: string;
  panggilan?: string;
  subject?: string;
  tenant_id?: string;
}
const emptyForm = {
    nama_lengkap: '',
    panggilan: '',
    subject: '',
    tenant_id: '',
};
type FormState = typeof emptyForm & { id?: number };

export default function Index() {
    const { teachers, tenants, sukses } = usePage<{
        teachers?: Teacher[];
        tenants?: Tenant[];
        sukses?: string;
    }>().props;
    const teacherList = teachers ?? [];
    console.log(tenants, teacherList, sukses);

    const [errors, setErrors] = useState<FormErrors>({});
    const [form, setForm] = useState<FormState>(emptyForm);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [confirm, setConfirm] = useState(false);


    const handleOpendAdd = () => {
        setForm(emptyForm);
        setIsEdit(false);
        setOpen(true);
    };

    const handleOpenEdit = (teacher: Teacher) => {
        setForm({
            id: teacher.id,
            nama_lengkap: teacher.nama_lengkap,
            panggilan: teacher.panggilan,
            subject: teacher.subject,
            tenant_id: teacher.tenant_id,
        });
        setIsEdit(true);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForm(emptyForm);
        setIsEdit(false);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        // Opsional: hapus error saat user mulai mengetik
        if (errors[name as keyof FormErrors]) {
        setErrors({ ...errors, [name]: undefined });
    }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && form.id) {
            router.put(route('teacher.update', form.id), form, {
                onSuccess: handleClose,
            });
        } else {
            router.post(route('teacher.store'), form, {
                onSuccess: handleClose,
            });
        }
        setErrors({}); // reset error
    };
    console.log(errors)
    function handelDelete(id: number) {
        setSelectedId(id);
        setConfirm(true);
    }
    const confirmDelete = () => {
    if (selectedId) {
        router.delete(route('teacher.destroy', (selectedId)));
    }
        setConfirm(false);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teacher" />
            <Card className="h-full rounded-t-none border-t-0 p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold uppercase max-sm:text-center">
                        Teachers
                    </h2>
                    {sukses && (<div className='text-green-300 text-sm'>{sukses}</div>)}
                    <Button onClick={handleOpendAdd} className="cursor-pointer">
                        <PlusCircle />
                        Add Teacher
                    </Button>
                </div>
                <div className="overflow-x-auto rounded-md">
                    <table className="tabel">
                        <thead className="uppercase">
                            <tr>
                                <th>id</th>
                                <th>nama lengkap</th>
                                <th>panggilan</th>
                                <th>subject</th>
                                <th>sekolah</th>
                                <th className='text-center'>aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teacherList.map((teacher) => (
                                <tr
                                    key={teacher.id}
                                    className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700"
                                >
                                    <td>{teacher.id}</td>
                                    <td>{teacher.nama_lengkap}</td>
                                    <td>{teacher.panggilan}</td>
                                    <td>{teacher.subject}</td>
                                    <td>
                                        {teacher.tenant?.school_name}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3 justify-center">
                                            <Eye
                                                className="size-8 cursor-pointer rounded-md bg-slate-200 p-1 hover:bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-700"
                                            />
                                            <PenBox
                                                className="size-8 cursor-pointer rounded-sm bg-green-300 p-1 text-gray-800 hover:bg-green-400"
                                                onClick={() =>
                                                    handleOpenEdit(teacher)
                                                }
                                            />
                                            <Trash2
                                                className="size-[32px] cursor-pointer rounded-sm bg-red-600 p-1 text-gray-100 hover:bg-red-700"
                                                onClick={() =>
                                                    handelDelete(teacher.id)
                                                }
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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? 'Update Teacher' : 'Add Teacher'}
                        </DialogTitle>
                        <DialogDescription />
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4.5">
                        <div className="mt-2 flex flex-col space-y-3">
                            <Label htmlFor="nama_lengkap">Nama lengkap</Label>
                            <Input
                                id="nama_lengkap"
                                name="nama_lengkap"
                                value={form.nama_lengkap}
                                onChange={handleChange}
                                required
                            />
                            {errors.nama_lengkap && (<div className='text-red-500 text-sm mt-1'>{errors.nama_lengkap[0]}</div>)}
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Label htmlFor="panggilan">Nama panggilan</Label>
                            <Input
                                id="panggilan"
                                name="panggilan"
                                value={form.panggilan}
                                onChange={handleChange}
                                required
                            />
                            {errors.panggilan && (<div className='text-red-500 text-sm mt-1'>{errors.panggilan[0]}</div>)}
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                required
                            />
                            {errors.subject && (<div className='text-red-500 text-sm mt-1'>{errors.subject[0]}</div>)}
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Label htmlFor="tenant_id">Nama Sekolah</Label>
                            <select
                                id="tenant_id"
                                name="tenant_id"
                                value={form.tenant_id}
                                onChange={handleChange}
                                // readOnly={!isEdit}
                                required={isEdit}
                                className="w-full cursor-pointer rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-1 dark:border-neutral-800 dark:bg-neutral-950"
                            >
                                {tenants?.map((tenant) => (
                                    <option key={tenant.id} value={tenant.id}>
                                        {tenant.school_name}
                                    </option>
                                )) || null}
                            </select>
                            {errors.tenant_id && (<div className='text-red-500 text-sm mt-1'>{errors.tenant_id}</div>)}
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                className="cursor-pointer"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="cursor-pointer">
                                {isEdit ? 'Update' : 'Add'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <ModalKonfirmasi open={confirm} onConfirm={confirmDelete} onClose={() => setConfirm(false)} />
        </AppLayout>
    );
}
