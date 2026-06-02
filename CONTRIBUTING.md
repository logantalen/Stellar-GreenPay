# 🤝 Contributing to Stellar GreenPay

Thank you for helping build transparent climate finance! Every contribution — big or small — matters.

---

## ✅ Prerequisites

Install the following before cloning:

| Tool | Version | Install |
|------|---------|---------|
| Node.js | ≥ 18.x | [nodejs.org](https://nodejs.org) or `nvm install 18` |
| npm | latest | bundled with Node |
| Docker | latest | [docs.docker.com/get-docker](https://docs.docker.com/get-docker/) |
| Rust + Cargo | ≥ 1.74 | `curl https://sh.rustup.rs -sSf \| sh` |
| Soroban CLI | latest | `cargo install --locked soroban-cli` |
| Freighter Wallet | latest | See below |

### 🦊 Install Freighter & Switch to Testnet

Freighter is the Stellar browser wallet needed to sign transactions in the app.

1. Install the extension for [Chrome](https://chrome.google.com/webstore/detail/freighter/bcacfldlkkdogcmkkibnjlakofdplcbk) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/freighter-an-stellar-wallet/).
2. Open Freighter, create or import a wallet, and save your seed phrase securely.
3. Click the network dropdown (top of the popup) and select **Testnet**.
4. Copy your public key — you'll need it to fund the account.

### 💧 Fund Your Testnet Account (Free XLM)

The Stellar Friendbot instantly credits 10,000 test XLM to any new Testnet account.

**Option A — browser:**
```
https://friendbot.stellar.org/?addr=YOUR_PUBLIC_KEY
```

**Option B — curl:**
```bash
curl "https://friendbot.stellar.org/?addr=YOUR_PUBLIC_KEY"
```

A `{"hash": "..."}` response confirms success. Refresh Freighter to see the balance.

---

## 🍴 Fork & Set Up

```bash
git clone https://github.com/YOUR_USERNAME/stellar-greenpay.git
cd stellar-greenpay
git remote add upstream https://github.com/your-org/stellar-greenpay.git
chmod +x scripts/setup-dev.sh && ./scripts/setup-dev.sh
```

Copy the env files and fill in your values:

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

Start the app:

```bash
# terminal 1
cd backend && npm run dev   # → http://localhost:4000

# terminal 2
cd frontend && npm run dev  # → http://localhost:3000
```

### 🎯 Make Your First Testnet Donation

1. Open `http://localhost:3000` in your browser.
2. Click **Connect Wallet** and approve the Freighter prompt.
3. Browse to any listed climate project and click **Donate**.
4. Enter an XLM amount and confirm the transaction in Freighter.
5. The on-chain transaction hash appears in the UI — paste it into [Stellar Expert (testnet)](https://stellar.expert/explorer/testnet) to verify.

> 💡 A Loom walkthrough of this flow is available in [`docs/walkthrough.md`](docs/walkthrough.md).

---

---

## 🌿 Branch Naming

```
feature/impact-nft-badges
fix/leaderboard-sort-bug
docs/soroban-contract-guide
contracts/implement-co2-tracking
chore/upgrade-stellar-sdk
```

---

## 💬 Commit Style

```
feat: add donor leaderboard page
fix: correct CO2 offset calculation
docs: update contract deployment guide
contracts: implement impact NFT minting
chore: upgrade soroban-sdk to 21.0
```

---

## 🔃 Pull Request Process

1. Branch from `main`
2. Make your changes and test on Testnet
3. Open a PR against `main`
4. Fill in the PR template and link the issue (`Closes #123`)
5. Wait for review — we respond within 48 hours

---

## 📁 Project Structure

```
stellar-greenpay/
├── frontend/
│   ├── components/     ← Reusable UI components
│   ├── pages/          ← Next.js routes
│   ├── lib/            ← Stellar SDK + wallet + API helpers
│   └── utils/          ← Types, formatting, constants
├── backend/
│   └── src/
│       ├── routes/     ← Express routes
│       ├── services/   ← Business logic
│       └── middleware/ ← Auth, rate limiting
├── contracts/          ← Soroban smart contracts (Rust)
└── docs/               ← Architecture & API docs
```

Look for `good first issue` labels for beginner-friendly tasks!
