<?php

namespace Modules\Admin\Chat\src\Repositories;
use App\Repositories\RepositoryInterface;

interface ChatRepositoryInterface extends RepositoryInterface {
    public function getDetailChat($user_id, $employee_id, $page, $count);

    public function getListUserChat($employee_id, $page, $count);

    public function addMessage($data);
}
