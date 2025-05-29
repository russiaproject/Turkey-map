
import React, { useState, useRef, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const ChatBotRusevi = () => {
  const [showChat, setShowChat] = useState(false);
  const chatbotRef = useRef(null);

  // Custom theme for the chatbot with the specified color (#0169c6)
  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Arial, Helvetica, sans-serif',
    headerBgColor: '#0169c6',
    headerFontColor: '#fff',
    headerFontSize: '16px',
    botBubbleColor: '#0169c6',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  // Custom steps for the chatbot
  const steps = [
    {
      id: 'welcome',
      message: 'Kültür merkezldir. Daha fazla bilgi için web sitemizi ziyaret edebilirsiniz.',
      trigger: 'ask-help',
    },
    {
      id: 'ask-help',
      message: 'Başka bir konuda yardımcı olabilir miyim?',
      trigger: 'options',
    },
    {
      id: 'options',
      options: [
        { value: 'rus_evi', label: 'Rus Evi nedir?', trigger: 'rus-evi-info' },
        { value: 'rusya_burslari', label: 'Rusya bursları hakkında bilgi', trigger: 'rusya-burslari-info' },
        { value: 'iletisim', label: 'İletişim bilgileri', trigger: 'iletisim-info' },
        { value: 'end', label: 'Kapat', trigger: 'end-chat' },
      ],
    },
    {
      id: 'rus-evi-info',
      message: 'Rus Evi, Türkiye\'deki Rus kültür merkezidir. Rusya ve Rus kültürü ile ilgili çeşitli etkinlikler ve kurslar düzenler.',
      trigger: 'ask-more',
    },
    {
      id: 'rusya-burslari-info',
      message: 'Rusya bursları, Rusya\'da eğitim görmek isteyen öğrencilere sunulan desteklerdir. Çeşitli burs programları mevcuttur.',
      trigger: 'ask-more',
    },
    {
      id: 'iletisim-info',
      message: 'İletişim bilgilerimiz için web sitemizin iletişim sayfasını ziyaret edebilirsiniz.',
      trigger: 'ask-more',
    },
    {
      id: 'ask-more',
      message: 'Başka bir konuda yardımcı olabilir miyim?',
      trigger: 'options',
    },
    {
      id: 'end-chat',
      message: 'Teşekkür ederiz. İyi günler!',
      end: true,
    },
  ];

  // Function to toggle the chatbot
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target) && 
          !event.target.classList.contains('chat-button')) {
        setShowChat(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Chat button fixed at the bottom-right corner */}
      <button 
        className="chat-button"
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#007ae8',
          color: 'white',
          border: 'none',
          fontSize: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 999,
          boxShadow: 'rgba(100, 100, 111, 0.1) 0px 7px 15px 0px',
          transition: 'all 0.3s ease'
        }}
      >
        <i className="fas fa-comments"></i>
      </button>

      {/* Chatbot container */}
      {showChat && (
        <div 
          ref={chatbotRef}
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            zIndex: 1000,
            boxShadow: 'rgba(100, 100, 111, 0.1) 0px 7px 15px 0px',
            borderRadius: '10px',
            overflow: 'hidden',
            maxWidth: '370px',
            width: '100%'
          }}
        >
          <ThemeProvider theme={theme}>
            <ChatBot
              steps={steps}
              hideHeader={false}
              headerTitle="Rus Evi Chat"
              placeholder="Mesajınızı yazın..."
              bubbleStyle={{ fontSize: '14px' }}
              bubbleOptionStyle={{ 
                background: '#0169c6', 
                color: 'white',
                borderRadius: '18px',
                padding: '8px 12px',
                marginBottom: '8px',
                cursor: 'pointer',
                boxShadow: 'rgba(100, 100, 111, 0.1) 0px 7px 15px 0px'
              }}
              footerStyle={{ 
                padding: '10px',
                borderTop: '1px solid #eee'
              }}
              style={{ 
                borderRadius: '10px', 
                width: '100%' 
              }}
            />
          </ThemeProvider>
        </div>
      )}
    </>
  );
};

export default ChatBotRusevi;