<?php

namespace Modules\Admin\User\src\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Admin\User\src\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Modules\Admin\User\src\Requests\UserRequest;
class UserController extends Controller
{
    protected $userRepo;

    public function __construct(UserRepositoryInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function index (Request $request) {
        try {
            $start = $request->input('start', 0);
            $end = $request->input('end', 20);
            if($start < 0 || $end < 0) {
                throw new \Exception("Yêu cầu start, end không được âm", 404);
            }
            $users = $this->userRepo->getListUser($start, $end);
            return response()->json([
                'status' => 'success',
                'message' => 'Danh sách người dùng',
                'data' => $users
            ]);
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
    public function destroy(Request $request) {
        try {
            $ids = $request->input('ids');
            $this->userRepo->deleteUser($ids);
            return response()->noContent();
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Xoá người dùng thành công: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }
    public function show($id) {
        try {
            if (!is_numeric($id) || $id <= 0) {
                throw new \Exception("ID phải là số dương", 400);
            }
            $user = $this->userRepo->getDetailUser($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Thông tin chi tiết của người dùng',
                'data' => $user,

            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy thông tin người dùng thất bại userController: '
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function update(UserRequest $request, $id) {
        try {
            $user = $this->userRepo->find($id);
            if(!$user) {
                throw new \Exception("Không tìm thấy người dùng phù hợp", 404);
            }

            $data = $request->only([
                'name', 'email', 'code', 'date_birth', 'gender', 'status', 'phone', 'date_create_account', 'img'
            ]);
            if ($request->hasFile('img')) {
                if ($user->img) {
                    $oldPath = str_replace('/storage/', '', $user->img);
                    if (!strpos($oldPath, 'img_user.jpg')) {
                        if (Storage::disk('public')->exists($oldPath)) {
                            Storage::disk('public')->delete($oldPath);
                        }
                    }
                }
                $filename = $request->code
                    ? $request->code . time() . '.' . $request->file('img')->getClientOriginalExtension()
                    : $user->code . time() . '.' . $request->file('img')->getClientOriginalExtension();
                $path = $request->file('img')->storeAs(
                    'images/img_user',
                    $filename,
                    'public'
                );
                $data['img'] = '/storage/' . $path;
            }
            $user = $this->userRepo->editUser($id, $data);
            return response()->json([
                'status' => 'success',
                'message' => 'Chỉnh sửa thông tin nhân viên thành công',
                'data' => $user
            ]);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error($e->getMessage(). ' ở userController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], $statusCode);
        }
    }

    public function findUserName(Request $request) {
        try {
            $name = $request->input('name', '');
            $count = $request->input('count', 5);
            $page = $request->input('page', 1);
            if($count < 0 || $page <0 ){
                throw new \Exception("Yêu cầu count, page không được âm", 400);
            }
            $user = $this->userRepo->findUser($page, $name, $count);

            return response()->json([
                'status' => 'success',
                'data' => $user
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách người dùng thất bại ở trong userController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function indexForce(Request $request) {
        try {
            $start = $request->input('start', 0);      // bắt đầu từ bản ghi nào
            $end = $request->input('end', 10);
            if($start < 0 || $end < 0 ){
                throw new \Exception("Yêu cầu start, end không được âm");
            }
            $users = $this->userRepo->getListForceDelete($start, $end);

            return response()->json([
                'status' => 'success',
                'message' => 'Danh sách nhân viên đã bị xoá',
                'data' => $users
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách người dùng xoá mềm thất bại: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }
    public function forceDelete($id) {
        try {
            $this->userRepo->forceDelete($id);
            return response()->noContent();
        }
        catch(\Exception $e){
            $statusCode = $e->getCode() ?: 500;
            Log::error('Bắt buộc xoá người dùng không thành công: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function restore($id) {
        try {
            $user = $this->userRepo->recoverUserDelete($id);

            return response()->json([
                'status' => 'success',
                'message' => 'Phục hồi người dùng thành công',
                'data' => $user,

            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Phục hồi người dùng đã bị xoá thất bại: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),

            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }
}
