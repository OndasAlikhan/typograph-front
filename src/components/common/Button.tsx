type Props = {
    children: React.ReactNode;
};

export const Button = ({ children }: Props) => {
    return (
        <div className="text-white bg-accent-color-600 px-2 py-1 rounded">
            {children}
        </div>
    );
};
