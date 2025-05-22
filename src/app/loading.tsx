export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.2s]"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.4s]"></div>
      </div>
    </div>
  );
}