import { useEffect, useState } from "react";
import { apiCall } from "../apiCall";

interface Post {
  id: number;
  title: string;
  body: string;
}

const Posts = ({ userId }: { userId: number }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await apiCall(`/posts?userId=${userId}`, "GET", null);
        const data = res.data.map((post: any) => ({
          id: post.id,
          title: post.title,
          body: post.body || "No content available",
        }));
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  return (
    <div className="row">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="col-md-4 mb-3">
            <div className="card bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h5>Postlar yo‘q...</h5>
      )}
    </div>
  );
};

export default Posts;
