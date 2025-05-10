const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-[clamp(58vh,(40vh+20vw),100vh)] max-h-[calc(85vh-60px)]">
    <svg className="animate-spin h-8 w-8 text-lightblue" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="orange"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

export default LoadingSpinner;