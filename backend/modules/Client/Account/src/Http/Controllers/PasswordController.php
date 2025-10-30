<?php

namespace Modules\Client\Account\src\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Modules\Client\Account\src\Repositories\ClientPasswordRepositoryInterface;
use Illuminate\Validation\Rules\Password;
class PasswordController extends Controller
{
    protected $passwordRepo;

    public function __construct(ClientPasswordRepositoryInterface $passwordRepo)
    {
        $this->passwordRepo = $passwordRepo;
    }

    public function sendOtp(Request $request)
    {
        try {

            $request->validate(
                [
                    'email' => 'required|email|exists:users,email',
                ],
                [
                    'email.required' => 'Vui lòng nhập địa chỉ email.',
                    'email.email' => 'Địa chỉ email không hợp lệ.',
                    'email.exists' => 'Email này không tồn tại trong hệ thống.',
                ]
            );
            $email = $request->input('email');
            $opt = $this->passwordRepo->sendOTP($email);
            return response()->json([
                'status' => 'success',
                'message' => 'Mã OTP đã gửi đến bạn',
                'data' => $opt
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->errors(),
            ], 422);
        }
        catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách người dùng thất bại ở trong UserController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function verifyOtp(Request $request)
    {
        try {
            $request->validate(
                [
                    'email' => 'required|email',
                    'otp'   => 'required',
                ],
                [
                    'email.required' => 'Vui lòng nhập địa chỉ email.',
                    'email.email'    => 'Địa chỉ email không hợp lệ.',
                    'otp.required'   => 'Vui lòng nhập mã OTP.',
                ]
            );

            $email = $request->input('email');
            $otp = $request->input('otp');

            $opt = $this->passwordRepo->verifyOtp($email, $otp);

            return response()->json([
                'status' => 'success',
                'message' => 'Mã OTP hợp lệ',
                'data' => $opt
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->errors(),
            ], 422);
        }
        catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách người dùng thất bại ở trong UserController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }

    }

    // 3️⃣ Cập nhật mật khẩu
    public function resetPassword(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => [
                    'required',
                    'confirmed',
                    Password::min(8)
                        ->mixedCase()
                        ->letters()
                        ->numbers()
                        ->symbols()
                ],
                'password_confirmation' => ['required'] 
            ], [
                'email.required' => 'Vui lòng nhập địa chỉ email.',
                'email.email' => 'Địa chỉ email không hợp lệ.',
                'password.required' => 'Vui lòng nhập mật khẩu.',
                'password.confirmed' => 'Mật khẩu xác nhận không khớp.',
                'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
                'password.mixed_case' => 'Mật khẩu phải có cả chữ hoa và chữ thường.',
                'password.letters' => 'Mật khẩu phải chứa ít nhất một chữ cái.',
                'password.numbers' => 'Mật khẩu phải chứa ít nhất một số.',
                'password.symbols' => 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt.',
                'password_confirmation.required' => 'Vui lòng nhập lại mật khẩu.'
            ]);

            $email = $request->input('email');
            $password = $request->input('password');

            $user = $this->passwordRepo->resetPassword($email, $password);

            return response()->json([
                'status' => 'success',
                'message' => 'Mã OTP đã gửi đến bạn',
                'data' => $user
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->errors(),
            ], 422);
        }
        catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách người dùng thất bại ở trong UserController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }

    }


}
