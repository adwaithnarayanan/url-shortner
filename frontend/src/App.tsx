import { createContext, useState } from "react";
import CreateUrl from "./components/CreateUrl";
import ShowUrls from "./components/ShowUrls";
import { URLContextType, UrlType } from "../types";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";

export const UrlContext = createContext({} as URLContextType);

function App() {
  const [urls, setUrls] = useState([] as UrlType[]);

  return (
    <UrlContext.Provider value={{ urls, setUrls }}>
      <div className="min-h-screen w-full flex flex-col items-center bg-bodyBg">
        {<Navbar />}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" element={<CreateUrl />} />
            <Route path="show-urls" element={<ShowUrls />} />
          </Route>{" "}
        </Routes>
        <div className="absolute bottom-0 right-1/2 translate-x-2/4">
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="light"
            transition={Bounce}
          />
        </div>
      </div>
    </UrlContext.Provider>
  );
}

export default App;
