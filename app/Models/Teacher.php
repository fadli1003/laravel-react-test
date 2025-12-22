<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = [
        'tenant_id',
        'nama_lengkap',
        'panggilan',
        'subject',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
