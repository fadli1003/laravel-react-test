import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm} from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teacher',
        href: route('teacher.index'),
    },
    {
        title: 'Add Teacher',
        href: route('teacher.create'),
    },
];

export default function Create() {

    const {data, setData,errors, post} = useForm({
        id: '',
        nama: '',
        email: '',
        pw: '',
    });
    function submit(e: React.FormEvent){
        e.preventDefault();
        post(route('teacher.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Pengguna" />
                <div className='py-3 px-5'>
                    <h2>Tambahkan pengguna</h2>
                </div>
                <div className='p-5'>
                    <form onSubmit={submit}>
                        <div className='mb-3'>
                            <label className='pl-1'>Nama</label>
                            <input
                              type='text'
                              id='name'
                              name='name'
                              placeholder='Masukkan nama lengkap'
                              value={data.nama}
                              onChange={(e) => setData('nama', e.target.value)}
                              className='w-full py-1.5 px-3 rounded-lg broder-border border-1 ring-0 focus:ring-0 focus:outline-1'
                            />
                            {errors.nama && <div className='text-red-500 text-sm mt-1'>{errors.nama}</div>}
                        </div>
                        <div className='mb-3'>
                            <label className='pl-1'>Email</label>
                            <input type='email'
                              id='email'
                              name='email'
                              placeholder='Masukkan Email'
                              value={data.email}
                              onChange={(e) => setData('email', e.target.value)}
                              className='w-full py-1.5 px-3 rounded-lg broder-border border-1 ring-0 focus:ring-0 focus:outline-1'
                            />
                            {errors.email && <div className='text-red-500 text-sm mt-1'>{errors.email}</div>}
                        </div>
                        <div className='mb-3'>
                            <label className='pl-1'>Password</label>
                            <input type='password' id='password' name='password'
                              placeholder='Masukkan password pengguna'
                              value={data.pw}
                              onChange={(e) => setData('pw', e.target.value)}
                              autoComplete='none'
                              className='w-full py-1.5 px-3 rounded-lg broder-border border-1 ring-0 focus:ring-0 focus:outline-1'
                            />
                            {errors.pw && <div className='text-red-500 text-sm mt-1'>{errors.pw}</div>}
                        </div>
                        <Button>Simpan</Button>
                    </form>
                </div>
        </AppLayout>
    );
}
