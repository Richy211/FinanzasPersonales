import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function KpiCard({ title, value = 0, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
      style={{
        background: "#e5e7eb",
        borderLeft: `5px solid ${color}`,
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}
    >
      <div
        style={{
          fontSize: "14px",
          color: "#6b7280",
          marginBottom: "5px"
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          color: color
        }}
      >
        <CountUp
          start={0}
          end={Number(value) || 0}
          duration={1.2}
          separator="."
          prefix="$"
        />
      </div>
    </motion.div>
  );
}