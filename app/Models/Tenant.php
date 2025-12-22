<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    protected $fillable = [
        'school_name',
        'adress',
        'school_email',
    ];

    public function teachers()
    {
        return $this->hasMany(Teacher::class);
    }
    public function students()
    {
        return $this->hasMany(Student::class);
    }
    public function courses()
    {
        return $this->belongsToMany(Course::class);
    }
    public function enrollments()
    {
        return $this->belongsToMany(Enrollment::class);
    }
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
