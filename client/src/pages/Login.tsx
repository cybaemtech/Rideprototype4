import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, ArrowLeft, Mail, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import riderImage from "@assets/generated_images/Auth_page_illustration_rider_5c86e7a7.png";
import driverImage from "@assets/generated_images/Auth_page_illustration_driver_1f695133.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"rider" | "driver">("rider");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".login-image", {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".login-form", {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${activeTab} login:`, { email, password });
    
    if (activeTab === "rider") {
      setLocation("/book-ride");
    } else {
      setLocation("/driver/dashboard");
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen flex flex-col md:flex-row">
      <motion.div
        className="login-image hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-accent p-8 sm:p-12 items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="max-w-md relative z-10"
          >
            <img
              src={activeTab === "rider" ? riderImage : driverImage}
              alt={`${activeTab} illustration`}
              className="w-full h-auto drop-shadow-2xl"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-background">
        <div className="w-full max-w-md login-form">
          <Link href="/">
            <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
              <Button variant="ghost" className="mb-6" data-testid="button-back-home">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div
              className="flex items-center gap-2 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Car className="h-8 w-8 text-primary" />
              </motion.div>
              <span className="text-2xl font-bold">RideNow</span>
            </motion.div>

            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as "rider" | "driver")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="rider" data-testid="tab-rider">
                  Rider Login
                </TabsTrigger>
                <TabsTrigger value="driver" data-testid="tab-driver">
                  Driver Login
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="rider">
                  <motion.div
                    key="rider-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Welcome back, Rider!</CardTitle>
                        <CardDescription>
                          Sign in to book your next ride
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Label htmlFor="rider-email" className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email
                            </Label>
                            <Input
                              id="rider-email"
                              type="email"
                              placeholder="you@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              data-testid="input-email"
                            />
                          </motion.div>
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Label htmlFor="rider-password" className="flex items-center gap-2">
                              <Lock className="h-4 w-4" />
                              Password
                            </Label>
                            <Input
                              id="rider-password"
                              type="password"
                              placeholder="••••••••"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              data-testid="input-password"
                            />
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button type="submit" className="w-full" data-testid="button-login-submit">
                              Sign In
                            </Button>
                          </motion.div>
                          <motion.p
                            className="text-sm text-center text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            Don't have an account?{" "}
                            <Link href="/auth/signup">
                              <a className="text-primary hover:underline" data-testid="link-signup">
                                Sign up
                              </a>
                            </Link>
                          </motion.p>
                        </form>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="driver">
                  <motion.div
                    key="driver-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Welcome back, Driver!</CardTitle>
                        <CardDescription>
                          Sign in to start accepting rides
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Label htmlFor="driver-email" className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email
                            </Label>
                            <Input
                              id="driver-email"
                              type="email"
                              placeholder="driver@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              data-testid="input-driver-email"
                            />
                          </motion.div>
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Label htmlFor="driver-password" className="flex items-center gap-2">
                              <Lock className="h-4 w-4" />
                              Password
                            </Label>
                            <Input
                              id="driver-password"
                              type="password"
                              placeholder="••••••••"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              data-testid="input-driver-password"
                            />
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button type="submit" className="w-full" data-testid="button-driver-login-submit">
                              Sign In
                            </Button>
                          </motion.div>
                          <motion.p
                            className="text-sm text-center text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            Not a driver yet?{" "}
                            <Link href="/auth/driver/signup">
                              <a className="text-primary hover:underline" data-testid="link-driver-signup">
                                Become a driver
                              </a>
                            </Link>
                          </motion.p>
                        </form>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
