import React, { useEffect } from 'react';

const Chat = () => {
    useEffect(()=>{
        const script = document.createElement('script');
        script.async = true;
        try{
          if (window.Kakao) {
            const kakao = window.Kakao;
            if (!kakao.isInitialized()) {
              kakao.init("ac584e7a5705115d070d45375620d5fb");
            }
          }
    
        window.Kakao.Channel.createChatButton({
          container: '#kakao-talk-channel-chat-button',
          channelPublicId: '_lWxdjG',
          title: 'consult',
          size: 'small',
          color: 'yellow',
          shape: 'pc',
          supportMultipleDensities: true,
        });
        document.body.appendChild(script);
        document.body.removeChild(script);
      } catch (err){}
      }, [])
  return (
    <div id="kakao-talk-channel-chat-button"></div>
  )
}

export default Chat 