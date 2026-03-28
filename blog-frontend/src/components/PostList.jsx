import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { FaEdit, FaTrash, FaEye, FaSearch } from "react-icons/fa";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const loadPosts = () => {
    setLoading(true);
    setError("");

    api
      .get("/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch(() => setError("Could not load posts. Please try again."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      api.delete(`/posts/${id}`).then(() => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      });
    }
  };

  const filteredPosts = posts.filter((post) => {
    const title = post.title?.toLowerCase() || "";
    const body = post.body?.toLowerCase() || "";
    const search = query.toLowerCase();
    return title.includes(search) || body.includes(search);
  });

  if (loading) {
    return (
      <div className="soft-card p-5 text-center bg-white">
        <div className="spinner-border text-primary mb-3" role="status" />
        <p className="mb-0 text-secondary">Loading posts...</p>
      </div>
    );
  }

  return (
    <section>
      <div className="soft-card bg-white p-4 p-md-5 mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h2 className="fw-bold mb-1">All Posts</h2>
            <p className="text-secondary mb-0">
              Discover, edit, and manage your content.
            </p>
          </div>
          <div className="d-flex gap-2">
            <span className="metric-badge">Total: {posts.length}</span>
            <span className="metric-badge">
              Showing: {filteredPosts.length}
            </span>
          </div>
        </div>

        <div className="input-group mt-4">
          <span className="input-group-text bg-white border-end-0">
            <FaSearch className="text-secondary" />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search posts by title or body..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="btn btn-outline-primary"
            onClick={loadPosts}
            type="button"
          >
            Refresh
          </button>
        </div>

        {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="soft-card bg-white p-5 text-center">
          <h4 className="mb-2">No matching posts</h4>
          <p className="text-secondary mb-0">
            Try another search or create a new post.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="col-12 col-md-6 col-xl-4 d-flex">
              <article className="post-card card w-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold mb-2">{post.title}</h5>
                  <p className="card-text text-secondary body-preview line-clamp-3">
                    {post.body}
                  </p>
                  <small className="text-muted mb-3">
                    Updated {new Date(post.updated_at).toLocaleDateString()}
                  </small>

                  <div className="d-flex flex-wrap gap-2 mt-auto">
                    <Link
                      to={`/posts/${post.id}`}
                      className="btn btn-sm btn-primary"
                    >
                      <FaEye className="me-1" /> View
                    </Link>
                    <Link
                      to={`/edit/${post.id}`}
                      className="btn btn-sm btn-warning text-dark"
                    >
                      <FaEdit className="me-1" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      <FaTrash className="me-1" /> Delete
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PostList;
