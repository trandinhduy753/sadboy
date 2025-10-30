<?php

namespace Modules\Client\Chat\src\Repositories;

use Modules\Client\Chat\src\Repositories\ClientChatRepositoryInterface;
use App\Repositories\BaseRepository;
use Modules\Admin\Chat\src\Models\Message;
use Modules\Admin\Chat\src\Models\Conversation;
use Modules\Admin\User\src\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
class ClientChatRepository extends BaseRepository implements ClientChatRepositoryInterface {
    public function getModel() {
        return Message::class;
    }

    public function getModelDetail() {
        return Message::class;
    }

    public function getListMessage($user_id, $page, $count) {

        $conversation= Conversation::where('user_id', $user_id)
        ->where('employee_id', 1)
        ->first();

        if(!$conversation) {
            $conversation = Conversation::create([
                'user_id' => $user_id,
                'employee_id' => 1,
            ]);
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
        return  [
            'conversation_id' => $conversation_id ,
            'messages' => $messages ?? [],
        ];
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
