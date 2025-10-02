<?php

namespace Modules\Admin\Voucher\src\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoucherUsages extends Model
{
    use HasFactory;
    protected $table = 'voucher_usages';
}
