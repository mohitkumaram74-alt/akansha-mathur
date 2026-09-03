import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ResturentManu() {
  const { resId } = useParams();

  const [menu, setMenu] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  async function fetchMenu() {
    try {
      const response = await fetch(
        `https://corsproxy.io/?https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=28.45970&lng=77.02820&carousel=true&third_party_vendor=1
`,
      );

      console.log("Status:", response.status);

      const text = await response.text();

      console.log(text);
    } catch (error) {
      console.log(error);
    }
  }
  if (menu === null) {
    return <h1>Loading...</h1>;
  }
  console.log(json);
  return (
    <div>
      <h1>Restaurant ID: {resId}</h1>
      <pre>{JSON.stringify(menu, null, 2)}</pre>
    </div>
  );
}
