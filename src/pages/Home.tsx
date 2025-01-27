import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {apiToken, baseUrl} from '../modules/ApiLinks';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl, {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData(); // Call the async function
  }, []);

  console.log(data?.results, 'j');

  return (
    <>
      <div>
        {data?.results?.map((item, i) => {
          <>
            <div className='border-2 shadow-xl p-4'>{item?.title}</div>
          </>;
        })}
      </div>
    </>
  );
};

export default Home;
