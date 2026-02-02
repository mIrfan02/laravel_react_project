<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats(Request $request)
    {
        $user = $request->user();

        if ($user->isAdmin()) {
            $stats = [
                'total_managers' => User::where('role', 'manager')->count(),
                'total_tasks' => Task::count(),
                'pending_tasks' => Task::pending()->count(),
                'overdue_tasks' => Task::overdue()->count(),
                'completed_tasks' => Task::completed()->count(),
                'in_progress_tasks' => Task::inProgress()->count(),
            ];
        } else {
            $stats = [
                'total_tasks' => Task::where('assigned_to', $user->id)->count(),
                'pending_tasks' => Task::where('assigned_to', $user->id)->pending()->count(),
                'completed_tasks' => Task::where('assigned_to', $user->id)->completed()->count(),
                'overdue_tasks' => Task::where('assigned_to', $user->id)->overdue()->count(),
            ];
        }

        return response()->json($stats);
    }
}
