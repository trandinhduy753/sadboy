<?php

namespace Modules\Admin\Chat\src\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Modules\Admin\Chat\src\Rules\SenderExists;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;
class MessageRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'conversation_id' => ['required', 'integer'],
            'sender_id' => ['required', 'integer', new SenderExists],
            'sender_type' => ['required', 'in:admin,user'],
            'type' => ['required', 'in:product,order,mixed'],
            'content' => ['nullable', 'string'],
            'file_path' => ['nullable'],
            'meta_data' => ['nullable']
        ];
    }

    public function messages() {
        return [
            'required' => __('Admin/Chat::Validation.required'),
            'integer' => __('Admin/Chat::Validation.integer'),
            'in' => __('Admin/Chat::Validation.in'),
            'string' => __('Admin/Chat::Validation.chat'),
        ];
    }

    public function attributes(){
        return [
            'conversation_id' =>  __('Admin/Chat::Validation.attributes.conversation_id'),
            'sender_id' =>  __('Admin/Chat::Validation.attributes.sender_id'),
            'sender_type' =>  __('Admin/Chat::Validation.attributes.sender_type'),
            'type' =>  __('Admin/Chat::Validation.attributes.type'),
            'content' =>  __('Admin/Chat::Validation.attributes.content'),
            'file_path' =>  __('Admin/Chat::Validation.attributes.file_path'),
            'meta_data' =>  __('Admin/Chat::Validation.attributes.meta_data'),

        ];
    }


    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'statusCode'=> 422,
            'status' => 'error',
            'errors' => $validator->errors()
        ], 422));
    }

}
