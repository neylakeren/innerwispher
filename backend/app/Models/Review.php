<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'role',
        'outcome',
        'rating',
        'review',
        'avatar_path',
        'is_active',
        'order_index',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_active' => 'boolean',
        'order_index' => 'integer',
    ];

    protected $appends = ['avatar_url', 'initials'];

    public function getAvatarUrlAttribute(): ?string
    {
        if ($this->avatar_path) {
            if (filter_var($this->avatar_path, FILTER_VALIDATE_URL)) {
                return $this->avatar_path;
            }
            return url(Storage::url($this->avatar_path));
        }
        return null;
    }

    public function getInitialsAttribute(): string
    {
        $words = preg_split('/\s+/', trim($this->name));
        $initials = '';
        foreach (array_slice($words, 0, 2) as $w) {
            $initials .= mb_strtoupper(mb_substr($w, 0, 1));
        }
        return $initials ?: 'IW';
    }
}
