<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;
use Validator;

class AuthController extends Controller
{

    protected $authService;

    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Sign up.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'first_name' => 'required|string|min:2',
            'last_name' => 'required|string|min:2',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:4',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'error' => $validation->errors(),
                'success' => false,
            ], 422);
        }

        return $this->authService->register($request->only('first_name', 'last_name', 'email', 'password'));
    }

    /**
     * Log In.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'error' => $validation->errors(),
                'success' => false,
            ], 422);
        }

        return $this->authService->login($request->only('email', 'password'));
    }

    /**
     * Log the user out.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        return response()->json([
            'success' => true,
            'message' => 'User successfully signed out'
        ], 401);
    }
}
