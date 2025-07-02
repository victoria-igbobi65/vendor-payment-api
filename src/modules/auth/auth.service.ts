import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { generateOtp } from "../../utils/otp-generator";
import { envConfig } from "../../config/env.config";
import { MailService } from "../../utils/mailer.service";

const mailService = new MailService();
export class AuthService {
  private prisma = new PrismaClient();

  async requestLogin(email: string): Promise<string> {
    const otp = generateOtp();

    const ttl = Number(envConfig.otpExpiresAt);
    const expiresAt = new Date(Date.now() + ttl * 60 * 1000); // 10 mins

    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await this.prisma.user.create({
        data: { email, otpCode: otp, otpExpires: expiresAt },
      });
    } else {
      user = await this.prisma.user.update({
        where: { email },
        data: { otpCode: otp, otpExpires: expiresAt },
      });
    }

    await mailService.sendMail(
      user.email,
      "Your OTP Code",
      {
        text: `Your OTP is ${otp}`,
        html: `<p>Your <strong>OTP</strong> is <code>${otp}</code></p>`,
      },
      "Auth System"
    );
    return otp;
  }

  async verifyLogin(
    email: string,
    code: string
  ): Promise<{ token: string; user: User }> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !user.otpCode || !user.otpExpires) {
      throw new Error("No OTP found or user does not exist");
    }

    const now = new Date();

    const isExpired = user.otpExpires < now;
    const isInvalid = user.otpCode !== code;

    if (isExpired || isInvalid) {
      throw new Error("Invalid or expired OTP");
    }

    // Clear OTP after successful verification
    await this.prisma.user.update({
      where: { email },
      data: {
        otpCode: null,
        otpExpires: null,
      },
    });

    const token = jwt.sign({ userId: user.id }, envConfig.jwt.secret, {
      expiresIn: envConfig.jwt.expiresIn,
    });

    return { token, user };
  }
}
