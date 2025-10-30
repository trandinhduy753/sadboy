<?php

namespace Modules\Admin\Chat\src\Rules;

use Illuminate\Contracts\Validation\Rule;
use Modules\Admin\User\src\Models\User;
use Modules\Admin\Employee\src\Models\Employee;
class SenderExists implements Rule
{

    public function __construct()
    {
        //
    }

    public function passes($attribute, $value)
    {
        $inUsers = User::where('id', $value)->exists();
        $inEmployees = Employee::where('id', $value)->exists();
        return $inUsers || $inEmployees;
    }

    public function message()
    {
        return 'Người gửi không tồn tại trong hệ thống.';
    }
}
