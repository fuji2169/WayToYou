<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RouteController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'start_point_id' => 'required|integer',
            'end_point_id' => 'required|integer',
            'distance' => 'required|numeric',
            'duration' => 'required|string',
            'route_data' => 'nullable|json',
            'user_id' => 'required|string',
        ]);

        // Insert route data into the database
        $routeId = DB::table('routes')->insertGetId([
            'start_point_id' => $validated['start_point_id'],
            'end_point_id' => $validated['end_point_id'],
            'distance' => $validated['distance'],
            'duration' => $validated['duration'],
            'route_data' => $validated['route_data'],
            'user_id' => $validated['user_id'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Retrieve and return the inserted route
        $route = DB::table('routes')->where('id', $routeId)->first();

        return response()->json($route, 201);
    }
}