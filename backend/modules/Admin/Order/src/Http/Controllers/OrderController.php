<?php

namespace Modules\Admin\Order\src\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Modules\Admin\Order\src\Repositories\OrderRepositoryInterface;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Modules\Admin\Order\src\Http\Requests\OrderRequest;
class OrderController extends Controller
{
    protected $orderRepo;
    public function __construct(OrderRepositoryInterface $orderRepo)
    {
        $this->orderRepo = $orderRepo;
    }
    public function index(Request $request) {
        try {
            $start = $request->input('start', 0);
            $end = $request->input('end', 20);
            if($start < 0 || $end < 0) {
                throw new \Exception("Yêu cầu start, end không được âm", 404);
            }
            $orders = $this->orderRepo->getListOrder($start, $end);
            return response()->json([
                'status' => 'success',
                'message' => 'Danh sách đơn hàng',
                'data' => $orders
            ]);
        }
        catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách đơn hàng thất bại ở trong OrderController: '
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
            $this->orderRepo->deleteOrder($ids);
            return response()->noContent();
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Xoá đơn hàng không thành công: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function confirm(){
        try {
            $orders = $this->orderRepo->OrderConfirmAll();
            return response()->json([
                'status' => 'success',
                'message' => 'Xác nhận đơn hàng thành công',
                'data' => $orders
            ]);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Xác nhận tất cả đơn hàng không thành công: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function show($id){
        try {
            if (!is_numeric($id) || $id <= 0) {
                throw new \Exception("ID phải là số dương", 400);
            }
            $order = $this->orderRepo->getDetailOrder($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Thông tin chi tiết của đơn hàng',
                'data' => $order,

            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy thông tin đơn hàng thất bại OrderController: '
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function update(OrderRequest $request, $id){
        try {
            $data = $request->only([
                'status'
            ]);
            $order = $this->orderRepo->editOrder($id, $data);
            return response()->json([
                'status' => 'success',
                'message' => 'Chỉnh sửa thông tin đơn hàng thành công',
                'data' => $order
            ]);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy thông tin đơn hàng thất bại OrderController: '
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
            $end = $request->input('end', 20);

            if($start < 0 || $end < 0 ){
                throw new \Exception("Yêu cầu start, end không được âm", 400);
            }

            $orders = $this->orderRepo->getListForceDelete($start, $end);

            return response()->json([
                'status' => 'success',
                'message' => 'Danh sách đơn hàng đã bị xoá',
                'data' => $orders
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách đơn hàng xoá mềm thất bại: '
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
            $this->orderRepo->forceDelete($id);
            return response()->noContent();
        }
        catch(\Exception $e){
            $statusCode = $e->getCode() ?: 500;
            Log::error('Bắt buộc xoá đơn hàng không thành công: '
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
            $order = $this->orderRepo->recoverOrderDelete($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Phục hồi đơn hàng thành công',
                'data' => $order,

            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Phục hồi đơn hàng đã bị xoá thất bại: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),

            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function findOrderCode(Request $request) {
        try {
            $find = $request->input('find', '');
            $count = $request->input('count', 5);
            $page = $request->input('page', 1);
            if($count < 0 || $page < 0 ){
                throw new \Exception("Yêu cầu count, page không được âm", 400);
            }
            $order = $this->orderRepo->findOrder($page, $find, $count);

            return response()->json([
                'status' => 'success',
                'data' => $order
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách nhân viên thất bại ở trong orderController: '
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
