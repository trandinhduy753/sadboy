<?php

namespace Modules\Client\Chat\src\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Modules\Client\Chat\src\Repositories\ClientChatRepositoryInterface;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Access\AuthorizationException;
use Modules\Client\Chat\src\Http\Requests\MessageRequest;
use App\Events\MessagesFetched;
use Carbon\Carbon;
class MessageController extends Controller
{
    protected $messageRepo;

    public function __construct(ClientChatRepositoryInterface $messageRepo)
    {
        $this->messageRepo = $messageRepo;
    }

    public function index(Request $request) {
        try {
            $page = $request->input('page', 1);
            $count = $request->input('count', 10);
            $user = auth()->guard('user')->user();

            $messages = $this->messageRepo->getListMessage($user->id, $page, $count);

            return response()->json([
                'status' => 'success',
                'message' => 'Danh sách tin nhắn',
                'data' => $messages,

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
            Log::error('Lấy danh sách cuộ trò chuyện thất bại ở trong MessageController: '
                . ' tại file ' . $e->getFile()
                . ' dòng ' . $e->getLine()
            );
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        }
    }

    public function create(MessageRequest $request) {
        try {
            $data = $request->only(['conversation_id', 'sender_id', 'sender_type', 'type', 'content', 'imgs', 'videos', 'meta_data']);
            $user = auth()->guard('user')->user();
            $temp = [];
            $temp_frontend = [];
            $host = env('APP_URL');
            //return $user;
            if($data['type'] === 'order') {
                $products = $data['meta_data']['products'];
                $products_temp =[];
                $products_temp_frontend =[];
                foreach($products as $product){
                    $products_temp[] =[
                        'count' => $product['count'],
                        'img' => str_replace($host, '', $product['img']),
                        'name' => $product['name'],
                        'price' => $product['price'],
                        'size' => $product['size']
                    ];
                    $products_temp_frontend[] = [
                        'count' => $product['count'],
                        'img' => $product['img'],
                        'name' => $product['name'],
                        'price' => $product['price'],
                        'size' => $product['size']
                    ];
                }

                $temp = [
                    'conversation_id' => $data['conversation_id'],
                    'sender_id' => $user->id,
                    'sender_type' => $data['sender_type'],
                    'type' => $data['type'],
                    'meta_data' => json_encode([
                        'order_code' => $data['meta_data']['order_code'],
                        'count' => $data['meta_data']['count'],
                        'total' => $data['meta_data']['total'],
                        'products' => $products_temp
                    ]),
                    'content' => NULL,
                    'file_path' => NULL
                ];
                $temp_frontend = [
                    'conversation_id' => $data['conversation_id'],
                    'sender_id' => $user->id,
                    'sender_type' => $data['sender_type'],
                    'type' => $data['type'],
                    'meta_data' => $data['meta_data'],
                    'content' => NULL,
                    'file_path' => NULL,
                    'date' => Carbon::now()->format('Y-m-d H:i:s')
                ];
            }
            else if($data['type'] === 'product') {
                $img = str_replace($host, '', $data['meta_data']['img_product']);
                $temp = [
                    'conversation_id' => $data['conversation_id'],
                    'sender_id' => $user->id,
                    'sender_type' => $data['sender_type'],
                    'type' => $data['type'],
                    'meta_data' => json_encode([
                        'img_product' => $img,
                        'name_product' => $data['meta_data']['name_product'],
                        'price' => $data['meta_data']['price'],
                    ]),
                    'content' => NULL,
                    'file_path' => NULL
                ];

                $temp_frontend = [
                    'conversation_id' => $data['conversation_id'],
                    'sender_id' => $user->id,
                    'sender_type' => $data['sender_type'],
                    'type' => $data['type'],
                    'meta_data' => $data['meta_data'],
                    'content' => NULL,
                    'file_path' => NULL,
                    'date' => Carbon::now()->format('Y-m-d H:i:s')
                ];
            }
            else  {
                if(!empty($data['content'])) {
                    $check = [
                        'conversation_id' => $data['conversation_id'],
                        'sender_id' => $user->id,
                        'sender_type' => $data['sender_type'],
                        'type' => 'text',
                        'meta_data' => NULL,
                        'file_path' => NULL,
                        'content' => $data['content'],
                        'date' => Carbon::now()->format('Y-m-d H:i:s')
                    ];
                    $temp[] = $check;

                    $temp_frontend[] = $check;
                }
                if($request->hasFile('imgs')) {
                    foreach ($request->file('imgs') as $img) {
                        $filename = uniqid() . '_'. time() . '.'  . $img->getClientOriginalExtension();
                        $path = $img->storeAs(
                            'images/img_chat',
                            $filename,
                            'public'
                        );
                        $temp[] = [
                            'conversation_id' => $data['conversation_id'],
                            'sender_id' => $user->id,
                            'sender_type' => $data['sender_type'],
                            'type' => 'image',
                            'meta_data' => NULL,
                            'file_path' => '/storage/' . $path,
                            'content' => NULL
                        ];
                        $temp_frontend[] = [
                            'conversation_id' => $data['conversation_id'],
                            'sender_id' => $user->id,
                            'sender_type' => $data['sender_type'],
                            'type' => 'image',
                            'meta_data' => NULL,
                            'file_path' => $host.'/storage/' . $path,
                            'content' => NULL,
                            'date' => Carbon::now()->format('Y-m-d H:i:s')
                        ];
                    }
                }

                if ($request->hasFile('videos')) {
                    foreach ($request->file('videos') as $video) {
                        $filename = uniqid() . '_' . time() . '.' . $video->getClientOriginalExtension();
                        $path = $video->storeAs(
                            'images/img_chat', // 👈 lưu vào thư mục đúng loại
                            $filename,
                            'public'
                        );
                        $temp[] = [
                            'conversation_id' => $data['conversation_id'],
                            'sender_id' => $user->id,
                            'sender_type' => $data['sender_type'],
                            'type' => 'video',
                            'meta_data' => null,
                            'file_path' => '/storage/' . $path,
                            'content' => null,
                        ];;
                        $temp_frontend[] = [
                            'conversation_id' => $data['conversation_id'],
                            'sender_id' => $user->id,
                            'sender_type' => $data['sender_type'],
                            'type' => 'video',
                            'meta_data' => null,
                            'file_path' => $host.'/storage/' . $path,
                            'content' => null,
                            'date' => Carbon::now()->format('Y-m-d H:i:s')
                        ];
                    }
                }


            }

           
            $messages = $this->messageRepo->addMessage($temp);
            //broadcast(new MessagesFetched([$messages]))->toOthers();

            broadcast(new MessagesFetched([$temp_frontend]))->toOthers();

            return response()->json([
                'status' => 'success',
                'message' => 'Thêm một tin nhắn thành công',
                'data' => $messages,

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
            Log::error('Thêm tin nhắn thất bai MessageController: '
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
