<?php

namespace Modules\Admin\Employee\src\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Modules\Admin\Employee\src\Models\Employee;
class Module extends Model
{
    use HasFactory;
    protected $table = 'modules';
    protected $primaryKey = 'employee_id';
    public $incrementing = false;

    protected $fillable = ['employee_id', 'permissions'];

    public function employee() {
        return $this->belongsTo(
            Employee::class,
            'employee_id',
            'id'
        );
    }
}
