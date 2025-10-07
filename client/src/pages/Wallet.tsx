import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";

export default function Wallet() {
  const { toast } = useToast();
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">My Wallet</h1>
            <p className="text-muted-foreground">
              Manage your balance and transactions
            </p>
          </motion.div>

          <motion.div
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
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Money to Wallet</DialogTitle>
                  <DialogDescription>
                    Enter the amount you want to add to your wallet balance
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
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
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setAmount("500")}
                      data-testid="button-quick-50"
                    >
                      ₹500
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setAmount("1000")}
                      data-testid="button-quick-100"
                    >
                      ₹1000
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setAmount("2000")}
                      data-testid="button-quick-200"
                    >
                      ₹2000
                    </Button>
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleAddMoney}
                    disabled={!amount || parseFloat(amount) <= 0}
                    data-testid="button-confirm-add-money"
                  >
                    Add Money
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>

          <motion.div
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
