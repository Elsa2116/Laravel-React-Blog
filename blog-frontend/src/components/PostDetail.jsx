import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch(() => setError("Could not load post details."));
  }, [id]);

  if (!post && !error) {
    return (
      <div className="soft-card p-5 text-center bg-white">
        <div className="spinner-border text-primary mb-3" role="status" />
        <p className="mb-0 text-secondary">Loading post...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="soft-card card bg-white">
      <div className="card-body p-4 p-md-5">
        <h2 className="fw-bold mb-2">{post.title}</h2>
        <p className="text-muted mb-4">
          Created {new Date(post.created_at).toLocaleString()} • Updated{" "}
          {new Date(post.updated_at).toLocaleString()}
        </p>
        <p className="card-text fs-5 lh-lg">{post.body}</p>
        <div className="d-flex gap-2 mt-4">
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link to={`/edit/${post.id}`} className="btn btn-outline-dark">
            Edit Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
