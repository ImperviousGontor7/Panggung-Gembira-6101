import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const BCRYPT_ROUNDS = 12;

// ====================================================
// DEMO ACCOUNTS
// ====================================================

const DEMO_ACCOUNTS = [
  {
    username: "superadmin_demo",
    email: "superadmin@demo.com",
    password: "SuperAdminDemo123!",
    fullName: "Super Admin Demo",
    role: "SUPER_ADMIN",
  },
  {
    username: "admin_demo",
    email: "admin@demo.com",
    password: "AdminDemo123!",
    fullName: "Admin Demo",
    role: "ADMIN",
  },
  {
    username: "editor_demo",
    email: "editor@demo.com",
    password: "EditorDemo123!",
    fullName: "Editor Demo",
    role: "EDITOR",
  },
  {
    username: "user_demo",
    email: "user@demo.com",
    password: "UserDemo123!",
    fullName: "User Demo",
    role: "USER",
  },
];

// ====================================================
// HELPERS
// ====================================================

function printDivider() {
  console.log(
    "────────────────────────────────────────────────────",
  );
}

function printAccount(account) {
  console.log(`👤 ${account.role}`);
  console.log(`   Username : ${account.username}`);
  console.log(`   Email    : ${account.email}`);
  console.log(`   Password : ${account.password}`);
  console.log("");
}

// ====================================================
// MAIN
// ====================================================

async function main() {
  console.log("");

  printDivider();

  console.log("🌱 IMPERVIOUS DATABASE SEED");

  printDivider();

  console.log("");

  // ==================================================
  // HASH PASSWORDS
  // ==================================================

  console.log("🔐 Hashing demo passwords...");

  const hashedAccounts =
    await Promise.all(
      DEMO_ACCOUNTS.map(
        async (account) => ({
          ...account,

          password:
            await bcrypt.hash(
              account.password,
              BCRYPT_ROUNDS,
            ),
        }),
      ),
    );

  console.log(
    "✅ Password hashing completed.",
  );

  console.log("");

  // ==================================================
  // DEMO USERS
  // ==================================================

  console.log(
    "👥 Creating demo accounts...",
  );

  for (const account of hashedAccounts) {
    const existingByEmail =
      await prisma.user.findUnique({
        where: {
          email: account.email,
        },
      });

    const existingByUsername =
      await prisma.user.findUnique({
        where: {
          username: account.username,
        },
      });

    // Jika username sudah digunakan user lain,
    // hapus user tersebut agar username demo
    // bisa digunakan.
    if (
      existingByUsername &&
      existingByUsername.id !==
        existingByEmail?.id
    ) {
      console.log(
        `   ⚠️ Removing conflicting username: ${account.username}`,
      );

      await prisma.user.delete({
        where: {
          id: existingByUsername.id,
        },
      });
    }

    const user =
      await prisma.user.upsert({
        where: {
          email: account.email,
        },

        update: {
          username:
            account.username,

          password:
            account.password,

          fullName:
            account.fullName,

          role:
            account.role,

          status:
            "ACTIVE",

          isActive:
            true,

          deletedAt:
            null,
        },

        create: {
          username:
            account.username,

          email:
            account.email,

          password:
            account.password,

          fullName:
            account.fullName,

          role:
            account.role,

          status:
            "ACTIVE",

          isActive:
            true,
        },

        select: {
          id: true,
          username: true,
          email: true,
          fullName: true,
          role: true,
          status: true,
          isActive: true,
        },
      });

    console.log(
      `   ✓ ${user.role.padEnd(
        11,
      )} ${user.email}`,
    );
  }

  console.log("");

  console.log(
    "✅ Demo accounts created/updated.",
  );

  console.log("");

  // ==================================================
  // ACCOUNT SUMMARY
  // ==================================================

  printDivider();

  console.log("📋 DEMO ACCOUNTS");

  printDivider();

  console.log("");

  for (
    const account of DEMO_ACCOUNTS
  ) {
    printAccount(account);
  }

  printDivider();

  console.log("");

  console.log(
    "✅ Seed completed successfully.",
  );

  printDivider();

  console.log("");
}

// ====================================================
// RUN
// ====================================================

main()
  .catch(
    async (error) => {
      console.error(
        "❌ Seed failed:",
        error,
      );

      process.exitCode = 1;
    },
  )
  .finally(
    async () => {
      await prisma.$disconnect();
    },
  );