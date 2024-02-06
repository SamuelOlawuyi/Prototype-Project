// Stories Listing Page for users and guests
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import myApi from "../../api.config";
import NavBar from "../../components/Navbar/NavBar";
import "./Stories.css";
import Categories from "../../components/categories/Categories";
import { Link } from "react-router-dom";
import storyPic from "../../assets/images/Rectangle 12 (1).png";
import { getDate, readingSpeed, trimContent } from "../../utils/helper";
import commentIcon from "../../assets/images/messageicon.png";
import likeIcon from "../../assets/images/thumbup.png";
import Footer from "../../components/Footer/Footer";
import Subscribe from "../../components/DecaSubscribe/Subscribe";
import CreateSpaceform from "../../components/modals/createSpace/CreateSpace";

export default function Stories() {
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<number | undefined>(undefined);
  const [stories, setStories] = useState([]);

  const [spaceModal, spaceModalVisible] = useState(false);

  const toggleSpaceModal = () => {
    spaceModalVisible(!spaceModal);
  };

  useEffect(() => {
    myApi
      .get("/api/stories")
      .then((res) => {
        setApiStatus(res.status);
        setStories(res.data.stories);
      })
      .catch((err) => {
        if (!err.response) setApiStatus(500);
        else setApiStatus(err.response.status);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  if (apiStatus !== undefined && apiStatus !== 200) {
    // Handle API error
    if (apiStatus === 401) return <h1>Unauthorized</h1>;
    if (apiStatus === 403) return <h1>Forbidden</h1>;
    if (apiStatus === 404) return <h1>Not Found</h1>;
    else return <h1>Server Error</h1>;
  }

  const storiesList = stories.map((data) => {
    const { story, comments, likes } = data;
    const { _id, title, content, author, createdAt } = story;
    return (
      <Story
        _id={_id}
        title={title}
        author={author}
        content={content}
        createdAt={createdAt}
        key={_id}
        comments={comments}
        likes={likes}
      />
    );
  });

  return (
    <>
      <NavBar />
      <Warning />
      <div className="Stories">
        <div className="container">
          {/* spaces button */}
          <div className="Categories">
            {spaceModal && <CreateSpaceform setOpenModal={spaceModalVisible} />}
            <div className="Space_Categories" onClick={toggleSpaceModal}>
              <img src="/src/assets/images/users.png" alt="SpacesIcon" />
              <h4>Spaces</h4>
            </div>
            <Categories />
          </div>
          <div>{storiesList}</div>
        </div>
        <Subscribe />
        <Footer />
      </div>
    </>
  );
}

export function Warning() {
  const [user, setUser] = useState(false);
  const [dummyLoading, setDummyLoading] = useState(true);
  useEffect(() => {
    myApi
      .get("/api/users/me")
      .then(() => {
        setUser(true);
      })
      .catch(() => {
        setUser(false);
      })
      .finally(() => setDummyLoading(false));
  }, []);

  if (dummyLoading) return <></>;

  return (
    <>
      <div className={`warning ${user ? "hidden" : ""}`}>
        <p>
          Your view is limited. <a href="/login">Login</a> to get full access.
        </p>
      </div>
    </>
  );
}

function Story({ _id, title, content, author, comments, createdAt, likes }: IStory) {
  content = trimContent(content, 50);
  return (
    <div className="story" key={_id}>
      <div>
        <div className="header">
          <img src={storyPic} alt="story image" />
          <div>
            <h2>{title}</h2>
            <p>
              <span>{getDate(createdAt)}</span>
              <span>{readingSpeed(content)} min read</span>
              <span>
                <img src={commentIcon} alt="comments" />
                <span>{comments.toString()}</span>
              </span>
              <span>
                <img src={likeIcon} alt="likes" />
                <span>{likes}</span>
              </span>
            </p>
            <p>Author - {author.fullname}</p>
          </div>
        </div>
        {content.length < 200 ? (
          <div className="short-article">{content}</div>
        ) : (
          <div>{content}</div>
        )}
      </div>
      <div className="button">
        <Link to={`/stories/${_id}`}>
          <button className="btn green">Continue Reading</button>
        </Link>
      </div>
    </div>
  );
}


interface IStory {
  _id: string;
  title: string;
  content: string;
  likes: string;
  author: {
    fullname: string;
    _id: string;
  };
  createdAt: Date;
  comments: {
    _id: string;
    content: string;
    createdAt: Date;
    author: {
      fullname: string;
      _id: string;
    };
  }[];
}