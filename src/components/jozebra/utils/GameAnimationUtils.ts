export const ATTEMPT_ANIMATION_SUCCESSFUL = 'Success';
export const ATTEMPT_ANIMATION_WRONG = 'Wrong';
export type TryAnimation = typeof ATTEMPT_ANIMATION_SUCCESSFUL | typeof ATTEMPT_ANIMATION_WRONG | null;

export interface Animation {
    count?: number;
    name: string;
    time: number;
}

interface AnimationsInformation {
    [key: string]: Animation;
}

export const Animations: AnimationsInformation = {
    [ATTEMPT_ANIMATION_SUCCESSFUL]: {
        name: 'SuccessAttemptAnimation',
        time: 500,
        count: 2
    },
    [ATTEMPT_ANIMATION_WRONG]: {
        name: 'WrongAttemptAnimation',
        time: 2000
    }
}