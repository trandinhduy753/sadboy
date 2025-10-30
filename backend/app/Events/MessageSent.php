<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Modules\Admin\Chat\src\Models\Message;
class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct(Message $message)
    {
        $this->message = $message->load([
            'conversation.user:id,name',
            'conversation.employee:id,name'
        ]);
    }

    public function broadcastOn()
    {
        return new Channel('conversation.' . $this->message->conversation_id);
        //return new Channel('chat');
    }

    public function broadcastWith()
    {
        $message = $this->message;
        $host = config('app.url'); // hoặc lấy từ env

        return [
            'id' => $message->id,
            'sender_id' => $message->sender_id,
            'conversation_id' => $message->conversation_id,
            'sender_type' => $message->sender_type,
            'content' => $message->content,
            'type' => $message->type,
            'file_path' => empty($message->file_path) ? null : $host . $message->file_path,
            'meta_data' => $message->meta_data ?? null,
            'date' => $message->created_at->format('Y-m-d H:i:s'),
        ];
    }


    public function broadcastAs()
    {
        return 'MessageSent';
    }
}
