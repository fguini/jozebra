import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, Skeleton, Typography } from '@mui/material';
import { Finished } from './GameUtils';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

interface GameOverProps {
    finished: Finished;
}

export function GameOver({ finished }: GameOverProps) {
    const [ open, setOpen ] = useState<boolean>(!!finished);

    useEffect(() => {
        setOpen(!!finished);
    }, [ finished ]);

    return (
        <Modal
            hideBackdrop
            open={ open }
            aria-labelledby="game-over-result"
            aria-describedby="game-over-stats"
        >
            <Box sx={ style }>
                <Typography id="game-over-result" variant="h6" component="h2">
                    { finished }
                </Typography>
                <Skeleton variant="text"/>
                <Skeleton variant="circular" width={ 40 } height={ 40 }/>
                <Skeleton variant="rectangular" width={ 210 } height={ 118 }/>
                <Button onClick={ () => setOpen(false) }>Cerrar</Button>
            </Box>
        </Modal>
    );
}
