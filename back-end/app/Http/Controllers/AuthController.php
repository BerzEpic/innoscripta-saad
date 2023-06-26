<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Register new user
    public function register(Request $request)
    {
        // Validate request
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ]);

        // Create new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        // Generate token
        $token = $user->createToken('authToken')->accessToken;

        // Return response
        return response()->json([
            'accessToken' => $token,
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'message' => 'Registration successful'
        ]);
    }

    // Login user
    public function login(Request $request)
    {
        // Validate request
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Check if user exists
        $user = User::where('email', $request->email)->first();

        // Check password
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Generate token
        $token = $user->createToken('authToken')->accessToken;

        // Return response
        return response()->json([
            'accessToken' => $token,
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'message' => 'login successful'
        ]);
    }
}
