import Header from "./components/Header";
import Footer from "./components/Footer";
import {Box} from "@mui/material";
import Movies from "./components/Movies";

export default function Home() {
  return (
    <Box sx={{ display:"flex", flexDirection: "column", minHeight: "100vh"}}>
      <Header />
      <Box sx={{ flex: 1}}>
      <Movies />
      </Box>
      <Footer />
    </Box>
  );
}
