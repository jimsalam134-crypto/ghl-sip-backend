const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Health check (Render + GHL will use this)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "GHL SIP backend running"
  });
});

// OAuth redirect endpoint (TEMP – will improve later)
app.get("/oauth/callback", (req, res) => {
  const { code } = req.query;

  res.status(200).json({
    message: "OAuth callback received",
    code: code || null
  });
});

// Webhook receiver
app.post("/webhooks/ghl", (req, res) => {
  console.log("Webhook received:", req.body);
  res.status(200).send("Webhook received");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
