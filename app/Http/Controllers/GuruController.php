<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;

class GuruController extends Controller
{
    public function index()
    {
        return inertia('Teacher/Index', [
            'teachers' => Teacher::all(),
        ]);
    }
    public function store($request)
    {
        $request->validate([
            'nama_lengkap' => 'required|string|max:255|unique:teachers,nama_lengkap',
            'panggilan' => 'nullable|string|max:30',
            'tenant_id' => 'required|numeric|exists:tenants,id'
        ]);
        $guru = new Teacher();
        $guru->nama_lengkap = $request->nama_lengkap;
        $guru->panggilan = $request->panggilan;
        $guru->tenant_id = $request->tenant_id;
        $guru->save();
    }
}
