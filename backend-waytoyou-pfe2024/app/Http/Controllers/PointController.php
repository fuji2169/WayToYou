<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PointController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'address' => 'required|string',
            'user_id' => 'required|string',
        ]);

        // Insert point data into the database
        $pointId = DB::table('points')->insertGetId([
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
            'address' => $validated['address'],
            'user_id' => $validated['user_id'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Retrieve and return the inserted point
        $point = DB::table('points')->where('id', $pointId)->first();

        return response()->json($point, 201);
    }
}
