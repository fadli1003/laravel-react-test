import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import { route } from 'ziggy-js';
import { PenBox, Trash2 } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teacher',
        href: '/teacher',
    },
];
interface Teacher {
        teacher_id: number;
        tenant_id: number;
        nama_lengkap: string;
        panggilan: string;
        subject: string;
    }

const emptyForm = { nama_lengkap: '', panggilan: '', subject: ''}

type FormState = typeof emptyForm & { id?: number }

export default function Index() {
    const { teachers } = usePage<{teachers?: Teacher[]}>().props;
    const teacherList = teachers ?? [];

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [isEdit, setIsEdit] = useState(false);

    const handleOpendAdd = () => {
        setForm(emptyForm);
        setIsEdit(false);
        setOpen(true);
    }

    const handleOpenEdit = (teacher : Teacher) => {
        setForm({
            id: teacher.teacher_id,
            nama_lengkap: teacher.nama_lengkap,
            panggilan: teacher.panggilan,
            subject: teacher.subject
        });
        setIsEdit(true);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setForm(emptyForm);
        setIsEdit(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && form.id) {
            router.put(route('pengguna.update', form.id), form, { onSuccess: handleClose });
        } else {
            router.post(route('pengguna.store'), form, { onSuccess : handleClose });
        }
    }

    function handelDelete(id: number) {
        if (confirm('Are you sure want to delete this teacher?')) {
            router.delete(route('pengguna.destroy', id));
        }
    }

    // const {errors} = useForm({
    //         id: '',
    //         nama: teachers.nama_lengkap||'',
    //         email: teachers.panggilan||'',
    //         pw: '',
    // });
    // const {props} = usePage();
    // const {sukses} = props as {sukses?: string};

    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Card className='p-6 mt-6'>
                <div className='flex items-center justify-between mb-4'>
                    <Head title="Teacher" />
                    <Button onClick={handleOpendAdd} className='cursor-pointer'>Add Teacher</Button>
                </div>
                <div className="overflow-x-auto rounded-md">
                    <table className='tabel'>
                        <thead className='uppercase'>
                            <tr>
                                <th>id</th>
                                <th>nama lengkap</th>
                                <th>panggilan</th>
                                <th>subject</th>
                                <th>sekolah</th>
                                <th>aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teacherList.map((teacher) => (
                                <tr key={teacher.teacher_id} className='border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700'>
                                    <td>{teacher.teacher_id}</td>
                                    <td>{teacher.nama_lengkap}</td>
                                    <td>{teacher.panggilan}</td>
                                    <td>{teacher.subject}</td>
                                    <td>{teacher.tenant_id}</td>
                                    <td>
                                        <div className='flex gap-3 items-center'>
                                            <PenBox className='size-[32px] cursor-pointer bg-green-300 text-gray-800 p-1 rounded-sm' onClick={() => handleOpenEdit} />
                                            <Trash2 className='size-[32px] cursor-pointer bg-red-600 text-gray-800 p-1 rounded-sm' onClick={() => handelDelete(teacher.teacher_id)} />
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
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div className='space-y-3 flex flex-col mt-2'>
                            <Label htmlFor='nama_lengkap'>Nama lengkap</Label>
                            <Input id='nama_lengkap' name='nama_lengkap' value={form.nama_lengkap} onChange={handleChange} required/>
                            {/* {errors.email && <div className='text-red-500 text-sm mt-1'>{errors.email}</div>} */}
                        </div>
                        <div className='space-y-3 flex flex-col'>
                            <Label htmlFor='panggilan'>Nama panggilan</Label>
                            <Input id='panggilan' name='panggilan' value={form.panggilan} onChange={handleChange} required/>
                        </div>
                        <div className='space-y-3 flex flex-col'>
                            <Label htmlFor='subject'>Subject</Label>
                            <Input id='subject' name='subject' value={form.subject} onChange={handleChange} required/>
                        </div>
                        {/* <div>
                            <Label htmlFor='tenant_id'>Nama Sekolah</Label>
                            <Select name='tenant_id'>
                                <option value={form.tenant_id}>{form.school_name}</option>
                            </Select>
                        </div> */}
                        <div className="flex justify-end gap-3">
                            <Button type='button' variant='outline' onClick={handleClose} className='cursor-pointer'>Cancel</Button>
                            <Button type='submit' className='cursor-pointer'>{isEdit ? 'Update' : 'Add'}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
