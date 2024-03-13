import {styled} from "@mui/system";
import {Avatar, Card} from "@mui/material";

const cardSize = {
    width: 240,
    height: 580,
};

const StyledCard = styled(Card)(({theme}) => ({
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    margin: theme.spacing(1),
    width: cardSize.width,
    height: cardSize.height,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        borderColor: `#6caec659 !important`,
    },
}));

const StyledAvatar = styled(Avatar)(({theme}) => ({
    backgroundColor: theme.palette.primary.secondary,
}));

export {StyledCard, StyledAvatar};