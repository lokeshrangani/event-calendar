<?php

namespace App\Services;

use JWTAuth;
use App\Models\User;
use Illuminate\Http\Response;

class AuthService
{
    /**
     * Sign up.
     * 
     */
    public function register($request)
    {
        User::create([
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password'])
        ]);

        return $this->login([
            'email' => $request['email'],
            'password' => $request['password'],
        ], 'REGISTER');
    }

    /**
     * Login
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function login($credentials, $from = 'LOGIN')
    {
        $token = null;
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Login credentials are invalid.',
            ], Response::HTTP_OK);
        }

        return response()->json([
            'success' => true,
            'message' => "User " . ($from == 'REGISTER' ? "Created" : "Login") . " successfully!",
            'token' => $token
        ], Response::HTTP_OK);
    }
}
