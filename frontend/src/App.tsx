import RouteControler from "./Routes/RouteControler";
import Footer from "./components/Footer";
import Headers from "./components/Headers";
import { UseTheme } from "./context/ContextProvider";

export default function App() {
  const { theme } = UseTheme();
  return (
    <div className={`${theme} bg-background text-foreground`}>
      <Headers />
      <RouteControler />
      <Footer />
    </div>
  );
}
