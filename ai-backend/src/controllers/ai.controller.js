import axios from "axios";

export const generateResponse = async (req, res) => {
  try {
    const { message } = req.body;

    console.log("Received message:", message);
    console.log("Calling Ollama...");

    const response = await axios.post(
      "http://127.0.0.1:11434/api/generate",
      {
        model: "llama3",
        prompt: message,
        stream: false,
      }
    );

    console.log("Ollama responded");

    res.json({
      reply: response.data.response,
    });

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);
    res.status(500).json({
      errors: error.response?.data || error.message
    });
  }
};