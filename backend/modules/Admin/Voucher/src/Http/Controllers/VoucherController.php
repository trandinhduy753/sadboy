<?php

namespace Modules\Admin\Voucher\src\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Modules\Admin\Voucher\src\Repositories\VoucherRepositoryInterface;
use App\Http\Requests\CheckStartEndRequest;
use Modules\Admin\Voucher\src\Http\Requests\VoucherRequest;
class VoucherController extends Controller
{
    protected $voucherRepo;

    public function __construct(VoucherRepositoryInterface $voucherRepo)
    {
        $this->voucherRepo = $voucherRepo;
    }

    public function index(CheckStartEndRequest $request) {
        try {
            $start = $request->input('start');
            $end = $request->input('end');
            $vouchers = $this->voucherRepo->getListVoucher($start, $end);
            return response()->json([
                'status' => 'success',
                'message' => 'Danh sách bình luận',
                'data' => $vouchers
            ]);
        }
        catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách bình luận thất bại ở trong VoucherController: '
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
            $this->voucherRepo->deleteVoucher($ids);
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

    public function create(VoucherRequest $request) {
        try {

            $data = $request->only(['code', 'name', 'img', 'type', 'percent', 'max_money', 'money_discount', 'total_user',
                'count_use', 'per_use', 'order_price_smallest', 'user_apply', 'category_id', 'date_effect', 'date_end', 'status'
            ]);

            if ($request->hasFile('img')) {
                $filename = $request->code.''.time(). '.' . $request->file('img')->getClientOriginalExtension();

                $path = $request->file('img')->storeAs(
                    'images/img_voucher', // thư mục trong disk
                    $filename,   // tên file tuỳ chỉnh
                    'public'     // disk
                );

                $data['img'] = '/storage/'.$path;
            }
            $product = $this->voucherRepo->createVoucher($data);
            return response()->json([
                'status' => 'success',
                'message' => 'Đã thêm mã giảm giá thành công',
                'data' => $product
            ], 201, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Thên mã giảm giá mới thất bại productController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], $statusCode);
        }
    }

    public function findVoucherCode(Request $request) {
        try {
            $code = $request->input('code', '');
            $count = $request->input('count', 5);
            $page = $request->input('page', 1);
            if($count < 0 ){
                throw new \Exception("Yêu cầu count không được âm", 400);
            }
            $voucher = $this->voucherRepo->findVoucher($page, $code, $count);

            return response()->json([
                'status' => 'success',
                'data' => $voucher
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách mã giảm giá thất bại ở trong voucherController: '
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
            $voucher = $this->voucherRepo->getDetailVoucher($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Thông tin chi tiết của mã giảm giá',
                'data' => $voucher,

            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy thông tin mã giảm giá thất bại voucherController: '
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function indexForce(CheckStartEndRequest $request) {
        try {
            $start = $request->input('start');
            $end = $request->input('end');
            $vouchers = $this->voucherRepo->getListVoucherDelete($start, $end);

            return response()->json([
                'status' => 'success',
                'message' => 'Danh sách mã giảm giá đã bị xoá',
                'data' => $vouchers,

            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách mã giảm giá xoá mềm thất bại: '
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
            $this->voucherRepo->forceDelete($id);
            return response()->noContent();
        }
        catch(\Exception $e){
            $statusCode = $e->getCode() ?: 500;
            Log::error('Bắt buộc xoá mã giảm giá không thành công: '
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
            $voucher = $this->voucherRepo->recoverVoucherDelete($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Phục hồi mã giảm giá thành công',
                'data' => $voucher,

            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Phục hồi mã giảm giá đã bị xoá thất bại: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),

            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function update(VoucherRequest $request, $id) {
        try {
            $voucher = $this->voucherRepo->find($id);
            if(!$voucher) {
                throw new \Exception("Không tìm thấy mã giảm giá phù hợp", 404);
            }
            $data = $request->only([
                'code', 'name', 'type', 'percent', 'max_money', 'money_discount', 'total_user', 'per_use', 'order_price_smallest',
                'user_apply', 'category_id', 'date_effect', 'add_user_monoply', 'delete_user_monoply'
            ]);

            if ($request->hasFile('img')) {
                if ($voucher->img) {
                    $oldPath = str_replace('/storage/', '', $voucher->img);
                    if (!strpos($oldPath, 'img_voucher.webp')) {
                        if (Storage::disk('public')->exists($oldPath)) {
                            Storage::disk('public')->delete($oldPath);
                        }
                    }
                }
                $filename = $request->code
                    ? $request->code . time() . '.' . $request->file('img')->getClientOriginalExtension()
                    : $voucher->code . time() . '.' . $request->file('img')->getClientOriginalExtension();
                $path = $request->file('img')->storeAs(
                    'images/img_voucher',
                    $filename,
                    'public'
                );
                $data['img'] = '/storage/' . $path;
            }
            $voucher = $this->voucherRepo->editVoucher($id, $data);
            return response()->json([
                'status' => 'success',
                'message' => 'Chỉnh sửa thông tin nhân viên thành công',
                'data' => $voucher
            ]);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error($e->getMessage(). ' ở voucherController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], $statusCode);
        }
    }
}
