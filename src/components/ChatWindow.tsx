'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatWindow({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto space-y-4 pr-4 mb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="bg-accent-soft w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image src="/memey-icon.svg" alt="" width={48} height={48} className="rounded-full" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">Selamat datang!</h2>
            <p className="text-muted max-w-sm">
              Halo! Saya Memey AI Assistant<br>
              </br>
              Tanya apa saja, saya siap menemani obrolanmu!
            </p>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 animate-fadeIn ${message.role === 'user' ? 'flex-row-reverse' : ''
              }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${message.role === 'user'
                ? 'bg-foreground'
                : 'bg-accent'
                }`}
            >
              <i
                className={`fas text-xs ${message.role === 'user' ? 'fa-user' : 'fa-robot'
                  }`}
              ></i>
            </div>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${message.role === 'user'
                ? 'bg-accent text-white rounded-tr-none'
                : 'bg-surface text-foreground rounded-tl-none border border-border'
                }`}
            >
              <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                {message.role === 'assistant' ? (
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className="text-xl font-bold mt-2 mb-1" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-lg font-bold mt-2 mb-1" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-base font-bold mt-1 mb-1" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc list-inside my-0 space-y-0" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal list-inside my-0 space-y-0" {...props} />
                      ),
                      li: ({ node, ...props }) => <li className="ml-1 leading-snug [&>p]:mb-0 [&>p]:inline" {...props} />,
                      strong: ({ node, ...props }) => (
                        <strong className="font-bold text-foreground" {...props} />
                      ),
                      p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-snug" {...props} />,
                    }}
                  >
                    {message.content
                      // Collapse 3+ newlines to max 2 (prevent huge gaps)
                      .replace(/\n{3,}/g, '\n\n')
                      // Force single newline before any list marker (Markdown, Digit, or Bullet Char) to ensure tight lists
                      .replace(/\n+(?=[-•*] |\d+\.)/g, '\n')}
                  </ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
              <p
                className={`text-xs mt-2 ${message.role === 'user'
                  ? 'text-white/75'
                  : 'text-muted'
                  }`}
              >
                {new Date(message.timestamp).toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
