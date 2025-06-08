import { TUser } from "src/db/schemas";
export declare const onboardingSteps: ({
    instruction: string;
    condition?: undefined;
    unmetInstruction?: undefined;
} | {
    instruction: string;
    condition: (contact: TUser) => boolean;
    unmetInstruction: string;
})[];
export type TOnboardingStep = {
    instruction: string;
    condition?: (contact: TUser) => boolean;
    unmetInstruction?: string;
};
