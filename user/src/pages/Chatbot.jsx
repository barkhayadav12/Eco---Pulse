import { useState, useEffect, useRef } from 'react';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const userMessage = { sender: 'user', text: message };
    setChat(prev => [...prev, userMessage]);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.reply };
      setChat(prev => [...prev, botMessage]);
    } catch (err) {
      setChat(prev => [...prev, { sender: 'bot', text: '⚠️ Error fetching response.' }]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  return (
    <div className="container py-5">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-header bg-success text-white text-center">
          <h4 className="mb-0">Chatbot</h4>
        </div>

        <div className="card-body bg-light" style={{ height: '400px', overflowY: 'auto', padding: '1rem' }}>
          {chat.map((msg, idx) => (
            <div key={idx} className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-2`}>
              <div
                className={`p-2 px-3 rounded-3 shadow-sm text-white ${msg.sender === 'user' ? 'bg-primary' : 'bg-secondary'}`}
                style={{ maxWidth: '75%' }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="card-footer d-flex gap-2">
          <input
            type="text"
            className="form-control"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Ask me about Smart Waste Management..."
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
          />
          <button className="btn btn-success" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
