import React from 'react';


function BtnShowMore(props) {

        return (
            <div>
            {props.catsArray !== props.prevCount ?  <button onClick={props.showMore} className='show-more btn btn-success'> Show more </button> : ''}
            </div>

        );

}

export default BtnShowMore;
