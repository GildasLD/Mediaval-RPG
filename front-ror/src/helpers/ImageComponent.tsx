const Image = (imageName) => {
  const finalImageName = imageName.imageName ?? "lizard";

  const imagePath = `src/assets/images/${finalImageName}.jpg`;
  return (
    <img
      className="rounded px-2"
      height="120px"
      src={imagePath}
      alt={finalImageName}
    />
  );
};
export default Image;
