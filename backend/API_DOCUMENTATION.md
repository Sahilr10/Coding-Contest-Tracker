# Contest Tracker Backend API Documentation

Base URL (adjust if mounted differently):
- `http://<host>:<port>/api`

---

## Contest Routes

### GET `/contest/codeforces`
- Description: Fetch Codeforces contest data.
- Authentication: none
- Request body: none
- Response: JSON list of contests
- Errors:
  - `500` Internal Server Error

### GET `/contest/leetcode`
- Description: Fetch LeetCode contest data.
- Authentication: none
- Request body: none
- Response: JSON list of contests

### GET `/contest/codechef`
- Description: Fetch CodeChef contest data.
- Authentication: none
- Request body: none
- Response: JSON list of contests

### GET `/contest/gfg`
- Description: Fetch GeeksforGeeks contest data.
- Authentication: none
- Request body: none
- Response: JSON list of contests

### GET `/contest/all`
- Description: Fetch all available contests aggregated from all sources.
- Authentication: none
- Request body: none
- Response: JSON list of aggregated contests

### GET `/contest/prefrences`
- Description: Get current user's saved contest preferences.
- Authentication: required (`Authorization: Bearer <token>`)
- Request body: none
- Response:
  - `preferences` object (format depends on implementation)
- Errors:
  - `401` Unauthorized

### PUT `/contest/prefrences`
- Description: Update current user contest preferences.
- Authentication: required (`Authorization: Bearer <token>`)
- Request body example:
  ```json
  {
    "platforms": ["codeforces", "leetcode", "codechef", "gfg"],
    "difficulty": ["easy", "medium"],
    "languages": ["cpp", "python"]
  }
  ```
- Response: updated preference object
- Errors:
  - `400` Bad Request (invalid payload)
  - `401` Unauthorized

---

## User Routes

### POST `/user/register`
- Description: Register new user.
- Authentication: none
- Request body:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- Response: user profile + tokens (if implemented)
- Errors:
  - `400` Invalid input
  - `409` Email already exists

### POST `/user/login`
- Description: Log in existing user.
- Authentication: none
- Request body:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- Response:
  ```json
  {
    "accessToken": "...",
    "refreshToken": "...",
    "user": { ... }
  }
  ```
- Errors:
  - `400` Invalid credentials

### PATCH `/user/change-password`
- Description: Change logged-in user password.
- Authentication: required
- Request body:
  ```json
  {
    "oldPassword": "string",
    "newPassword": "string"
  }
  ```
- Response: success message
- Errors:
  - `401` Unauthorized
  - `400` Invalid old password

### POST `/user/logout`
- Description: Log out user and invalidate session/token.
- Authentication: required
- Request body: none
- Response: success message

### POST `/user/refresh-token`
- Description: Refresh access token using refresh token.
- Authentication: none (uses token in body)
- Request body:
  ```json
  {
    "refreshToken": "string"
  }
  ```
- Response: new access token (and optionally new refresh token)

### GET `/user/me`
- Description: Get current authenticated user info.
- Authentication: required
- Response: user object

### POST `/user/connected-account`
- Description: Connect a new platform account to the user.
- Authentication: required
- Request body example:
  ```json
  {
    "platform": "codeforces",
    "accountId": "username"
  }
  ```
- Response: updated user connected accounts

---

## Platform Statistics Routes (require JWT)

All endpoints in this section require `Authorization: Bearer <token>`.

### GET `/user/total-contests`
- Description: Total contests participated by user (all platforms).
- Response: numerical + breakdown optionally.

### GET `/user/average-rating`
- Description: Calculate average rating.
- Response: rating value.

### GET `/user/problems-Solved`
- Description: Problems solved stats.
- Response: count + distribution.

### GET `/user/badges-earned`
- Description: Badges earned by user.
- Response: badge list + count.

### GET `/user/win-rate`
- Description: Winning rate across contests.
- Response: percentage.

### GET `/user/avg-rank-change`
- Description: Average rank change over contests.
- Response: rank delta value.

### GET `/user/best-performance`
- Description: Best contest performance record.
- Response: best standings.

### GET `/user/platform-wise-table`
- Description: Per-platform contest stats table.
- Response: structured table (platform, contests, rating etc).

### GET `/user/rating-progress`
- Description: Time-series rating progress.
- Response: array of `{ date, rating }`.

---

## Common Errors

- `400` Bad Request
- `401` Unauthorized (missing/invalid JWT)
- `403` Forbidden
- `404` Not Found
- `500` Internal Server Error

---

## Usage Tips

- Include `Content-Type: application/json` for POST/PUT/PATCH.
- For protected endpoints, always include `Authorization` header.
- Verify route mount points in `backend/src/index.js`.
