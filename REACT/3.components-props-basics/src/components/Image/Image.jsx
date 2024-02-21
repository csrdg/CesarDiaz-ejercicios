const Image = ({ imageProp }) => {
  return (
    <>
      <p>Image from props</p>
      <img
        src={imageProp.src}
        alt={imageProp.alt}
        width={imageProp.style.width}
        height={imageProp.style.height}
      />
    </>
  );
};

export default Image;
