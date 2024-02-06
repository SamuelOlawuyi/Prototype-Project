// import NavBar from "../../Navbar/NavBar";
// import "./CreateStory.css";
// import { useState, useEffect } from "react";
// import myApi from "../../../api.config";
// import Loading from "../../../pages/loading/Loading";
// import { useNavigate } from "react-router-dom";


// export default function EditStory() {
//   const [loading, setLoading] = useState(true);
//   const [apiStatus, setApiStatus] = useState<number | undefined>(undefined);
//   const [formData, setFormData] = useState<FormData>({
//     title: "",
//     content: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     myApi
//       .get("/")
//       .then((res) => {
//         setApiStatus(res.status);
//       })
//       .catch((err) => {
//         if (!err.response) setApiStatus(500);
//         else setApiStatus(err.response.status);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     myApi
//       .post("/api/stories", {
//         title: formData.title,
//         content: formData.content,
//       })
//       .then((res) => {
//         console.log("Story posted successfully", res.data);
//         navigate(`/stories/${res.data.id}`);
//       })
//       .catch((err) => {
//         console.error("Error posting story:", err);
//       });
//   };

//   if (loading) return <Loading />;

//   if (apiStatus !== undefined && apiStatus !== 200) {
//     // Handle API error
//     if (apiStatus === 401) return <h1>Unauthorized</h1>;
//     if (apiStatus === 403) return <h1>Forbidden</h1>;
//     if (apiStatus === 404) return <h1>Not Found</h1>;
//     else return <h1>Server Error</h1>;
//   }

//   return (
//     <div className="Create-story">
//       <NavBar />
//       <div className="container">
//         <div className="story-title">
//           <div>
//             <h1>Write an Article</h1>
//           </div>
//           <svg
//             className="icon-clear"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
//               fill="#757575"
//             />
//           </svg>
//         </div>

//         <form className="word-form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Title"
//             name="title"
//             value={formData.title}
//             onChange={(e) =>
//               setFormData({ ...formData, title: e.target.value })
//             }
//           />
//           <textarea
//             placeholder="Write here..."
//             value={formData.content}
//             onChange={(e) =>
//               setFormData({ ...formData, content: e.target.value })
//             }
//           ></textarea>
//           <div className="add-photo">
//             <input id="file" placeholder="Add photo" type="file" multiple />
//             <label htmlFor="file">Add more photo</label>
//           </div>
//           <div className="word-buttons">
//             <button className="btn grey cancel">Cancel</button>
//             <button className="btn green" type="submit">Publish</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// interface FormData {
//   title: string;
//   content: string;
// }
