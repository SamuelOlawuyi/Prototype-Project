import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/signup-login/Login";
import Signup from "./pages/signup-login/Signup";
import Stories from "./pages/stories/Stories";
import StoryPage from "./pages/stories/Story";
import Spaces from "./pages/spaces/Spaces";
import Space from "./pages/spaces/Space";
import Question from "./pages/questions/Questions";
import Sso from "./pages/Sso";
import NotFound from "./pages/error/NotFound";
import UserProfile from "./pages/user/UserProfile";
// import CreateStory from "./components/modals/createStory/CreateStory";
// import { createContext } from "react";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:id" element={<StoryPage />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/spaces/:id" element={<Space />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/spaces/:id" element={<Space />} />
        <Route path="/questions" element={<Question />} />
        <Route path="/sso" element={<Sso />} />
        <Route path="/user/profile" element={<UserProfile/>} />
        {/* <Route path="/create-story" element={<CreateStory/>} /> */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}


// export const ThemeContext = createContext<{
//   theme: string;
//   toggleTheme: () => void;
// } | null>(null);