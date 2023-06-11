const Image = (imageName: string) => {
  imageName = imageName.imageName ?? "lizard";
  const imagePath = `src/assets/images/${imageName}.jpg`;
  return (
    <img
      className="rounded px-2"
      height="120px"
      src={imagePath}
      alt={imageName}
    />
  );
};
export default Image;
