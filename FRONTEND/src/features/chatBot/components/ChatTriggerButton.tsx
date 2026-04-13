import { Box, Fab, Tooltip } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

interface ChatTriggerButtonProps {
    open: boolean;
    onClick: () => void;
}

export const ChatTriggerButton = ({ open, onClick }: ChatTriggerButtonProps) => {
    return (
        <Tooltip title="Open Chat Assistant" arrow>
            <Box
                sx={{
                    display: open ? 'none' : 'block',
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 999,
                }}
            >
                <Fab color="primary" onClick={onClick}>
                    <SmartToyIcon />
                </Fab>
            </Box>
        </Tooltip>
    );
};
