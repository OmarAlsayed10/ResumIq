import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Avatar,
    useTheme,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

interface ChatWindowProps {
    open: boolean;
    messages: any[];
    input: string;
    setInput: (val: string) => void;
    handleSend: () => void;
    setOpen: (val: boolean) => void;
    errorMessage: string;
    messagesEndRef: React.MutableRefObject<any>;
}

export const ChatWindow = ({
    open,
    messages,
    input,
    setInput,
    handleSend,
    setOpen,
    errorMessage,
    messagesEndRef
}: ChatWindowProps) => {
    const theme = useTheme();
    const navigate = useNavigate();

    if (!open) return null;

    return (
        <Paper
            elevation={0}
            sx={{
                position: 'fixed',
                bottom: 10,
                right: 30,
                width: 380,
                height: 500,
                borderRadius: "10px",
                border: "1px solid rgba(26,26,24,0.1)",
                backgroundColor: "#ffffff",
                zIndex: 998,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    height: 50,
                    backgroundColor: '#ffffff',
                    borderBottom: '1px solid rgba(26,26,24,0.1)',
                    color: '#1a1a18',
                    px: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        src="/Images/bot.jpg"
                        sx={{ width: 30, height: 30, mr: 1 }}
                    />
                    <Typography fontWeight="bold" sx={{ color: "#1a1a18", fontFamily: '"DM Serif Display", serif' }}>ChatBot</Typography>
                </Box>
                <Button
                    onClick={() => setOpen(false)}
                    sx={{ minWidth: 'auto', color: '#6b6b66', p: 0 }}
                >
                    <CloseIcon />
                </Button>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, backgroundColor: "#ffffff" }}>
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                            mb: 1.5,
                        }}
                    >
                        {msg.type === 'bot' && (
                            <Avatar
                                src="/Images/bot.jpg"
                                sx={{ width: 30, height: 30, mr: 1, alignSelf: 'flex-end' }}
                            />
                        )}

                        <Paper
                            elevation={0}
                            sx={{
                                p: 1.5,
                                maxWidth: '75%',
                                borderRadius: "10px",
                                background:
                                    msg.type === 'user'
                                        ? '#e8f2ec'
                                        : '#f5f4ef',
                                color: '#1a1a18',
                            }}
                        >
                            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{msg.text}</Typography>
                        </Paper>
                        <div ref={messagesEndRef} />
                    </Box>
                ))}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    px: 2,
                    py: 1.5,
                    backgroundColor: "#ffffff",
                    borderTop: '1px solid rgba(26,26,24,0.1)',
                }}
            >
                {errorMessage && (
                    <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                        {errorMessage} <span onClick={() => navigate("/login")} style={{color:"#2a5c45", cursor: "pointer", fontWeight: 500}}>Login</span>
                    </Typography>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '6px',
                                backgroundColor: '#ffffff',
                            }
                        }}
                    />
                    <Button
                        disabled={!!errorMessage}
                        variant="contained"
                        onClick={handleSend}
                        sx={{ ml: 1, minWidth: 40, height: 40, backgroundColor: "#2a5c45", color: "white", boxShadow: "none", borderRadius: "6px" }}
                    >
                        <SendIcon fontSize="small" />
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};
