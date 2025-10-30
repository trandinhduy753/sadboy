<?php

namespace Modules\Admin\Employee\src\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Modules\Admin\Employee\src\Repositories\ModuleRepositoryInterface;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Access\AuthorizationException;
use Modules\Admin\Employee\src\Models\Module;
class EmployeeAuthorizationController extends Controller
{
    protected $employeeAuthRepo;

    public function __construct(ModuleRepositoryInterface $employeeAuthRepo)
    {
        $this->employeeAuthRepo = $employeeAuthRepo;
    }

    public function show($employee_id) {
        try {
            $this->authorize('view', Module::class);

            $module = $this->employeeAuthRepo->getAuthorization($employee_id);
            return response()->json([
                'status' => 'success',
                'message' => 'Quyền hạn của nhân viên',
                'data' => $module ?? [],

            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch (AuthorizationException $e) {
            // 🔹 Xử lý riêng lỗi phân quyền
            Log::warning('Bạn không có quyền thực hiện hành động này: '.$e->getMessage());
            return response()->json([
                'status'  => 'error',
                'message' => 'Bạn không có quyền truy cập chức năng này.'
            ], 403, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy quyền thất bại ở trong employeeAuthorizationController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }

    }

    public function update(Request $request, $employee_id) {
        try {

            $this->authorize('create', Module::class);
            $permissions = $request->input('permissions');
            
            $module = $this->employeeAuthRepo->editAuthorization($employee_id, $permissions);
            return response()->json([
                'status' => 'success',
                'message' => 'Quyền hạn của nhân viên',
                'data' => $module ?? [],

            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch (AuthorizationException $e) {
            Log::warning('Bạn không có quyền thực hiện hành động này: '.$e->getMessage());
            return response()->json([
                'status'  => 'error',
                'message' => 'Bạn không có quyền truy cập chức năng này.'
            ], 403, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy quyền thất bại ở trong employeeAuthorizationController: '
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
