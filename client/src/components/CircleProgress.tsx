import { motion } from "framer-motion";

interface CircleProgressProps {
  percentage: number;
}

const CircleProgress = ({ percentage }: CircleProgressProps) => {
  // Calculate the circumference
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate the stroke-dasharray offset based on percentage
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-[200px] h-[200px] mx-auto mb-8 relative">
      <svg viewBox="0 0 36 36" className="w-full h-full">
        <path
          className="circle-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="3"
        />
        <motion.path
          className="circle-fill"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="3"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeDasharray={circumference}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-5xl font-bold text-primary">{percentage}%</div>
        <div className="text-gray-500">Match</div>
      </div>
    </div>
  );
};

export default CircleProgress;
