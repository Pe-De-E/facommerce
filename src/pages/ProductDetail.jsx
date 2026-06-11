import { useParams } from 'react-router';

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Product Detail</h2>
      <p> ID: {id}</p>
    </div>
  );
};

export default ProductDetail;
