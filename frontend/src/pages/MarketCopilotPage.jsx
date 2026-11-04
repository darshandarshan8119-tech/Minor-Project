// src/pages/MarketCopilotPage.jsx
// Dedicated full-page AI Market Intelligence Copilot inside AG Market (/market-mandi/copilot).
// Preserves full VIBEATHON conversational agent, interactive Generative UI cards, and APMC analytics.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConversationSidebar from '../assistant/ConversationSidebar';
import ChatWindow from '../assistant/ChatWindow';
import { apiAssistantChat, apiLogout } from '../services/api';

export default function MarketCopilotPage({
  user: propUser,
  onNavigateTab,
}) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Recover user if not passed as prop
  const user = propUser || (() => {
    try {
      const u = localStorage.getItem('agrimart_user') || localStorage.getItem('agrimart_user_session');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  })();

  const handleLogout = () => {
    apiLogout();
    navigate('/market-mandi/login');
  };

  // Conversations State
  const [conversations, setConversations] = useState([
    { id: 'conv-1', title: 'Wheat Liquidation & Best APMC Mandi', createdAt: 'Today, 10:15 AM' },
    { id: 'conv-2', title: 'Mustard 5-Level Depth & Buyers', createdAt: 'Yesterday' },
  ]);
  const [activeConversationId, setActiveConversationId] = useState('conv-1');

  // Messages State for Active Thread
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      role: 'assistant',
      timestamp: '10:15 AM',
      content: `Namaste ${user?.name || user?.full_name ? (user.name || user.full_name).split(' ')[0] : 'Kisan Member'}! I am your **AgriMart Market Copilot**.\n\nI have live telemetry connected to APMC electronic auction pits, AGMARKNET statutory benchmarks, and verified institutional buyer order books.\n\nHow can I assist your crop marketing today?`,
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [agentActivity, setAgentActivity] = useState(null);
  const [lastMarketQuery, setLastMarketQuery] = useState('');
  const [chatLanguage, setChatLanguage] = useState('en');

  const handleSendMessage = async (text, explanationLevel = 'simple') => {
    if (!text || !text.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const isPersistedConversation = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(activeConversationId);

    setMessages(prev => [...prev, userMsg]);
    setLastMarketQuery(text);
    setIsLoading(true);
    setAgentActivity({
      currentAction: 'Checking available market data and verified calculations...',
      toolName: 'market_intelligence',
      steps: ['Reading available APMC data', 'Running deterministic calculations where needed', 'Preparing a farmer-friendly explanation'],
    });

    try {
      const response = await apiAssistantChat(
        text,
        isPersistedConversation ? activeConversationId : undefined,
        explanationLevel,
        chatLanguage,
      );
      const assistant = response.message;
      const card = assistant.card_type ? { type: assistant.card_type, data: assistant.card_data } : null;
      const replyMsg = {
        id: assistant.id,
        role: 'assistant',
        content: assistant.content,
        timestamp: new Date(assistant.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        card,
        farmerExplanation: response.farmer_explanation,
        actions: (card?.type === 'booking' || card?.type === 'transaction') ? [
          { label: '📋 View in Transactions & Escrow', type: 'VIEW_CONTRACT_NOTE' },
          { label: '📊 Open Market Terminal', type: 'OPEN_TERMINAL' },
        ] : (card ? [
          { 
            label: '⚡ Instant Buy & Book Slot', 
            type: 'BOOK_SLOT',
            payload: {
              commodity: card.data?.commodity || card.data?.commodityCode || 'Wheat',
              mandi: card.data?.mandi || (card.data?.mandis && card.data.mandis[0]?.mandiName) || 'Karnal APMC',
              quantity: card.data?.quantity || 100,
            }
          },
          { label: 'Explain more simply', type: 'EXPLAIN_SIMPLE' },
          { label: 'Show detailed analysis', type: 'EXPLAIN_DETAILED' },
        ] : []),
      };
      const conversation = response.conversation;
      if (conversation?.id) {
        setActiveConversationId(conversation.id);
        setConversations(prev => [
          { id: conversation.id, title: conversation.title || 'Market inquiry', createdAt: 'Just now' },
          ...prev.filter(item => item.id !== activeConversationId && item.id !== conversation.id),
        ]);
      }
      setMessages(prev => [...prev, replyMsg]);
    } catch (error) {
      // Fallback response for offline or unexpected connection issues
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        timestamp: 'Just now',
        content: error.message || 'The market service is temporarily unavailable. Please try again.',
      }]);
    } finally {
      setIsLoading(false);
      setAgentActivity(null);
    }
  };

  const handleNewConversation = () => {
    const newId = `conv-${Date.now()}`;
    const newConv = { id: newId, title: 'New Market Inquiry', createdAt: 'Just now' };
    setConversations([newConv, ...conversations]);
    setActiveConversationId(newId);
    setMessages([
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        timestamp: 'Just now',
        content: `Started a new conversation thread. How can I help analyze or liquidate your produce?`,
      }
    ]);
  };

  const handleDeleteConversation = (convId) => {
    const filtered = conversations.filter(c => c.id !== convId);
    setConversations(filtered);
    if (activeConversationId === convId) {
      if (filtered.length > 0) {
        setActiveConversationId(filtered[0].id);
      } else {
        handleNewConversation();
      }
    }
  };

  const handleAction = (type, payload) => {
    switch (type) {
      case 'EXPLAIN_SIMPLE':
        if (lastMarketQuery) handleSendMessage(lastMarketQuery, 'simple');
        break;

      case 'EXPLAIN_DETAILED':
        if (lastMarketQuery) handleSendMessage(lastMarketQuery, 'detailed');
        break;

      case 'EXPLAIN_TECHNICAL':
        if (lastMarketQuery) handleSendMessage(lastMarketQuery, 'technical');
        break;

      case 'OPEN_TERMINAL':
      case 'VIEW_DEPTH':
        if (onNavigateTab) {
          onNavigateTab('exchange');
        } else {
          navigate('/market-mandi/terminal');
        }
        break;

      case 'VIEW_CONTRACT_NOTE':
        if (onNavigateTab) {
          onNavigateTab('contracts');
        } else {
          navigate('/market-mandi/transactions');
        }
        break;

      case 'COMPARE_MANDIS':
        handleSendMessage(`Compare regional APMC mandis for ${payload?.commodity || 'Wheat'}`);
        break;

      case 'CALCULATE_PROFIT':
        handleSendMessage(`Calculate net profitability for ${payload?.quantity || 100} quintals of ${payload?.commodity || 'Wheat'}`);
        break;

      case 'MATCH_BUYERS':
        handleSendMessage(`Show verified APMC buyers for ${payload?.commodity || 'Wheat'}`);
        break;

      case 'SELECT_MANDI':
      case 'BOOK_SLOT': {
        const mandiName = payload?.mandiName || payload?.mandi || 'Karnal APMC';
        const commodityName = payload?.commodity || 'Wheat';
        const qty = payload?.quantity || 100;
        handleSendMessage(`Book delivery slot at ${mandiName} for ${qty} quintals of ${commodityName}`);
        break;
      }

      case 'SLOT_CONFIRMED': {
        const confirmMsg = {
          id: `asst-${Date.now()}`,
          role: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          content: `✅ **Slot ${payload.bookingId} Confirmed!**\n\nYour priority weighbridge arrival token for **${payload.mandi}** on **${payload.date}** has been registered in the APMC gate ledger.\n\nYou can present this digital slip at Gate 2 for gross weight certification.`,
          actions: [
            { label: 'View in My Transactions', type: 'VIEW_CONTRACT_NOTE', payload: {} },
            { label: 'Open Market Terminal', type: 'OPEN_TERMINAL', payload: {} },
          ]
        };
        setMessages(prev => [...prev, confirmMsg]);
        setTimeout(() => {
          if (onNavigateTab) {
            onNavigateTab('contracts');
          } else {
            navigate('/market-mandi/transactions');
          }
        }, 1200);
        break;
      }

      default:
        console.log('Action dispatched:', type, payload);
    }
  };

  const handleSelectView = (view) => {
    if (view === 'terminal') {
      if (onNavigateTab) onNavigateTab('exchange');
      else navigate('/market-mandi/terminal');
    } else if (view === 'transactions') {
      if (onNavigateTab) onNavigateTab('contracts');
      else navigate('/market-mandi/transactions');
    } else if (view === 'assistant') {
      navigate('/market-mandi/copilot');
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] min-h-[640px] overflow-hidden border border-black/[0.08] rounded-2xl shadow-sm bg-white m-4 sm:m-6">
      {/* ChatGPT-style Left Sidebar */}
      <ConversationSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
        activeView="assistant"
        onSelectView={handleSelectView}
        user={user}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Conversation Window */}
      <ChatWindow
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        agentActivity={agentActivity}
        conversationTitle={conversations.find(c => c.id === activeConversationId)?.title || 'Market Intelligence'}
        onClearMessages={() => setMessages([])}
        onOpenSidebar={() => setSidebarOpen(true)}
        onAction={handleAction}
        language={chatLanguage}
        onLanguageChange={setChatLanguage}
      />
    </div>
  );
}

