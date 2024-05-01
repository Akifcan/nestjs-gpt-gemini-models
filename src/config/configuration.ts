export default () => ({
  gpt: {
    secret: process.env.GPT_API_KEY,
    model: process.env.GPT_MODEL,
  },
  gemini: {
    secret: process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL,
  },
});
