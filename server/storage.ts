import {
  type User,
  type UpsertUser,
  type Wallet,
  type Ride,
  type InsertRide,
  type Driver,
  type InsertDriver,
  type Transaction,
  type InsertTransaction,
} from "@shared/schema";
import { jsonStorage } from "./jsonStorage";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getWallet(userId: string): Promise<Wallet | undefined>;
  createWallet(userId: string): Promise<Wallet>;
  updateWalletBalance(userId: string, newBalance: string): Promise<Wallet | undefined>;
  createRide(rideData: InsertRide): Promise<Ride>;
  getRide(id: string): Promise<Ride | undefined>;
  getRidesByUser(userId: string): Promise<Ride[]>;
  updateRideStatus(id: string, status: string): Promise<Ride | undefined>;
  assignDriverToRide(rideId: string, driverId: string): Promise<Ride | undefined>;
  createDriver(driverData: InsertDriver): Promise<Driver>;
  getDriver(userId: string): Promise<Driver | undefined>;
  updateDriverStatus(userId: string, isActive: boolean): Promise<Driver | undefined>;
  createTransaction(transactionData: InsertTransaction): Promise<Transaction>;
  getTransactionsByWallet(walletId: string): Promise<Transaction[]>;
  getAllActiveDrivers(): Promise<Driver[]>;
}

export class JSONStorageAdapter implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    return jsonStorage.getUser(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    return jsonStorage.upsertUser(userData);
  }

  async getWallet(userId: string): Promise<Wallet | undefined> {
    return jsonStorage.getWallet(userId);
  }

  async createWallet(userId: string): Promise<Wallet> {
    return jsonStorage.createWallet(userId);
  }

  async updateWalletBalance(userId: string, newBalance: string): Promise<Wallet | undefined> {
    return jsonStorage.updateWalletBalance(userId, newBalance);
  }

  async createRide(rideData: InsertRide): Promise<Ride> {
    return jsonStorage.createRide(rideData);
  }

  async getRide(id: string): Promise<Ride | undefined> {
    return jsonStorage.getRide(id);
  }

  async getRidesByUser(userId: string): Promise<Ride[]> {
    return jsonStorage.getRidesByUser(userId);
  }

  async updateRideStatus(id: string, status: string): Promise<Ride | undefined> {
    return jsonStorage.updateRideStatus(id, status);
  }

  async assignDriverToRide(rideId: string, driverId: string): Promise<Ride | undefined> {
    return jsonStorage.assignDriverToRide(rideId, driverId);
  }

  async createDriver(driverData: InsertDriver): Promise<Driver> {
    return jsonStorage.createDriver(driverData);
  }

  async getDriver(userId: string): Promise<Driver | undefined> {
    return jsonStorage.getDriver(userId);
  }

  async updateDriverStatus(userId: string, isActive: boolean): Promise<Driver | undefined> {
    return jsonStorage.updateDriverStatus(userId, isActive);
  }

  async createTransaction(transactionData: InsertTransaction): Promise<Transaction> {
    return jsonStorage.createTransaction(transactionData);
  }

  async getTransactionsByWallet(walletId: string): Promise<Transaction[]> {
    return jsonStorage.getTransactionsByWallet(walletId);
  }

  async getAllActiveDrivers(): Promise<Driver[]> {
    return jsonStorage.getAllActiveDrivers();
  }
}

export const storage = new JSONStorageAdapter();
