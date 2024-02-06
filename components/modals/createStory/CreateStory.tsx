import "./CreateStory.css";
import { useState, ReactElement } from "react";
import myApi from "../../../api.config";
import { useNavigate } from "react-router-dom";

interface CreateStoryformProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateStory({ setOpenModal }: CreateStoryformProps): ReactElement {
  const [formData, setFormData] = useState<FormData>({ title: "", content: "" });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    myApi.post("/api/stories", { title: formData.title, content: formData.content })
      .then((res) => {
        alert("Story posted successfully");
        navigate(`/stories/${res.data.storyId}`);
      })
      .catch((err) => console.error("Error posting story:", err));
  };

  return (
    <>
      <div className="overlay-create-story">
        <div className="Create-story">
          <div className="story-title">
            <div>
              <h1>Write an Article</h1>
            </div>
            <svg
              className="icon-clear"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setOpenModal(false)}
            >
              <path
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="#757575"
              />
            </svg>
          </div>

          <form className="word-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Tell your story..."
              name="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
            ></textarea>
            <div className="word-buttons">
              <button className="btn green" type="submit">
                Publish
              </button>
              <button className="btn grey" onClick={() => setOpenModal(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

interface FormData {
  title: string;
  content: string;
}

export default CreateStory;
