import { useEffect, useState } from 'react';
import './chatbot.css';
import axios from 'axios';

const Chatbot = () => {
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.floating-chat').classList.add('enter');
        }, 1000);
    }, []);

    const toggleChat = () => {
        setChatOpen(!chatOpen);
    };

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            setMessages([...messages, { type: 'self', text: inputValue }]);
            await axios.post('http://127.0.0.1:5000/',{
                data: inputValue
            })
            .then((response)=>{
                console.log('Response:', response.data);
                setMessages(messages.concat(response.data.messages));
                setInputValue('');
            })
        }
    };

    const handleKeyDown = (event) => {
        if ((event.metaKey || event.ctrlKey) && event.keyCode === 13) {
            handleSendMessage();
        }
    };

    return (
        <div className={`floating-chat ${chatOpen ? 'expand' : ''}`} onClick={!chatOpen ? toggleChat : null}>
           {chatOpen !== true && ("chat")}
            <div className={`chat ${chatOpen ? 'enter' : ''}`}>
                <div className="header">
                    <span className="title">what's on your mind?</span>
                    <button onClick={toggleChat}>
                        
                    </button>
                </div>
                <ul className="messages">
                {messages.map((msg,index)=>{
          if(msg.msg_type==="user")
          return <div key={index} className="user_msg">
            <p className="label">user</p>
            <p>{msg.user_question}</p>
            </div>
          else
          return <div key={index} className="ai_msg">
            <p className="label">AI</p>
            <p>{msg.tool_output}</p>
            </div>
        })}
                </ul>
                <div className="footer">
                    <div
                        className="text-box"
                        contentEditable="true"
                        onInput={(e) => setInputValue(e.currentTarget.textContent)}
                        onKeyDown={handleKeyDown}
                        suppressContentEditableWarning={true}
                        disabled={!chatOpen}
                    ></div>
                    <button id="sendMessage" onClick={handleSendMessage}>send</button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
