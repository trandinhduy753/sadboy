<?php

namespace Modules\Client\Account\src\Repositories;

use Modules\Client\Account\src\Repositories\ClientPasswordRepositoryInterface;
use App\Repositories\BaseRepository;

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use function PHPUnit\Framework\isEmpty;
use Modules\Admin\User\src\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;

class ClientPasswordRepository extends BaseRepository implements ClientPasswordRepositoryInterface {
    public function getModel()
    {
        return User::class;
    }

    public function getModelDetail(){
        return User::class;
    }

    public function sendOTP($email) {
        $user = $this->model::select('id', 'name', 'email', 'otp_code', 'otp_expires_at')->where('email', $email)->first();

        if (!$user) {
            throw new \Exception('Không tìm thấy người dùng tương ứng', 404);
        }

        $otp = rand(100000, 999999);
        Mail::raw("Mã OTP của bạn là: $otp", function ($message) use ($user) {
            $message->to($user->email)
                    ->subject('Mã OTP khôi phục mật khẩu');
        });

        $user->update([
            'otp_code' => $otp,
            'otp_expires_at' => Carbon::now()->addMinutes(10)
        ]);

        return $otp;

    }

    public function verifyOtp($email, $otp) {
        $user = $this->model::select('id', 'name', 'email', 'otp_code', 'otp_expires_at')
        ->where('otp_code', $otp)
        ->where('email', $email)
        ->first();

        if (!$user) {
            throw new \Exception('Không tìm thấy người dùng tương ứng', 404);
        }

        $timeNow = Carbon::now();
        $timeOtp = Carbon::parse($user->otp_expires_at)->format('Y-m-d H:i:s');

        if ($timeNow->gt($timeOtp)) {
            throw new \Exception('Mã OTP đã hết hạn', 404);
        }


        return $timeOtp;
    }

    public function resetPassword($email, $password) {
        $user = $this->model::select('id', 'name', 'email', 'otp_code', 'otp_expires_at', 'password')
        ->where('email', $email)
        ->first();

        if (!$user) {
            throw new \Exception('Không tìm thấy người dùng tương ứng', 404);
        }

        $user = $user->update([
            'otp_code' => NULL,
            'otp_expires_at' => NULL,
            'password' => Hash::make($password)
        ]);
        return $user;

        
    }

}
