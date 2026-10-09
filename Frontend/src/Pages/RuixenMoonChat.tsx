import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { AlertCircle, ArrowUp, Bot, Loader2, RotateCcw, Sparkles } from "lucide-react";
import Grainient from "../Components/Grainient";
import { Textarea } from "../Components/ui/textarea";

interface ChatMessage {
  id: number;
  role: "assistant" | "user";
  content: string;
  isError?: boolean;    // true when this assistant bubble is an error notice
  retryPrompt?: string; // the prompt to re-send if the person clicks "Try again"
}

const AI_ENDPOINT = "http://localhost:5000/ai/response";
const REQUEST_TIMEOUT_MS = 30000; // give up after 30 seconds
const MIN_TEXTAREA_HEIGHT = 52;
const MAX_TEXTAREA_HEIGHT = 160;

const RuixenMoonChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const nextMessageId = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Keep the newest message (or the typing indicator) in view.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  // Grow the textarea as the person types, up to a maximum height.
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = `${MIN_TEXTAREA_HEIGHT}px`;
    textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  // Adds one message to the chat.
  const addMessage = (newMessage: Omit<ChatMessage, "id">) => {
    const id = nextMessageId.current++;
    setMessages((current) => [...current, { id, ...newMessage }]);
  };

  // Sends the prompt to the backend, then shows either the reply or a friendly error.
  const requestAiReply = async (prompt: string) => {
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch("http://localhost:5000/ai/response", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      });

      // Read the body even on failure — the server may explain what went wrong.
      const rawBody = await response.text();
      let data: any = rawBody;
      try {
        data = JSON.parse(rawBody);
      } catch {
        // Body wasn't JSON; keep it as plain text.
      }

      if (!response.ok) {
        const serverMessage = data && typeof data === "object" ? data.error : "";
        throw new Error(serverMessage || `Server error (${response.status}). Please try again.`);
      }

      // Find the reply text. Adjust these field names if your backend uses a different one.
      const reply =
        typeof data === "string"
          ? data
          : data?.response ?? data?.message ?? data?.text ?? data?.content ?? data?.result ?? data?.answer;

      if (typeof reply !== "string" || !reply.trim()) {
        throw new Error("The server replied, but the response was empty or in an unexpected format.");
      }

      addMessage({ role: "assistant", content: reply });
    } catch (error) {
      console.error("AI request failed:", error);

      let errorText = "Something went wrong. Please try again.";
      if (error instanceof DOMException && error.name === "AbortError") {
        errorText = "The request took too long. Please try again.";
      } else if (error instanceof TypeError) {
        // fetch() throws a TypeError when the server is unreachable or blocked by CORS.
        errorText = "Can't reach the server. Check your connection and make sure the backend is running.";
      } else if (error instanceof Error && error.message) {
        errorText = error.message;
      }

      addMessage({ role: "assistant", content: errorText, isError: true, retryPrompt: prompt });
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  // Called when the person sends a message (button click or Enter key).
  const sendMessage = () => {
    const prompt = message.trim();
    if (!prompt || isLoading) return;

    addMessage({ role: "user", content: prompt });

    // Reset the input box.
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = `${MIN_TEXTAREA_HEIGHT}px`;
    }

    requestAiReply(prompt);
  };

  // Re-sends the prompt behind a failed request.
  const retry = (prompt: string) => {
    if (isLoading) return;
    // Remove the old error bubble so the chat doesn't fill up with errors.
    setMessages((current) => current.filter((m) => m.retryPrompt !== prompt));
    requestAiReply(prompt);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className="ruixen-chat relative isolate flex h-screen min-h-0 flex-col overflow-hidden bg-[#f7faf8]">
      <Grainient />

      <main
        aria-label="Chat with Ruixen AI"
        className="relative z-10 min-h-0 flex-1 overflow-y-auto px-4 py-8 sm:px-6"
      >
        <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col">
          {messages.length === 0 ? (
            // Empty state
            <div className="flex flex-1 flex-col justify-center pb-8">
              <div className="mx-auto w-full max-w-xl text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-100 to-teal-200 text-emerald-900 ring-1 ring-emerald-900/5">
                  <Sparkles className="size-6" />
                </span>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  What are we creating today?
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                  Create Cool Social media Content with Captions & More
                </p>
              </div>
            </div>
          ) : (
            // Conversation
            <div
              className="flex flex-1 flex-col gap-6 py-2"
              role="log"
              aria-live="polite"
              aria-label="Conversation"
            >
              {messages.map((chatMessage) =>
                chatMessage.role === "user" ? (
                  // User bubble
                  <div key={chatMessage.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-emerald-800 px-4 py-3 text-sm leading-6 text-white shadow-sm sm:max-w-[75%]">
                      <p className="whitespace-pre-wrap break-words">{chatMessage.content}</p>
                    </div>
                  </div>
                ) : (
                  // Assistant bubble (normal reply or error)
                  <div key={chatMessage.id} className="flex items-start gap-3">
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                        chatMessage.isError
                          ? "bg-red-100 text-red-700"
                          : "bg-gradient-to-br from-lime-200 to-teal-300 text-emerald-950"
                      }`}
                    >
                      {chatMessage.isError ? <AlertCircle className="size-4" /> : <Bot className="size-4" />}
                    </span>

                    <div
                      role={chatMessage.isError ? "alert" : undefined}
                      className={`max-w-[85%] rounded-2xl rounded-tl-sm border px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[75%] ${
                        chatMessage.isError
                          ? "border-red-200 bg-red-50 text-red-800"
                          : "border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{chatMessage.content}</p>

                      {chatMessage.retryPrompt && (
                        <button
                          type="button"
                          onClick={() => retry(chatMessage.retryPrompt as string)}
                          disabled={isLoading}
                          className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-2.5 py-1 text-xs font-medium text-red-700 transition hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:opacity-50"
                        >
                          <RotateCcw className="size-3" />
                          Try again
                        </button>
                      )}
                    </div>
                  </div>
                )
              )}

              {/* Typing indicator while waiting for the server */}
              {isLoading && (
                <div className="flex items-start gap-3" aria-label="Ruixen AI is typing">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-lime-200 to-teal-300 text-emerald-950">
                    <Bot className="size-4" />
                  </span>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3.5 shadow-sm">
                    <span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-slate-400" />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </main>

      <footer className="relative z-10 px-4 pb-4 pt-3 sm:px-6 sm:pb-5">
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl">
          <div className="rounded-2xl border border-white/70 bg-white/35 shadow-lg shadow-slate-900/10 backdrop-blur-xl transition focus-within:border-emerald-300/80 focus-within:bg-white/45 focus-within:ring-4 focus-within:ring-emerald-700/10">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Message Ruixen AI..."
              aria-label="Write a message"
              className="min-h-0 resize-none border-0 bg-transparent px-4 py-3.5 text-sm leading-6 text-slate-800 shadow-none placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
              style={{ overflow: "hidden" }}
            />
            <div className="flex items-center justify-between px-3 pb-3">
              <p className="text-xs text-slate-400">
                <span className="hidden sm:inline">Press </span>
                <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-sans text-[10px]">Enter</kbd>
                <span className="hidden sm:inline"> to send · Shift + Enter for a new line</span>
              </p>
              <button
                type="submit"
                aria-label="Send message"
                disabled={!message.trim() || isLoading}
                className="flex size-9 items-center justify-center rounded-xl bg-emerald-800 text-white shadow-sm transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                {isLoading ? <Loader2 className="size-4 animate-spin" /> : <ArrowUp className="size-4" />}
              </button>
            </div>
          </div>
        </form>
      </footer>
    </section>
  );
};

export default RuixenMoonChat;