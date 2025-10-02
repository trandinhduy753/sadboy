<?php

namespace Modules\Admin\Comment\src\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CheckStartEndRequest;
use Modules\Admin\Comment\src\Repositories\CommentRepositoryInterface;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    protected $commentRepo;

    public function __construct(CommentRepositoryInterface $commentRepo)
    {
        $this->commentRepo = $commentRepo;
    }

    public function index(CheckStartEndRequest $request) {
        try {

            $start = $request->input('start');      // bắt đầu từ bản ghi nào
            $end = $request->input('end');
            $comments = $this->commentRepo->getListComment($start, $end);

            return response()->json([
                'status' => 'success',
                'message' => 'Danh sách bình luân ',
                'data' => $comments,
                'meta' => [
                    'start' => $start,
                    'limit' => $end
                ]
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách bình luân thất bại ở trong commentController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode , [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function findCommentCode(Request $request) {
        try {
            $code = $request->input('code', '');
            $count = $request->input('count', 5);
            $page = $request->input('page', 1);
            if($count < 0 ){
                throw new \Exception("Yêu cầu count không được âm", 400);
            }
            $comment = $this->commentRepo->findComment($page, $code, $count);

            return response()->json([
                'status' => 'success',
                'data' => $comment
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách bình luận thất bại ở trong commentController: '
                . ' tại file ' . $e->getFile()
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
            $data= $this->commentRepo->deleteComment($ids);
            return response()->json([
                'status' => 'success',
                'data' => $data
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
            //return response()->noContent();
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('xoá bình luận không thành công: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function show(Request $request, $id) {
        try {
            if (!is_numeric($id) || $id <= 0) {
                throw new \Exception("ID phải là số dương", 400);
            }
            $page = $request->input('page', 1);
            $product = $this->commentRepo->getDetailComment($id, $page);
            return response()->json([
                'status' => 'success',
                'message' => 'Thông tin chi tiết của sản phẩm',
                'data' => $product,

            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy thông tin sản phẩm thất bại productController: '
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

            $start = $request->input('start');      // bắt đầu từ bản ghi nào
            $end = $request->input('end');

            $comments = $this->commentRepo->getListCommentDelete($start, $end);

            return response()->json([
                'status' => 'success',
                'message' => 'Danh sách bình luận đã bị xoá',
                'data' => $comments,
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách bình luận xoá mềm thất bại: '
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
            $this->commentRepo->forceDelete($id);
            return response()->noContent();
        }
        catch(\Exception $e){
            $statusCode = $e->getCode() ?: 500;
            Log::error('Bắt buộc xoá bình luận không thành công: '
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
            $employee = $this->commentRepo->recoverCommentDelete($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Phục hồi bình luận thành công',
                'data' => $employee,

            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Phục hồi bình luận đã bị xoá thất bại: '
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
