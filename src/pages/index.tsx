/* eslint-disable @next/next/no-img-element */
// pages/index.js

import connectMongoDB from "../lib/mongoose";
import Product from "../models/Product";

export default function Home({ productsInfo }: any) {
  return (
    <div className="M-D-S">
      <img
        className="orange"
        src="/orange.png"
        alt="splash of color - orange"
      />
      <img className="pink" src="/pink.png" alt="splash of color - pink" />
      <h2 className="text-center my-10  text-3xl tracking-wider md:font-semibold ">
        OUR COLLECTION
      </h2>
      <div className="media-scroller">
        {productsInfo
          .filter((item: any) => {
            return item.weekend !== true;
          })
          .map((product: any) => (
            <div key={product.id} className="media-element text-center">
              <img src={product.img} alt="product-pic" />
              <p className="font-bold tracking-wide">{product.name}</p>
              <p>{product.description}</p>
              <p>{product.ingredients}</p>
              {/* <p>{product.price}</p> */}
              {/* {product.allergies && (
                <p className="text-sm italic">*{product.allergies}</p>
              )} */}
            </div>
          ))}
      </div>
      <h2 className="text-center my-10  text-3xl tracking-wider md:font-semibold ">
        WEEKEND SPECIALS
      </h2>
      <div className="media-scroller ">
        {/* <img
          className="orange"
          src="/orange.png"
          alt="splash of color - orange"
        /> */}
        {productsInfo
          .filter((item: any) => {
            return item.weekend === true;
          })
          .map((product: any) => (
            <div key={product.id} className="media-element text-center">
              <img src={product.img} alt="product-pic" />
              <p className="font-bold tracking-wide">{product.name}</p>
              <p>{product.description}</p>
              <p>{product.ingredients}</p>
              {/* <p>{product.price}</p> */}
              {/* {product.allergies && (
                <p className="text-sm italic">*{product.allergies}</p>
              )} */}
            </div>
          ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  await connectMongoDB();

  const products = await Product.find({});
  // console.log(products);

  const productsInfo = products.map((doc) => ({
    id: doc._id.toString(),
    name: doc.name.toUpperCase(),
    description: doc.description,
    ingridients: doc.ingridients,
    allergies: doc.allergies || "",
    price: doc.price,
    img: doc.img,
    weekend: doc.weekend,
  }));

  // console.log(productsInfo);

  return {
    props: {
      productsInfo,
    },
    revalidate: 86000, // seconds
  };
}
