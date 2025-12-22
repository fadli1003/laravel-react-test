import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { PenBox, Trash2 } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teacher',
        href: '/pengguna',
    },
];
interface Teacher {
        id: number;
        tenant_id: number;
        nama_lengkap: string;
        panggilan: string;
        subject: string;
    }

const emptyForm = { nama_lengkap: '', panggilan: '', subject: '',}

type FormState = typeof emptyForm & { id?: number, tenant_id?: number}

export default function Index({teachers} : { teachers: Teacher[]}) {
    // const { teachers } = usePage<{teachers?: Teacher[] }>().props;
    const teacherList = teachers ?? [];
    const { sukses } = usePage<{sukses?: string }>().props;

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
            id: teacher.id,
            nama_lengkap: teacher.nama_lengkap,
            panggilan: teacher.panggilan,
            subject: teacher.subject,
            tenant_id: teacher.tenant_id,
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
    // const {props} = usePage();
    // const {sukses} = props as {sukses?: string};

    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Teacher" />
            <CardHeader className='flex items-center justify-between mb-4'>
                <Button onClick={handleOpendAdd} className='cursor-pointer'>Add Teacher</Button>
                {sukses && (<div className='text-green-400 text-sm'>{sukses}</div>)}
            </CardHeader>
            <Card className='p-6 mt-6'>
                <div className="overflow-x-auto rounded-md">
                    <table className='tabel'>
                        <thead className='uppercase'>
                            <tr>
                                <th>id</th>
                                <th>nama lengkap</th>
                                <th>panggilan</th>
                                <th>subject</th>
                                <th>sekolah</th>
                                <th style={{textAlign: 'center'}}>aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teacherList.map((teacher) => (
                                <tr key={teacher.id} className='border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700'>
                                    <td>{teacher.id}</td>
                                    <td>{teacher.nama_lengkap}</td>
                                    <td>{teacher.panggilan}</td>
                                    <td>{teacher.subject}</td>
                                    <td>{teacher.tenant_id}</td>
                                    <td>
                                        <div className='flex gap-3 justify-center items-center'>
                                            <PenBox className='size-[32px] cursor-pointer bg-green-300 text-gray-800 p-1 rounded-sm' onClick={() => handleOpenEdit(teacher)} />
                                            <Trash2 className='size-[32px] cursor-pointer bg-red-600 text-gray-800 p-1 rounded-sm' onClick={() => handelDelete(teacher.id)} />
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
                        </div>
                        <div className='space-y-3 flex flex-col'>
                            <Label htmlFor='panggilan'>Nama panggilan</Label>
                            <Input id='panggilan' name='panggilan' value={form.panggilan} onChange={handleChange} required/>
                        </div>
                        <div className='space-y-3 flex flex-col'>
                            <Label htmlFor='subject'>Subject</Label>
                            <Input id='subject' name='subject' type='text' value={form.subject} onChange={handleChange} required/>
                        </div>
                        <div className='space-y-3 flex flex-col'>
                            <Label htmlFor='tenant_id'>Tenant Id</Label>
                            <Input id='tenant_id' name='tenant_id' type='number' value={form.tenant_id} onChange={handleChange} required/>
                        </div>
                        {/* <div>
                            <Label htmlFor='tenant_id'>Nama Sekolah</Label>
                            <select name='tenant_id' required className='w-full border py-1.5 px-2 focus:outline-0 rounded-md cursor-pointer'>
                                <option selected value={form.tenant_id}>1</option>
                                <option value={form.tenant_id}>2</option>
                            </select>
                        </div> */}
                        <div className="flex justify-end gap-3">
                            <Button type='submit' className='cursor-pointer'>{isEdit ? 'Update' : 'Add'}</Button>
                            <Button type='button' variant='outline' onClick={handleClose} className='cursor-pointer'>Cancel</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
