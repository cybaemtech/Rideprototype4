import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Wallet routes
  app.get('/api/wallet', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const wallet = await storage.getWallet(userId);
      res.json(wallet);
    } catch (error) {
      console.error("Error fetching wallet:", error);
      res.status(500).json({ message: "Failed to fetch wallet" });
    }
  });

  app.post('/api/wallet/add-money', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { amount } = req.body;
      
      if (typeof amount !== 'number' && typeof amount !== 'string') {
        return res.status(400).json({ message: "Invalid amount format" });
      }

      const amountStr = String(amount).trim();
      
      if (amountStr.includes('e') || amountStr.includes('E')) {
        return res.status(400).json({ message: "Scientific notation not allowed" });
      }

      if (!/^-?\d+(\.\d+)?$/.test(amountStr)) {
        return res.status(400).json({ message: "Invalid amount. Must be a valid number." });
      }

      const amountNum = parseFloat(amountStr);
      if (!Number.isFinite(amountNum) || amountNum <= 0) {
        return res.status(400).json({ message: "Invalid amount. Must be a positive number." });
      }

      if (amountNum > 100000) {
        return res.status(400).json({ message: "Amount exceeds maximum limit of ₹100,000" });
      }
      
      const wallet = await storage.getWallet(userId);
      if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }

      const currentBalance = parseFloat(wallet.balance || "0");
      const newBalance = (currentBalance + amountNum).toFixed(2);
      const updatedWallet = await storage.updateWalletBalance(userId, newBalance);

      if (updatedWallet) {
        await storage.createTransaction({
          walletId: wallet.id,
          type: 'credit',
          amount: amountNum.toFixed(2),
          description: 'Money added to wallet'
        });
      }

      res.json(updatedWallet);
    } catch (error) {
      console.error("Error adding money:", error);
      res.status(500).json({ message: "Failed to add money" });
    }
  });

  app.get('/api/wallet/transactions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const wallet = await storage.getWallet(userId);
      
      if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }

      const transactions = await storage.getTransactionsByWallet(wallet.id);
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  // Ride routes
  app.post('/api/rides', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { pickupLocation, dropLocation, fare, distance, rideType } = req.body;

      if (!pickupLocation || !dropLocation || !fare || !distance || !rideType) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const fareStr = String(fare).trim();
      const distanceStr = String(distance).trim();

      if (fareStr.includes('e') || fareStr.includes('E')) {
        return res.status(400).json({ message: "Scientific notation not allowed for fare" });
      }

      if (distanceStr.includes('e') || distanceStr.includes('E')) {
        return res.status(400).json({ message: "Scientific notation not allowed for distance" });
      }

      if (!/^-?\d+(\.\d+)?$/.test(fareStr)) {
        return res.status(400).json({ message: "Invalid fare format" });
      }

      if (!/^-?\d+(\.\d+)?$/.test(distanceStr)) {
        return res.status(400).json({ message: "Invalid distance format" });
      }

      const fareNum = parseFloat(fareStr);
      const distanceNum = parseFloat(distanceStr);

      if (!Number.isFinite(fareNum) || fareNum <= 0) {
        return res.status(400).json({ message: "Invalid fare amount" });
      }

      if (!Number.isFinite(distanceNum) || distanceNum <= 0) {
        return res.status(400).json({ message: "Invalid distance" });
      }

      const validRideTypes = ['mini', 'prime', 'suv', 'luxury'];
      if (!validRideTypes.includes(rideType)) {
        return res.status(400).json({ message: "Invalid ride type" });
      }

      const ride = await storage.createRide({
        riderId: userId,
        pickupLocation,
        dropLocation,
        fare: fareNum.toFixed(2),
        distance: distanceNum.toFixed(2),
        rideType,
        status: 'searching'
      });

      res.json(ride);
    } catch (error) {
      console.error("Error creating ride:", error);
      res.status(500).json({ message: "Failed to create ride" });
    }
  });

  app.get('/api/rides/history', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const rides = await storage.getRidesByUser(userId);
      res.json(rides);
    } catch (error) {
      console.error("Error fetching ride history:", error);
      res.status(500).json({ message: "Failed to fetch ride history" });
    }
  });

  app.get('/api/rides/:id', isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const ride = await storage.getRide(id);
      
      if (!ride) {
        return res.status(404).json({ message: "Ride not found" });
      }

      res.json(ride);
    } catch (error) {
      console.error("Error fetching ride:", error);
      res.status(500).json({ message: "Failed to fetch ride" });
    }
  });

  app.patch('/api/rides/:id/status', isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ['searching', 'found', 'on-way', 'arrived', 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid ride status" });
      }

      const ride = await storage.updateRideStatus(id, status);
      
      if (!ride) {
        return res.status(404).json({ message: "Ride not found" });
      }

      res.json(ride);
    } catch (error) {
      console.error("Error updating ride status:", error);
      res.status(500).json({ message: "Failed to update ride status" });
    }
  });

  // Driver routes
  app.post('/api/driver/register', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { vehicleModel, vehicleNumber } = req.body;

      if (!vehicleModel || !vehicleNumber) {
        return res.status(400).json({ message: "Vehicle model and number are required" });
      }

      if (vehicleModel.trim().length < 2) {
        return res.status(400).json({ message: "Invalid vehicle model" });
      }

      if (vehicleNumber.trim().length < 4) {
        return res.status(400).json({ message: "Invalid vehicle number" });
      }

      const driver = await storage.createDriver({
        userId,
        vehicleModel: vehicleModel.trim(),
        vehicleNumber: vehicleNumber.trim().toUpperCase(),
        rating: "5.0",
        isActive: false
      });

      res.json(driver);
    } catch (error) {
      console.error("Error registering driver:", error);
      res.status(500).json({ message: "Failed to register driver" });
    }
  });

  app.get('/api/driver/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const driver = await storage.getDriver(userId);
      
      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }

      res.json(driver);
    } catch (error) {
      console.error("Error fetching driver profile:", error);
      res.status(500).json({ message: "Failed to fetch driver profile" });
    }
  });

  app.patch('/api/driver/toggle-active', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { isActive } = req.body;

      if (typeof isActive !== 'boolean') {
        return res.status(400).json({ message: "isActive must be a boolean value" });
      }

      const driver = await storage.updateDriverStatus(userId, isActive);
      
      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }

      res.json(driver);
    } catch (error) {
      console.error("Error toggling driver status:", error);
      res.status(500).json({ message: "Failed to toggle driver status" });
    }
  });

  app.get('/api/drivers/active', async (req, res) => {
    try {
      const drivers = await storage.getAllActiveDrivers();
      res.json(drivers);
    } catch (error) {
      console.error("Error fetching active drivers:", error);
      res.status(500).json({ message: "Failed to fetch active drivers" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
