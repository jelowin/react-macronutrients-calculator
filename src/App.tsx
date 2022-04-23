import { Container, Heading } from "@chakra-ui/react";
import Autocomplete from "./components/Autocomplete/index.js";

import "./App.css";

function App() {
  return (
    <Container maxW="1280px" centerContent>
      <Heading as="h1" mb={12} size="3xl">
        What you will eat today?
      </Heading>
      <Autocomplete />
    </Container>
  );
}

export default App;
