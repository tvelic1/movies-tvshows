import React from 'react';
import {useParams } from 'react-router-dom';
import '../css/MediaDetails.css';
import Details from './Details';

function TVshowdetails() {

  const { id } = useParams<{ id: string }>();

  return (
    <div> <Details id={id || ''} type={'tv'}/></div>
  );

}


export default TVshowdetails