import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: 'https://placehold.co/200x200',
        localPath: '',
      },
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgetPasswordToken: {
      type: String,
    },
    forgetPasswordTokenExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (userPassword) {
  return bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
