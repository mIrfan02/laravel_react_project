<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ManagerController extends Controller
{
    public function index()
    {
        $managers = User::where('role', 'manager')
            ->with('branch')
            ->withCount(['tasks as tasks_completed' => function ($query) {
                $query->where('status', 'completed');
            }])
            ->withCount(['tasks as tasks_pending' => function ($query) {
                $query->whereIn('status', ['pending', 'in-progress']);
            }])
            ->get();

        return response()->json($managers);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'branch_id' => 'required|exists:branches,id',
            'phone' => 'nullable|string',
        ]);

        $manager = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'manager',
            'branch_id' => $request->branch_id,
            'phone' => $request->phone,
        ]);

        $manager->load('branch');

        return response()->json($manager, 201);
    }

    public function show(User $manager)
    {
        $manager->load('branch', 'tasks');
        return response()->json($manager);
    }

    public function update(Request $request, User $manager)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $manager->id,
            'branch_id' => 'sometimes|exists:branches,id',
            'phone' => 'nullable|string',
        ]);

        $manager->update($request->all());
        $manager->load('branch');

        return response()->json($manager);
    }

    public function destroy(User $manager)
    {
        $manager->delete();
        return response()->json(['message' => 'Manager deleted successfully']);
    }
}
