import { motion } from "framer-motion";
export default function TypeWriter({ text }: { text: string }) {
  const splitText = text.split(" ");

  return (
    <div className="App">
      {splitText.map((el, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: i / 10,
          }}
          key={i}
        >
          {el}{" "}
        </motion.span>
      ))}
    </div>
  );
}
