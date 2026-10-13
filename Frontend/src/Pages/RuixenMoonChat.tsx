import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  AlertCircle,
  ArrowUp,
  Bot,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RotateCcw,
  Sparkles,
  History,
  MessageSquare,
  Plus,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import Grainient from "../Components/Grainient";
import { Textarea } from "../Components/ui/textarea";

interface ChatMessage {
  id: number;
  role: "assistant" | "user";
  content: string;
  isError?: boolean;
  retryPrompt?: string;
}

interface Conversation {
  conversation_id: string;
  created_at?: string;
}

interface BackendMessage {
  conversation_id: string;
  role: "user" | "ai" | "assistant";
  text: string;
  created_at?: string;
}

const API_URL = "http://localhost:5000";
const REQUEST_TIMEOUT_MS = 30000;
const MIN_TEXTAREA_HEIGHT = 52;
const MAX_TEXTAREA_HEIGHT = 160;

const formatDate = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const HistoryRow = ({
  conversation,
  onClick,
  disabled,
  active,
}: {
  conversation: Conversation;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-current={active ? "true" : undefined}
    aria-label={`Chat ${conversation.conversation_id.slice(0, 8)}${
      formatDate(conversation.created_at)
        ? `, ${formatDate(conversation.created_at)}`
        : ""
    }`}
    title={`Chat ${conversation.conversation_id.slice(0, 8)}`}
    className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-xs transition hover:bg-white/70 disabled:opacity-50 ${
      active
        ? "bg-emerald-100/80 font-medium text-emerald-950"
        : "text-slate-600"
    }`}
  >
    <span className="flex min-w-0 items-center gap-1.5">
      <MessageSquare className="size-3.5 shrink-0 text-slate-400" />
      <span className="truncate">
        Chat {conversation.conversation_id.slice(0, 8)}
      </span>
    </span>
    <span className="shrink-0 text-[10px] text-slate-500">
      {formatDate(conversation.created_at)}
    </span>
  </button>
);

/* ------------------------------------------------------------------ */
/* Main chat component                                                 */
/* ------------------------------------------------------------------ */

const RuixenMoonChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const nextMessageId = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const requestInProgress = useRef(false);
  const activeConversationRef = useRef<string | null>(null);

  // Keep the current conversation ID synchronized for async requests.
  useEffect(() => {
    activeConversationRef.current = conversationId;
  }, [conversationId]);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = `${MIN_TEXTAREA_HEIGHT}px`;
    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      MAX_TEXTAREA_HEIGHT
    )}px`;
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [message, adjustHeight]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  // Convert backend history into the format used by the UI.
  const mapHistory = (history: BackendMessage[]): ChatMessage[] => {
    return history.map((item) => ({
      id: nextMessageId.current++,
      role: item.role === "user" ? "user" : "assistant",
      content: item.text,
    }));
  };

  // GET /conversations
  const fetchConversations = useCallback(async () => {
    const response = await fetch(`${API_URL}/conversations`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Could not load conversations (${response.status}).`);
    }

    const data: Conversation[] = await response.json();
    setConversations(data);
    return data;
  }, []);

  // GET /conversation/<conversation_id>/message
  const loadConversation = useCallback(async (id: string) => {
    if (requestInProgress.current) return;

    setIsHistoryLoading(true);
    setHistoryError("");
    setConversationId(id);
    activeConversationRef.current = id;
    setMessages([]);

    try {
      const response = await fetch(
        `${API_URL}/conversation/${encodeURIComponent(id)}/message`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Could not load chat history."
        );
      }

      // Ignore the result if another conversation was selected meanwhile.
      if (activeConversationRef.current !== id) return;

      setMessages(
        mapHistory(Array.isArray(data.chat_history) ? data.chat_history : [])
      );
    } catch (error) {
      if (activeConversationRef.current === id) {
        setHistoryError(
          error instanceof Error
            ? error.message
            : "Could not load chat history."
        );
      }
    } finally {
      setIsHistoryLoading(false);
    }
  }, []);

  // Load the user's conversation list when the component mounts.
  useEffect(() => {
    let cancelled = false;

    const initialize = async () => {
      try {
        const response = await fetch(`${API_URL}/conversations`, {
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || data.error || "Could not load conversations."
          );
        }

        if (cancelled) return;

        const list: Conversation[] = Array.isArray(data) ? data : [];
        setConversations(list);

        // Always start on the new-chat screen; old chats open only when selected.
      } catch (error) {
        if (!cancelled) {
          setHistoryError(
            error instanceof Error
              ? error.message
              : "Could not load conversations."
          );
        }
      }
    };

    void initialize();

    return () => {
      cancelled = true;
    };
  }, []);

  // POST /conversations
  const createConversation = async (): Promise<string> => {
    const response = await fetch(`${API_URL}/conversations`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok || !data.conversation_id) {
      throw new Error(
        data.message || data.error || "Could not create a new conversation."
      );
    }

    const id: string = data.conversation_id;

    setConversations((current) => [
      ...current.filter((item) => item.conversation_id !== id),
      { conversation_id: id },
    ]);

    setConversationId(id);
    activeConversationRef.current = id;
    setMessages([]);

    return id;
  };

  // Show the new-chat screen. The backend record is created on first send.
  const startNewChat = () => {
    if (requestInProgress.current || isHistoryLoading) return;

    setConversationId(null);
    activeConversationRef.current = null;
    setMessages([]);
    setMessage("");
    setHistoryError("");
    textareaRef.current?.focus();
  };

  const addMessage = (newMessage: Omit<ChatMessage, "id">) => {
    const id = nextMessageId.current++;
    setMessages((current) => [...current, { id, ...newMessage }]);
  };

  // POST /ai/response/<conversation_id>
  const requestAiReply = async (
    prompt: string,
    targetConversationId: string
  ) => {
    setIsLoading(true);
    requestInProgress.current = true;

    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      REQUEST_TIMEOUT_MS
    );

    try {
      const response = await fetch(
        `${API_URL}/ai/response/${encodeURIComponent(targetConversationId)}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
          signal: controller.signal,
        }
      );

      const rawBody = await response.text();
      let data: any;

      try {
        data = JSON.parse(rawBody);
      } catch {
        data = rawBody;
      }

      if (!response.ok) {
        const serverMessage =
          typeof data === "object" && data !== null
            ? data.message || data.error
            : "";

        throw new Error(
          serverMessage || `Server error (${response.status}).`
        );
      }

      // Your backend returns { ai_response: "..." }.
      const reply =
        typeof data === "string"
          ? data
          : data?.ai_response ??
            data?.response ??
            data?.message ??
            data?.text;

      if (typeof reply !== "string" || !reply.trim()) {
        throw new Error("The server returned an empty response.");
      }

      // Do not put a late response into a different conversation.
      if (activeConversationRef.current === targetConversationId) {
        addMessage({ role: "assistant", content: reply });
      }
    } catch (error) {
      console.error("AI request failed:", error);

      let errorText = "Something went wrong. Please try again.";

      if (error instanceof DOMException && error.name === "AbortError") {
        errorText = "The request took too long. Please try again.";
      } else if (error instanceof TypeError) {
        errorText =
          "Can't reach the server. Check that the backend is running and CORS is configured.";
      } else if (error instanceof Error) {
        errorText = error.message;
      }

      if (activeConversationRef.current === targetConversationId) {
        addMessage({
          role: "assistant",
          content: errorText,
          isError: true,
          retryPrompt: prompt,
        });
      }
    } finally {
      clearTimeout(timeoutId);
      requestInProgress.current = false;
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    const prompt = message.trim();

    if (!prompt || requestInProgress.current || isHistoryLoading) {
      return;
    }

    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = `${MIN_TEXTAREA_HEIGHT}px`;
    }

    try {
      // Create the conversation only when the user sends the first message.
      let targetId = activeConversationRef.current;

      if (!targetId) {
        targetId = await createConversation();
      }

      addMessage({ role: "user", content: prompt });

      await requestAiReply(prompt, targetId);

      // Refresh the conversation list in case metadata changes later.
      try {
        await fetchConversations();
      } catch (error) {
        console.error("Could not refresh conversation list:", error);
      }
    } catch (error) {
      addMessage({
        role: "assistant",
        content:
          error instanceof Error
            ? error.message
            : "Could not start the conversation.",
        isError: true,
        retryPrompt: prompt,
      });
    }
  };

  const retry = async (prompt: string) => {
    if (requestInProgress.current || isHistoryLoading) return;

    setMessages((current) =>
      current.filter((item) => item.retryPrompt !== prompt)
    );

    try {
      let targetId = activeConversationRef.current;

      if (!targetId) {
        targetId = await createConversation();
      }

      await requestAiReply(prompt, targetId);
    } catch (error) {
      addMessage({
        role: "assistant",
        content:
          error instanceof Error
            ? error.message
            : "Could not retry the request.",
        isError: true,
        retryPrompt: prompt,
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  return (
    <section className="ruixen-chat relative isolate flex h-screen min-h-0 overflow-hidden bg-[#f7faf8]">
      <Grainient />

      <aside
        aria-label="Chat navigation"
        className={`relative z-10 flex shrink-0 flex-col border-r border-slate-200/70 bg-white/45 backdrop-blur-xl transition-[width] duration-200 ${
          isSidebarCollapsed ? "w-14" : "w-52 sm:w-60"
        }`}
      >
        <div
          className={`flex flex-col border-b border-slate-200/70 ${
            isSidebarCollapsed
              ? "items-center gap-2 p-2"
              : "gap-2 p-3"
          }`}
        >
          <button
            type="button"
            onClick={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
            aria-label={
              isSidebarCollapsed
                ? "Expand chat history sidebar"
                : "Collapse chat history sidebar"
            }
            aria-expanded={!isSidebarCollapsed}
            title={
              isSidebarCollapsed
                ? "Expand chat history sidebar"
                : "Collapse chat history sidebar"
            }
            className={`inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/70 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
              isSidebarCollapsed ? "self-center" : "self-end"
            }`}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
          </button>
          <button
            type="button"
            onClick={startNewChat}
            disabled={isLoading || isHistoryLoading}
            aria-label="New chat"
            title="New chat"
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-800 px-3 text-sm font-medium text-white transition hover:bg-emerald-900 disabled:opacity-50 ${
              isSidebarCollapsed ? "w-9 px-0" : "w-full"
            }`}
          >
            <Plus className="size-4" />
            {!isSidebarCollapsed && "New chat"}
          </button>
        </div>

        <div
          className={`min-h-0 flex-1 overflow-y-auto py-4 ${
            isSidebarCollapsed ? "px-2" : "px-3"
          }`}
        >
          {isSidebarCollapsed ? (
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(false)}
              aria-label="Expand chat history sidebar"
              aria-expanded="false"
              title="Expand chat history sidebar"
              className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/70 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <History className="size-4" />
            </button>
          ) : (
            <h2 className="flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <History className="size-3.5" />
              Chat history
            </h2>
          )}

          {!isSidebarCollapsed && (
            conversations.length === 0 ? (
              <p className="px-2 py-4 text-xs text-slate-500">
                No conversations yet.
              </p>
            ) : (
              <ul className="ml-2 mt-2 space-y-0.5 border-l border-slate-200 pl-2">
                {[...conversations].reverse().map((conversation) => (
                  <li key={conversation.conversation_id}>
                    <HistoryRow
                      conversation={conversation}
                      active={conversation.conversation_id === conversationId}
                      disabled={isLoading || isHistoryLoading}
                      onClick={() =>
                        void loadConversation(conversation.conversation_id)
                      }
                    />
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      </aside>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <main
          aria-label="Chat with Ruixen AI"
          className="min-h-0 flex-1 overflow-y-auto px-4 py-8 sm:px-6"
        >
          <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col">
            {isHistoryLoading ? (
              <div className="flex flex-1 items-center justify-center gap-2 text-sm text-slate-500">
                <Loader2 className="size-5 animate-spin" />
                Loading conversation...
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-1 flex-col justify-center pb-8">
                <div className="mx-auto w-full max-w-xl text-center">
                  <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-100 to-teal-200 text-emerald-900 ring-1 ring-emerald-900/5">
                    <Sparkles className="size-6" />
                  </span>
                  <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                    What are we creating today?
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                    Create cool social media content with captions and more.
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="flex flex-1 flex-col gap-6 py-2"
                role="log"
                aria-live="polite"
                aria-label="Conversation"
              >
                {messages.map((chatMessage) =>
                  chatMessage.role === "user" ? (
                    <div key={chatMessage.id} className="flex justify-end">
                      <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-tr-sm bg-emerald-800 px-4 py-3 text-sm leading-6 text-white shadow-sm sm:max-w-[75%]">
                        <ReactMarkdown>{chatMessage.content}</ReactMarkdown>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={chatMessage.id}
                      className="flex items-start gap-3"
                    >
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                          chatMessage.isError
                            ? "bg-red-100 text-red-700"
                            : "bg-gradient-to-br from-lime-200 to-teal-300 text-emerald-950"
                        }`}
                      >
                        {chatMessage.isError ? (
                          <AlertCircle className="size-4" />
                        ) : (
                          <Bot className="size-4" />
                        )}
                      </span>

                      <div
                        role={chatMessage.isError ? "alert" : undefined}
                        className={`max-w-[85%] break-words rounded-2xl rounded-tl-sm border px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[75%] ${
                          chatMessage.isError
                            ? "border-red-200 bg-red-50 text-red-800"
                            : "border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        <ReactMarkdown>{chatMessage.content}</ReactMarkdown>

                        {chatMessage.retryPrompt && (
                          <button
                            type="button"
                            onClick={() =>
                              void retry(chatMessage.retryPrompt!)
                            }
                            disabled={isLoading || isHistoryLoading}
                            className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-2.5 py-1 text-xs font-medium text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                          >
                            <RotateCcw className="size-3" />
                            Try again
                          </button>
                        )}
                      </div>
                    </div>
                  )
                )}

                {isLoading && (
                  <div
                    className="flex items-start gap-3"
                    aria-label="Ruixen AI is typing"
                  >
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

            {historyError && (
              <p role="alert" className="mt-3 text-sm text-red-700">
                {historyError}
              </p>
            )}
          </div>
        </main>

        <footer className="px-4 pb-4 pt-3 sm:px-6 sm:pb-5">
          <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl">
            <div className="rounded-2xl border border-white/70 bg-white/35 shadow-lg shadow-slate-900/10 backdrop-blur-xl transition focus-within:border-emerald-300/80 focus-within:bg-white/45 focus-within:ring-4 focus-within:ring-emerald-700/10">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Ruixen AI..."
                aria-label="Write a message"
                disabled={isHistoryLoading}
                className="min-h-0 resize-none border-0 bg-transparent px-4 py-3.5 text-sm leading-6 text-slate-800 shadow-none placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{ overflow: "hidden" }}
              />

              <div className="flex items-center justify-between px-3 pb-3">
                <p className="text-xs text-slate-400">
                  <span className="hidden sm:inline">Press </span>
                  <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-sans text-[10px]">
                    Enter
                  </kbd>
                  <span className="hidden sm:inline">
                    {" "}to send · Shift + Enter for a new line
                  </span>
                </p>

                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={!message.trim() || isLoading || isHistoryLoading}
                  className="flex size-9 items-center justify-center rounded-xl bg-emerald-800 text-white shadow-sm transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                >
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <ArrowUp className="size-4" />
                  )}
                </button>
              </div>
            </div>
          </form>
        </footer>
      </div>
    </section>
  );
};

export default RuixenMoonChat;