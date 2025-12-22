<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    // public $timestamps = false; //making the timestamps not auto increments
    protected $fillable = [
        'course_name',
        'tenant_id',
        'teacher_id',
    ];

    public function tenants()
    {
        return $this->belongsToMany(Tenant::class);
    }
    public function teachers()
    {
        return $this->hasMany(Teacher::class);
    }
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
}
