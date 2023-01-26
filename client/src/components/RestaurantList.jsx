import { useEffect, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants);
            } catch (error) {
                console.log(error);
            }
        };                              

        fetchData();
        
    }, []);

    const handleUpdate = async (e, id) => {
        e.stopPropagation();
        try {
            navigate(`/restaurants/${e, id}/update`);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.restaurant_id !== id;
            }))
        } catch (error) {
            console.log(error);
        }
    }

    const handleRestaurantSelect = (id) => {
        navigate(`/restaurants/${id}`);
    } 

    return (
        <div className="list-group">
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(restaurant => (
                        <tr 
                            onClick={() => handleRestaurantSelect(restaurant.restaurant_id)} 
                            key={restaurant.restaurant_id}
                        >
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>Rating</td>
                            <td>
                            <button onClick={(e)=> handleUpdate(e, restaurant.restaurant_id)} className="btn btn-warning">
                                Update
                            </button>
                            </td>
                            <td>
                                <button onClick={(e) => handleDelete(e, restaurant.restaurant_id)} className="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList