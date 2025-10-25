import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- INLINE SVG ICONS (Replaced react-icons) ---

const PlusIcon = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
  </svg>
);

const SignOutAltIcon = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436h-40c-6.6 0-12-5.4-12-12V88c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v336c0 6.6-5.4 12-12 12z"></path>
  </svg>
);

const PaperPlaneIcon = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path>
  </svg>
);

const RegEditIcon = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.2 15.2-39.9 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l22.6-22.6c3.3-3.3 5.4-7.8 5.4-12.5V32H64C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V337.8c0-4.7-1.8-9.2-5.1-12.5l-22.6-22.6c-2.3-2.3-5.3-3.5-8.5-3.5z"></path>
  </svg>
);

const RobotIcon = (props) => (
    <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M32,224H480a32,32,0,0,1,32,32V416a32,32,0,0,1-32,32H32a32,32,0,0,1-32-32V256A32,32,0,0,1,32,224Zm288,80a24,24,0,1,0-24,24A24,24,0,0,0,320,304Zm-128,0a24,24,0,1,0-24,24A24,24,0,0,0,192,304ZM464,96a80,80,0,1,0-150.43,32H206.43A80,80,0,1,0,48,96,96,96,0,0,0,32,192H480A96,96,0,0,0,464,96Z"></path>
    </svg>
);


// Mock implementations for environment dependencies
const useNavigate = () => (path) => console.log(`Simulated Navigation: ${path}`);
const useParams = () => ({ chatId: null }); // Start with no active chat

const uuidv4 = () => Math.random().toString(36).substring(2, 9);

const MOCK_USER = { username: "AKU" };
let CHAT_STORE = [
    { id: "mock-id-1", title: "AKU Assistant", messages: [{id: "msg1", sender: "ai", text: "Welcome to CETE Virtual Assistant", ts: Date.now() - 50000}], createdAt: Date.now() - 100000, updatedAt: Date.now() - 50000 },
    { id: "mock-id-2", title: "Project Planning Draft", messages: [], createdAt: Date.now() - 200000, updatedAt: Date.now() - 150000 },
];

const getChats = () => CHAT_STORE.sort((a, b) => b.updatedAt - a.updatedAt);
const getChatById = (id) => CHAT_STORE.find(c => c.id === id);
const saveChat = (chat) => {
    const index = CHAT_STORE.findIndex(c => c.id === chat.id);
    if (index > -1) {
        CHAT_STORE[index] = chat;
    } else {
        CHAT_STORE.unshift(chat);
    }
};
const getCurrentUser = () => MOCK_USER;
const logout = () => console.log("User logged out (simulated)");

// Utility for simulated delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- CHATPAGE COMPONENT (Standalone) ---
export default function ChatPage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  const initialChats = getChats();
  const initialChat = initialChats[0] || null;

  const [activeChatId, setActiveChatId] = useState(initialChat?.id || null);
  const [messages, setMessages] = useState(initialChat?.messages || []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); 
  const endRef = useRef(null);

  const activeChat = initialChat;
  const hasMessages = messages.length > 0;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const startNew = () => {
    if (activeChatId && messages.length === 0) return;

    if (activeChatId && messages.length > 0) {
      const currentChat = getChatById(activeChatId);
      if (currentChat) {
        currentChat.messages = messages;
        currentChat.updatedAt = Date.now();
        saveChat(currentChat);
      }
    }

    const newId = uuidv4();
    const newChat = {
      id: newId,
      title: "New Session",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    saveChat(newChat);
    setActiveChatId(newId);
    setMessages([]);
    setInput("");
    setStatus(null);
    console.log(`Started a new session: ${newId}`);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = { id: uuidv4(), sender: "user", text: input, ts: Date.now() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    const currentInput = input;
    setInput("");
    setLoading(true);

    let chatObj = getChatById(activeChatId);
    if (!chatObj) {
      const newId = uuidv4();
      chatObj = {
        id: newId,
        title: currentInput.substring(0, 30) + (currentInput.length > 30 ? "..." : ""),
        messages: [],
        createdAt: Date.now(),
      };
      setActiveChatId(newId); 
    }

    chatObj.messages = updatedMessages;
    if (chatObj.title === "New Session" || chatObj.title === "Untitled") {
      chatObj.title = currentInput.substring(0, 30) + (currentInput.length > 30 ? "..." : "");
    }
    chatObj.updatedAt = Date.now();
    saveChat(chatObj);

    try {
        const loadingSteps = [
            { text: "Thinking and formulating initial strategy...", duration: 1 },
            { text: "Model selecting knowledge base and tools...", duration: 1 },
            { text: "Retrieving 16 documents...", duration: 1},
            { text: "LLM generating draft response...", duration: 1 },
            { text: "Refining and verifying answer with Gemini...", duration: 1 },
        ];

        for (const step of loadingSteps) {
            setStatus(step.text);
            await delay(step.duration);
        }
        setStatus("Waiting for final response from server...");
    
      const resp = await fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: currentInput })

      });
  
      if (!resp.ok) {
        let errorData = { error: `HTTP Error ${resp.status}: ${resp.statusText || 'Server Error'}` };
        try {
            const text = await resp.text();
            errorData = JSON.parse(text);
        } catch (e) {}
        throw new Error(errorData.error || `HTTP Error ${resp.status}`);
      }
      
      const data = await resp.json();

      const aiMsg = {
        id: uuidv4(),
        sender: "ai",
        text: data.answer || "No 'answer' field in response.",
        ts: Date.now(),
      };
      
      const withAi = [...updatedMessages, aiMsg];
      setMessages(withAi);

      chatObj.messages = withAi;
      chatObj.updatedAt = Date.now();
      saveChat(chatObj);
    
    } catch (error) {
      console.error("API call failed:", error);
      const errMsg = {
        id: uuidv4(),
        sender: "ai",
        text: `⚠️ Error contacting backend. Please ensure the API server at http://127.0.0.1:5000/ask is running and accessible. Details: ${error.message || 'Network or unknown error.'}`,
        ts: Date.now(),
      };
      const withErr = [...updatedMessages, errMsg];
      setMessages(withErr);
      
      chatObj.messages = withErr;
      chatObj.updatedAt = Date.now();
      saveChat(chatObj);
    } finally {
      setLoading(false);
      setStatus(null);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
        {/* UPDATED: "Upgrade to Pro" bar color */}
      <div 
        className="w-8 flex items-center justify-center bg-[#00843D] cursor-pointer hover:bg-[#00632d] transition"
      >
        <span className="text-white transform -rotate-90 whitespace-nowrap text-sm font-semibold tracking-wider">
          AKU Virtual Assistant 
        </span>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white shadow-lg">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={startNew}
                // UPDATED: New Chat button color
              className="bg-[#00843D] text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-medium transition hover:bg-[#00632d] shadow-md"
            >
              <PlusIcon className="text-xs" /> New Chat
            </motion.button>
            <h2 className="text-lg font-semibold text-gray-900 hidden sm:block">
              {activeChat ? activeChat.title : "Start a New Session"}
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 text-sm px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-200 transition disabled:opacity-50"
              onClick={() => console.log("Simulated Regenerate action")}
              disabled={loading || !hasMessages}
            >
              <RegEditIcon className="text-xs" /> Regenerate
            </motion.button>

            <div className="flex items-center gap-2 p-2 rounded-full text-gray-900 bg-gray-100 cursor-pointer transition hover:bg-gray-200">
                <div 
                    // UPDATED: Profile initial circle color
                    className="w-8 h-8 rounded-full bg-[#00843D] flex items-center justify-center font-bold text-xs text-white flex-shrink-0"
                >
                    {user?.username.split(" ").map((n) => n[0]).join("") || "AN"}
                </div>
                <span className="font-medium hidden md:inline">{user?.username || "AKU."}</span>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}
                    className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                    title="Logout"
                >
                    <SignOutAltIcon className="text-sm" />
                </motion.button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          {!hasMessages && activeChatId ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center pb-24">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.0 }}
                transition={{ duration: 0.5 }}
              >
                    {/* UPDATED: Robot icon color */}
                <RobotIcon className="text-[#00843D] text-6xl mb-4" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to CETE Virtual Assistant
              </h3>
              <p className="text-gray-500 text-lg">
                Ask me anything to start your new chat session.
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto w-full space-y-6">
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${ m.sender === "user" ? "justify-end" : "justify-start" }`}
                  >
                    <div
                      className={`p-3 rounded-2xl max-w-[80%] shadow-lg ${
                        m.sender === "user"
                                // UPDATED: User message bubble color
                          ? "bg-[#00843D] text-white rounded-br-md"
                          : "bg-gray-200 text-gray-800 rounded-tl-md"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
                        {m.text}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && status && (
                  <div className="flex justify-start">
                    <div className="p-3 rounded-2xl max-w-[80%] shadow-lg bg-gray-100 text-gray-600 rounded-tl-md flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                        <span className="italic text-[15px]">{status}</span>
                    </div>
                  </div>
              )}
              <div ref={endRef} />
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 bg-white p-4">
          <div className="max-w-3xl mx-auto flex items-end gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows="1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
                // UPDATED: Textarea focus ring color
              className="flex-1 p-3 rounded-2xl bg-gray-100 border border-gray-300 text-gray-900 resize-none focus:ring-2 focus:ring-[#00843D] outline-none transition overflow-hidden placeholder-gray-500"
              placeholder="Start a new query..."
              disabled={loading}
            ></textarea>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={loading || !input.trim()}
                // UPDATED: Send button gradient and shadow color
              className={`p-3 w-12 h-12 rounded-full text-white shadow-lg transition flex items-center justify-center text-xl ${
                loading || !input.trim()
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#00843D] to-[#00632d] hover:shadow-[#00843D]/50"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <PaperPlaneIcon className="transform -rotate-45 -mt-1 ml-1" />
              )}
            </motion.button>
          </div>
          <div className="text-center text-xs text-gray-500 mt-2">
            Chat A.I+ can make mistakes. Consider checking important information.
          </div>
        </div>
      </div>
    </div>
  );
}

