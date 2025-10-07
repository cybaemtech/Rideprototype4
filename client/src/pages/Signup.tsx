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

export default function Signup() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"rider" | "driver">("rider");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    vehicleModel: "",
    vehicleNumber: "",
  });

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

      <div className="flex-1 flex items-center justify-center p-6 bg-background overflow-y-auto">
        <div className="w-full max-w-md py-6">
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
                  Rider Signup
                </TabsTrigger>
                <TabsTrigger value="driver" data-testid="tab-driver">
                  Driver Signup
                </TabsTrigger>
              </TabsList>

              <TabsContent value="rider">
                <Card>
                  <CardHeader>
                    <CardTitle>Join as a Rider</CardTitle>
                    <CardDescription>
                      Create your account to start booking rides
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="rider-name">Full Name</Label>
                        <Input
                          id="rider-name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          required
                          data-testid="input-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rider-email">Email</Label>
                        <Input
                          id="rider-email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          required
                          data-testid="input-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rider-phone">Phone Number</Label>
                        <Input
                          id="rider-phone"
                          type="tel"
                          placeholder="+1 234 567 8900"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          required
                          data-testid="input-phone"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rider-password">Password</Label>
                        <Input
                          id="rider-password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => updateField("password", e.target.value)}
                          required
                          data-testid="input-password"
                        />
                      </div>
                      <Button type="submit" className="w-full" data-testid="button-signup-submit">
                        Create Account
                      </Button>
                      <p className="text-sm text-center text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/auth/login">
                          <a className="text-primary hover:underline" data-testid="link-login">
                            Sign in
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
                    <CardTitle>Join as a Driver</CardTitle>
                    <CardDescription>
                      Start earning by driving with RideNow
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="driver-name">Full Name</Label>
                        <Input
                          id="driver-name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          required
                          data-testid="input-driver-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="driver-email">Email</Label>
                        <Input
                          id="driver-email"
                          type="email"
                          placeholder="driver@example.com"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          required
                          data-testid="input-driver-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="driver-phone">Phone Number</Label>
                        <Input
                          id="driver-phone"
                          type="tel"
                          placeholder="+1 234 567 8900"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          required
                          data-testid="input-driver-phone"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vehicle-model">Vehicle Model</Label>
                        <Input
                          id="vehicle-model"
                          placeholder="Toyota Camry"
                          value={formData.vehicleModel}
                          onChange={(e) => updateField("vehicleModel", e.target.value)}
                          required
                          data-testid="input-vehicle-model"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vehicle-number">Vehicle Number</Label>
                        <Input
                          id="vehicle-number"
                          placeholder="ABC-1234"
                          value={formData.vehicleNumber}
                          onChange={(e) => updateField("vehicleNumber", e.target.value)}
                          required
                          data-testid="input-vehicle-number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="driver-password">Password</Label>
                        <Input
                          id="driver-password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => updateField("password", e.target.value)}
                          required
                          data-testid="input-driver-password"
                        />
                      </div>
                      <Button type="submit" className="w-full" data-testid="button-driver-signup-submit">
                        Become a Driver
                      </Button>
                      <p className="text-sm text-center text-muted-foreground">
                        Already a driver?{" "}
                        <Link href="/auth/login">
                          <a className="text-primary hover:underline" data-testid="link-driver-login">
                            Sign in
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
