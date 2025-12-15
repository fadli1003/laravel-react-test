import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js'; 
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengguna',
        href: '/pengguna',
    },
];
// interface PageProps {
//         sukses?: string,
//     }

export default function Index({pengguna}) {

    function handelDelete(id: number) {
        if (confirm('Apa anda yakin ingin menghapus pengguna ini?')) {
            router.delete(route('pengguna.destroy', id));
        }
    }
    const {props} = usePage(); 
    const {sukses} = props as {sukses?: string};

    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Pengguna" />
            <div className="px-5 py-4">
                <div className="flex justify-between">
                    <h2 className='font-bold text-xl pt-2'>Tabel Pengguna</h2>
                    {sukses && (<div className='text-green-400 text-sm'>{sukses}</div>)}
                    <Link
                        href={route('pengguna.create')}
                    >
                        <Button className='cursor-pointer'>
                            + Tambah Pengguna
                        </Button>
                    </Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>nama</th>                            
                            <th>email</th>
                            <th>alamat</th>
                            <th>status</th>
                            <th>aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pengguna.map(({id, name, email}) => 
                        <tr className='hover:bg-slate-800 duration-300'>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>alamat</td>
                            <td>role</td>
                            <td>
                                <div className='flex gap-3'>
                                    <span onClick={()=>handelDelete(id)} className='bg-red-700 p-1 rounded-md text-gray-200 cursor-pointer'>
                                        <Trash2 size={20} />
                                    </span>
                                    <Link href={route('pengguna.edit', id)} className='p-1 bg-green-300 rounded-md text-gray-700 cursor-pointer'>
                                        <Pencil size={20} />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
