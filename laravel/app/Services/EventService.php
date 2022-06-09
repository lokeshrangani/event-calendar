<?php

namespace App\Services;

use App\Models\Event;
use App\Models\Schedule;
use Illuminate\Http\Response;

class EventService
{
    /**
     * Add Event.
     * 
     */
    public function addEvent($request)
    {
        $event = Event::create([
            'user_id' => auth()->user()->id,
            'name' => $request['name'],
            'description' => $request['description'],
            'start_time' => $request['start_time'],
            'end_time' => $request['end_time'],
            'selected_day' => $request['selected_day'],
        ]);

        return $this->createSchedule($event);
    }

    /**
     * Create Schedule
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function createSchedule($event)
    {
        $days = explode(',', $event->selected_day);
        $to = strtotime(date('Y-m-d', strtotime('+90 day')));

        foreach ($days as $day) {
            $from = date('Y-m-d', strtotime('next ' . $day));
            for ($next = strtotime($day, strtotime($from)); $next <= $to; $next = strtotime('next ' . $day, $next)) {
                Schedule::create([
                    'schedule_date' => date('Y-m-d', $next),
                    'event_id' => $event->id,
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => "Event Created successfully!",
        ], Response::HTTP_OK);
    }

    /**
     * Get Event.
     * 
     */
    public function getEvent($userId)
    {
        $response = [];
        $events = Event::where([
            'user_id' => $userId,
        ])->get();

        if ($events) {
            foreach ($events as $k => $value) {
                $value->schedules;
                $eventArray = $value->toArray();
                foreach ($eventArray['schedules'] as $key => $schedule) {
                    $response[$k][$key]['title'] = $value['name'];
                    $response[$k][$key]['desc'] = $value['description'];
                    $response[$k][$key]['start'] = date('Y-m-d H:i', strtotime($schedule['schedule_date'] . ' ' . $value['start_time']));
                    $response[$k][$key]['end'] = date('Y-m-d H:i', strtotime($schedule['schedule_date'] . ' ' . $value['end_time']));
                }
            }
        }

        return response()->json([
            'success' => true,
            'count' => count($response),
            'events' => $response,
        ], Response::HTTP_OK);
    }
}
