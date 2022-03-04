import { HTMLMotionProps, motion } from 'framer-motion'
import * as React from 'react'

const PageTransition = (props: HTMLMotionProps<'div'>) => (
  <motion.div
    initial={{ y: -16, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    {...props}
  />
)

export default PageTransition
