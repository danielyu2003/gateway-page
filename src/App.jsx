import { useState, useEffect } from "react";
import Markdown from "react-markdown";

function App() {
  const [userInput, setUserInput] = useState("");
  const [serverResponse, setServerResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userInput) {
      try {
        const response = await fetch("http://localhost:8000/api/recommend/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: userInput }),
        });

        const data = await response.json();
        setServerResponse(data.recommendation);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    console.log("Updated serverResponse:", serverResponse);
  }, [serverResponse]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(input) => setUserInput(input.target.value)}
        ></input>
        <br></br>
        <input type="submit"></input>
        <br></br>
        <output>
          <Markdown>{serverResponse}</Markdown>
        </output>
      </form>
    </div>
  );
}

export default App;
