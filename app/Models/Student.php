<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'tenant_id',
        'nama_lengkap',
        'panggilan',
        'grade',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
}
