import { createContext, useState } from "react";
import CreateUrl from "./components/CreateUrl";
import ShowUrls from "./components/ShowUrls";
import { URLContextType, UrlType } from "../types";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

export const UrlContext = createContext({} as URLContextType);

function App() {
  const [urls, setUrls] = useState({} as UrlType[]);
  return (
    <UrlContext.Provider value={{ urls, setUrls }}>
      <div className="min-h-screen w-full flex flex-col items-center bg-bodyBg">
        <Navbar />
        {/* <CreateUrl /> */}
        {/* <ShowUrls /> */}

        <Routes>
          <Route path="/" element={<CreateUrl />} />
          <Route path="show-urls" element={<ShowUrls />} />
        </Routes>
      </div>
    </UrlContext.Provider>
  );
}

export default App;
