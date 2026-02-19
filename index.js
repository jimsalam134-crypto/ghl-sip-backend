const express = require("express");
const app = express();

app.use(express.json());

// STEP 1: Authorize
app.get("/oauth/authorize", (req, res) => {
  const redirectUri = req.query.redirect_uri;
  res.redirect(`${redirectUri}?code=test_code`);
});

// STEP 2: Token exchange
app.post("/oauth/token", (req, res) => {
  res.json({
    access_token: "test_access_token",
    refresh_token: "test_refresh_token",
    expires_in: 3600,
    token_type: "Bearer"
  });
});

// STEP 3: Refresh token
app.post("/oauth/refresh", (req, res) => {
  res.json({
    access_token: "test_access_token",
    refresh_token: "test_refresh_token",
    expires_in: 3600,
    token_type: "Bearer"
  });
});

// STEP 4: Fetch user info
app.get("/oauth/userinfo", (req, res) => {
  res.json({
    data: {
      id: "test_user_id",
      name: "Test User",
      email: "test@example.com"
    }
  });
});

// Health check
app.get("/", (req, res) => {
  res.send("OAuth stub running");
});

// 👇 ADD THIS (CUSTOM PAGE)
app.get("/app/settings", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>SIP Provider Settings</title>
      </head>
      <body style="font-family: Arial; padding: 20px;">
        <h1>SIP Provider Settings v1</h1>
        <p>Backend connected successfully ✅</p>
      </body>
    </html>
  `);
});
// 👆 END ADD

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
