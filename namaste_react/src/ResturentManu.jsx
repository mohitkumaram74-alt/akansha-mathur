import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ResturentManu() {
  const { resId } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});

  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/swiggy-api/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.45970&lng=77.02820&restaurantId=${resId}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();

        if (result.statusCode !== 0 || !result.data) {
          throw new Error("Restaurant menu data nahi mila.");
        }

        const cards = result.data.cards || [];

        const restaurantCard = cards.find((item) => item?.card?.card?.info);

        const restaurantInfo = restaurantCard?.card?.card?.info;

        const regularCards =
          cards.find((item) => item?.groupedCard?.cardGroupMap?.REGULAR?.cards)
            ?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

        const items = regularCards.flatMap((item) => {
          const card = item?.card?.card;

          if (card?.itemCards) {
            return card.itemCards.map((food) => food.card.info);
          }

          if (card?.categories) {
            return card.categories.flatMap((category) =>
              (category.itemCards || []).map((food) => food.card.info),
            );
          }

          return [];
        });

        setRestaurant(restaurantInfo || null);
        setMenuItems(items);
      } catch (err) {
        console.error("Menu error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, [resId]);

  const updateCart = (id, change) => {
    setCart((prev) => {
      const quantity = (prev[id] || 0) + change;
      const next = { ...prev };

      if (quantity <= 0) {
        delete next[id];
      } else {
        next[id] = quantity;
      }

      return next;
    });
  };

  const getPrice = (item) => {
    const price = item.price ?? item.defaultPrice;
    return price != null ? price / 100 : null;
  };

  const getImage = (item) => {
    if (!item.imageId) return null;

    return `https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`;
  };

  const totalItems = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );

  const totalPrice = menuItems.reduce((sum, item) => {
    const price = getPrice(item) ?? 0;
    return sum + price * (cart[item.id] || 0);
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 p-6">
        <div className="mx-auto max-w-5xl animate-pulse space-y-5">
          <div className="h-44 rounded-3xl bg-white shadow-sm" />
          <div className="h-8 w-40 rounded bg-orange-100" />
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-48 rounded-2xl bg-white" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orange-50 p-5">
        <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
          <div className="text-5xl">😕</div>
          <h2 className="mt-4 text-xl font-bold">Menu load nahi hua</h2>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        Restaurant details nahi mile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf5] pb-28 text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-orange-100 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-2xl">
              🍽️
            </div>

            <div>
              <h1 className="text-xl font-extrabold">
                Cook<span className="text-orange-500">ing.</span>
              </h1>
              <p className="text-xs text-gray-500">Discover delicious food</p>
            </div>
          </div>

          <div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600">
            🛒 {totalItems} items
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-9">
        {/* Restaurant details */}
        <section className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">
          <div className="h-2 bg-gradient-to-r from-orange-500 via-orange-400 to-amber-200" />

          <div className="p-5 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-5xl">
                🥘
              </div>

              <div className="flex-1">
                <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                  🍃 RESTAURANT MENU
                </span>

                <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {restaurant.name}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {restaurant.cuisines?.join(" • ")}
                </p>

                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-lg bg-green-600 px-3 py-2 font-bold text-white">
                    ★{" "}
                    {restaurant.avgRatingString ||
                      restaurant.avgRating ||
                      "N/A"}
                  </span>

                  <span className="rounded-lg bg-gray-100 px-3 py-2 font-semibold">
                    {restaurant.costForTwoMessage || "Price varies"}
                  </span>

                  <span className="rounded-lg bg-gray-100 px-3 py-2">
                    ID: {resId}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu heading */}
        <section className="mb-6 mt-9 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
              Made with love
            </p>

            <h2 className="mt-1 text-3xl font-extrabold">Our Menu</h2>

            <p className="mt-2 text-sm text-gray-500">
              Choose your favourites and add them to your cart.
            </p>
          </div>

          <span className="rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold">
            🍴 {menuItems.length} items
          </span>
        </section>

        {/* Menu items */}
        {menuItems.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-gray-500">
            Menu items nahi mile. API ka menu structure check karna hoga.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {menuItems.map((item, index) => {
              const price = getPrice(item);
              const quantity = cart[item.id] || 0;
              const image = getImage(item);

              return (
                <article
                  key={item.id || `${item.name}-${index}`}
                  className="group flex min-w-0 gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg sm:gap-5 sm:p-5"
                >
                  {/* Food details */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-4 w-4 items-center justify-center border border-green-600">
                        <span className="h-2 w-2 rounded-full bg-green-600" />
                      </span>

                      {index < 2 && (
                        <span className="text-xs font-bold text-orange-500">
                          ✦ Popular choice
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold leading-snug sm:text-lg">
                      {item.name}
                    </h3>

                    <p className="mt-2 font-extrabold text-gray-900">
                      {price != null ? `₹${price}` : "Price unavailable"}
                    </p>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
                      {item.description || "Delicious food, freshly prepared."}
                    </p>

                    {/* Add and quantity controls */}
                    <div className="mt-4">
                      {quantity === 0 ? (
                        <button
                          disabled={price == null}
                          onClick={() => updateCart(item.id, 1)}
                          className="rounded-lg border border-green-600 bg-white px-6 py-2 text-sm font-extrabold text-green-700 shadow-sm transition hover:bg-green-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          ADD +
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-5 rounded-lg border border-green-600 px-3 py-1.5 font-bold text-green-700">
                          <button
                            onClick={() => updateCart(item.id, -1)}
                            aria-label={`Remove ${item.name}`}
                          >
                            −
                          </button>

                          <span>{quantity}</span>

                          <button
                            onClick={() => updateCart(item.id, 1)}
                            aria-label={`Add ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Food image */}
                  <div className="w-28 shrink-0 sm:w-36">
                    <div className="relative">
                      {image ? (
                        <img
                          src={image}
                          alt={item.name}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling.style.display =
                              "flex";
                          }}
                          className="aspect-square w-full rounded-xl object-cover"
                        />
                      ) : null}

                      <div
                        style={{ display: image ? "none" : "flex" }}
                        className="aspect-square w-full items-center justify-center rounded-xl bg-orange-50 text-5xl"
                      >
                        🍛
                      </div>

                      {quantity > 0 && (
                        <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white shadow">
                          {quantity}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* Floating cart */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-30 mx-auto max-w-2xl">
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-green-700 p-4 text-white shadow-2xl">
            <div>
              <p className="font-extrabold">
                {totalItems} item{totalItems > 1 ? "s" : ""} added
              </p>
              <p className="mt-1 text-sm text-green-100">
                Total: ₹{totalPrice}
              </p>
            </div>

            <button
              onClick={() => alert(`Cart total: ₹${totalPrice}`)}
              className="shrink-0 rounded-xl bg-white px-5 py-3 font-extrabold text-green-700 transition hover:bg-green-50"
            >
              View Cart →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
