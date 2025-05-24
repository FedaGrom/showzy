"use client";

import { FaArrowLeft } from "react-icons/fa";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="text-sm bg-zinc-800 px-3 py-2 rounded hover:bg-zinc-700 flex items-center gap-2 text-white"
    >
      <FaArrowLeft />
      <span className="hidden sm:inline">Back</span>
    </button>
  );
}
