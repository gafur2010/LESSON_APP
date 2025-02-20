import { useState, useEffect } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { apiCall } from "./apiCall";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonLink, setLessonLink] = useState("");
  const [lessons, setLessons] = useState<
    { id: number; title: string; body: string }[]
  >([]);
  const userId = localStorage.getItem("token");

  const fetchLessons = async () => {
    if (!userId) return;
    try {
      const response = await apiCall(`/posts?userId=${userId}`, "GET", null);
      setLessons(response.data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [userId]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addLesson = async () => {
    if (lessonTitle && lessonLink && userId) {
      const newLesson = { title: lessonTitle, body: lessonLink, userId };
      try {
        const response = await apiCall("/posts", "POST", newLesson);
        setLessons([...lessons, response.data]);
        setLessonTitle("");
        setLessonLink("");
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error adding lesson:", error);
      }
    } else {
      alert("Please fill in both fields.");
    }
  };

  const deleteLesson = async (id: any) => {
    try {
      await apiCall(`/posts/${id}`, "DELETE", null);
      setLessons(lessons.filter((lesson) => lesson.id !== id));
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  return (
    <div className="p-3">
      <button
        onClick={toggleModal}
        className="btn btn-success mx-auto w-25 mb-3"
      >
        Add New Lesson
      </button>

      <Rodal
        enterAnimation="slideDown"
        leaveAnimation="slideUp"
        visible={isModalOpen}
        onClose={toggleModal}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Add New Lesson</h1>
          </div>
          <div className="modal-body d-flex flex-column align-items-center mt-3">
            <input
              placeholder="Type Lesson Title"
              className="form-control mb-2"
              type="text"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
            />
            <input
              placeholder="Type Lesson Link"
              className="form-control mb-2"
              type="text"
              value={lessonLink}
              onChange={(e) => setLessonLink(e.target.value)}
            />
            <button className="btn btn-success">+</button>
          </div>
          <div className="modal-footer">
            <button
              onClick={addLesson}
              type="button"
              className="btn btn-primary mt-1"
            >
              Save changes
            </button>
          </div>
        </div>
      </Rodal>

      <div className="row">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="col-12 col-md-4 mb-3 w-25 h-25">
            <div className="card bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">{lesson.title}</h5>
                <p className="card-text">{lesson.body}</p>
                <button
                  onClick={() => deleteLesson(lesson.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
