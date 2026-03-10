import React, { useState } from 'react';
import { getBakeryRecommendation } from '../services/geminiService';
import { Sparkles, Send, X } from 'lucide-react';

export const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);
    try {
      const result = await getBakeryRecommendation(query);
      setResponse(result);
    } catch (error) {
      setResponse("Произошла ошибка связи с шеф-кондитером.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-emani-blue text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform animate-bounce"
        aria-label="Ask AI Assistant"
      >
        <Sparkles size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-emani-cream overflow-hidden flex flex-col font-sans">
      <div className="bg-white p-5 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-emani-blue">
            <Sparkles size={20} />
          </div>
          <h3 className="font-bold text-emani-dark text-sm">Шеф-консультант Эмани</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-emani-dark transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="p-6 bg-[#fcfaf7] h-80 overflow-y-auto flex flex-col gap-4">
        <div className="bg-white p-4 rounded-2xl rounded-tl-none self-start shadow-sm text-sm text-gray-700 max-w-[90%] border border-gray-100 leading-relaxed">
          Здравствуйте! Я ваш персональный гид по миру десертов Эмани. Какой торт или выпечку вы ищете сегодня?
        </div>
        
        {response && (
           <div className="bg-emani-blue/10 p-4 rounded-2xl rounded-tr-none self-end shadow-sm text-sm text-emani-dark max-w-[90%] border border-emani-blue/20 leading-relaxed">
             {response}
           </div>
        )}

        {loading && (
           <div className="self-start text-emani-gold text-xs animate-pulse font-medium uppercase tracking-widest pl-2">
             Шеф колдует...
           </div>
        )}
      </div>

      <form onSubmit={handleAsk} className="p-4 bg-white border-t border-gray-100 flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Какой торт самый легкий?"
          className="flex-1 px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:outline-none focus:border-emani-blue focus:bg-white transition-all"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-emani-dark text-white p-3 rounded-xl hover:bg-emani-blue disabled:opacity-50 transition-all shadow-lg shadow-emani-dark/10"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};