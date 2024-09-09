
import { motion } from "framer-motion"

const Loading = () => {
  return (
    <div>
        <motion.div 
        animate={{rotate:360}}
        transition={{repeat: Infinity, duration:1}}
        style={{
           width: 100,
           height: 100,
           border: "5px solid #25d366",
            borderTop: "5px solid #FFD700",
            borderRadius: "50%"
        }} />
    </div>
  )
}
export default Loading