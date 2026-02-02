<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Task::with('assignedTo', 'branch');

        // Filters
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('manager_id')) {
            $query->where('assigned_to', $request->manager_id);
        }

        if ($request->has('branch_id')) {
            $query->where('branch_id', $request->branch_id);
        }

        if ($request->has('search')) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $tasks = $query->latest()->get();

        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'assigned_to' => 'required|exists:users,id',
            'branch_id' => 'required|exists:branches,id',
            'priority' => 'required|in:low,medium,high',
            'due_date' => 'required|date',
        ]);

        $task = Task::create($request->all());
        $task->load('assignedTo', 'branch');

        return response()->json($task, 201);
    }

    public function show(Task $task)
    {
        $task->load('assignedTo', 'branch');
        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'assigned_to' => 'sometimes|exists:users,id',
            'branch_id' => 'sometimes|exists:branches,id',
            'priority' => 'sometimes|in:low,medium,high',
            'status' => 'sometimes|in:pending,in-progress,completed,overdue',
            'due_date' => 'sometimes|date',
        ]);

        $task->update($request->all());
        $task->load('assignedTo', 'branch');

        return response()->json($task);
    }

    public function updateStatus(Request $request, Task $task)
    {
        $request->validate([
            'status' => 'required|in:pending,in-progress,completed,overdue',
        ]);

        $task->update(['status' => $request->status]);

        if ($request->status === 'completed') {
            $task->update(['completed_date' => now()]);
        }

        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Task deleted successfully']);
    }

    public function myTasks(Request $request)
    {
        $tasks = Task::with('branch')
            ->where('assigned_to', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($tasks);
    }
}
