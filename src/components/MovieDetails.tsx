
import { useParams } from 'react-router-dom';

import Details from './Details';


function MovieDetails() {
 
  const { id } = useParams<{ id: string }>();

  return (
    <div> <Details id={id || ''} type={'movie'}/></div>
  );

}

export default MovieDetails;