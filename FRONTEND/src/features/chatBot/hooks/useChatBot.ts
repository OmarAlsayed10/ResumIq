import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
export const useChatBot = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState('');
    const [chatId, setChatId] = useState(null);
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    
    const { user } = useAuth();
    const isPro = user?.role === 'pro user';
    const navigate = useNavigate();

    useEffect(() => {
        const createChat = async () => {
            try {
                const res = await axios.post(
                    'http://localhost:3001/api/chatbot/create',
                    { messages },
                    { withCredentials: true }
                );
                setChatId(res.data._id);
            } catch (err: any) {
                if (err.response?.status === 401) {
                    setErrorMessage('🔒 You need to log in to start the chatbot.');
                } else {
                    console.error('Error creating chat:', err);
                }
            }
        };
        createChat();
    }, []);

    const handleChatButtonClick = () => {
        if (!user) {
            setOpen(true);
            return;
        }
        
        if (isPro) {
            setOpen(true);
        } else {
            navigate("/pricing");
        }
    };

    const handleSend = async () => {
        if (!input.trim() || !chatId) return;

        setErrorMessage('');

        try {
            const res = await axios.post(
                'http://localhost:3001/api/chatbot',
                { message: input, chatId },
                { withCredentials: true }
            );

            const userMsg = { type: 'user', text: input };
            const botMsg = { type: 'bot', text: res.data.response };
            setMessages((prev) => [...prev, userMsg, botMsg]);
            setInput('');
        } catch (err: any) {
            console.error('Error sending message:', err);
            if (err.response && err.response.status === 401) {
                setErrorMessage('🔒 You need to log in to use the chatbot.');
            } else if (err.code === 'ERR_NETWORK') {
                setErrorMessage('❌ Network error. Please check your internet connection.');
            } else {
                setErrorMessage('⚠️ Something went wrong. Please try again later.');
            }
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return {
        messages,
        input,
        setInput,
        open,
        setOpen,
        errorMessage,
        messagesEndRef,
        handleChatButtonClick,
        handleSend,
    };
};
