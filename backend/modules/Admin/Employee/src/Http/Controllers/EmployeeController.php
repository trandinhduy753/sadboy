<?php

namespace Modules\Admin\Employee\src\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Modules\Admin\Employee\src\Repositories\EmployeeRepositoryInterface;
use Modules\Admin\Employee\src\Http\Requests\EmployeeRequest;
use Illuminate\Support\Facades\Storage;

class EmployeeController extends Controller
{
    protected $employeeRepo;

    public function __construct(EmployeeRepositoryInterface $employeeRepo)
    {
        $this->employeeRepo = $employeeRepo;
    }

    public function index(Request $request) {
        try {
            $start = $request->input('start', 0);      // bắt đầu từ bản ghi nào
            $end = $request->input('end', 20);

            if($start < 0 || $end <0 ){
                throw new \Exception("Yêu cầu start, end không được âm", 404);
            }
            $employees = $this->employeeRepo->getListEmployee($start, $end);
            //return $employees;
            return response()->json([
                'status' => 'success',
                'message' => 'Danh sách nhân viên',
                'data' => $employees,
                'meta' => [
                    'start' => $start,
                    'limit' => $end
                ]
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách nhân viên thất bại ở trong employeeController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function show($id) {
        try {
            if (!is_numeric($id) || $id <= 0) {
                throw new \Exception("ID phải là số dương", 400);
            }
            $employee = $this->employeeRepo->getDetailEmployee($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Thông tin chi tiết của nhân viên',
                'data' => $employee,

            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy thông tin nhân viên thất bại employeeController: '
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }

    }

    public function delete(Request $request) {
        try {
            $ids = $request->input('ids');
            $this->employeeRepo->deleteEmployee($ids);
            return response()->noContent();
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('xoá nhân viên không thành công: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }

    }

    public function forceDelete($id) {
        try {
            $this->employeeRepo->forceDelete($id);
            return response()->noContent();
        }
        catch(\Exception $e){
            $statusCode = $e->getCode() ?: 500;
            Log::error('Bắt buộc xoá nhân viên không thành công: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status' => 'error',
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

            $employees = $this->employeeRepo->getListForceDelete($start, $end);

            return response()->json([
                'status' => 'success',
                'message' => 'Danh sách nhân viên đã bị xoá',
                'data' => $employees,
                'meta' => [
                    'start' => $start,
                    'limit' => $end
                ]
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách nhân viên xoá mềm thất bại: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function restore($id) {
        try {
            $employee = $this->employeeRepo->recoverEmployeeDelete($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Phục hồi nhân viên thành công',
                'data' => $employee,

            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Phục hồi nhân viên đã bị xoá thất bại: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),

            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function create(EmployeeRequest $request) {
        try {

            $data = $request->only(['code', 'name', 'gender', 'date_birth', 'phone', 'email', 'address', 'diploma',
            'status', 'position_id', 'department_id', 'date_start_work', 'contrast_id', 'work_shift_id', 'salary', 'grant_id', 'password']);
            if ($request->hasFile('img')) {
                $filename = $request->code.''.time(). '.' . $request->file('img')->getClientOriginalExtension();

                $path = $request->file('img')->storeAs(
                    'images/img_employee', // thư mục trong disk
                    $filename,   // tên file tuỳ chỉnh
                    'public'     // disk
                );

                $data['img'] = '/storage/'.$path;
            }
            $employee = $this->employeeRepo->createEmployee($data);

            return response()->json([
                'status' => 'success',
                'message' => 'Đã thêm nhân viên thành công',
                'data' => $employee
            ], 201, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Thên nhân viên mới thất bại employeeController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], $statusCode);
        }

    }

    public function update(EmployeeRequest $request, $id){
        try {
            $employee = $this->employeeRepo->find($id);
            if(!$employee) {
                throw new \Exception("Không tìm thấy nhân viên phù hợp", 404);
            }
            $data = $request->only([
                'name', 'email', 'address', 'code', 'phone', 'gender', 'diploma', 'status', 'date_birth', 'img',
                'date_start_work', 'contrast_id', 'date_sign_contrast', 'date_effect_contrast', 'date_end_contrast',
                'position_id', 'department_id', 'grant_id', 'contrast_id', 'work_shift_id', 'salary', 'password'
            ]);
            if ($request->hasFile('img')) {
                if ($employee->img) {
                    $oldPath = str_replace('/storage/', '', $employee->img);
                    if (!strpos($oldPath, 'img_employee.jpg')) {
                        if (Storage::disk('public')->exists($oldPath)) {
                            Storage::disk('public')->delete($oldPath);
                        }
                    }
                }
                $filename = $request->code
                    ? $request->code . time() . '.' . $request->file('img')->getClientOriginalExtension()
                    : $employee->code . time() . '.' . $request->file('img')->getClientOriginalExtension();
                $path = $request->file('img')->storeAs(
                    'images/img_employee',
                    $filename,
                    'public'
                );
                $data['img'] = '/storage/' . $path;
            }
            $employee = $this->employeeRepo->editEmployee($id, $data);
            return response()->json([
                'status' => 'success',
                'message' => 'Chỉnh sửa thông tin nhân viên thành công',
                'data' => $employee
            ]);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error($e->getMessage(). ' ở employeeController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], $statusCode);
        }

    }

    public function findEmployeeName(Request $request) {
        try {
            $find = $request->input('find', '');
            $count = $request->input('count', 5);
            $page = $request->input('page', 1);
            if($count < 0 ){
                throw new \Exception("Yêu cầu count không được âm", 400);
            }
            $employee = $this->employeeRepo->findEmployee($page, $find, $count);

            return response()->json([
                'status' => 'success',
                'data' => $employee
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách nhân viên thất bại ở trong employeeController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function getPosition() {
        try {
            $positions = $this->employeeRepo->getPosition();
            return response()->json([
                'status' => 'success',
                'message' => 'Lấy danh sách chức vụ thành công',
                'data' => $positions
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách chức vụ thất bại ở trong employeeController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }
    public function getGrants() {
        try {
            $grants = $this->employeeRepo->getGrants();
            return response()->json([
                'status' => 'success',
                'message' => 'Lấy danh sách chức vụ thành công',
                'data' => $grants
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách trợ cấp thất bại ở trong employeeController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function getContrasts() {
        try {
            $contrasts = $this->employeeRepo->getContrasts();
            return response()->json([
                'status' => 'success',
                'message' => 'Lấy danh sách hợp đồng thành công',
                'data' => $contrasts
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách hợp đồng thất bại ở trong employeeController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function getWorkShifts() {
        try {
            $workShifts = $this->employeeRepo->getWorkShifts();
            return response()->json([
                'status' => 'success',
                'message' => 'Lấy danh sách ca làm việc thành công',
                'data' => $workShifts
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách ca làm việc thất bại ở trong employeeController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function getDepartments() {
        try {
            $departments = $this->employeeRepo->getDepartments();
            return response()->json([
                'status' => 'success',
                'message' => 'Lấy danh sách phòng bạn thành công',
                'data' => $departments
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách phòng bạn thất bại ở trong employeeController: '
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
