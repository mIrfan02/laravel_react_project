<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    public function index()
    {
        $branches = Branch::withCount(['users as managers_count' => function ($query) {
            $query->where('role', 'manager');
        }])
        ->withCount('tasks as tasks_count')
        ->get();

        return response()->json($branches);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string',
            'established' => 'nullable|date',
        ]);

        $branch = Branch::create($request->all());
        return response()->json($branch, 201);
    }

    public function show(Branch $branch)
    {
        $branch->load('users', 'tasks');
        return response()->json($branch);
    }

    public function update(Request $request, Branch $branch)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'address' => 'sometimes|string',
            'phone' => 'sometimes|string',
            'established' => 'nullable|date',
        ]);

        $branch->update($request->all());
        return response()->json($branch);
    }

    public function destroy(Branch $branch)
    {
        $branch->delete();
        return response()->json(['message' => 'Branch deleted successfully']);
    }
}
