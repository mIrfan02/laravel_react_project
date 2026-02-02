<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Branch;
use App\Models\Task;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create branches
        $ny = Branch::create([
            'name' => 'New York',
            'address' => '123 Broadway Ave, New York, NY 10001',
            'phone' => '+1 (212) 555-0100',
            'established' => '2020-01-15',
        ]);

        $la = Branch::create([
            'name' => 'Los Angeles',
            'address' => '456 Sunset Blvd, Los Angeles, CA 90028',
            'phone' => '+1 (323) 555-0200',
            'established' => '2020-06-20',
        ]);

        $chicago = Branch::create([
            'name' => 'Chicago',
            'address' => '789 Michigan Ave, Chicago, IL 60611',
            'phone' => '+1 (312) 555-0300',
            'established' => '2021-03-10',
        ]);

        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@company.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create manager users
        $manager1 = User::create([
            'name' => 'John Smith',
            'email' => 'manager@company.com',
            'password' => Hash::make('password'),
            'role' => 'manager',
            'branch_id' => $ny->id,
            'phone' => '+1 (212) 555-0101',
        ]);

        $manager2 = User::create([
            'name' => 'Sarah Johnson',
            'email' => 'sarah@company.com',
            'password' => Hash::make('password'),
            'role' => 'manager',
            'branch_id' => $la->id,
            'phone' => '+1 (323) 555-0201',
        ]);

        $manager3 = User::create([
            'name' => 'Michael Chen',
            'email' => 'michael@company.com',
            'password' => Hash::make('password'),
            'role' => 'manager',
            'branch_id' => $chicago->id,
            'phone' => '+1 (312) 555-0301',
        ]);

        // Create sample tasks
        Task::create([
            'title' => 'Q1 Sales Report Preparation',
            'description' => 'Compile and analyze Q1 sales data for presentation',
            'assigned_to' => $manager1->id,
            'branch_id' => $ny->id,
            'status' => 'in-progress',
            'priority' => 'high',
            'due_date' => now()->addDays(7),
        ]);

        Task::create([
            'title' => 'Customer Satisfaction Survey',
            'description' => 'Conduct monthly customer survey and compile results',
            'assigned_to' => $manager2->id,
            'branch_id' => $la->id,
            'status' => 'pending',
            'priority' => 'medium',
            'due_date' => now()->addDays(14),
        ]);

        Task::create([
            'title' => 'Team Training Workshop',
            'description' => 'Organize product knowledge training for new team',
            'assigned_to' => $manager3->id,
            'branch_id' => $chicago->id,
            'status' => 'pending',
            'priority' => 'high',
            'due_date' => now()->addDays(10),
        ]);

        Task::create([
            'title' => 'Inventory Audit',
            'description' => 'Complete quarterly inventory audit',
            'assigned_to' => $manager1->id,
            'branch_id' => $ny->id,
            'status' => 'overdue',
            'priority' => 'high',
            'due_date' => now()->subDays(2),
        ]);

        Task::create([
            'title' => 'Website Content Update',
            'description' => 'Update product listings on website',
            'assigned_to' => $manager2->id,
            'branch_id' => $la->id,
            'status' => 'completed',
            'priority' => 'low',
            'due_date' => now()->subDays(5),
            'completed_date' => now()->subDays(3),
        ]);
    }
}
