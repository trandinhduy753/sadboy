<?php

namespace Modules\Admin\Chat\src\Repositories;

use Modules\Admin\Chat\src\Repositories\ChatRepositoryInterface;
use App\Repositories\BaseRepository;
use Modules\Admin\Chat\src\Models\Message;
use Modules\Admin\Chat\src\Models\Conversation;
use Modules\Admin\User\src\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
class ChatRepository extends BaseRepository implements ChatRepositoryInterface {
    public function getModel() {
        return Message::class;
    }

    public function getModelDetail() {
        return Message::class;
    }

    public function getDetailChat($user_id, $employee_id, $page, $count=10) {
        $conversation= Conversation::where('user_id', $user_id)
        ->where('employee_id', $employee_id)
        ->first();

        if (!$conversation) {
            throw new \Exception('Không tìm thấy cuộc trò chuyện giữa user và employee.');
        }

        $conversation_id = $conversation->id;

        $messages = $this->model::where('conversation_id', $conversation_id)
        ->orderBy('id', 'desc')
        ->paginate($count);

        $host = env('APP_URL');
        $messages->setCollection(
            $messages->getCollection()->sortBy('id')->values()
        );
        $messages =  $messages->getCollection()->map(function($message) use($host) {
            $meta = [];
            if($message->type === 'product') {
                $product = json_decode($message->meta_data, true);
                $meta = [
                    'img_product' => $host.$product['img_product'],
                    'name_product' => $product['name_product'],
                    'price' => $product['price']
                ];
            }
            else if ($message->type === 'order') {
                $order = json_decode($message->meta_data, true);

                $meta = [
                    'order_code' => $order['order_code'],
                    'count' => $order['count'],
                    'total' => $order['total'],
                    'products' => collect($order['products'])->map(function($product) use($host) {
                        return [
                            'name_product' => $product['name'],
                            'img_product' => $host.$product['img'],
                            'price' => $product['price'],
                            'size' => $product['size']
                        ];
                    })
                ];
            }
            else {
                $meta = NULL;
            }
            return [
                'id' => $message->id,
                'sender_id' => $message->sender_id,
                'conversation_id' => $message->conversation_id,
                'sender_type' => $message->sender_type,
                'content' => $message->content,
                'type' => $message->type,
                'file_path' => empty($message->file_path) ? NULL : $host.$message->file_path,
                'meta_data' => $meta ?? NULL,
                'date' => Carbon::parse($message->created_at)->format('Y-m-d H:i:s')
            ];
        });
        return  $messages;
    }

    public function getListUserChat($employee_id, $page, $count) {
        $users = User::whereHas('conversations', function($query) use($employee_id) {
            $query->where('employee_id', $employee_id);
        })
        ->with(['conversations' => function ($query) use ($employee_id) {
            $query->where('employee_id', $employee_id)
                  ->with('latestMessage');
        }])
        ->paginate($count);

        $host = env('APP_URL');

        $users = collect($users->items())->map(function($user) use($host) {
            // Lấy tin nhắn mới nhất trong tất cả các conversation
            $latestMessage = $user->conversations
                ->map(fn($conversation) => $conversation->latestMessage)
                ->filter() // bỏ null
                ->sortByDesc('created_at') // sắp xếp theo thời gian
                ->first(); // lấy tin nhắn mới nhất

            return [
                'user_id' => $user->id,
                'img_user' => $host . $user->img,
                'name_user' => $user->name,
                'email_user' => $user->email,
                'last_message' => match(optional($latestMessage)->type) {
                    'text' => $latestMessage->content ?? '',
                    'image' => 'Đã gửi một ảnh',
                    'video' => 'Đã gửi một video',
                    'product' => 'Đã gửi một sản phẩm',
                    'order' => 'Đã gửi một đơn hàng',
                    default => '',
                },
               'last_time' => $latestMessage?->created_at
                ? Carbon::parse($latestMessage->created_at)->format('Y-m-d H:i:s')
                : null,
            ];
        });

        return $users;

        $users = Conversation::where('employee_id', $employee_id)
        ->get();
        return $users;
    }

    public function addMessage($data) {
        if(isset($data[0]) && is_array($data[0])) {
            foreach($data as $item) {
                $this->model->create($item);
            }
        }
        else {
            $this->model->create($data);
        }
        return $data;
    }

}

// website thương mại điện tử là gì
// Liệt kê các công nghệ
// dùng ứng dụng gì
