import axios from "axios";
//http://localhost:5000/api/ai/chat - common api
// {
//   "message": "Explain React Native architecture in simple terms"
// }
// export const generateResponse = async (req, res) => {
//   try {
//     const { message } = req.body;

//     console.log("Received message:", message);
//     console.log("Calling Ollama...");

//     const response = await axios.post(
//       "http://127.0.0.1:11434/api/generate",
//       {
//         model: "llama3",
//         prompt: message,
//         stream: false,
//       }
//     );

//     console.log("Ollama responded");

//     res.json({
//       reply: response.data.response,
//     });

//   } catch (error) {
//     console.error("FULL ERROR:", error.response?.data || error.message);
//     res.status(500).json({
//       errors: error.response?.data || error.message
//     });
//   }
// };

// {
//   "messages": [
//     {
//       "role": "system",
//       "content": "You are a senior React Native architect."
//     },
//     {
//       "role": "user",
//       "content": "Explain useEffect in simple terms."
//     }
//   ]
// }

export const generateResponse = async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await axios.post(
      "http://127.0.0.1:11434/api/chat",
      {
        model: "llama3",
        messages: messages,
        stream: false,
      }
    );

    console.log("FULL OLLAMA RESPONSE:");
    console.log(response.data);

    res.json(response.data);

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
};