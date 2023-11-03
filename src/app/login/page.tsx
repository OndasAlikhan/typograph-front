"use client";

import { FormEvent } from "react";

export default function LoginPage() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit", e);
    };
    return (
        <>
            <form className="max-w-[200px] mx-auto" onSubmit={handleSubmit}>
                <label htmlFor="email" className="text-sm">
                    Email
                </label>
                <input name="email" type="text" />

                <label htmlFor="password" className="text-sm">
                    Password
                </label>
                <input name="password" type="password" />

                <input
                    type="submit"
                    name="submit"
                    value="Submit"
                    className="mt-3 text-sm"
                />
            </form>
        </>
    );
}
