const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
    },
    card: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
    planExpired: { type: String },
    notifications: { type: Array },
    socialLinks: [{ type: mongoose.Schema.Types.ObjectId, ref: "SocialLink" }],
    premium: { type: Boolean, default: false },
    voiceMessage: [
      { type: mongoose.Schema.Types.ObjectId, ref: "VoiceMessage" },
    ],
    about: { type: mongoose.Schema.Types.ObjectId, ref: "About" },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
    myLeads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contactform" }],
    cta: { type: mongoose.Schema.Types.ObjectId, ref: "CtaButton" },
    teamMember: { type: mongoose.Schema.Types.ObjectId, ref: "Teammember" },
    socialProof: { type: mongoose.Schema.Types.ObjectId, ref: "Social" },
    productGallary: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gallery" }],
    nfcStandard: { type: mongoose.Schema.Types.ObjectId, ref: "NfcStandard" },
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Photo",
      },
    ],
    multimedia: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MultiMedia",
      },
    ],
    timeoffer: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TsOffer",
      },
    ],
    qrcode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Qrcode",
    },

    automated: { type: mongoose.Schema.Types.ObjectId, ref: "Automated" },


    nfcPremium:{type:mongoose.Schema.Types.ObjectId,ref:"NfcPremium"},
    shuffle:{type:mongoose.Schema.Types.ObjectId,ref:"Shuffle"},
    contactformemail: { type: mongoose.Schema.Types.ObjectId, ref: "Loginemail" },

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// uniuq username middalware
userSchema.pre("save", async function (next) {
  if (!this.username) {
    try {
      const emailPart = this.email.split("@")[0];
      this.username = emailPart;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
