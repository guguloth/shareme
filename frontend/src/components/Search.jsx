import React,{ useEffect, useState } from 'react';
import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import Spinner from './Spinner';
import { feedQuery, searchQuery } from '../utills/data';

const Search = ({ searchTerm }) => {
  const [pins, setPins ] = useState(null);
  const [loding, setLoading] = useState(false);

  useEffect(() =>{
    if(searchTerm){
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
    }else{
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
    }
  },[searchTerm])

  return (
    <div>
      {loding && <Spinner message="searching for pins" /> }
      {pins?.length !== 0 && <MasonryLayout pins={pins} /> }
      {pins?.length === 0 && searchTerm !== '' && !loding && (
        <div className='mt-10 text-center text-xl'>No pins found</div>
      )}
    </div>
  )
}

export default Search
