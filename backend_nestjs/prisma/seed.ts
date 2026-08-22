import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role, QuestionType } from '../generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Checkiing if data is already populated
  const existingUserCount = await prisma.user.count();

  if (existingUserCount > 0) {
    console.log('Seed skipped: database already contains data.');
    return;
  }

  console.log('🌱 Starting database seed...');

  // --------------------------------------------
  // Users
  // --------------------------------------------

  const admin = await prisma.user.upsert({
    where: {
      email: 'admin@test.com',
    },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@test.com',

      // Development only.
      // Replace with a hashed password when auth is implemented.
      password: 'password123',

      role: Role.ADMIN,

      profile: {
        create: {
          bio: 'Platform administrator',
        },
      },
    },
  });

  await prisma.user.upsert({
    where: {
      email: 'user@test.com',
    },
    update: {},
    create: {
      firstName: 'Test',
      lastName: 'User',
      email: 'user@test.com',
      password: 'password123',
      role: Role.USER,

      profile: {
        create: {
          bio: 'Test user',
        },
      },
    },
  });

  // --------------------------------------------
  // Categories
  // --------------------------------------------

  const reactCategory = await prisma.category.upsert({
    where: {
      name: 'React',
    },
    update: {},
    create: {
      name: 'React',
      slug: 'react',
      description: 'React assessments',
      createdByUserId: admin.id,
    },
  });

  await prisma.category.upsert({
    where: {
      name: 'SQL',
    },
    update: {},
    create: {
      name: 'SQL',
      slug: 'sql',
      description: 'SQL and database assessments',
      createdByUserId: admin.id,
    },
  });

  // --------------------------------------------
  // Package
  // --------------------------------------------

  const reactPackage = await prisma.package.upsert({
    where: {
      categoryId_title: {
        categoryId: reactCategory.id,
        title: 'React Fundamentals',
      },
    },
    update: {},
    create: {
      title: 'React Fundamentals',
      shortDescription: 'Test your React fundamentals',
      description: 'A beginner assessment covering fundamental React concepts.',
      durationMinutes: 30,
      passingPercentage: 70,
      expReward: 100,

      categoryId: reactCategory.id,
      createdByUserId: admin.id,
    },
  });

  // --------------------------------------------
  // Questions
  // --------------------------------------------

  const question1 = await prisma.testQuestion.create({
    data: {
      title: 'What hook is used to manage local component state?',
      type: QuestionType.MCQ_SINGLE,
      points: 1,

      mcqOptions: {
        create: [
          {
            text: 'useState',
            isCorrect: true,
          },
          {
            text: 'useEffect',
            isCorrect: false,
          },
          {
            text: 'useContext',
            isCorrect: false,
          },
          {
            text: 'useMemo',
            isCorrect: false,
          },
        ],
      },
    },
  });

  const question2 = await prisma.testQuestion.create({
    data: {
      title: 'Which hook is commonly used for side effects?',
      type: QuestionType.MCQ_SINGLE,
      points: 1,

      mcqOptions: {
        create: [
          {
            text: 'useState',
            isCorrect: false,
          },
          {
            text: 'useEffect',
            isCorrect: true,
          },
          {
            text: 'useRef',
            isCorrect: false,
          },
          {
            text: 'useCallback',
            isCorrect: false,
          },
        ],
      },
    },
  });

  const question3 = await prisma.testQuestion.create({
    data: {
      title: 'Which of the following are React hooks?',
      type: QuestionType.MCQ_MULTIPLE,
      points: 2,

      mcqOptions: {
        create: [
          {
            text: 'useState',
            isCorrect: true,
          },
          {
            text: 'useEffect',
            isCorrect: true,
          },
          {
            text: 'useService',
            isCorrect: false,
          },
          {
            text: 'useController',
            isCorrect: false,
          },
        ],
      },
    },
  });

  // --------------------------------------------
  // Add questions to package
  // --------------------------------------------

  await prisma.testPackageQuestion.createMany({
    data: [
      {
        testPackageId: reactPackage.id,
        questionId: question1.id,
        position: 1,
      },
      {
        testPackageId: reactPackage.id,
        questionId: question2.id,
        position: 2,
      },
      {
        testPackageId: reactPackage.id,
        questionId: question3.id,
        position: 3,
      },
    ],
  });

  console.log('✅ Database seeded successfully.');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
