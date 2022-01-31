import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Skeleton } from '@mui/material';
import { Finished } from './GameUtils';

interface GameOverProps {
    finished: Finished;
}

export function GameOver({ finished }: GameOverProps) {
    const [ open, setOpen ] = useState<boolean>(!!finished);

    useEffect(() => {
        setOpen(!!finished);
    }, [ finished ]);

    return (
        <Dialog open={ open }>
            <DialogTitle>
                <Trans i18nKey={ `app.gameOver.title.${ finished && finished.toLowerCase() }` }/>
            </DialogTitle>
            <DialogContent>
                <Skeleton variant="text"/>
                <Skeleton variant="circular" width={ 40 } height={ 40 }/>
                <Skeleton variant="rectangular" width={ 210 } height={ 118 }/>
            </DialogContent>
            <DialogActions>
                <Button onClick={ () => setOpen(false) }>
                    <Trans i18nKey="app.actions.close"/>
                </Button>
            </DialogActions>
        </Dialog>
    );
}
