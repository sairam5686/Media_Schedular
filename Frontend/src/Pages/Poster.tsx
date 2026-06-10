import Navbar from "@/Components/Navbar";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaCalendarAlt,
  FaClock,
  FaImage,
} from "react-icons/fa";

const platforms = [
  { icon: FaLinkedin },
  { icon: FaInstagram },
  { icon: FaFacebook },
];

const publishedPosts = [
  {
    text: "This is a test post, please ignore",
    date: "5/27/2026, 5:48:05 PM",
  },
  {
    text: "test post",
    date: "5/27/2026, 5:50:08 PM",
  },
  {
    text: "We are thrilled to announce the official launch of our new AI course!",
    date: "5/27/2026, 6:07:06 PM",
  },
];

const Poster = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar
        Title="Schedule & Post"
        Para="Manage and schedule your social media posts"
      />

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Compose Post</h2>

          {/* Platforms */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-500 mb-3">
              PLATFORMS
            </p>

            <div className="flex gap-3">
              {platforms.map((platform, index) => {
                const Icon = platform.icon;

                return (
                  <button
                    key={index}
                    className="h-12 w-12 border rounded-lg flex items-center justify-center hover:bg-gray-50 transition"
                  >
                    <Icon size={20} className="text-gray-600" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-500 mb-3">CONTENT</p>

            <textarea
              placeholder="What do you want to share today?"
              className="w-full h-36 border rounded-xl p-4 resize-none outline-none focus:ring-2 focus:ring-red-400"
            />

            <div className="text-right text-sm text-gray-400 mt-2">
              0 / 280
            </div>
          </div>

          {/* Upload */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-500 mb-3">
              MEDIA (OPTIONAL)
            </p>

            <div className="border-2 border-dashed border-gray-300 rounded-xl h-32 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition">
              <FaImage size={28} />
              <p className="mt-2 text-sm">
                Click to upload image or video
              </p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">DATE</p>

              <div className="border rounded-lg h-11 px-3 flex items-center justify-between">
                <span className="text-gray-500">dd-mm-yyyy</span>
                <FaCalendarAlt
                  size={16}
                  className="text-gray-500"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">TIME</p>

              <div className="border rounded-lg h-11 px-3 flex items-center justify-between">
                <span className="text-gray-500">-- : --</span>
                <FaClock size={16} className="text-gray-500" />
              </div>
            </div>
          </div>

          {/* Button */}
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition">
            Schedule Post →
          </button>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          {/* Upcoming */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <FaCalendarAlt
                  size={16}
                  className="text-gray-600"
                />
                <span className="font-medium">Upcoming</span>
              </div>

              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                0
              </span>
            </div>

            <div className="h-32 flex items-center justify-center text-gray-400">
              No posts scheduled yet
            </div>
          </div>

          {/* Published */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-medium">Published</span>

              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                {publishedPosts.length}
              </span>
            </div>

            {publishedPosts.map((post, index) => (
              <div
                key={index}
                className="p-4 border-b last:border-b-0 flex justify-between gap-4"
              >
                <div>
                  <div className="flex gap-2 mb-2">
                    <FaLinkedin
                      size={15}
                      className="text-blue-600"
                    />
                    <FaInstagram
                      size={15}
                      className="text-pink-500"
                    />
                  </div>

                  <p className="text-gray-700 text-sm max-w-md">
                    {post.text}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="bg-slate-100 text-xs px-2 py-1 rounded-md">
                    Image
                  </span>

                  <p className="text-xs text-gray-400 mt-2">
                    {post.date}
                  </p>

                  <span className="inline-block mt-2 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                    Published
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;