"use client";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="text-sm bg-zinc-800 px-3 py-1 rounded hover:bg-zinc-700"
    >
      Back
    </button>
  );
}