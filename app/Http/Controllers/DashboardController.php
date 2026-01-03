<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $tenant_id = Auth::user()->tenant_id;
        $school_name = Tenant::where('id', $tenant_id)->value('school_name');
        $enrollments = Enrollment::where('tenant_id', $tenant_id)->count();
        $totalCourses = Course::where('tenant_id', $tenant_id)->count();
        $totalTeachers = Teacher::where('tenant_id', $tenant_id)->count();
        $totalSubjects = Teacher::where('tenant_id', $tenant_id)->distinct('subject')->count('subject');
        $totalStudents = Student::where('tenant_id', $tenant_id)->count();

        return inertia('dashboard', [
            'schoolName' => $school_name,
            'totalTeachers' => $totalTeachers,
            'totalSubjects' => $totalSubjects,
            'totalCourses' => $totalCourses,
            'totalStudents' => $totalStudents,
            'enrollment' => $enrollments,
        ]);

    }
}
