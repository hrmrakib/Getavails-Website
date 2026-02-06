"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Trash2,
  Edit2,
  Plus,
  Menu,
  X,
  MessageCircle,
  Send,
  Mic,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useAiChatMutation,
  useCreateNewChatWithSessionMutation,
  useGetAllSessionsHistoryQuery,
  useGetChatHistoryBySessionIdQuery,
} from "@/redux/features/aiChat/aiChatAPI";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Session {
  session_id: string;
  user_id: string;
  title: string;
  created_at: string;
}

interface Message {
  role?: "user" | "assistant";
  content?: string;
  response?: string;
  session_id?: string;
  timestamp?: string;
}

function ChatSidebar({
  sessions,
  isLoading,
  activeSessionId,
  onSelectSession,
  onDeleteSession,
  onUpdateSession,
}: {
  sessions: Session[];
  isLoading: boolean;
  activeSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onUpdateSession: (sessionId: string, newTitle: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteSessionId, setDeleteSessionId] = useState<string | null>(null);
  const [editSessionId, setEditSessionId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleEdit = (session: Session) => {
    setEditSessionId(session.session_id);
    setEditTitle(session.title);
  };

  const handleSaveEdit = () => {
    if (editSessionId && editTitle.trim()) {
      onUpdateSession(editSessionId, editTitle);
      setEditSessionId(null);
      setEditTitle("");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const sidebarContent = (
    <div className='flex flex-col h-full bg-background'>
      <div className='p-4 border-b border-border'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold text-foreground'>
            Chat History
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className='md:hidden text-muted-foreground hover:text-foreground'
          >
            <X className='w-5 h-5' />
          </button>
        </div>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search sessions...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary'
          />
        </div>
      </div>

      {isLoading ? (
        <div className='flex items-center justify-center h-[60vh]'>
          <Loader2 className='w-6 h-6 mr-2 animate-spin' />
          <p className='text-muted-foreground text-sm'>Loading...</p>
        </div>
      ) : null}

      <div className='flex-1 overflow-y-auto p-3'>
        {sessions.length === 0 && !isLoading ? (
          <div className='flex flex-col items-center justify-center h-full text-center py-8'>
            <p className='text-muted-foreground text-sm'>No sessions found</p>
          </div>
        ) : (
          <div className='space-y-2'>
            {sessions.map((session) => (
              <div
                key={session.session_id}
                className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
                  activeSessionId === session.session_id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
                onClick={() => {
                  onSelectSession(session.session_id);
                  setIsOpen(false);
                }}
              >
                <div className='flex items-start justify-between gap-2'>
                  <div className='flex-1 min-w-0'>
                    <p className='font-medium text-sm truncate'>
                      {session.title}
                    </p>
                    <p className='text-xs opacity-75 mt-1'>
                      {formatDate(session.created_at)}
                    </p>
                  </div>
                  <div
                    className={`flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                      activeSessionId === session.session_id
                        ? "opacity-100"
                        : ""
                    }`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(session);
                      }}
                      className={`p-1.5 rounded transition-colors ${
                        activeSessionId === session.session_id
                          ? "hover:bg-white/20"
                          : "hover:bg-primary hover:text-primary-foreground"
                      }`}
                      title='Edit session'
                    >
                      <Edit2 className='w-4 h-4' />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteSessionId(session.session_id);
                      }}
                      className={`p-1.5 rounded transition-colors ${
                        activeSessionId === session.session_id
                          ? "hover:bg-white/20"
                          : "hover:bg-destructive hover:text-destructive-foreground"
                      }`}
                      title='Delete session'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={!!editSessionId}
        onOpenChange={() => setEditSessionId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Session Title</DialogTitle>
            <DialogDescription>
              Enter a new title for this chat session.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder='Session title'
            className='mt-4'
            autoFocus
          />
          <DialogFooter>
            <Button variant='outline' onClick={() => setEditSessionId(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={!editTitle.trim()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteSessionId}
        onOpenChange={() => setDeleteSessionId(null)}
      >
        <AlertDialogContent>
          <AlertDialogTitle>Delete Session</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this session? This action cannot be
            undone.
          </AlertDialogDescription>
          <div className='flex gap-3 justify-end mt-6'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteSessionId) {
                  onDeleteSession(deleteSessionId);
                  setDeleteSessionId(null);
                }
              }}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'
        title='Toggle sidebar'
      >
        {isOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
      </button>

      {isOpen && (
        <div
          className='md:hidden fixed inset-0 bg-black/50 z-40'
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className='hidden md:block w-80 border-r border-border bg-background'>
        {sidebarContent}
      </div>

      <div
        className={`md:hidden fixed left-0 top-0 z-40 w-80 h-full transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}

function ChatMessages({
  messages,
  sessionTitle,
  isLoading = false,
}: {
  messages: Message[];
  sessionTitle?: string;
  isLoading?: boolean;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (messages.length === 0) {
    return (
      <div className='flex-1 flex flex-col items-center justify-center p-4 bg-background'>
        <div className='text-center'>
          <MessageCircle className='w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50' />
          <h2 className='text-xl font-semibold text-foreground mb-2'>
            {sessionTitle || "Start a Conversation"}
          </h2>
          <p className='text-muted-foreground max-w-md'>
            Begin chatting to see messages here. Your AI assistant is ready to
            help!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-background'>
      {messages.length > 0 && (
        <div className='flex items-center justify-center py-4'>
          <div className='text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full'>
            {/* {new Date(messages[0].timestamp).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })} */}
          </div>
        </div>
      )}

      {messages.map((message, index) => (
        <div key={index} className='flex gap-3 md:gap-4 group'>
          {message.role === "assistant" && (
            <div className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-semibold'>
              AI
            </div>
          )}

          <div className={`flex-1 ${message.role === "user" ? "ml-auto" : ""}`}>
            <div
              className={`inline-block max-w-xs md:max-w-2xl px-4 py-2.5 rounded-lg ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-secondary text-secondary-foreground rounded-bl-none border border-border"
              }`}
            >
              <div className='prose prose-lg text-sm md:text-base leading-relaxed break-words prose-p:my-5 prose-li:my-3 prose-h3:mt-8 prose-h3:mb-4'>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
            <div
              className={`text-xs text-muted-foreground mt-1.5 ${
                message.role === "user" ? "text-right" : ""
              }`}
            >
              {/* {formatTime(message.timestamp)} */}
            </div>
          </div>

          {message.role === "user" && (
            <div className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-muted text-foreground flex items-center justify-center flex-shrink-0 text-xs font-semibold'>
              U
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className='flex gap-3 md:gap-4'>
          <div className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-semibold'>
            AI
          </div>
          <div className='flex-1'>
            <div className='inline-block px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground rounded-bl-none border border-border'>
              <div className='flex gap-1'>
                <div className='w-2 h-2 rounded-full bg-muted-foreground animate-bounce' />
                <div className='w-2 h-2 rounded-full bg-muted-foreground animate-bounce animation-delay-200' />
                <div className='w-2 h-2 rounded-full bg-muted-foreground animate-bounce animation-delay-400' />
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

function ChatInput({
  onSendMessage,
  onNewSession,
  isLoading = false,
}: {
  onSendMessage: (message: string) => void;
  onNewSession?: () => void;
  isLoading?: boolean;
}) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  };

  return (
    <div className='border-t border-border bg-background p-4 md:p-6'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex items-center gap-2 md:gap-3'>
          <Button
            onClick={onNewSession}
            variant='outline'
            size='icon'
            className='hidden md:flex bg-transparent lg:p-5'
            disabled={isLoading}
            title='Start new session'
          >
            <Plus className='w-5 h-5' />
          </Button>

          <div className='flex-1 flex gap-2 items-end bg-input border border-border rounded-2xl px-4 py-2 md:py-1 transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:border-primary'>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder='Type your message... (Shift+Enter for new line)'
              className='flex-1 bg-transparent text-foreground placeholder:text-muted-foreground resize-none outline-none text-sm md:text-base py-2 md:py-2.5 max-h-[120px]'
              rows={1}
              disabled={isLoading}
            />

            {/* <button
              className='p-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50'
              title='Voice input (coming soon)'
              disabled={isLoading}
            >
              <Mic className='w-5 h-5' />
            </button> */}
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
            size='icon'
            className='rounded-full p-5'
            title='Send message'
          >
            <Send className='w-6 h-6' />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createNewChatWithSessionMutation] =
    useCreateNewChatWithSessionMutation();
  const [chatMutation] = useAiChatMutation();

  const { data: sessionHistory, isLoading: isLoadingSessionHistory } =
    useGetAllSessionsHistoryQuery({});
  const { data: sessionHistoryBySessionId } =
    useGetChatHistoryBySessionIdQuery(activeSessionId);

  useEffect(() => {
    if (sessionHistory?.sessions) {
      setSessions(sessionHistory?.sessions);
    }
  }, [sessionHistory?.sessions, activeSessionId]);

  useEffect(() => {
    if (sessionHistoryBySessionId?.messages) {
      setChatHistory(sessionHistoryBySessionId?.messages);
      setActiveSessionId(sessionHistoryBySessionId?.session_id);
    }
  }, [sessionHistoryBySessionId?.messages]);

  const activeSession = sessions.find((s) => s.session_id === activeSessionId);
  const activeMessages = chatHistory || [];

  const handleSelectSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(sessions.filter((s) => s.session_id !== sessionId));
    if (activeSessionId === sessionId) {
      const remainingSessions = sessions.filter(
        (s) => s.session_id !== sessionId,
      );
      setActiveSessionId(remainingSessions[0]?.session_id || null);
    }
  };

  const handleUpdateSession = (sessionId: string, newTitle: string) => {
    setSessions(
      sessions.map((s) =>
        s.session_id === sessionId ? { ...s, title: newTitle } : s,
      ),
    );
  };

  const handleSendMessage = async (message: string) => {
    if (!activeSessionId) return;

    const userMessage: Message = {
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };

    setIsLoading(true);

    try {
      const res = await chatMutation({
        message: message,
        session_id: activeSessionId,
      }).unwrap();

      console.log({ res });

      setChatHistory((prev) => [...prev, res]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSession = () => {
    const newSessionId = `session-${Date.now()}`;
    const newSession: Session = {
      session_id: newSessionId,
      user_id: "13",
      title: `New Chat ${new Date().toLocaleDateString()}`,
      created_at: new Date().toISOString(),
    };

    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSessionId);
    setChatHistory((prev) => ({
      ...prev,
      [newSessionId]: [],
    }));
  };

  return (
    <div className='flex h-screen bg-background overflow-hidden'>
      <ChatSidebar
        sessions={sessions}
        isLoading={isLoadingSessionHistory}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        onUpdateSession={handleUpdateSession}
      />

      <div className='flex-1 flex flex-col min-w-0 pt-16 md:pt-0'>
        <ChatMessages
          messages={activeMessages}
          sessionTitle={activeSession?.title}
          isLoading={isLoading}
        />

        <ChatInput
          onSendMessage={handleSendMessage}
          onNewSession={handleNewSession}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
