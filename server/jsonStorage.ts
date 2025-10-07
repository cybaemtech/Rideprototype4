import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import type { User, UpsertUser, Wallet, Ride, InsertRide, Driver, InsertDriver, Transaction, InsertTransaction } from "@shared/schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');

interface StorageData {
  users: User[];
  wallets: Wallet[];
  rides: Ride[];
  drivers: Driver[];
  transactions: Transaction[];
}

export class JSONStorage {
  private data: StorageData = {
    users: [],
    wallets: [],
    rides: [],
    drivers: [],
    transactions: []
  };
  private dataFile: string;

  constructor() {
    this.dataFile = path.join(DATA_DIR, 'storage.json');
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }

  async initialize() {
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      
      try {
        const fileContent = await fs.readFile(this.dataFile, 'utf-8');
        this.data = JSON.parse(fileContent);
      } catch (error) {
        this.data = {
          users: [],
          wallets: [],
          rides: [],
          drivers: [],
          transactions: []
        };
        await this.save();
      }
    } catch (error) {
      console.error('Error initializing JSON storage:', error);
      throw error;
    }
  }

  private async save() {
    try {
      await fs.writeFile(this.dataFile, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error saving to JSON storage:', error);
      throw error;
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.data.users.find(user => user.id === id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingIndex = this.data.users.findIndex(user => user.id === userData.id);
    
    const user: User = {
      id: userData.id || this.generateId(),
      email: userData.email || null,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: userData.profileImageUrl || null,
      userType: userData.userType || "rider",
      createdAt: userData.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (existingIndex >= 0) {
      this.data.users[existingIndex] = user;
    } else {
      this.data.users.push(user);
    }

    await this.save();
    await this.createWallet(user.id);
    return user;
  }

  async getWallet(userId: string): Promise<Wallet | undefined> {
    return this.data.wallets.find(wallet => wallet.userId === userId);
  }

  async createWallet(userId: string): Promise<Wallet> {
    const existing = await this.getWallet(userId);
    if (existing) return existing;

    const wallet: Wallet = {
      id: this.generateId(),
      userId,
      balance: "0",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.data.wallets.push(wallet);
    await this.save();
    return wallet;
  }

  async updateWalletBalance(userId: string, newBalance: string): Promise<Wallet | undefined> {
    const wallet = await this.getWallet(userId);
    if (!wallet) return undefined;

    const index = this.data.wallets.findIndex(w => w.userId === userId);
    if (index >= 0) {
      this.data.wallets[index] = {
        ...wallet,
        balance: newBalance,
        updatedAt: new Date(),
      };
      await this.save();
      return this.data.wallets[index];
    }
    return undefined;
  }

  async createRide(rideData: InsertRide): Promise<Ride> {
    const ride: Ride = {
      id: this.generateId(),
      riderId: rideData.riderId,
      driverId: rideData.driverId ?? null,
      pickupLocation: rideData.pickupLocation,
      dropLocation: rideData.dropLocation,
      fare: rideData.fare,
      distance: rideData.distance,
      status: rideData.status ?? "searching",
      rideType: rideData.rideType,
      createdAt: new Date(),
      completedAt: null,
    };

    this.data.rides.push(ride);
    await this.save();
    return ride;
  }

  async getRide(id: string): Promise<Ride | undefined> {
    return this.data.rides.find(ride => ride.id === id);
  }

  async getRidesByUser(userId: string): Promise<Ride[]> {
    return this.data.rides.filter(ride => ride.riderId === userId || ride.driverId === userId);
  }

  async updateRideStatus(id: string, status: string): Promise<Ride | undefined> {
    const index = this.data.rides.findIndex(ride => ride.id === id);
    if (index >= 0) {
      this.data.rides[index] = {
        ...this.data.rides[index],
        status,
        ...(status === 'completed' ? { completedAt: new Date() } : {})
      };
      await this.save();
      return this.data.rides[index];
    }
    return undefined;
  }

  async assignDriverToRide(rideId: string, driverId: string): Promise<Ride | undefined> {
    const index = this.data.rides.findIndex(ride => ride.id === rideId);
    if (index >= 0) {
      this.data.rides[index] = {
        ...this.data.rides[index],
        driverId,
      };
      await this.save();
      return this.data.rides[index];
    }
    return undefined;
  }

  async createDriver(driverData: InsertDriver): Promise<Driver> {
    const driver: Driver = {
      id: this.generateId(),
      ...driverData,
      rating: driverData.rating || "5.0",
      isActive: driverData.isActive || false,
      createdAt: new Date(),
    };

    this.data.drivers.push(driver);
    await this.save();
    return driver;
  }

  async getDriver(userId: string): Promise<Driver | undefined> {
    return this.data.drivers.find(driver => driver.userId === userId);
  }

  async updateDriverStatus(userId: string, isActive: boolean): Promise<Driver | undefined> {
    const index = this.data.drivers.findIndex(driver => driver.userId === userId);
    if (index >= 0) {
      this.data.drivers[index] = {
        ...this.data.drivers[index],
        isActive,
      };
      await this.save();
      return this.data.drivers[index];
    }
    return undefined;
  }

  async createTransaction(transactionData: InsertTransaction): Promise<Transaction> {
    const transaction: Transaction = {
      id: this.generateId(),
      ...transactionData,
      createdAt: new Date(),
    };

    this.data.transactions.push(transaction);
    await this.save();
    return transaction;
  }

  async getTransactionsByWallet(walletId: string): Promise<Transaction[]> {
    return this.data.transactions.filter(transaction => transaction.walletId === walletId);
  }

  async getAllActiveDrivers(): Promise<Driver[]> {
    return this.data.drivers.filter(driver => driver.isActive);
  }
}

export const jsonStorage = new JSONStorage();
