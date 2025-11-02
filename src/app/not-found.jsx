"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center bg-black text-gray-300 text-center py-32">
      <h1 className="text-headline mb-3">404 — Page not found :(</h1>
      <p className="text-big text-gray-500">
        You’ll be redirected to the homepage shortly
      </p>
    </main>
  );
}
