import React, { useState } from 'react';
import './App.css'
import { Configuration, OpenAIApi } from 'openai';
import './.env'
import text from './prompt.js';

function App() {

  const [message, setMessage] = useState([''])
  const [chats, setChats] = useState([]); 
  const [person, setPerson] = useState(false);

  async function getResponse() {
    
    setPerson(true);
    let body = message
    setMessage('')
    setChats([...chats, message])
    let temp = [...chats, message]
    console.log(chats)

    const configuration = new Configuration({
      organization: 'org-ZmR9P8253vhvsBNIUGtenTft',
      apiKey: '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'
    });
    
    const openai = new OpenAIApi(configuration);

    delete configuration.baseOptions.headers['User-Agent'];

    const completion = await openai.createChatCompletion({
      'model': 'gpt-3.5-turbo',
      'messages': [
        {
          role: 'system',
          content: text
        },
        {
          role: 'user',
          content: body
        }
      ]
    })

    setPerson(false)
    console.log(chats)
    setChats([...temp, completion.data.choices[0].message.content])
    console.log(chats)
  }

  const handleChange = event => {
    setMessage(event.target.value);
  };

  let bool = person
  let list = chats.map((chat, index) => {
    if (!bool) {
      bool = !bool
      return (
        <div className='talk-bubble tri-right round border left-top' key={index}>
          <div className='talktext'>
            <p>{chat}</p>
          </div>
        </div>
      )
    }
    else {
      bool = !bool
      return (
        <div className='talk-bubble tri-right round border right-top' id={chat}>
          <div className='talktext'>
            <p>{chat}</p>
          </div>
        </div>
      )
    }
    }
  )

  return (
    <div className='container'>
      <div className='listContainer'>
        {list}
      </div>

      <input 
        placeholder='Insert Chat here' 
        onChange={handleChange}
        value={message}
      />

      <button onClick={getResponse}>Send Chat</button>
    </div>
  );
}

export default App;
