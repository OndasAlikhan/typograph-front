import { Button } from "./Button";

export default function Header() {
    return (
        <header className="h-[64px]">
            <div className="px-24 py-2 flex gap-3 justify-between items-baseline">
                <span className="text-xl">TYPOGRAPH</span>
                {/* <Button>
                    <div className="text-right ">Login</div>
                </Button> */}
            </div>
        </header>
    );
}
