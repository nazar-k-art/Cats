
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import {
    useRouteMatch,
    useHistory
} from "react-router-dom";

function SingleCat() {

    const match = useRouteMatch();
    const history = useHistory();

    const [itemImg, setItemImg] = useState([]);
    const [itemBreed, setItemBreed] = useState([]);

    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://api.thecatapi.com/v1/images/${match.params.id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setItemImg(result);
                    setItemBreed(result.breeds[0]);
                },
                (error) => {
                    setError(error);
                }
            )
    }, []);

    const changeHistory = () => {
        history.push({
            pathname: '/',
            state: itemBreed.id
        });
    };

    if (error) {
        return <div className={'d-flex justify-content-center'}>Сталася помилка. Мяу. {error.message}</div>;
    }
    else {
        return (

            <div className="container">
                <div className='card' key={itemImg.id}>
                    <div className='card-header'>
                        <button className='btn btn-success' onClick={changeHistory}>Back</button>
                    </div>
                    <div className='card-img'>
                        <img className={'img-fluid'} src={itemImg.url} alt=""/>
                    </div>
                    <div className={'card-body'}>
                        <div className='breed'>Breed: {itemBreed.name}</div>
                        <div className='origin'>Country: {itemBreed.origin}</div>
                        <div className='temperament'>Temperament: {itemBreed.temperament}</div>
                        <div className='description'>{itemBreed.description}</div>
                    </div>
                </div>
            </div>

        );
    }


}

export default SingleCat;
