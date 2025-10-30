<?php

namespace Modules\Client\Chat\src\Repositories;
use App\Repositories\RepositoryInterface;

interface ClientChatRepositoryInterface extends RepositoryInterface {

    public function getListMessage($user_id, $page, $count);

    public function addMessage($temp);
}
