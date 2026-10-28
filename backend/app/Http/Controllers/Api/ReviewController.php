<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ReviewController extends Controller
{
    /**
     * Get active reviews for public landing page.
     */
    public function index()
    {
        $reviews = Review::where('is_active', true)
            ->orderBy('order_index', 'asc')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'reviews' => $reviews,
        ]);
    }

    /**
     * Get all reviews for admin panel.
     */
    public function adminIndex()
    {
        $reviews = Review::orderBy('order_index', 'asc')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'reviews' => $reviews,
        ]);
    }

    /**
     * Store a newly created review by admin.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'nullable|string|max:255',
            'outcome' => 'nullable|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string|max:3000',
            'avatar' => 'nullable|image|max:3072',
            'is_active' => 'nullable|boolean',
            'order_index' => 'nullable|integer',
        ]);

        $avatarPath = null;
        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('reviews', 'public');
        }

        $review = Review::create([
            'name' => $validated['name'],
            'role' => $validated['role'] ?? null,
            'outcome' => $validated['outcome'] ?? null,
            'rating' => $validated['rating'],
            'review' => $validated['review'],
            'avatar_path' => $avatarPath,
            'is_active' => $request->has('is_active') ? filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN) : true,
            'order_index' => $validated['order_index'] ?? 0,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Review pelanggan berhasil ditambahkan.',
            'review' => $review,
        ], 201);
    }

    /**
     * Update an existing review by admin.
     */
    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'nullable|string|max:255',
            'outcome' => 'nullable|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string|max:3000',
            'avatar' => 'nullable|image|max:3072',
            'is_active' => 'nullable',
            'order_index' => 'nullable|integer',
        ]);

        if ($request->hasFile('avatar')) {
            if ($review->avatar_path && Storage::disk('public')->exists($review->avatar_path)) {
                Storage::disk('public')->delete($review->avatar_path);
            }
            $review->avatar_path = $request->file('avatar')->store('reviews', 'public');
        }

        $review->name = $validated['name'];
        $review->role = $validated['role'] ?? null;
        $review->outcome = $validated['outcome'] ?? null;
        $review->rating = $validated['rating'];
        $review->review = $validated['review'];

        if ($request->has('is_active')) {
            $review->is_active = filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN);
        }
        if ($request->has('order_index')) {
            $review->order_index = (int) $request->order_index;
        }

        $review->save();

        return response()->json([
            'success' => true,
            'message' => 'Review pelanggan berhasil diperbarui.',
            'review' => $review,
        ]);
    }

    /**
     * Toggle review visibility.
     */
    public function toggle($id)
    {
        $review = Review::findOrFail($id);
        $review->is_active = !$review->is_active;
        $review->save();

        return response()->json([
            'success' => true,
            'message' => 'Status tampilan review berhasil diubah.',
            'is_active' => $review->is_active,
            'review' => $review,
        ]);
    }

    /**
     * Delete a review.
     */
    public function destroy($id)
    {
        $review = Review::findOrFail($id);

        if ($review->avatar_path && Storage::disk('public')->exists($review->avatar_path)) {
            Storage::disk('public')->delete($review->avatar_path);
        }

        $review->delete();

        return response()->json([
            'success' => true,
            'message' => 'Review berhasil dihapus.',
        ]);
    }
}
