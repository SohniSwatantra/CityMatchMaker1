import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: string;
}

const getColorClass = (color?: string) => {
  switch (color) {
    case 'yellow': return 'bg-yellow-500';
    case 'green': return 'bg-green-500';
    case 'blue': return 'bg-blue-500';
    case 'indigo': return 'bg-indigo-500';
    case 'purple': return 'bg-purple-500';
    case 'pink': return 'bg-pink-500';
    default: return 'bg-primary';
  }
};

const ProgressBar = ({ progress, color, height = "h-2" }: ProgressBarProps) => {
  const colorClass = getColorClass(color);

  return (
    <div className={`rounded-full bg-gray-200 overflow-hidden ${height}`}>
      <motion.div
        className={`${colorClass} h-full rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};

export default ProgressBar;
