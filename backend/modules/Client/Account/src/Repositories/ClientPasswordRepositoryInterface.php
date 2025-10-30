<?php

namespace Modules\Client\Account\src\Repositories;
use App\Repositories\RepositoryInterface;

interface ClientPasswordRepositoryInterface extends RepositoryInterface {

    public function sendOTP($email);

    public function verifyOtp($email, $otp);

    public function resetPassword($email, $password);
}
