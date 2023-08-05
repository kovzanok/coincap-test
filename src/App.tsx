import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./components/Layout";
import Main from "./pages/Main";
import Crypto from "./pages/Crypto";
import  PageProvider  from "./providers/PageProvider";

function App() {
  return (
    <PageProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Main />} />
            <Route path='/:id' element={<Crypto />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PageProvider>
  );
}

export default App;
