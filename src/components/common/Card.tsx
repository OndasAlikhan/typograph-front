type Props = {
    children: React.ReactNode;
};

export const Card = ({ children }: Props) => {
    return (
        <div className="p-4 rounded shadow-xl shadow-black/5 hover:bg-slate-50 ring-1 ring-slate-700/10">
            {children}
        </div>
    );
};
