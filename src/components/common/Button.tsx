type Props = {
    children: React.ReactNode;
};

export const Button = ({ children }: Props) => {
    return (
        <div className="text-white bg-black hover:opacity-75 px-6 py-[2px] rounded-2xl cursor-pointer">
            {children}
        </div>
    );
};
