import { Router } from "express";
import transaction from "../controllers/transaction";
import { authenticate } from "../controllers/middleware/auth";

const router = Router();

// /transaction
router.use(authenticate)
router.post("/fund-wallet", transaction.fundWallet);
router.post("/fund-transfer", transaction.transferFunds);
router.get("/", transaction.getTransactions);
router.get('/networks', transaction.getNetworks);
router.post('/airtime', transaction.buyAirtime);
router.get('/phone-network', transaction.getPhoneNetwork);
router.get('/data-plans', transaction.getDataPlans);
router.post('/buy-data', transaction.buyData);
router.get('/customer-validate/:operatorId', transaction.validateCustomer);
router.post('/electricity', transaction.buyElectricity);
router.get('/discos', transaction.getDiscos);

export default router;