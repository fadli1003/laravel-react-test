import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengguna',
        href: '/pengguna',
    },
    {
        title: 'Edit Pengguna',
        href: '/pengguna',
    }
];
interface Pengguna {
    id: number;
    name: string;
    email: string;
}

export default function Edit({pengguna}: {pengguna: Pengguna}) {

    const {data, setData, errors, put} = useForm({
        id: '',
        nama: pengguna.name||'',
        email: pengguna.email||'',
        pw: '',
    });
    function submit(e :React.FormEvent){
        e.preventDefault();
        put(route('pengguna.update', pengguna.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Pengguna" />
                <div className='py-3 px-5'>
                    <span>Edit pengguna</span>
                </div>
                <div>
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
                              className='input-create'
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
                              className='input-create'
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
                              className='input-create'
                            />
                            {errors.pw && <div className='text-red-500 text-sm mt-1'>{errors.pw}</div>}
                        </div>
                        <Button>Simpan</Button>
                    </form>
                </div>
        </AppLayout>
    );
}
