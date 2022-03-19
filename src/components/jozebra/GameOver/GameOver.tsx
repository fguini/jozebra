import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Skeleton } from '@mui/material';
import { Finished, FINISHED_DEFEAT, FINISHED_WIN } from '../utils';
import { FireworkShow } from './FireworkShow/FireworkShow';
import { LetterRain } from './LetterRain/LetterRain';

interface GameOverProps {
    finished: Finished;
}

export function GameOver({ finished }: GameOverProps) {
    const [ open, setOpen ] = useState<boolean>(Boolean(finished));

    useEffect(() => {
        setOpen(Boolean(finished));
    }, [ finished ]);

    function getAnimation() {
        if(!open) {
            return;
        }

        if(finished === FINISHED_WIN) {
            return <FireworkShow/>;
        } else if(finished === FINISHED_DEFEAT) {
            return <LetterRain/>
        }
    }

    return (
        <>
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
            { getAnimation() }
        </>
    );
}
