const DetailedPage = ({ params }) => {
  console.log(params, "here are the params");
  return <h1>{params.slug}</h1>;
};
export default DetailedPage;
