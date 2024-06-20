<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log; // Add this

class AuthController extends Controller
{
    public function signUp(Request $request)
    {
        try {
            // Validate request
            $request->validate([
                'username' => 'required|string|unique:users,username',
                'password' => 'required|string|min:6',
            ]);

            // Hash the password
            $hashedPassword = Hash::make($request->password);

            // Insert user into the database
            DB::insert('insert into users (username, password) values (?, ?)', [$request->username, $hashedPassword]);

            return response()->json(['success' => true, 'message' => 'User registered successfully']);
        } catch (\Exception $e) {
            Log::error('Sign Up Error: ' . $e->getMessage()); // Log the error
            return response()->json(['success' => false, 'message' => 'Internal Server Error'], 500);
        }
    }

    public function signIn(Request $request)
    {
        try {
            // Validate request
            $request->validate([
                'username' => 'required|string',
                'password' => 'required|string',
            ]);

            // Retrieve the user from the database
            $user = DB::select('select * from users where username = ?', [$request->username]);

            // Check if user exists and password matches
            if ($user && Hash::check($request->password, $user[0]->password)) {
                return response()->json(['success' => true, 'message' => 'Sign in successful']);
            } else {
                return response()->json(['success' => false, 'message' => 'Invalid credentials']);
            }
        } catch (\Exception $e) {
            Log::error('Sign In Error: ' . $e->getMessage()); // Log the error
            return response()->json(['success' => false, 'message' => 'Internal Server Error'], 500);
        }
    }
}
