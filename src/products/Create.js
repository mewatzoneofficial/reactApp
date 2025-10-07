import React from "react";

export default function Create() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-96 mx-auto">
      <h2 className="text-2xl font-semibold mb-4">➕ Add Product</h2>
      <form>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-3 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded-lg"
        />
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
