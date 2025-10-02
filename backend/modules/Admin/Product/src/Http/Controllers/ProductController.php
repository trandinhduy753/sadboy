<?php

namespace Modules\Admin\Product\src\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Modules\Admin\Product\src\Repositories\ProductRepositoryInterface;
use Modules\Admin\Product\src\Http\Requests\ProductRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\CheckStartEndRequest;
use Modules\Admin\Product\src\Http\Requests\GoodsReceiptRequest;
class ProductController extends Controller
{
    protected $productRepo;

    public function __construct(ProductRepositoryInterface $productRepo)
    {
        $this->productRepo = $productRepo;
    }

    public function index(CheckStartEndRequest $request) {
        try {
            $start = $request->input('start', 0);      // bắt đầu từ bản ghi nào
            $end = $request->input('end', 20);
            $products = $this->productRepo->getListProduct($start, $end);

            return response()->json([
                'status' => 'success',
                'message' => 'Danh sách sản phẩm',
                'data' => $products
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách sản phẩm thất bại ở trong productController: '
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
            $this->productRepo->deleteProduct($ids);
            return response()->json([
                'status' => 'success',
                'message' => 'Xoá sản phẩm thàng công'
            ]);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('xoá sản phẩm không thành công: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }

    }

    public function findProductName(Request $request) {
        try {
            $name = $request->input('name', '');
            $count = $request->input('count', 5);
            $page = $request->input('page', 1);
            if($count < 0 ){
                throw new \Exception("Yêu cầu count không được âm", 400);
            }
            $product = $this->productRepo->findProduct($page, $name, $count);

            return response()->json([
                'status' => 'success',
                'data' => $product
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách sản phẩm thất bại ở trong productController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function getCategories() {
        try {
            $categories = $this->productRepo->getListCategory();

            return response()->json([
                'status' => 'success',
                'message' => 'Lấy thông tin danh mục thành công',
                'data' => $categories
            ]);
        }
        catch(\Exception $e) {
            Log::error('Lấy danh mục sản phẩm thất bại ở trong productController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], 404, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function create(ProductRequest $request) {
        try {
            $data = $request->only(['code', 'name', 'count_stock', 'category_id', 'provide_id', 'place', 'gift', 'sort_description',
                'long_description', 'import_price', 'original_price', 'imgs'
            ]);
            //return $data;
            if($request->filled('long_description')) {
                if ($request->filled('long_description')) {
                    $filename = $request->code . '_' . time() . '_' . uniqid() . '.txt';
                    $path = Storage::put(
                        'public/files/' . $filename,
                        $request->long_description
                    );

                    // Lưu đường dẫn public (truy cập được)
                    $data['long_description'] = '/storage/files/' . $filename;
                }
            }
            //return 1111;
            if ($request->hasFile('imgs')) {
                $paths = [];
                foreach ($request->file('imgs') as $img) {
                    $filename = $request->code . '_' . time() . '_' . uniqid() . '.' . $img->getClientOriginalExtension();
                    $path = $img->storeAs(
                        'images/img_product',
                        $filename,
                        'public'
                    );
                    $paths[] = '/storage/' . $path;
                }
                $data['imgs'] = $paths;
            }
            else {
                $data['imgs'] = NULL;
            }

            $product = $this->productRepo->createProduct($data);
            return response()->json([
                'status' => 'success',
                'message' => 'Đã thêm sản phẩm thành công',
                'data' => $product
            ], 201, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Thên sản phẩm mới thất bại productController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], $statusCode);
        }
    }

    public function show(Request $request, $id) {
        try {
            if (!is_numeric($id) || $id <= 0) {
                throw new \Exception("ID phải là số dương", 400);
            }
            $page = $request->input('page', 1);
            $product = $this->productRepo->getDetailProduct($id, $page);
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

    public function update(ProductRequest $request, $id) {
        try {
            $product = $this->productRepo->find($id);
            if(!$product) {
                throw new \Exception("Không tìm thấy sản phẩm phù hợp", 404);
            }

            $data = $request->only([
                'code', 'name', 'provide_id', 'category_id', 'place', 'star', 'gift', 'import_price',
                'original_price', 'original_price', 'sale_price', 'sort_description', 'long_description',
                'count_comment', 'QR', 'proportion_discount', 'date_start_sale', 'date_end_sale', 'count_stock',
                'count_sale', 'status', 'unit'
            ]);

            if ($request->hasFile('imgs')) {

                if ($product->imgs) {
                    foreach (json_decode($product->imgs, true) as $img) {
                        $oldPath = str_replace('/storage/', '', $img);
                        if (Storage::disk('public')->exists($oldPath)) {
                            Storage::disk('public')->delete($oldPath);
                        }
                    }
                }

                $paths = [];
                foreach ($request->file('imgs') as $img) {
                    $filename = $request->code
                        ? $request->code . uniqid() . '.' . $img->getClientOriginalExtension()
                        : $product->code . uniqid() . '.' . $img->getClientOriginalExtension();
                    $path = $img->storeAs(
                        'images/img_product',
                        $filename,
                        'public'
                    );
                    $paths[] = '/storage/' . $path;
                }
                $data['imgs'] = $paths;
            }

            if ($request->filled('long_description')) {
                $filename = $request->code
                    ? $request->code. '_' . time() . '_' . uniqid() . '.txt'
                    : $product->code. '_' . time() . '_' . uniqid() . '.txt';

                $path = Storage::put(
                    'public/files/' . $filename,
                    $request->long_description
                );

                $oldPath = str_replace('/storage/', '', $product->detail->long_description);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }

                $data['long_description'] = '/storage/files/' . $filename;
            }

            $product = $this->productRepo->editProduct($id, $data);
            return response()->json([
                'status' => 'success',
                'message' => 'Chỉnh sửa thông tin nhân viên thành công',
                'data' => $product
            ]);

        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error($e->getMessage(). ' ở productController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], $statusCode);
        }
    }

    public function productSupply(CheckStartEndRequest $request) {
        $start = $request->input('start');      // bắt đầu từ bản ghi nào
        $end = $request->input('end');
        $provide_id = $request->input('provide_id');
        $products = $this->productRepo->getListProductSupply($provide_id, $start, $end);

        return response()->json([
            'status' => 'success',
            'message' => 'Danh sách sản phẩm',
            'data' => $products
        ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    }

    public function findProductSupply(Request $request) {
        try {
            $find = $request->input('find', '');
            $page = $request->input('page', 1);
            $provide_id = $request->input('provide_id');
            if(!$page > 0 ){
                throw new \Exception("Yêu cầu page không được âm", 400);
            }
            $product = $this->productRepo->findProductSupply($provide_id, $find, $page);

            return response()->json([
                'status' => 'success',
                'message' => 'Danh sách sản phẩm',
                'data' => $product
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách nhân viên thất bại ở trong productController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function addGoodsReceipt(GoodsReceiptRequest $request) {
        $data = $request->only(['code', 'count', 'date_receive', 'discount', 'subtotal',
            'total', 'note', 'note_cancel', 'other_cost', 'products', 'status', 'stock_id', 'provide_id'
        ]);

        $product = $this->productRepo->addGoodsReceipt($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Đã thêm sản phẩm thành công',
            'data' => $product
        ], 201, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

    }

    public function indexForce(CheckStartEndRequest $request) {
        try {
            $start = $request->input('start', 0);      // bắt đầu từ bản ghi nào
            $end = $request->input('end', 10);

            $products = $this->productRepo->getListProductDelete($start, $end);

            return response()->json([
                'status' => 'success',
                'message' => 'Danh sách sản phẩm đã bị xoá',
                'data' => $products,
                'meta' => [
                    'start' => $start,
                    'limit' => $end
                ]
            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Lấy danh sách sản phẩm xoá mềm thất bại: '
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
            $this->productRepo->forceDelete($id);
            return response()->noContent();
        }
        catch(\Exception $e){
            $statusCode = $e->getCode() ?: 500;
            Log::error('Bắt buộc xoá sản phẩm không thành công: '
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
            $product = $this->productRepo->recoverProductDelete($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Phục hồi sản phẩm thành công',
                'data' => $product,

            ], 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
        catch(\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            Log::error('Phục hồi sản phẩm đã bị xoá thất bại: '
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
