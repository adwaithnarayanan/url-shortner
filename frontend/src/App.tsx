import CreateUrl from "./components/CreateUrl";
import ShowUrls from "./components/ShowUrls";

function App() {
  return (
    <div className="min-h-screen w-full bg-body_Bg flex flex-col items-center">
      <CreateUrl />
      <ShowUrls />
    </div>
  );
}

export default App;
