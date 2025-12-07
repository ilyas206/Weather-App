import { Provider } from "react-redux";
import Main from "./components/main";
import SearchBar from "./components/searchBar";
import Wallpaper from "./components/wallpaper";
import { store } from "./app/store";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Wallpaper/>
        <SearchBar/>
        <Main/>
      </Provider>
    </>
  );
}
