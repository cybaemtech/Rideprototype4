import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import riderImage from "@assets/generated_images/Auth_page_illustration_rider_5c86e7a7.png";
import driverImage from "@assets/generated_images/Auth_page_illustration_driver_1f695133.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"rider" | "driver">("rider");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="min-h-screen flex flex-col md:flex-row">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-accent p-12 items-center justify-center"
      >
        <div className="max-w-md">
          <img
            src={activeTab === "rider" ? riderImage : driverImage}
            alt={`${activeTab} illustration`}
            className="w-full h-auto"
          />
        </div>
      </motion.div>

      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          <Link href="/">
            <Button variant="ghost" className="mb-6" data-testid="button-back-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Car className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">RideNow</span>
            </div>

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

              <TabsContent value="rider">
                <Card>
                  <CardHeader>
                    <CardTitle>Welcome back, Rider!</CardTitle>
                    <CardDescription>
                      Sign in to book your next ride
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="rider-email">Email</Label>
                        <Input
                          id="rider-email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          data-testid="input-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rider-password">Password</Label>
                        <Input
                          id="rider-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          data-testid="input-password"
                        />
                      </div>
                      <Button type="submit" className="w-full" data-testid="button-login-submit">
                        Sign In
                      </Button>
                      <p className="text-sm text-center text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href="/auth/signup">
                          <a className="text-primary hover:underline" data-testid="link-signup">
                            Sign up
                          </a>
                        </Link>
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="driver">
                <Card>
                  <CardHeader>
                    <CardTitle>Welcome back, Driver!</CardTitle>
                    <CardDescription>
                      Sign in to start accepting rides
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="driver-email">Email</Label>
                        <Input
                          id="driver-email"
                          type="email"
                          placeholder="driver@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          data-testid="input-driver-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="driver-password">Password</Label>
                        <Input
                          id="driver-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          data-testid="input-driver-password"
                        />
                      </div>
                      <Button type="submit" className="w-full" data-testid="button-driver-login-submit">
                        Sign In
                      </Button>
                      <p className="text-sm text-center text-muted-foreground">
                        Not a driver yet?{" "}
                        <Link href="/auth/driver/signup">
                          <a className="text-primary hover:underline" data-testid="link-driver-signup">
                            Become a driver
                          </a>
                        </Link>
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
