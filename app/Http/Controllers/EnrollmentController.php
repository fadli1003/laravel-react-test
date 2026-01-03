<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    public function index()
    {
        $tenant_id = Auth::user()->tenant_id;
        $enrollments = Enrollment::where('tenant_id', $tenant_id)
                                    ->with(['tenant:id,school_name',
                                            'course:id,course_name',
                                            'student:id,nama_lengkap',
                                    ])->get();
        $tenants = Tenant::where('id', $tenant_id)->get(['id', 'school_name']);
        $courses = Course::where('tenant_id', $tenant_id)->get(['id', 'course_name']);
        $students =Student::where('tenant_id', $tenant_id)->get(['id', 'nama_lengkap']);

        if(Auth::user()->role === 'super admin'){
            $enrollments = Enrollment::with([ 'tenant:id,school_name',
                                              'course:id,course_name',
                                              'student:id,nama_lengkap',
                                            ])->get();
            $tenants = Tenant::get(['id', 'school_name']);
            $courses = Course::get(['id', 'course_name']);
            $students =Student::get(['id', 'nama_lengkap']);
        }

        return inertia('Enrollment/Index', [
            'tenants' => $tenants,
            'courses' => $courses,
            'students' => $students,
            'enrollments' => $enrollments,
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'tenant_id' => 'required|numeric|exists:tenants,id',
            'student_id' => 'required|numeric|exists:students,id',
            'course_id' => 'required|numeric|exists:courses,id',
            'enrollment_date' => 'date'
        ]);
        Enrollment::create($validate);
        return session()->flash('success', 'Enrollment added succesfully.');
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        $validate = $request->validate([
            'course_id' => 'required|numeric|exists:courses,id',
            'tenant_id' => 'required|numeric|exists:tenants,id',
            'student_id' => 'required|numeric|exists:students,id',
            'enrollment_date' => 'date'
        ]);
        Enrollment::find($id)->update($validate);
        return session()->flash('success', 'Enrollment updated succesfully.');
    }

    public function destroy(string $id)
    {
        Enrollment::findOrFail($id)->delete();
        return session()->flash('success', 'Enrollment data deleted successfully.');
    }
}
