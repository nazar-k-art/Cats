import React, {useRef, useEffect} from 'react';
import {Link} from "react-router-dom";
import BtnShowMore from "./ShowMore";
import '../style/Cats.scss'


function Cats(props) {

    useEffect(() => {
        fetchSingleBreedData();

    }, [props.breed, props.limit]);

    const fetchSingleBreedData = async () => {
        const fetchItemBreed = await fetch('https://api.thecatapi.com/v1/images/search?limit=' + props.limit + '&breed_id=' + props.breed + '&order=ESC&');
        const itemsCats = await fetchItemBreed.json();
        props.setItemsCats(itemsCats);

    };

    //
    // Figure when hide Show more btn
    //

    //Use a useRef hook to find previous state of Cats array
    //And compare to Cats length

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }


    let catsArray = props.itemsCats.length;

    let prevCount = usePrevious(props.itemsCats.length);

    return (

        <div className={'cats'}>

            <div className={'row'}>
                {props.itemsCats.map(item => (
                    <div className={'col-lg-3'} key={item.id}>
                        <div className={'card'}>
                            <div className="card-img">
                                <img className={'w-100'} src={item.url} alt=""/>
                            </div>
                            <div className={'card-body'}>
                                <Link className={'btn btn-primary'} to={`${item.id}`}>Show details</Link>
                            </div>
                        </div>

                    </div>
                ))}

            </div>
            <div className="">
                <BtnShowMore catsArray={catsArray} prevCount={prevCount} showMore={props.showMore}/>
            </div>
        </div>
    );
}

export default Cats;
