import React, { useState } from "react";
import axios from "axios";

const UploadProjectDescriptions = () => {
  const frontendOptions = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Bootstrap",
  ];

  const backendOptions = [
    "Node.js",
    "Express.js",
    "MongoDB",
    "Firebase",
    "MySQL",
    "PostgreSQL",
  ];

  const [formData, setFormData] = useState({
    title: "",
    frontEnd: [],
    backend: [],
    projDescription: "",
    webImage: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, webImage: files[0] });
    } else if (type === "checkbox") {
      const updatedArray = checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value);
      setFormData({ ...formData, [name]: updatedArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("projDescription", formData.projDescription);
      data.append("webImage", formData.webImage);
      formData.frontEnd.forEach((tech) => data.append("frontEnd", tech));
      formData.backend.forEach((tech) => data.append("backend", tech));

      const res = await axios.post(
        "http://localhost:8000/uploadProject",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("✅ Project uploaded successfully!");
      console.log("Server response:", res.data);

      setFormData({
        title: "",
        frontEnd: [],
        backend: [],
        projDescription: "",
        webImage: null,
      });
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Upload failed. Check console for details.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex justify-center items-start py-16 px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01] duration-300">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            🚀 Upload Your Project
          </h1>
          <p className="text-indigo-100 text-sm mt-2">
            Showcase your skills by adding your project details below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Title */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Project Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Project Thumbnail
            </label>
            <input
              type="file"
              name="webImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Frontend Tech */}
          <div>
            <h3 className="text-gray-700 dark:text-gray-300 font-semibold mb-3">
              Frontend Technologies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {frontendOptions.map((tech) => (
                <label
                  key={tech}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  <input
                    type="checkbox"
                    name="frontEnd"
                    value={tech}
                    checked={formData.frontEnd.includes(tech)}
                    onChange={handleChange}
                    className="accent-indigo-600"
                  />
                  <span>{tech}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Backend Tech */}
          <div>
            <h3 className="text-gray-700 dark:text-gray-300 font-semibold mb-3">
              Backend Technologies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {backendOptions.map((tech) => (
                <label
                  key={tech}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  <input
                    type="checkbox"
                    name="backend"
                    value={tech}
                    checked={formData.backend.includes(tech)}
                    onChange={handleChange}
                    className="accent-indigo-600"
                  />
                  <span>{tech}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Project Description
            </label>
            <textarea
              name="projDescription"
              value={formData.projDescription}
              onChange={handleChange}
              rows="5"
              placeholder="Describe your project..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Upload Project ✨
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadProjectDescriptions;
