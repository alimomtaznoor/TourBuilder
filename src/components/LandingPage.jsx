export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-slate-900 to-indigo-800 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the Product Tour Builder
      </h1>
      <p className="text-lg mb-8 max-w-xl">
        Create interactive, step-by-step product demos with visuals, motion, and
        custom storytelling.
      </p>
      <button
        onClick={onStart}
        className="bg-white text-indigo-800 font-semibold px-8 py-3 rounded-lg shadow hover:bg-indigo-200 transition"
      >
        Start Demo
      </button>
    </div>
  );
}
