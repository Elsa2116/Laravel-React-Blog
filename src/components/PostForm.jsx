import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const PostForm = ({ postId }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      api.get(`/posts/${postId}`).then((res) => {
        setTitle(res.data.title);
        setBody(res.data.body);
      });
    }
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = { title, body };
    const request = postId
      ? api.put(`/posts/${postId}`, payload)
      : api.post("/posts", payload);

    request
      .then(() => navigate("/"))
      .catch(() => setError("Could not save your post. Please try again."))
      .finally(() => setSaving(false));
  };

  return (
    <div className="soft-card card bg-white">
      <div className="card-body p-4 p-md-5">
        <h3 className="fw-bold mb-1">{postId ? "Edit Post" : "Create Post"}</h3>
        <p className="text-secondary mb-4">
          {postId
            ? "Update your content and keep your readers engaged."
            : "Share your thoughts with a beautiful new post."}
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write a catchy post title"
              maxLength={120}
              required
            />
            <small className="text-muted">{title.length}/120</small>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Body</label>
            <textarea
              className="form-control"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your content here..."
              rows="6"
              required
            ></textarea>
            <small className="text-muted">{body.length} characters</small>
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving..." : postId ? "Update Post" : "Create Post"}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
