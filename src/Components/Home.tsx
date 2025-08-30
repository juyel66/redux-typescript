import { Link } from "react-router";
import Navbar from "./Navbar";
import { usePosts } from "../features/usePosts";
import { useAuth } from "../features/useAuth";
import { useState } from "react";

const Home = () => {
  const { posts, isLoading, error, deletePostById } = usePosts();
  const currentUser = useAuth();
  const [selectedPost, setSelectedPost] = useState<any>(null);

  console.log("currentUser is:", currentUser);
  console.log(posts);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deletePostById(id);
    }
  };

  return (
    <div>
      <Navbar />

      {/* Loading / Error */}
      <div className="flex items-center justify-center mt-20">
        {isLoading && <h1 className="text-3xl font-semibold">Loading .....</h1>}
        {error && <h1 className="text-red-500 font-semibold">{error}</h1>}
      </div>

      {/* Total Posts & Add Button */}
      <div>
        <h3 className="text-center mt-5 text-3xl font-semibold mb-3">
          Total Data is: {posts.length}
        </h3>

        <div className="flex items-center justify-end mb-3">
          <Link
            target="_blank"
            to="https://southest-asia.netlify.app/AddTourists"
            className="text-center px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
          >
            Add Data
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post, index) => (
            <div
              key={post._id}
              className="border-2 border-green-600 p-4 rounded shadow hover:shadow-lg transition"
            >
              <img
                className="w-full h-48 object-cover mb-2 rounded"
                src={post.image}
                alt={post.name}
              />
              <p className="text-green-500 font-semibold text-center mb-2">
                {index + 1}. {post.location}
              </p>

              <div className="flex items-center justify-center gap-2">
                {/* DaisyUI Modal Trigger */}
                <label
                  htmlFor={`modal-${post._id}`}
                  className="text-gray-700 font-semibold border-2 border-green-400 px-3 py-1 rounded hover:bg-green-600 hover:text-white hover:border-white cursor-pointer transition"
                  onClick={() => setSelectedPost(post)}

                  
                >
                  View
                </label>

                

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-gray-700 font-semibold border-2 border-green-400 px-3 py-1 rounded hover:bg-red-600 hover:text-white hover:border-white transition"
                >
                  Delete
                </button>
              </div>

              {/* DaisyUI Modal */}
              <input type="checkbox" id={`modal-${post._id}`} className="modal-toggle" />
              <div className="modal">
                <div className="modal-box relative">
                  <label
                    htmlFor={`modal-${post._id}`}
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3 className="text-xl font-bold mb-2">{post.name}</h3>
                  <img
                    src={post.image}
                    alt={post.name}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <p className="text-gray-700 mb-2">Location: {post.location}</p>
                  <p className="text-gray-600">{post.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
