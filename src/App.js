import React, {useState, useEffect} from 'react';
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleCat from "./components/SingleCat.js";
import SelectBreed from "./components/SelectBreed";
import Cats from "./components/Cats";
import {
    Switch,
    Route,
    useLocation
} from "react-router-dom";

function Home() {

    const location = useLocation();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemsBreed, setItemsBreed] = useState([]);

    const [selectValue, setSelectValue] = useState(location.state ? location.state : 'abys');

    const showMore = () => {
        setLimit(limit += 4);
    };


    let [limit, setLimit] = useState(4);

    const [itemsCats, setItemsCats] = useState([]);

    const handleSelectValue = (e) => {
        setSelectValue(e.target.value);
        console.log(e.target.value);
        setLimit(4);
        setItemsCats([]);

    };

    useEffect(() => {
        fetch("https://api.thecatapi.com/v1/breeds")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItemsBreed(result);

                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    if (error) {
        return <div className={'d-flex justify-content-center'}>Сталася помилка. Мяу. {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <div className="container">
                <h2 className='d-flex justify-content-center'>
                    Loading...
                </h2>
            </div>
        );
    } else {
        return (
            <div className="App">
                <h1 className='title'>Cat Browser</h1>
                <div className="container">
                    <SelectBreed selectValue={selectValue} handleSelectValue={handleSelectValue} items={itemsBreed}/>
                    <Cats breed={selectValue} limit={limit} showMore={showMore} itemsCats={itemsCats}
                          setItemsCats={setItemsCats}/>
                </div>
            </div>

        );
    }
}


function App() {

    return (
        <Switch>
            <Route exact={true} path={'/'}>
                <Home/>
            </Route>
            <Route path={'/:id'}>
                <SingleCat/>
            </Route>
        </Switch>
    );

}

export default App;