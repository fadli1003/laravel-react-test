<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    protected $fillable = [
        'tenant_id',
        'student_id',
        'course_id',
        'name',
        'enrollment_date'
    ];

    public function tenants()
    {
        return $this->belongsToMany(Tenant::class);
    }
    public function students()
    {
        return $this->hasMany(Student::class);
    }
    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
