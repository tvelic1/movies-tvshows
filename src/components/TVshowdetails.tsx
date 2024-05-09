
import {useParams } from 'react-router-dom';
import '../css/MovieDetails.css';

import Details from './Details';

function TVshowdetails() {


  const { id } = useParams<{ id: string }>();

  return (
    <div> <Details id={id || ''} type={'tv'}/></div>
  );

}


export default TVshowdetails