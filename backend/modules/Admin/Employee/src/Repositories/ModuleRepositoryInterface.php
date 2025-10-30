<?php

namespace Modules\Admin\Employee\src\Repositories;
use App\Repositories\RepositoryInterface;

interface ModuleRepositoryInterface extends RepositoryInterface {

    public function getAuthorization($employee_id);

    public function editAuthorization($employee_id, $permissions);
}
