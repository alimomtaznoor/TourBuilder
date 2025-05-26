export default function StepPreviewPanel({ steps, current }) {
  return (
    <div className="w-full max-w-4xl mt-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        All Steps Preview
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`border rounded-lg p-3 shadow-sm ${
              index === current ? "border-blue-500" : "border-gray-200"
            } bg-white`}
          >
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h4 className="font-medium text-sm">{step.title}</h4>
            <p className="text-xs text-gray-500 line-clamp-2">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
