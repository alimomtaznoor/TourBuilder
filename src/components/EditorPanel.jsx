import { useState } from "react";

export default function EditorPanel({ onAddStep }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !image || !description) return;

    onAddStep({ title, image, description });
    setTitle("");
    setImage("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-lg"
    >
      <h2 className="text-lg font-semibold">Add New Step</h2>

      <input
        type="text"
        placeholder="Step Title"
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        className="w-full border p-2 rounded"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="w-full border p-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Step
      </button>
    </form>
  );
}
