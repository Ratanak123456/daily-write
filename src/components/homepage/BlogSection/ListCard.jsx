import { useState, useEffect } from 'react';
import HomepageCard from '../../Card/HomepageCard';
import SkeletonCard from '../../Card/Skeleton';

export default function ListCard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/v100/blogs');
        const result = await response.json();
        setData(result.data.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <SkeletonCard/>;
  if (error) return <div>Error: {error}</div>;
  if (data.length === 0) return <div>No blogs available</div>;

  return (
    <>
      {data.map((item) => (
        <HomepageCard
          key={item.uuid}
          title={item.title}
          description={item.content}
          image={item.thumbnailUrl}
        />
      ))}
    </>
  );
}
