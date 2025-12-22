<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Pengguna/Index', [
            'pengguna' => User::get(['id', 'name', 'email', 'password']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Pengguna/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:50',
            'email' => 'required|max:255|email|unique:users,email',
            'pw' => 'required|min:6'
        ]);
        $pengguna = new User();
        $pengguna->name = $request->nama;
        $pengguna->email = $request->email;
        $pengguna->password = Hash::make($request->pw);
        $pengguna->save();

        return redirect()->route('pengguna.index')->with('sukses', 'Pengguna berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Pengguna/Edit', [
            'pengguna' => User::find($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $pengguna = User::find($id);
        $request->validate([
            'nama' => 'required',
            'email' => 'required|email|unique:users,email'.$pengguna->id,
            'pw' => 'required|min:6'
        ]);
        $pengguna->name = $request->nama;
        $pengguna->email = $request->email;
        $pengguna->password = bcrypt($request->pw);
        $pengguna->save();

        return redirect()->route('pengguna.index')->with('sukses', 'Data pengguna berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        User::find($id)->delete();
        return back()->with('sukses', 'Pengguna berhasil dihapus.');
    }
}
