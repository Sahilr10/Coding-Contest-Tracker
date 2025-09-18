// src/utils/reminders.utils.js
import cron from "node-cron";
import nodemailer from "nodemailer";
import { fetchCodeforces, generateLeetCode, generateCodeChef, generateGFG } from "../services/contest.service.js";
import { User } from "../models/user.model.js";

// Configure mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export function startReminders() {
  // Run every 15 minutes
  cron.schedule("*/15 * * * *", async () => {
    console.log("🔔 Running reminder job...");

    const now = new Date();

    // ✅ Fetch contests once per job
    let contests = [
      ...(await fetchCodeforces()),
      ...generateLeetCode(),
      ...generateCodeChef(),
      ...generateGFG(),
    ];

    if (contests.length === 0) {
      console.log("No contests available.");
      return;
    }

    // ✅ Fetch all users
    const users = await User.find();

    for (const user of users) {
      const reminderTimes = user.reminderTimes || 120; // default 2h
      const cutoff = new Date(now.getTime() + reminderTimes * 60000);

      // Get contests within user’s window
      const upcoming = contests.filter(
        (c) => new Date(c.startTime) > now && new Date(c.startTime) <= cutoff
      );

      // Filter only user’s favorite platforms
      const userContests = upcoming.filter((c) =>
        user.favoritePlatforms.includes(c.platform)
      );

      if (userContests.length > 0) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Upcoming Contest Reminder 🚀",
          html: `
            <p>Hi ${user.username || "Coder"},</p>
            <p>The following contests are starting within your reminder window (${reminderTimes} minutes):</p>
            <ul>
              ${userContests
                .map(
                  (c) =>
                    `<li><a href="${c.url}">${c.name}</a> on <b>${c.platform}</b> at ${new Date(
                      c.startTime
                    ).toLocaleString()}</li>`
                )
                .join("")}
            </ul>
            <p>Good luck! 🚀</p>
          `,
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log(`📩 Reminder email sent to ${user.email}`);
        } catch (err) {
          console.error(`❌ Error sending email to ${user.email}:`, err.message);
        }
      }
    }
  });
}
