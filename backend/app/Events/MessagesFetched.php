<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class MessagesFetched implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $messages;
    public $conversationId;

    public function __construct($messages)
    {
        // Luôn ép về Collection
        $this->messages = collect($messages);

        // Lấy phần tử đầu tiên (có thể là 1 message hoặc 1 mảng các message)
        $first = $this->messages->first();

        // Kiểm tra nếu $first là 1 mảng chứa nhiều message (nested array)
        if (is_array($first) && isset($first[0]) && is_array($first[0])) {
            // Dạng [ [msg1, msg2, ...] ]
            $this->messages = collect($first);
            $this->conversationId = $first[0]['conversation_id'] ?? null;
        } else {
            // Dạng [ msg1, msg2, ... ]
            $this->conversationId = $first['conversation_id'] ?? null;
        }

        Log::info('MessagesFetched init', [
            'count' => $this->messages->count(),
            'conversation_id' => $this->conversationId,
        ]);
    }

    public function broadcastOn()
    {
        if (!$this->conversationId) {
            Log::warning('MessagesFetched broadcastOn: conversationId null');
            return new Channel('conversation.none');
        }

        Log::info('🚀 Broadcasting on channel: conversation.' . $this->conversationId);
        return new Channel('conversation.' . $this->conversationId);
    }

    public function broadcastWith()
    {
        Log::info('📡 Broadcasting payload', [
            'messages_count' => $this->messages->count(),
        ]);

        return $this->messages->toArray();
    }

    public function broadcastAs()
    {
        return 'MessagesFetched';
    }
}
