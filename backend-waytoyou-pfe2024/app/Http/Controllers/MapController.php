<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class MapController extends Controller
{
    public function storeCoordinates(Request $request)
    {
        echo"test";
        // Validate the request data
        $validated = $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        // Retrieve the validated input data
        $latitude = $validated['latitude'];
        $longitude = $validated['longitude'];

        // Define the file path
        $filePath = storage_path('app/data.txt');

        // Determine the next marker label
        $markerLabel = $this->getNextMarkerLabel($filePath);

        // Format the new coordinate entry
        $newEntry = "{$markerLabel},{$latitude},{$longitude}\n";

        // Append the new entry to the file
        Storage::append('data.txt', $newEntry);

        // Return a response
        return response()->json([
            'message' => 'Coordinates received and stored successfully!',
            'data' => [
                'latitude' => $latitude,
                'longitude' => $longitude,
            ],
        ]);
    }

    private function getNextMarkerLabel($filePath)
    {
        if (!file_exists($filePath)) {
            return 'a';
        }

        $contents = file_get_contents($filePath);
        $lines = explode("\n", trim($contents));
        $lastLine = end($lines);

        if ($lastLine) {
            $lastLabel = explode(',', $lastLine)[0];
            $nextLabel = ++$lastLabel;
        } else {
            $nextLabel = 'a';
        }

        return $nextLabel;
    }
}
