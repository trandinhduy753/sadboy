<?php

namespace Modules\Admin\User\src\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Admin\User\src\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use  Modules\Admin\User\src\Requests\UserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Tymon\JWTAuth\Facades\JWTAuth;
class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.cookie.user', ['except' => ['login']]);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        //return auth()->guard('user')->validate($credentials);
        if (! $token = auth()->guard('user')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        
        $user=auth()->user();
        // Tạo refresh token với TTL dài hơn (7 ngày = 10080 phút)
        $refreshToken = JWTAuth::customClaims([
            'type' => 'refresh_token'
        ])->fromUser($user);

        JWTAuth::factory()->setTTL(10080);

        return response()->json([
            'message' => 'Đăng nhập thành công',
            'user' => auth()->user()
        ])->cookie(
            'access_token', $token, 1000, '/', null, false, true
        )->cookie(
            'refresh_token', $refreshToken, 10080, '/', null, false, true
        );
    }


    public function refresh(Request $request)
    {
        try {
            $refreshToken = $request->cookie('refresh_token');

            if (!$refreshToken) {
                return response()->json(['error' => 'Refresh token not found'], 404);
            }

            // Set token trước
            JWTAuth::setToken($refreshToken);

            // Lấy payload để kiểm tra claim
            $payload = JWTAuth::getPayload();

            // Kiểm tra claim "type"
            if ($payload->get('type') !== 'refresh_token') {
                return response()->json(['error' => 'Invalid token type'], 401);
            }

            // Lấy user từ token
            $user = JWTAuth::toUser($refreshToken);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 401);
            }

            // Tạo lại access token mới (TTL mặc định)
            $newToken = JWTAuth::fromUser($user);

            return response()->json(['message' => 'Token refreshed successfully'])->cookie(
                'access_token', $newToken, 15, '/', null, false, true
            );
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Refresh token expired'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json(['message' => 'Đăng xuất thành công'])
                ->cookie('access_token', '', -1, '/', null, false, true)
                ->cookie('refresh_token', '', -1, '/', null, false, true);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Logout failed'], 500);
        }
    }

    public function me()
    {
        if(empty(auth()->user()) ){
            return response()->json(auth()->user(), 401);
        }
        return response()->json(auth()->user(), 200);
    }
}
