import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
  ChevronRight,
  Search,
  Shield,
  CreditCard,
  MapPin,
  Clock,
  Star,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const faqs = [
  {
    category: "Booking & Rides",
    icon: MapPin,
    questions: [
      {
        q: "How do I book a ride?",
        a: "Simply enter your pickup and drop locations, select your preferred ride type, and confirm your booking. A driver will be assigned to you immediately.",
      },
      {
        q: "Can I schedule a ride in advance?",
        a: "Yes! When booking a ride, select the 'Schedule' option and choose your preferred date and time. You can schedule rides up to 7 days in advance.",
      },
      {
        q: "How do I cancel a ride?",
        a: "You can cancel a ride from the ride tracking screen before the driver arrives. Please note that cancellation fees may apply if the driver is already on the way.",
      },
      {
        q: "What ride types are available?",
        a: "We offer RideNow Mini (affordable), RideNow Prime (premium comfort), and RideNow SUV (spacious rides for groups or extra luggage).",
      },
    ],
  },
  {
    category: "Payments & Wallet",
    icon: CreditCard,
    questions: [
      {
        q: "What payment methods are accepted?",
        a: "We accept UPI, credit/debit cards, net banking, and wallet payments. You can also pay in cash for select rides.",
      },
      {
        q: "How does the wallet work?",
        a: "Add money to your RideNow wallet and enjoy instant payments. Your wallet balance can be used for all rides and automatically deducts the fare after each trip.",
      },
      {
        q: "Are there any processing fees?",
        a: "No! We don't charge any processing fees for wallet transactions or online payments.",
      },
      {
        q: "How do I get a refund?",
        a: "Refunds are processed automatically for cancelled rides. The amount will be credited to your original payment method within 3-5 business days.",
      },
    ],
  },
  {
    category: "Safety & Security",
    icon: Shield,
    questions: [
      {
        q: "How do you ensure rider safety?",
        a: "All drivers undergo thorough background checks, and we verify their documents. Every ride is GPS tracked, and you can share your ride status with family or friends in real-time.",
      },
      {
        q: "What should I do in an emergency?",
        a: "Use the emergency button in the app to alert our support team and your emergency contacts. You can also call our 24/7 helpline directly from the app.",
      },
      {
        q: "Can I share my ride details with someone?",
        a: "Yes! You can share live ride tracking, driver details, and estimated arrival time with your contacts directly from the ride tracking screen.",
      },
      {
        q: "How are drivers verified?",
        a: "All drivers must submit valid government IDs, driving licenses, vehicle registration, and pass a background check before they can accept rides.",
      },
    ],
  },
  {
    category: "Driver Partners",
    icon: Star,
    questions: [
      {
        q: "How do I become a driver?",
        a: "Sign up through our driver app, submit your documents (license, vehicle registration, insurance), and complete the verification process. Once approved, you can start accepting rides.",
      },
      {
        q: "What are the earnings?",
        a: "Drivers earn a percentage of each fare, plus bonuses and incentives. You can track your daily, weekly, and monthly earnings in the driver app.",
      },
      {
        q: "Can I choose my working hours?",
        a: "Absolutely! You have complete flexibility to go online/offline whenever you want. Work as much or as little as you prefer.",
      },
      {
        q: "What support is available for drivers?",
        a: "We provide 24/7 driver support, regular training sessions, insurance coverage, and a dedicated helpline for any issues or queries.",
      },
    ],
  },
];

const quickActions = [
  {
    title: "Chat with Support",
    description: "Get instant help from our team",
    icon: MessageCircle,
    action: "chat",
    color: "text-primary",
  },
  {
    title: "Call Helpline",
    description: "24/7 support at 1800-XXX-XXXX",
    icon: Phone,
    action: "call",
    color: "text-accent",
  },
  {
    title: "Email Us",
    description: "support@ridenow.com",
    icon: Mail,
    action: "email",
    color: "text-chart-3",
  },
  {
    title: "Report Issue",
    description: "Report a problem with your ride",
    icon: AlertCircle,
    action: "report",
    color: "text-destructive",
  },
];

export default function Support() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredFaqs = faqs.filter((category) => {
    if (selectedCategory && category.category !== selectedCategory) return false;
    if (!searchQuery) return true;
    return (
      category.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.questions.some(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  const handleQuickAction = (action: string) => {
    toast({
      title: "Action initiated",
      description: `Opening ${action} support...`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-primary/5 border-b">
          <div className="container mx-auto px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <HelpCircle className="h-16 w-16 mx-auto mb-4 text-primary" />
              <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Get answers to your questions or reach out to our support team
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base"
                  data-testid="input-search-help"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 space-y-12">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                >
                  <Card
                    className="hover-elevate active-elevate-2 cursor-pointer"
                    onClick={() => handleQuickAction(action.action)}
                    data-testid={`card-${action.action}`}
                  >
                    <CardContent className="p-6">
                      <action.icon className={`h-8 w-8 mb-3 ${action.color}`} />
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Browse by Category</h2>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer hover-elevate px-4 py-2"
                onClick={() => setSelectedCategory(null)}
                data-testid="badge-all-categories"
              >
                All Categories
              </Badge>
              {faqs.map((category) => (
                <Badge
                  key={category.category}
                  variant={
                    selectedCategory === category.category ? "default" : "outline"
                  }
                  className="cursor-pointer hover-elevate px-4 py-2"
                  onClick={() => setSelectedCategory(category.category)}
                  data-testid={`badge-category-${category.category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category.category}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {filteredFaqs.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + categoryIndex * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <category.icon className="h-6 w-6 text-primary" />
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, index) => (
                          <AccordionItem
                            key={index}
                            value={`${category.category}-${index}`}
                          >
                            <AccordionTrigger className="text-left hover:text-primary transition-colors">
                              {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.a}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    Try searching with different keywords or browse our categories
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Still need help?</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Message sent!",
                      description: "Our support team will get back to you soon.",
                    });
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        type="text"
                        placeholder="Your name"
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Input
                      type="text"
                      placeholder="What do you need help with?"
                      data-testid="input-subject"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                      placeholder="Describe your issue or question..."
                      rows={5}
                      data-testid="textarea-message"
                    />
                  </div>
                  <Button type="submit" size="lg" data-testid="button-submit-support">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
