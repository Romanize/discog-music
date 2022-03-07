import { Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { HomePage, MyCollectionPage, PageNotFound, SearchPage } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route element={<Layout />}>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/mycollection" element={<MyCollectionPage />} />
      </Route>
    </Routes>
  );
}

export default App;
