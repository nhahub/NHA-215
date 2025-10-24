import React, { useState } from 'react'

const Chatbot = () => {

    const [input, setinput] = useState("")
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    
    const clearChat = () => setMessages([])
    const sendMassage = async () => {
        if (!input.trim()) return;

        const userMsg = { sender:'user', text:input}
        setMessages((prev) => [...prev, userMsg])
        setinput("")


        try {
            const res = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ inputs: input }),
            });

            const data = res.json()
            const botReply = data?.[0]?.generated_text || "Sorry, I didn’t understand.";
            const botMsg = { sender:"bot", text:botReply }
            setMessages((prev) => [...prev, botMsg])
        } catch (err) {
            console.log(err)
            setMessages((prev) => [...prev, { sender:"bot", text:"Error getting response. Try again." }])
        } finally {
            setLoading(false)
        }
    }

  return (
    <section className='relative min-h-[calc(100vh-72px)] bg-pri p-16 flex items-center flex-col'>
        <div className='w-full h-[625px] bg-[#0e1617] rounded-3xl p-6 gap-5 flex flex-col relative'>
            <div className=' w-full h-[500px] border-solid border-white border-[2px] rounded-3xl p-5 overflow-auto'>
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                        <div className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-sec text-white' : 'bg-gray-300 text-black'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex flex-col gap-2 '>
                <input
                className=' w-full h-[30px] p-2 rounded-3xl' 
                type="text"
                name='massage'
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setinput(e.target.value)}
                />
                <div className='flex gap-2 '>
                    <button 
                    onClick={sendMassage} 
                    className={`w-full h-[30px] text-[16px] text-white bg-[#0e898e] rounded-3xl hover:bg-[#172627] transition-all ease-in duration-300 ${!input.trim() ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    disabled={!input.trim()}>
                    Send
                    </button>
                    <button 
                    onClick={clearChat} 
                    className=' w-full h-[30px] text-[16px] text-white bg-red-600 rounded-3xl hover:bg-red-900 transition-all ease-in duration-300' >
                    Clear
                    </button>
                </div>
            </div>
        </div>
        <span className=' absolute text-red-600'>Conversations are not saved</span>
    </section>
  )
}

export default Chatbot