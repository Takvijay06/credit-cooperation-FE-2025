interface ShimmerLoaderProps {
  rows?: number;
}

const ShimmerLoader: React.FC<ShimmerLoaderProps> = (props) => {
  const { rows } = props;
  const shimmerArray = Array.from({ length: rows || 5 });

  return (
    <div className="space-y-4">
      {shimmerArray.map((_, index) => (
        <div
          key={index}
          className="h-6 bg-gray-300 rounded animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default ShimmerLoader;
