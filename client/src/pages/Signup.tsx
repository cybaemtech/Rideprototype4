import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, ArrowLeft, User, Mail, Phone, Lock, Car as CarIcon, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import riderImage from "@assets/generated_images/Auth_page_illustration_rider_5c86e7a7.png";
import driverImage from "@assets/generated_images/Auth_page_illustration_driver_1f695133.png";

export default function Signup() {
  const [, setLocation] = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"rider" | "driver">("rider");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    vehicleModel: "",
    vehicleNumber: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".signup-image", {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".signup-form", {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${activeTab} signup:`, formData);
    
    if (activeTab === "rider") {
      setLocation("/book-ride");
    } else {
      setLocation("/driver/dashboard");
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div ref={pageRef} className="min-h-screen flex flex-col md:flex-row">
      <motion.div
        className="signup-image hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-accent p-8 sm:p-12 items-center justify-center relative overflow-hidden"
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

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-background overflow-y-auto">
        <div className="w-full max-w-md py-4 sm:py-6 signup-form">
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
                  Rider Signup
                </TabsTrigger>
                <TabsTrigger value="driver" data-testid="tab-driver">
                  Driver Signup
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
                        <CardTitle>Join as a Rider</CardTitle>
                        <CardDescription>
                          Create your account to start booking rides
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSignup} className="space-y-4">
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Label htmlFor="rider-name" className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Full Name
                            </Label>
                            <Input
                              id="rider-name"
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={(e) => updateField("name", e.target.value)}
                              required
                              data-testid="input-name"
                            />
                          </motion.div>
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 }}
                          >
                            <Label htmlFor="rider-email" className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email
                            </Label>
                            <Input
                              id="rider-email"
                              type="email"
                              placeholder="you@example.com"
                              value={formData.email}
                              onChange={(e) => updateField("email", e.target.value)}
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
                            <Label htmlFor="rider-phone" className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              Phone Number
                            </Label>
                            <Input
                              id="rider-phone"
                              type="tel"
                              placeholder="+1 234 567 8900"
                              value={formData.phone}
                              onChange={(e) => updateField("phone", e.target.value)}
                              required
                              data-testid="input-phone"
                            />
                          </motion.div>
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 }}
                          >
                            <Label htmlFor="rider-password" className="flex items-center gap-2">
                              <Lock className="h-4 w-4" />
                              Password
                            </Label>
                            <Input
                              id="rider-password"
                              type="password"
                              placeholder="••••••••"
                              value={formData.password}
                              onChange={(e) => updateField("password", e.target.value)}
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
                            <Button type="submit" className="w-full" data-testid="button-signup-submit">
                              Create Account
                            </Button>
                          </motion.div>
                          <motion.p
                            className="text-sm text-center text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            Already have an account?{" "}
                            <Link href="/auth/login">
                              <a className="text-primary hover:underline" data-testid="link-login">
                                Sign in
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
                        <CardTitle>Join as a Driver</CardTitle>
                        <CardDescription>
                          Start earning by driving with RideNow
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSignup} className="space-y-4">
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Label htmlFor="driver-name" className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Full Name
                            </Label>
                            <Input
                              id="driver-name"
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={(e) => updateField("name", e.target.value)}
                              required
                              data-testid="input-driver-name"
                            />
                          </motion.div>
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 }}
                          >
                            <Label htmlFor="driver-email" className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email
                            </Label>
                            <Input
                              id="driver-email"
                              type="email"
                              placeholder="driver@example.com"
                              value={formData.email}
                              onChange={(e) => updateField("email", e.target.value)}
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
                            <Label htmlFor="driver-phone" className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              Phone Number
                            </Label>
                            <Input
                              id="driver-phone"
                              type="tel"
                              placeholder="+1 234 567 8900"
                              value={formData.phone}
                              onChange={(e) => updateField("phone", e.target.value)}
                              required
                              data-testid="input-driver-phone"
                            />
                          </motion.div>
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 }}
                          >
                            <Label htmlFor="vehicle-model" className="flex items-center gap-2">
                              <CarIcon className="h-4 w-4" />
                              Vehicle Model
                            </Label>
                            <Input
                              id="vehicle-model"
                              placeholder="Toyota Camry"
                              value={formData.vehicleModel}
                              onChange={(e) => updateField("vehicleModel", e.target.value)}
                              required
                              data-testid="input-vehicle-model"
                            />
                          </motion.div>
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Label htmlFor="vehicle-number" className="flex items-center gap-2">
                              <Hash className="h-4 w-4" />
                              Vehicle Number
                            </Label>
                            <Input
                              id="vehicle-number"
                              placeholder="ABC-1234"
                              value={formData.vehicleNumber}
                              onChange={(e) => updateField("vehicleNumber", e.target.value)}
                              required
                              data-testid="input-vehicle-number"
                            />
                          </motion.div>
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35 }}
                          >
                            <Label htmlFor="driver-password" className="flex items-center gap-2">
                              <Lock className="h-4 w-4" />
                              Password
                            </Label>
                            <Input
                              id="driver-password"
                              type="password"
                              placeholder="••••••••"
                              value={formData.password}
                              onChange={(e) => updateField("password", e.target.value)}
                              required
                              data-testid="input-driver-password"
                            />
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button type="submit" className="w-full" data-testid="button-driver-signup-submit">
                              Become a Driver
                            </Button>
                          </motion.div>
                          <motion.p
                            className="text-sm text-center text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            Already a driver?{" "}
                            <Link href="/auth/login">
                              <a className="text-primary hover:underline" data-testid="link-driver-login">
                                Sign in
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
