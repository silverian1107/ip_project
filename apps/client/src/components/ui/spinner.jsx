export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-t-4 border-blue-400 rounded-full animate-spin"></div>
    </div>
  );
}
