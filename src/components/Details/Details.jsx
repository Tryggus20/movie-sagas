import { useSelector, useDispatch } from "react-redux"
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';// TODO: use to go back home

export default function Details () {
    const dispatch = useDispatch();
    const history = useHistory(); //TODO: use to go back to home
    const movies = useSelector(store => store.movies);
    const genres = useSelector(store => store.genres);

    console.log("I am movies", movies);
    console.log("I am genres", genres);
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({ type: 'FETCH_GENRES'}); //not working yet
        console.log("I am movies", movies);
        console.log("I am genres", genres);

    }, []);
const movieStore = useSelector(store => store.movies)
function goBack() {
    history.push("/");

}


    return  (<div>
        <button onClick={goBack} >Go Back</button>
        <p>I am a detail</p>
        
        </div>)
}