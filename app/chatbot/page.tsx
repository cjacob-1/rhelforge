'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Copy, Download, Loader } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  bashScript?: string;
  pythonScript?: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m ForgeBot, your RHEL troubleshooting assistant. You can:\n\n1. **Paste error messages** - I\'ll analyze them and provide fixes\n2. **Describe problems** - I\'ll give step-by-step solutions\n3. **Ask questions** - About RHEL administration, AWS, or Linux in general\n\nFor every solution, I\'ll provide:\n- Step-by-step instructions\n- Bash script (ready to copy)\n- Python script (ready to copy)\n- Explanations of why it works\n\nWhat can I help you with today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Call the API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        bashScript: data.bashScript,
        pythonScript: data.pythonScript,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please make sure your OpenAI API key is configured and try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            ForgeBot - RHEL AI Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Paste error messages, logs, or describe your RHEL problem. Get instant solutions with scripts.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border shadow-lg flex flex-col h-[600px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-2xl ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-lg rounded-tr-none'
                      : 'bg-gray-100 dark:bg-dark-border text-gray-900 dark:text-gray-100 rounded-lg rounded-tl-none'
                  } p-4`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </p>

                  {/* Scripts */}
                  {message.bashScript && (
                    <div className="mt-4 space-y-3">
                      <div className="bg-black dark:bg-gray-900 rounded p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-semibold text-gray-400">Bash Script</span>
                          <button
                            onClick={() => copyToClipboard(message.bashScript!)}
                            className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            Copy
                          </button>
                        </div>
                        <code className="text-xs text-green-400 font-mono overflow-x-auto block max-h-40 overflow-y-auto">
                          {message.bashScript}
                        </code>
                      </div>

                      {message.pythonScript && (
                        <div className="bg-black dark:bg-gray-900 rounded p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold text-gray-400">Python Script</span>
                            <button
                              onClick={() => copyToClipboard(message.pythonScript!)}
                              className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                            >
                              <Copy className="w-3 h-3" />
                              Copy
                            </button>
                          </div>
                          <code className="text-xs text-blue-400 font-mono overflow-x-auto block max-h-40 overflow-y-auto">
                            {message.pythonScript}
                          </code>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-dark-border text-gray-900 dark:text-gray-100 rounded-lg rounded-tl-none p-4">
                  <Loader className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 dark:border-dark-border p-4">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    handleSendMessage();
                  }
                }}
                placeholder="Paste error messages, logs, or describe your problem... (Ctrl+Enter to send)"
                className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Tip 1</h3>
            <p className="text-sm text-blue-800 dark:text-blue-300">Paste error messages directly for instant analysis</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">💡 Tip 2</h3>
            <p className="text-sm text-green-800 dark:text-green-300">Include journalctl or dmesg output for better diagnosis</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">💡 Tip 3</h3>
            <p className="text-sm text-purple-800 dark:text-purple-300">Copy scripts and customize them for your environment</p>
          </div>
        </div>
      </div>
    </div>
  );
}
