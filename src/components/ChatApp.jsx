import React, { useState } from 'react';
// import './ChatApp.css';
import { IoMdContacts } from "react-icons/io";
const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
import { BiSolidLike } from "react-icons/bi";
function ChatApp() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionInput, setMentionInput] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSend = () => {
    if (message.trim() === '') return;
    const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
    const newMessage = {
      user: randomUser,
      text: message.trim(),
      likes: 0
    };
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleLike = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].likes++;
    setMessages(updatedMessages);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    if (value[value.length - 1] === '@') {
      setShowMentions(true);
      setMentionInput('');
      setFilteredUsers(user_list);
    } else {
      const lastWord = value.split(' ').pop();
      if (lastWord.startsWith('@')) {
        setShowMentions(true);
        const input = lastWord.substring(1).toLowerCase();
        const filtered = user_list.filter(user => user.toLowerCase().includes(input));
        setMentionInput(input);
        setFilteredUsers(filtered);
      } else {
        setShowMentions(false);
      }
    }
  };

  const handleMentionClick = (username) => {
    const newValue = message.replace(`@${mentionInput}`, `@${username} `);
    setMessage(newValue);
    setShowMentions(false);
  };

  return (
    <div className="flex flex-col h-[100vh] justify-between">
      <div className='flex justify-between items-center bg-[#d1e5f5] p-[10px]'>
       <div>
        <h1 className='font-poppins text-[20px] md:text-[15px] sm:text-[12px] font-semibold'>Introduction</h1>
        <p className='font-poppins text-[15px] md:text-[12px] sm:text-[9px] font-medium text-[#514f4f]'>This Channel is For Company Wide Chatter</p>
       </div>
       <div>
        <h4 className='flex items-center font-poppins text-[15px] md:text-[12px] sm:text-[10px]'>{user_list.length}/100 <IoMdContacts className='ml-2'/></h4>
       </div>
      </div>

      
      <div className="flex-1 flex flex-col  scrollbar-hide overflow-y-auto p-4 bg-[#dff3f4]">
         {messages.map((msg, index) => (
          <div className="message flex  items-center gap-2 my-2 sm:my-1" key={index}>
            <div className={`w-[40px] md:w-[30px] md:h-[30px] flex items-center justify-center ${msg.user=='Bob'&&'bg-[#efb1b1]'} ${msg.user=='Dean'&&'bg-[#f33d3d]'} ${msg.user=='Alan'&&'bg-[#2c7eb9]'} ${msg.user=='Carol'&&'bg-[#d5e12f]'} ${msg.user=='Elin'&&'bg-[#7e29d2]'} text-[white] font h-[40px] rounded-[100px]`}>
              {msg.user.slice(0,1)}
            </div>
            <div>
            <h1 className='text-[#efb1b1] font-poppins font-semibold text-[15px] md:text-[12px] sm:text-[10px]'>{msg.user}</h1>
           
            <div className="text flex">
 <span className='bg-[white] p-[10px_30px] md:p-[10px_20px] sm:p-[7px_10px] rounded-[0px_10px_10px_10px] text-[15px] md:text-[12px] sm:text-[10px] font-poppins font-medium'> {msg.text}</span>
  <button className="like-btn flex text-[15px] md:text-[12px] sm:text-[10px] items-center" onClick={() => handleLike(index)}>
    <BiSolidLike className={`ml-2 sm:ml-1 ${msg.likes>=1 && 'text-[#da753f]'}`}/> {msg.likes >= 1 ? msg.likes : null}
  </button>
</div>
</div>

          </div>
        ))}
      </div>
      <div className="w-[100%] flex gap-2 p-2 bg-[#d1e5f5]">
        <div className='w-[90%] sm:w-[80%]'>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          className='w-[100%] outline-none bg-[#d1e5f5] border-[2px] border-[gray] rounded-[10px] p-2'
        />
        {showMentions && (
          <div className="mention-list relative  h-[100px] scrollbar-hide overflow-y-auto">
            {filteredUsers.map((user, index) => (
              <div
                className="mention-item font-poppins border-[1px] w-[200px] p-1 text-[#ee7171]"
                key={index}
                onClick={() => handleMentionClick(user)}
              >
                {user}
              </div>
            ))}
          </div>
        )}
        </div>
        <button onClick={handleSend} className='bg-[#538fe9] hover:bg-[#5d1670] w-[10%] sm:w-[20%] rounded-[20px] text-[white] font-poppins font-semibold text-[15px] md:text-[13px] sm:text-[12px]'>Send</button>
      </div>
      
    </div>
  );
}

export default ChatApp;
