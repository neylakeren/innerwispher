# Technical Design Specification: Neyla Web Platform v2.0

**Date:** 2026-06-07
**Status:** Draft (Approved Architecture)
**Tech Stack:** Laravel 12 (API), MySQL 8, React JSX (Vite), Tailwind CSS v3, Laravel Reverb (WebSocket).

## 1. Overview
Neyla is a psychologist-patient counseling platform. It bridges a WhatsApp-based discovery/booking bot with a web-based portal for payment verification and real-time chat counseling.

## 2. Architecture (Decoupled)
- **Backend:** Laravel 12 providing a RESTful API. Authenticated via Laravel Sanctum.
- **Frontend:** React SPA built with Vite. Consumes the Laravel API.
- **Real-time:** Laravel Reverb (WebSocket) for instant messaging during sessions.
- **External:** n8n + WAHA for WhatsApp Bot logic and triage.

## 3. Data Models (MySQL)
- **users:** `id, name, email, phone, role (patient, psychologist, admin), password, profile_photo_url`.
- **psychologist_profiles:** `user_id, bio, specialization, license_no, price_per_session, is_verified`.
- **schedules:** `id, psychologist_id, day_of_week, start_time, end_time, is_available`.
- **bookings:** `id, patient_id, psychologist_id, schedule_id, date, status (pending, confirmed, paid, cancelled, completed), triage_answers_json`.
- **payments:** `id, booking_id, amount, proof_image_path, status (pending, verified, rejected), verified_at`.
- **sessions:** `id, booking_id, started_at, ended_at, status (active, closed)`.
- **messages:** `id, session_id, sender_id, content, created_at`.
- **session_notes:** `id, session_id, psychologist_id, content`.

## 4. Key Workflows

### 4.1. Account & Payment
1. **Registration:** Patient registers on the web using the same phone number used in WA.
2. **Payment:** Patient views "Confirmed" bookings, uploads transfer proof.
3. **Verification:** Admin reviews proof in Dashboard, marks as "Verified". This changes booking status to "Paid" and creates a "Session".

### 4.2. Counseling Session (Chat)
1. **Access:** Patient and Psychologist enter the Chat Room via the Session link.
2. **Real-time:** `Laravel Reverb` broadcasts messages. `Laravel Echo` on the React side listens for `NewMessage` events.
3. **Closure:** Psychologist clicks "Akhiri Sesi".
    - Session status -> `closed`.
    - Chat inputs disabled.
    - Psychologist prompted to fill `session_notes`.

## 5. UI/UX Requirements
- **Color Palette:** Professional & Calm. Neutral backgrounds (`slate-50`), primary accents in soft blues or greens (`emerald-600` or `indigo-600`).
- **Responsive:** Mobile-first design for patients; Desktop-optimized for psychologists (dashboard/chat).
- **Chat Interface:** 2-column layout. Left: Message list (infinite scroll). Right: Patient/Session info + "End Session" button.

## 6. API Endpoints (Sanctum Protected)
- `POST /api/register` | `POST /api/login`
- `GET /api/bookings` (List for Patient/Psychologist)
- `POST /api/payments/upload` (Upload proof)
- `GET /api/sessions/{id}` (Get chat history)
- `POST /api/sessions/{id}/messages` (Send message)
- `POST /api/sessions/{id}/end` (Psychologist only)
- `POST /api/sessions/{id}/notes` (Submit notes)

## 7. Security & Verification
- **Sanctum:** Token-based security for all API calls.
- **Policy:** Users can only access sessions they are part of.
- **Validation:** Proof of payment must be an image (mime:jpg,png).
