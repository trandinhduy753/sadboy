<?php

namespace Modules\Admin\Chat\factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Admin\Chat\src\Models\Conversation;
class ConversationFactory extends Factory
{
    protected $model = Conversation::class;
    protected static $userIds;
    protected static $employeeIds;

    public function definition()
    {
        // Tạo danh sách giá trị chỉ một lần
        self::$userIds ??= range(1, 60);
        self::$employeeIds ??= range(1, 60);

        // Lấy ngẫu nhiên và loại bỏ khỏi danh sách
        $userId = array_shift(self::$userIds);
        $employeeId = array_shift(self::$employeeIds);

        return [
            'user_id' => $userId,
            'employee_id' => $employeeId,
        ];
    }
}
