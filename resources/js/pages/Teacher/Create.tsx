import AppLayout from '@/layouts/app-layout';
import { Tenant, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage} from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

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

    const {tenants} = usePage<{tenants?: Tenant[]}>().props
    const {data, setData,errors, post, processing, reset} = useForm({
        id: '',
        nama_lengkap: '',
        panggilan: '',
        subject: '',
        tenant_id: '',
    });
    function submit(e: React.FormEvent){
        e.preventDefault();
        post(route('teacher.store'), {
            onSuccess: () => reset()
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Teacher" />
                <div className='py-3 px-5'>
                    <h2>Add New Teacher's Data</h2>
                </div>
                <div className='p-5'>
                    <form onSubmit={submit}>
                        <div className='grid md:grid-cols-2 gap-x-5'>
                            <div className='mb-3 space-y-2 flex flex-col'>
                                <label className='pl-1'>Full name</label>
                                <input
                                  type='text'
                                  id='nama_lengkap'
                                  name='nama_lengkap'
                                  placeholder="Insert Teacher's Full Name"
                                  value={data.nama_lengkap}
                                  onChange={(e) => setData('nama_lengkap', e.target.value)}
                                  className='input-create'
                                />
                                {errors.nama_lengkap && <div className='text-red-500 text-sm mt-1'>{errors.nama_lengkap}</div>}
                            </div>
                            <div className='mb-3 flex flex-col space-y-2'>
                                <label className='pl-1'>Nickname <span className='text-muted-foreground text-sm'>(optional)</span></label>
                                <input type='text'
                                id='panggilan'
                                name='panggilan'
                                placeholder="Insert Teacher's Nickname"
                                value={data.panggilan}
                                onChange={(e) => setData('panggilan', e.target.value)}
                                className='input-create'
                                />
                                {errors.panggilan && <div className='text-red-500 text-sm mt-1'>{errors.panggilan}</div>}
                            </div>
                            <div className='mb-3 flex flex-col space-y-2'>
                                <label className='pl-1'>Subject</label>
                                <input type='text' id='subject' name='subject'
                                placeholder='Insert Teacher Subject'
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                autoComplete='none'
                                className='input-create'
                                />
                                {errors.subject && <div className='text-red-500 text-sm mt-0.5'>{errors.subject}</div>}
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <label htmlFor="tenant_id">School Name</label>
                                <select
                                    name="tenant_id"
                                    id="tenant_id"
                                    onChange={(e) => setData('tenant_id', e.target.value)}
                                    className='input-create input-select cursor-pointer'
                                    >
                                    <option value="">--Choose School--</option>
                                    {tenants?.map((tenant) => (
                                        <option key={tenant.id} value={tenant.id}>{tenant.school_name}</option>
                                    ))}
                                </select>
                                {errors.tenant_id && <div className='text-red-500 text-sm mt-1'>{errors.tenant_id}</div>}
                            </div>
                        </div>
                        <Button className='cursor-pointer mt-3'>
                            {processing ? (
                                <>
                                    Saving... <Spinner />
                                </>
                                ) : 'Save'}
                        </Button>
                    </form>
                </div>
        </AppLayout>
    );
}
