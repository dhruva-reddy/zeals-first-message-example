import express from "express";

const app = express();
app.use(express.json());

// Set a default via env var, but allow per-request override
const DEFAULT_ASSISTANT_ID = process.env.ASSISTANT_ID ?? "";

app.post("/webhook", (req, res) => {
  const { message } = req.body;

  if (message?.type === "assistant-request") {
    const assistantId =
      req.body.assistantId || DEFAULT_ASSISTANT_ID;

    if (!assistantId) {
      res.status(400).json({ error: "No assistantId provided" });
      return;
    }

    // Customize this message however you want
    const firstMessage = `Hi there! My name is Zeals. I'm a sophisticated example assistant. This is mock text?`;

    res.json({
      assistantId,
      assistantOverrides: {
        firstMessage,
      },
    });
    return;
  }

  // All other Vapi events (end-of-call-report, etc.)
  res.json({});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
