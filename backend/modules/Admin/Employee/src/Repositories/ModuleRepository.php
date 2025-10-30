<?php

namespace Modules\Admin\Employee\src\Repositories;

use Modules\Admin\Employee\src\Repositories\ModuleRepositoryInterface;
use App\Repositories\BaseRepository;
use Modules\Admin\Employee\src\Models\Module;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
use function PHPUnit\Framework\isEmpty;
use Modules\Admin\Employee\src\Models\Employee;

class ModuleRepository extends BaseRepository implements ModuleRepositoryInterface {
    public function getModel()
    {
        return Module::class;
    }

    public function getModelDetail(){
        return Module::class;
    }

    public function getAuthorization($employee_id) {

        $modules = Module::select('employee_id', 'permissions')->find($employee_id);

        if(!$modules) {
            throw new \Exception('Không tìm thấy nhân viên hợp lệ yêu cầu', 404);
        }

        return [
            'employee' => [
                'name' => $modules->employee?->name,
                'email' => $modules->employee?->email,
                'position' => $modules->employee?->detail?->position?->name,
            ],
            'permissions' => json_decode($modules->permissions, true)

        ];
    }

    public function editAuthorization($employee_id, $permissions) {
        $employee = Employee::find($employee_id);

        if(!$employee) {
            throw new \Exception('Không tìm thấy nhân viên hợp lệ', 404);
        }

        $modules = $this->model::updateOrCreate(
            ['employee_id' => $employee_id],
            ['permissions' => json_encode($permissions)]
        );

        return [
            'employee' => [
                'name' => $modules->employee?->name,
                'email' => $modules->employee?->email,
                'position' => $modules->employee?->detail?->position?->name,
            ],
            'permissions' => json_decode($modules->permissions, true)

        ];

    }
}
