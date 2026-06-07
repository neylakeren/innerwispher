# Neyla Web Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a decoupled web platform with Laravel 12 API and React SPA for psychologist counseling, featuring manual payment verification and real-time chat.

**Architecture:** Decoupled REST API (Laravel 12 + Sanctum) and Frontend (React + Vite). Real-time communication via Laravel Reverb.

**Tech Stack:** Laravel 12, MySQL 8, React JSX, Tailwind CSS v3, Laravel Reverb, Laravel Sanctum.

---

### Task 1: Project Initialization & Database Setup

**Files:**
- Create: `.env` (modified from .env.example)
- Modify: `config/database.php`

- [ ] **Step 1: Create Laravel 12 project**
Run: `composer create-project laravel/laravel:^12.0 .`

- [ ] **Step 2: Configure .env with provided credentials**
Set `DB_USERNAME=root`, `DB_PASSWORD=root`, `DB_DATABASE=neyla`.
Create database `neyla` if not exists.

- [ ] **Step 3: Install Sanctum & Reverb**
Run: `php artisan install:api` (Sanctum)
Run: `php artisan install:broadcasting` (Reverb)

- [ ] **Step 4: Commit**
```bash
git add .
git commit -m "chore: initialize laravel 12 with api and broadcasting"
```

### Task 2: Core Data Models & Migrations

**Files:**
- Create: `database/migrations/2026_06_07_create_psychologist_profiles_table.php`
- Create: `database/migrations/2026_06_07_create_bookings_table.php`
- Create: `database/migrations/2026_06_07_create_payments_table.php`
- Create: `database/migrations/2026_06_07_create_sessions_table.php`
- Create: `database/migrations/2026_06_07_create_messages_table.php`

- [ ] **Step 1: Create Migrations**
Implement schemas for `users` (update default), `psychologist_profiles`, `bookings`, `payments`, `sessions`, and `messages`.

- [ ] **Step 2: Run Migrations**
Run: `php artisan migrate`

- [ ] **Step 3: Define Model Relationships**
Update `User`, `PsychologistProfile`, `Booking`, etc., with `belongsTo`, `hasMany` relationships.

- [ ] **Step 4: Commit**
```bash
git add database/migrations app/Models
git commit -m "feat: add core data models and migrations"
```

### Task 3: Authentication API (Sanctum)

**Files:**
- Create: `app/Http/Controllers/Api/AuthController.php`
- Modify: `routes/api.php`

- [ ] **Step 1: Create Register & Login Logic**
Implement `register` and `login` methods returning Sanctum tokens.

- [ ] **Step 2: Add Auth Routes**
```php
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
```

- [ ] **Step 3: Test Auth Flow**
Use Postman or curl to verify token generation.

- [ ] **Step 4: Commit**
```bash
git add app/Http/Controllers/Api/AuthController.php routes/api.php
git commit -m "feat: implement sanctum authentication api"
```

### Task 4: Frontend Initialization (React + Vite)

**Files:**
- Create: `frontend/` (React App)
- Modify: `frontend/tailwind.config.js`

- [ ] **Step 1: Scaffold React App**
Run: `npm create vite@latest frontend -- --template react`

- [ ] **Step 2: Install Tailwind CSS v3**
Run: `npm install -D tailwindcss@3 postcss autoprefixer`
Run: `npx tailwindcss init -p`

- [ ] **Step 3: Configure Tailwind**
Setup content paths to include React components.

- [ ] **Step 4: Commit**
```bash
git add frontend
git commit -m "chore: initialize react frontend with vite and tailwind v3"
```

### Task 5: Payment & Session Management Logic

**Files:**
- Create: `app/Http/Controllers/Api/PaymentController.php`
- Create: `app/Http/Controllers/Api/SessionController.php`

- [ ] **Step 1: Implement Payment Upload**
Create `POST /api/payments/upload` to store proof images.

- [ ] **Step 2: Implement Session Closure**
Create `POST /api/sessions/{id}/end` for psychologists to close sessions.

- [ ] **Step 3: Commit**
```bash
git add app/Http/Controllers/Api
git commit -m "feat: implement payment upload and session closure logic"
```
