type Props = {
    children: React.ReactNode;
};

export const Card = ({ children }: Props) => {
    return (
        <div className="p-4 rounded-xl bg-white/[.11] shadow-primary">
            {children}
        </div>
    );
};
