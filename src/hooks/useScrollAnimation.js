import { useEffect, useRef, useState } from 'react';
import { useInView, useAnimation } from 'framer-motion';

/**
 * Custom hook for scroll-triggered animations with session persistence.
 * @param {Object} options - Configuration options
 * @param {boolean} options.once - Whether to trigger only once while mounted (default: true)
 * @param {number} options.amount - Threshold of element visibility (0 to 1, default: 0.3)
 * @param {string} options.margin - Margin for intersection observer (default: '0px')
 * @param {string} options.id - Unique ID to persist animation state in sessionStorage
 */
export const useScrollAnimation = (options = {}) => {
  const {
    once = true,
    amount = 0.3,
    margin = '0px',
    id = null
  } = options;

  const controls = useAnimation();
  const ref = useRef(null);

  // Initialize state from sessionStorage if ID is provided
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined' && id) {
      return sessionStorage.getItem(`animated_${id}`) === 'true';
    }
    return false;
  });

  const isInView = useInView(ref, { once, amount, margin });

  useEffect(() => {
    // If already visible (from session storage), ensure controls are set
    if (isVisible) {
      controls.set('visible');
      return;
    }

    // Trigger animation when in view
    if (isInView) {
      controls.start('visible');
      setIsVisible(true);
      if (id) {
        sessionStorage.setItem(`animated_${id}`, 'true');
      }
    }
  }, [controls, isInView, id, isVisible]);

  return { 
    controls, 
    ref, 
    isInView: isVisible || isInView,
    alreadyAnimated: isVisible 
  };
};

/**
 * Common animation variants for reuse across components
 */
export const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  fadeInUp: {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  },
  fadeInScale: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  },
  staggerItem: {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 12, delay: i * 0.1 }
    })
  }
};

/**
 * Card hover animation variants
 */
export const cardHoverVariants = {
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.15)',
    transition: { type: 'spring', stiffness: 400, damping: 15 }
  }
};

/**
 * Icon animation variants
 */
export const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 200, damping: 15 }
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: { type: 'spring', stiffness: 400, damping: 10 }
  }
};

/**
 * Background blob animation config
 */
export const blobAnimation = {
  scale: [1, 1.2, 1],
  transition: {
    duration: 15,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};
