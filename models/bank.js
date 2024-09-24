
const bankAccountSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      accountNumber: {
        type: String,
        required: true,
        unique: true,
      },
      accountType: {
        type: String,
        enum: ["SAVINGS", "CURRENT", "FIXED"],
        required: true,
      },
      balance: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        default: "USD",
      },
    },
    { timestamps: true }
  );
  
  const BankAccount = model("BankAccount", bankAccountSchema);
  module.exports = BankAccount;
  