type Props = {
    children: React.ReactNode;
};

export const TyperCard = ({ children }: Props) => {
    return (
        <div className="p-4 rounded shadow-xl shadow-black/5 ring-1 ring-slate-700/10 border-2">
            {children}
        </div>
    );
};
