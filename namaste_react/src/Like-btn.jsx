import { useState } from "react";

function App() {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div>
      <button onClick={handleLike}>{liked ? "❤️" : "🤍"}</button>
    </div>
  );
}

export default App;
