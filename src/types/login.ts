
export enum STEP {
    EMAIL = "EMAIL",
    PASSWORD = "PASSWORD",
    FORGOT_PASSWORD = "FORGOT_PASSWORD",
}

export interface LoginPageProps {
    initialStep?: STEP;
}

export interface InputProps {
    id: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

export interface CheckboxProps {
    id: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

export interface ButtonProps {
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    text?: string;
    icon?: React.ReactNode;
    className?: string;
}
