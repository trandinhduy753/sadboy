<?php

namespace Modules\Admin\Chat\src\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Modules\Admin\Chat\factories\ConversationFactory;
use Modules\Admin\User\src\Models\User;
use Modules\Admin\Employee\src\Models\Employee;
use Modules\Admin\Chat\src\Models\Message;
class Conversation extends Model
{
    use HasFactory;

    protected $table = 'conversations';

    protected $fillable = [
        'user_id', 'employee_id'
    ];

    public function user() {
        return $this->belongsTo(
            User::class,
            'user_id',
            'id'
        );
    }

    public function employee() {
        return $this->belongsTo(
            Employee::class,
            'employee_id',
            'id'
        );
    }

    public function messages() {
        return $this->hasMany(
            Message::class,
            'conversation_id',
            'id'
        ) ;

    }

    public function latestMessage()
    {
        return $this->hasOne(Message::class, 'conversation_id', 'id')->latestOfMany();
    }

    protected static function newFactory()
    {
        return ConversationFactory::new();
    }
}
