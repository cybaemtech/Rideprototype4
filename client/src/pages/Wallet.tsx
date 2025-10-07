import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WalletBalance from "@/components/WalletBalance";
import TransactionList from "@/components/TransactionList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useToast } from "@/hooks/use-toast";
import { Wallet as WalletIcon } from "lucide-react";

export default function Wallet() {
  const { toast } = useToast();
  const pageRef = useRef<HTMLDivElement>(null);
  const [balance, setBalance] = useState(2500);
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const [transactions] = useState([
    {
      id: "1",
      type: "credit" as const,
      amount: 500,
      description: "Added to wallet",
      date: new Date("2025-10-05"),
    },
    {
      id: "2",
      type: "debit" as const,
      amount: 182,
      description: "Ride to IGI Airport",
      date: new Date("2025-10-04"),
    },
    {
      id: "3",
      type: "debit" as const,
      amount: 125,
      description: "Ride to Qutub Minar",
      date: new Date("2025-10-03"),
    },
    {
      id: "4",
      type: "credit" as const,
      amount: 1000,
      description: "Added to wallet",
      date: new Date("2025-10-02"),
    },
    {
      id: "5",
      type: "debit" as const,
      amount: 95,
      description: "Ride to India Gate",
      date: new Date("2025-10-01"),
    },
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-header", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".wallet-balance-container", {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        delay: 0.2,
        ease: "back.out(1.5)",
      });

      gsap.from(".transactions-container", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleAddMoney = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0) {
      setBalance((prev) => prev + numAmount);
      setAmount("");
      setOpen(false);
      toast({
        title: "Money Added",
        description: `₹${numAmount.toFixed(2)} has been added to your wallet.`,
      });
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
          <motion.div
            className="page-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{
                  rotateY: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <WalletIcon className="h-8 w-8 text-primary" />
              </motion.div>
              <h1 className="text-2xl sm:text-3xl font-bold">My Wallet</h1>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage your balance and transactions
            </p>
          </motion.div>

          <motion.div
            className="wallet-balance-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <div>
                  <WalletBalance
                    balance={balance}
                    onAddMoney={() => setOpen(true)}
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Money to Wallet</DialogTitle>
                  <DialogDescription>
                    Enter the amount you want to add to your wallet balance
                  </DialogDescription>
                </DialogHeader>
                <motion.div
                  className="space-y-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="1"
                      step="0.01"
                      data-testid="input-add-amount"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {["500", "1000", "2000"].map((value, index) => (
                      <motion.div
                        key={value}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setAmount(value)}
                          data-testid={`button-quick-${value}`}
                        >
                          ₹{value}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full"
                      onClick={handleAddMoney}
                      disabled={!amount || parseFloat(amount) <= 0}
                      data-testid="button-confirm-add-money"
                    >
                      Add Money
                    </Button>
                  </motion.div>
                </motion.div>
              </DialogContent>
            </Dialog>
          </motion.div>

          <motion.div
            className="transactions-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TransactionList transactions={transactions} />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
