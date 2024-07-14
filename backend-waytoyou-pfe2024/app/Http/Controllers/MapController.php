<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MapController extends Controller
{
    public function storeCoordinates(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'points' => 'required|array',
            'points.*.latitude' => 'required|numeric',
            'points.*.longitude' => 'required|numeric',
            'points.*.type' => 'required|string',
            'username' => 'required|string',
        ]);

        // Retrieve the validated input data
        $points = $validated['points'];
        $username = $validated['username'];

        // Define the file path for the user
        $filePath = storage_path('app/' . $username . '.txt');

        // Prepare the content to be saved
        $content = "";
        $alphabet = range('a', 'z'); // Generate an array of alphabets

        foreach ($points as $index => $point) {
            $label = $alphabet[$index]; // Assign an alphabet based on the index
            $latitude = $point['latitude'];
            $longitude = $point['longitude'];
            $content .= "{$label},{$latitude},{$longitude}\n";
        }

        // Trim the trailing newline
        $content = trim($content);

        // Write the content to the file, replacing any existing content
        Storage::put($username . '.txt', $content);

        // Return a response
        return response()->json([
            'message' => 'Coordinates received and stored successfully!',
            'data' => $points,
        ]);
    }
}
