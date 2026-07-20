import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";
import FoodCard from "../components/FoodCard";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await api.get("/menu");

      setMenu(response.data.data);
      setFilteredMenu(response.data.data);
    } catch (error) {
      toast.error("Unable to load menu.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);

    const filtered = menu.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredMenu(filtered);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <h2 className="mb-4 text-center">
        🍽 Our Menu
      </h2>

      <div className="row mb-4">

        <div className="col-md-6 mx-auto">

          <input
            type="text"
            className="form-control"
            placeholder="Search food..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />

        </div>

      </div>

      <div className="row">

        {filteredMenu.length > 0 ? (
          filteredMenu.map((item) => (
            <FoodCard
              key={item._id}
              item={item}
            />
          ))
        ) : (
          <h4 className="text-center">
            No menu items found.
          </h4>
        )}

      </div>

    </div>
  );
}

export default Menu;