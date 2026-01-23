/**
 * Chatbot RAG Widget - HRM Assistant
 * Floating chat bubble + Chat window
 * Features: Markdown rendering, typing indicator
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Loader2, HelpCircle, BookOpen, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Types
interface ChunkResult {
  chunkId: string;
  content: string;
  module: string;
  workflow: string;
  type: string;
  tags: string[];
  score: number;
}

interface FAQEntry {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  relatedChunks?: ChunkResult[];
  suggestedQuestions?: string[];
  isLoading?: boolean;
}

/**
 * Main Chatbot Widget Component
 */
export const ChatbotWidget: React.FC = () => {
  const { token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [faqs, setFaqs] = useState<FAQEntry[]>([]);
  const [showFAQs, setShowFAQs] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load FAQs on mount
  useEffect(() => {
    if (isOpen && faqs.length === 0) {
      loadFAQs();
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const loadFAQs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/chatbot/faqs?limit=8`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setFaqs(data?.faqs || []);
      }
    } catch (err) {
      console.error('Failed to load FAQs:', err);
    }
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowFAQs(false);

    // Add loading message
    const loadingId = `loading-${Date.now()}`;
    setMessages(prev => [
      ...prev,
      {
        id: loadingId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isLoading: true,
      },
    ]);

    try {
      const res = await fetch(`${API_URL}/api/chatbot/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: text.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response');
      }

      const result = await res.json();
      const data = result.data; // API returns { success: true, data: {...} }

      // Replace loading message with actual response
      setMessages(prev =>
        prev.map(m =>
          m.id === loadingId
            ? {
                id: `assistant-${Date.now()}`,
                role: 'assistant' as const,
                content: data.answer,
                timestamp: new Date(),
                relatedChunks: data.sources || [],
                suggestedQuestions: data.suggestions || [],
                isLoading: false,
              }
            : m
        )
      );
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages(prev =>
        prev.map(m =>
          m.id === loadingId
            ? {
                id: `error-${Date.now()}`,
                role: 'assistant' as const,
                content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
                timestamp: new Date(),
                isLoading: false,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, token]);

  const handleFAQClick = (faq: FAQEntry) => {
    sendMessage(faq.question);
  };

  const handleSuggestedClick = (question: string) => {
    sendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowFAQs(true);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110 active:scale-95"
          title="Hỗ trợ - Chatbot"
        >
          <MessageCircle size={24} />
          {/* Notification dot */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[560px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <HelpCircle size={22} />
              </div>
              <div>
                <h3 className="font-semibold">HRM Assistant</h3>
                <p className="text-xs text-blue-100">Hỗ trợ 24/7</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors text-xs"
                  title="Xóa cuộc trò chuyện"
                >
                  Xóa
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-800 mb-1">Xin chào! 👋</h4>
                <p className="text-sm text-gray-500">
                  Tôi có thể giúp bạn tìm hiểu về hệ thống HRM
                </p>
              </div>
            )}

            {/* FAQs Section */}
            {showFAQs && faqs.length > 0 && messages.length === 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 uppercase">Câu hỏi thường gặp</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </div>
                <div className="space-y-2">
                  {faqs.slice(0, 5).map(faq => (
                    <button
                      key={faq.id}
                      onClick={() => handleFAQClick(faq)}
                      className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-sm"
                    >
                      <span className="text-gray-700">{faq.question}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'
                  }`}
                >
                  {message.isLoading ? (
                    <div className="flex items-center gap-3 py-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-sm text-gray-500">Đang tìm kiếm...</span>
                    </div>
                  ) : (
                    <>
                      <div className="prose prose-sm max-w-none text-sm">
                        <ReactMarkdown
                          components={{
                            h1: ({children}) => <h1 className="text-base font-bold mt-2 mb-1">{children}</h1>,
                            h2: ({children}) => <h2 className="text-sm font-bold mt-2 mb-1">{children}</h2>,
                            h3: ({children}) => <h3 className="text-sm font-semibold mt-1 mb-1">{children}</h3>,
                            p: ({children}) => <p className="mb-1 last:mb-0">{children}</p>,
                            ul: ({children}) => <ul className="list-disc ml-4 mb-1">{children}</ul>,
                            ol: ({children}) => <ol className="list-decimal ml-4 mb-1">{children}</ol>,
                            li: ({children}) => <li className="mb-0.5">{children}</li>,
                            strong: ({children}) => <strong className="font-semibold">{children}</strong>,
                            code: ({children}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{children}</code>,
                            a: ({children, href}) => <a href={href} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                            table: ({children}) => <table className="text-xs border-collapse w-full my-1">{children}</table>,
                            th: ({children}) => <th className="border border-gray-300 px-2 py-1 bg-gray-100">{children}</th>,
                            td: ({children}) => <td className="border border-gray-300 px-2 py-1">{children}</td>,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>

                      {/* Related chunks (sources) */}
                      {message.relatedChunks && message.relatedChunks.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <span className="text-xs text-gray-400">Nguồn tham khảo:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {message.relatedChunks.slice(0, 3).map((chunk, i) => (
                              <span
                                key={i}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                              >
                                {chunk.module}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Suggested questions */}
                      {message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
                          <span className="text-xs text-gray-400">Câu hỏi liên quan:</span>
                          {message.suggestedQuestions.slice(0, 2).map((q, i) => (
                            <button
                              key={i}
                              onClick={() => handleSuggestedClick(q)}
                              className="block w-full text-left text-xs text-blue-600 hover:underline"
                            >
                              → {q}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập câu hỏi của bạn..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-full transition-colors disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              Powered by HRM Knowledge Base
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
