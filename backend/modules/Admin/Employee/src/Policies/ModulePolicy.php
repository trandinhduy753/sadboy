<?php

namespace Modules\Admin\Employee\src\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Admin\Employee\src\Models\Employee;
use Modules\Admin\Employee\src\Models\Module;

class ModulePolicy
{
    use HandlesAuthorization;

    public function __construct()
    {
        //
    }

    protected function hasPermission(Employee $employee, string $action)
    {
        $employee = auth('employee')->user();
        $permissionRecord = Module::where('employee_id', $employee->id)->first();
        if (!$permissionRecord) {
            return false;
        }

        $permissions = json_decode($permissionRecord->permissions, true);

        if (!isset($permissions['authorization'])) {
            return false;
        }

        $employeePerms = $permissions['authorization'];
        if (in_array('all', $employeePerms)) {
            return true;
        }

        return in_array($action, $employeePerms);
    }

    public function view(Employee $employee)
    {
        return $this->hasPermission($employee, 'view');
    }

    public function create(Employee $employee)
    {
        return $this->hasPermission($employee, 'add');
    }
}
