import { useEffect, useState, useRef } from "react";
import myApi from "../../api.config";
import Loading from "../loading/Loading";
import NavBar from "../../components/Navbar/NavBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Warning } from "./Stories";
import "./Story.css";
import Footer from "../../components/Footer/Footer";
import { getDate, readingSpeed, trimContent } from "../../utils/helper";
import Subscribe from "../../components/DecaSubscribe/Subscribe";
import commenterPhoto from "../../assets/images/profile-photo.png";
import storyPhoto from "../../assets/images/Rectangle 12 (1).png";
import NotFound from "../error/NotFound";
import NoAuth from "../error/NoAuth";
import ServerError from "../error/ServerError";

export default function StoryPage() {
  const [story, setStory] = useState<IStory | null>(null);
  const [apiStatus, setApiStatus] = useState<number | undefined>(undefined);
  const [user, setUser] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate()

  useEffect(() => {
    myApi.get("/api/users/me")
      .then(() => setUser(true))
      .catch(() => setUser(false));
  }, [user]);

  const { id } = useParams();

  useEffect(() => {
    myApi.get(`/api/stories/${id}`)
      .then((res) => {
        setStory(res.data.story);
        setApiStatus(res.status);
      })
      .catch((err) => {
        if (!err.response) setApiStatus(500);
        else setApiStatus(err.response.status);
      });
  }, [id]);

  if (apiStatus !== undefined && apiStatus !== 200) {
    // Handle API error
    if (apiStatus === 401) return <NoAuth />;
    if (apiStatus === 403) return <h1>Forbidden</h1>;
    if (apiStatus === 404) return <NotFound />;
    else return <ServerError />;
  }

  if (!story) {
    return <Loading />
  } else {
    return (
      <>
        <NavBar />
        <Warning />
        <div className="Story">
          <Article story={story} />
          <Aside story={story} />
          <Comments story={story} />
        </div>
        <Subscribe />
        <Footer />
      </>
    );
  }

  // Main story body
  function Article({ story }: { story: IStory }) {
    const { title, author, content, createdAt, comments } = story;
    const [likes, setLikes] = useState(story.likes.map(i => i.liker));
    const [liked, setLiked] = useState(false);

    useEffect(() => {
      if (userId && likes.includes(userId)) setLiked(true);
    }, [likes])

    const paragraphs = content.split("\n");
    return (
      <article>
        <div className="header">
          <img src={storyPhoto} alt="story image" />
          <div>
            <h2>{title}</h2>
            <p>
              <span>{getDate(createdAt)}</span>
              <span>{readingSpeed(content)} min read</span>
              <span>
                <button className="comment-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6.66659 8.75H13.3333M6.66659 12.0833H9.16659M17.5032 10C17.5032 14.1421 14.1453 17.5 10.0032 17.5C8.30617 17.5 2.50378 17.5 2.50378 17.5C2.50378
                  17.5 3.8031 14.3801 3.2831 13.334C2.78388 12.3297 2.50317 11.1976 2.50317 10C2.50317 5.85786 5.86104 2.5 10.0032 2.5C14.1453 2.5 17.5032 5.85786 17.5032 10Z"
                      stroke="#1570EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <span>{comments.length}</span>
              </span>
              <span>
                <button className="like-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={user ? "pointer" : ""} onClick={handleLikeClick}>
                    <path d="M7.49992 18.3332H14.9999C15.6916 18.3332 16.2833 17.9165 16.5333 17.3165L19.0499 11.4415C19.1249 11.2498 19.1666 11.0498 19.1666
                  10.8332V9.1665C19.1666 8.24984 18.4166 7.49984 17.4999 7.49984H12.2416L13.0333 3.6915L13.0583 3.42484C13.0583 3.08317 12.9166 2.7665 12.6916
                  2.5415L11.8083 1.6665L6.31658 7.15817C6.01658 7.45817 5.83325 7.87484 5.83325 8.33317V16.6665C5.83325 17.5832 6.58325 18.3332 7.49992 18.3332ZM7.49992
                  8.33317L11.1166 4.7165L9.99992 9.1665H17.4999V10.8332L14.9999 16.6665H7.49992V8.33317ZM0.833252 8.33317H4.16658V18.3332H0.833252V8.33317Z"
                      fill={liked ? "#1570EF" : "grey"} />
                  </svg>
                </button>
                <span>{likes.length}</span>
              </span>
            </p>
            <p>Author - {author.fullname}</p>
          </div>
        </div>
        <div className={content && content.length < 200 ? "short-article" : ""}>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    );

    function handleLikeClick() {
      if (userId) {
        if (liked === false) {

          myApi.post(`/api/stories/${story._id}/like`)
            .then((res) => {
              setLikes(res.data.likes);
              setLiked(true)
            })
            .catch((err) => console.error(err.response.data));
        } else {
          myApi
            .delete(`/api/stories/${story._id}/unlike`)
            .then((res) => {
              setLikes(res.data.likes);
              setLiked(false)
            })
            .catch((err) => console.error(err.response.data));
        }
      } else {
        navigate("/login")
      }
    }
  }

  // More from author
  function Aside({ story }: { story: IStory }) {
    const [authorStories, setAuthorStories] = useState<IStories>({ stories: [] });
    const [loading, setLoading] = useState(true);
    const id = story.author._id;
    useEffect(() => {
      myApi.get(`/api/stories/author/${id}?n=4`)
        .then((res) => {
          setAuthorStories(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, [id]);

    if (loading)
      return (
        <aside>
          <Loading />
        </aside>
      );

    if (authorStories) {
      const moreStories = authorStories.stories.filter(
        (i: IStory) => i._id !== story._id
      );

      return (
        <aside>
          <h2>More from the Author</h2>

          {moreStories.length === 0 && <p>No other stories from this author</p>}
          {moreStories.map((story: IStory) => {
            return (
              <div key={story._id}>
                <h3>{story.title}</h3>
                <p>{trimContent(story.content, 30)}</p>
                <Link to={`/stories/${story._id}`}>
                  <button className="btn white">View Article</button>
                </Link>
              </div>
            );
          })}
        </aside>
      );
    }
    return (
      <aside>
        <h2>More from the Author</h2>
        <p>No other stories from this author</p>
      </aside>
    );
  }

  // Comments
  function Comments({ story }: { story: IStory }) {
    const [commentFormData, setCommentFormData] = useState<ICommentFormData>({ content: "" });
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [loading, setLoading] = useState(false);

    const commentList = story.comments.map(comment => {
      const { _id, content, createdAt, author } = comment;
      return (
        <UserComment
          key={_id}
          _id={_id}
          content={content}
          createdAt={createdAt}
          author={author}
        />
      );
    });

    return (
      <div className="Comment">
        <h2>Comments</h2>
        <div className="comments">{commentList}</div>

        <form className={user ? "comment-form" : "hidden"} onSubmit={handleSubmit}>
          <h2>Leave a comment</h2>
          <label htmlFor="content">Type comment</label>
          <textarea
            name="content"
            id="comment"
            placeholder="Write here..."
            ref={textareaRef}
            value={commentFormData.content}
            onChange={handleInputChange}
            required
          ></textarea>
          <div>
            <button className={`btn green ${loading ? "disabled" : ""}`} disabled={loading}>
              Post Comment
            </button>
          </div>
        </form>
      </div>
    );

    function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      setCommentFormData({ content: e.target.value });
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setLoading(true);
      if (!commentFormData.content) return;
      myApi
        .post(`/api/stories/${story._id}/comments`, {
          content: commentFormData.content,
        })
        .then((res) => {
          setCommentFormData({ content: "" });
          const { author, comment } = res.data;
          const { _id, content, createdAt } = comment;
          const newComment: IComment = {
            _id,
            author,
            content,
            createdAt,
          };
          setStory({ ...story, comments: [...story.comments, newComment] }); // Add the new comment to the story object
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error adding comment", err);
          setLoading(false);
        });
    }
  }
}

function UserComment({ content, createdAt, author }: IComment) {
  return (
    <div>
      <div className="header">
        <div className="profile">
          <img
            className="avatar profile-pic"
            src={commenterPhoto}
            alt="author pic"
          />
          <span>{author.fullname}</span>
        </div>
        <div className="date">{getDate(createdAt)}</div>
      </div>
      <p>{content}</p>
    </div>
  );
}

interface IStory {
  _id: string;
  title: string;
  content: string;
  likes: {
    liker: string
  }[];
  author: {
    fullname: string;
    _id: string;
  };
  createdAt: Date;
  comments: IComment[];
}

interface IComment {
  _id: string;
  content: string;
  createdAt: Date;
  author: {
    fullname: string;
    _id: string;
  };
}

interface IStories {
  stories: IStory[];
}

interface ICommentFormData {
  content: string;
}
