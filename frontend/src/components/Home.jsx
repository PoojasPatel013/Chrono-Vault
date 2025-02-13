import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import Dialog from "./ui/Dialog"
import Button from "./ui/Button"
import Login from "./Login"
import SignUp from "./SignUp"

const images = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ldqo59BGwhjTn28WjwG4E9fPEqKoTa.png", // Time capsule box
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mWtFMQE3sNaHXjf6W3370yeD9TR2wP.png", // Time capsule container
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TXirYyTOoevQl5m4BTepLM1o9iBDsY.png", // Therapy illustration
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qrLkgC7ZViupyEMAvpCT5rAlN1rzzd.png", // Therapy session
  "https://images.unsplash.com/photo-1517093602195-b40af9688b46?w=800&auto=format", // Peaceful meditation
  "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format", // Journal writing
  "https://thesaltfoundation.org.au/wp-content/uploads/2024/03/7186c814-44ea-4e90-b043-d03f60a9bb23.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3GbHa9y8zjVj3GR2vMSL6Z2x07OFTBr95_g&s",
]

const Home = () => {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState("login")
  const controls = useAnimation()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const handleAuthClick = (mode) => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            x: [-20, -40, -60, -80, -100],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="flex gap-4 opacity-70">
            {[...images, ...images].map((src, index) => (
              <div key={index} className="relative min-w-[300px] h-[200px] rounded-lg overflow-hidden film-frame">
                <img
                  src={src || "/placeholder.svg"}
                  alt="Gallery"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto bg-black/70 p-8 rounded-lg backdrop-blur-sm">
          <motion.h1 variants={itemVariants} className="text-6xl font-bold mb-6">
            Welcome to Chronovault
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl mb-8 text-gray-200">
            Store your memories, connect with like-minded individuals, and embark on a journey of self-discovery.
          </motion.p>
          <motion.div variants={itemVariants} className="space-x-4">
            <Button
              onClick={() => handleAuthClick("signup")}
              className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full text-lg font-semibold"
            >
              Sign Up
            </Button>
            <Button
              onClick={() => handleAuthClick("login")}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full text-lg font-semibold"
            >
              Login
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div ref={ref} style={{ opacity }} className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div style={{ y }} className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold">Find Peace Through AI Therapy</h2>
              <p className="text-gray-400 text-lg">
                Experience a revolutionary approach to mental wellness with our AI-powered therapy sessions. Available
                24/7, completely confidential, and personalized to your needs.
              </p>
              <div className="space-y-4">
                <Button
                  onClick={() => handleAuthClick("signup")}
                  className="w-full bg-white text-black hover:bg-gray-200"
                >
                  Start Your Journey
                </Button>
                <Button
                  onClick={() => handleAuthClick("signup")}
                  variant="outline"
                  className="w-full border-2 border-white text-white hover:bg-white/10"
                >
                  Book Your Next Therapy Session
                </Button>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold">Preserve Your Precious Memories</h2>
              <p className="text-gray-400 text-lg">
                Create digital time capsules to store your memories, thoughts, and experiences. Share them with future
                you or connect with others on similar paths.
              </p>
              <Button
                onClick={() => handleAuthClick("signup")}
                variant="outline"
                className="w-full border-2 border-white text-white hover:bg-white/10"
              >
                Create Time Capsule
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
  className="absolute inset-0 z-0"
  animate={{
    x: [-20, -40, -60, -80, -100],
  }}
  transition={{
    duration: 10, // Reduced duration for faster animation
    repeat: Number.POSITIVE_INFINITY,
    ease: "linear",
  }}
>
  <div className="flex gap-4 opacity-70">
    {[...images, ...images].map((src, index) => (
      <div key={index} className="relative min-w-[500px] h-[400px] rounded-lg overflow-hidden film-frame">
        <img
          src={src || "/placeholder.svg"}
          alt="Gallery"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
      </div>
    ))}
  </div>
</motion.div>

      <style jsx>{`
        .film-frame {
          position: relative;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
          transform: perspective(1000px) rotateY(5deg);
          transition: transform 0.3s ease;
        }
        
        .film-frame::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 20px;
          background: repeating-linear-gradient(
            90deg,
            rgba(0,0,0,0.2) 0px,
            rgba(0,0,0,0.2) 10px,
            transparent 10px,
            transparent 20px
          );
        }
        
        .film-frame::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 20px;
          background: repeating-linear-gradient(
            90deg,
            rgba(0,0,0,0.2) 0px,
            rgba(0,0,0,0.2) 10px,
            transparent 10px,
            transparent 20px
          );
        }
      `}</style>
    </div>
  )
}

export default Home

