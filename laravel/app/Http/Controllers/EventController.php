<?php

namespace App\Http\Controllers;

use App\Services\EventService;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Validator;

class EventController extends Controller
{
    protected $eventService;

    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct(EventService $eventService)
    {
        $this->eventService = $eventService;
    }

    /**
     * Add Event.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function addEvent(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'start_time' => 'required',
            'end_time' => 'required|after:start_time',
            'selected_day' => 'required|string',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'error' => $validation->errors(),
                'success' => false,
            ], 422);
        }

        try {
            $parseStartTime = Carbon::parse($request->only('start_time')['start_time']);
            $parseEndTime = Carbon::parse($request->only('end_time')['end_time']);
        } catch (\Exception $e) {
            return response()->json([
                'error' => ['start_end_time' => 'Enter Valid Start/End Time'],
                'success' => false,
            ], 422);
        }

        return $this->eventService->addEvent($request->only('name', 'description', 'start_time', 'end_time', 'selected_day'));
    }

    /**
     * Get Event By User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getEvent()
    {
        return $this->eventService->getEvent(auth()->user()->id);
    }
}
