# OAuth Configuration Details for Name.AI

Use the following settings when configuring your OAuth providers.

## 1. Google OAuth Setup
**Console:** [Google Cloud Console](https://console.cloud.google.com/)

### Essential Settings
- **Application Type:** Web Application
- **Name:** Name.AI (or your preferred name)
- **Authorized JavaScript Origins:**
  - `http://localhost:3000`
- **Authorized Redirect URIs:**
  - `http://localhost:3000/api/auth/callback/google`

### Environment Variables
Copy these to your `.env.local` file:
```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

---

## 2. GitHub OAuth Setup
**Settings:** [GitHub Developer Settings](https://github.com/settings/apps) -> *New OAuth App*

### Essential Settings
- **Application Name:** Name.AI
- **Homepage URL:** `http://localhost:3000`
- **Authorization Callback URL:**
  - `http://localhost:3000/api/auth/callback/github`

### Environment Variables
Copy these to your `.env.local` file:
```env
GITHUB_ID=your_client_id_here
GITHUB_SECRET=your_client_secret_here
```

---

## 3. Twitter (X) OAuth Setup
**Portal:** [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard) -> *Projects & Apps*

### Essential Settings
1. Create a Project and an App.
2. Under "User authentication settings", click **Edit**.
3. **App Permissions:** Read (or Read and Write)
4. **Type of App:** Native App (or Web App, Automated App or Bot) -> Select **Web App, Automated App or Bot**
5. **Callback URI / Redirect URL:**
   - `http://localhost:3000/api/auth/callback/twitter`
6. **Website URL:** `http://localhost:3000`

### Environment Variables
Copy these to your `.env.local` file:
```env
TWITTER_CLIENT_ID=your_client_id_here
TWITTER_CLIENT_SECRET=your_client_secret_here
```

---

## 4. NextAuth General Setup

Ensure your `.env.local` also allows these providers to work correctly:

```env
# Application Base URL
NEXTAUTH_URL=http://localhost:3000

# Secret Key (Generate one: openssl rand -base64 32)
NEXTAUTH_SECRET=your_generated_secret_key
```
