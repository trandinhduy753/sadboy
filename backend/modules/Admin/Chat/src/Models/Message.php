<?php

namespace Modules\Admin\Chat\src\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Modules\Admin\Chat\factories\MessageFactory;
use Modules\Admin\Chat\src\Models\Conversation;
class Message extends Model
{
    use HasFactory;

    protected $table = 'messages';

    protected $fillable = [
        'code', 'conversation_id', 'sender_id', 'sender_type', 'type', 'content', 'file_path', 'meta_data'
    ];

    public function conversation() {
        return $this->belongsTo(
            Conversation::class,
            'conversation_id',
            'id'
        );
    }
    protected static function newFactory()
    {
        return MessageFactory::new();
    }
}
