interface SeparatorTrapezoidProps {
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

const SeparatorTrapezoid = ({
  className = "",
  strokeColor = "black",
  strokeWidth = 1,
}: SeparatorTrapezoidProps) => {
  return (
    <div className={`absolute top-0 right-0 h-full w-[30%] ${className}`}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="100"
          y1="0"
          x2="0"
          y2="100"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  );
};

export default SeparatorTrapezoid;
