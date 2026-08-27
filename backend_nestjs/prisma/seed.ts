import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';

import { PrismaClient, QuestionType, Role } from '../generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({ adapter });

// --------------------------------------------------
// Constants
// --------------------------------------------------

const DEFAULT_PASSWORD = 'password123';
const QUESTIONS_PER_PACKAGE = 10;

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

type SeedUser = {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  bio: string;
};

async function seedUser(data: SeedUser, hashedPassword: string) {
  const user = await prisma.user.upsert({
    where: {
      email: data.email,
    },
    update: {
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,

      // Keeps development credentials predictable.
      password: hashedPassword,
    },
    create: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
  });

  await prisma.profile.upsert({
    where: {
      userId: user.id,
    },
    update: {
      bio: data.bio,
    },
    create: {
      userId: user.id,
      bio: data.bio,
    },
  });

  return user;
}

// --------------------------------------------------
// Seed data
// --------------------------------------------------

const categorySeedData = [
  {
    name: 'React',
    slug: 'react',
    description:
      'Assessments covering React fundamentals, hooks, state, performance, and architecture.',
    packages: [
      'React Fundamentals',
      'React Components',
      'React Hooks',
      'React State Management',
      'React Forms',
      'React Routing',
      'React Performance',
      'React Testing',
      'React Patterns',
      'Advanced React',
    ],
  },
  {
    name: 'TypeScript',
    slug: 'typescript',
    description:
      'Assessments covering TypeScript fundamentals, typing, generics, utility types, and advanced concepts.',
    packages: [
      'TypeScript Fundamentals',
      'TypeScript Types',
      'Interfaces and Type Aliases',
      'TypeScript Functions',
      'TypeScript Generics',
      'TypeScript Utility Types',
      'TypeScript Classes',
      'TypeScript Narrowing',
      'TypeScript Modules',
      'Advanced TypeScript',
    ],
  },
  {
    name: 'Node.js',
    slug: 'nodejs',
    description:
      'Assessments covering Node.js runtime concepts, APIs, streams, modules, and backend development.',
    packages: [
      'Node.js Fundamentals',
      'Node.js Modules',
      'Node.js Event Loop',
      'Node.js File System',
      'Node.js Streams',
      'Node.js HTTP',
      'Node.js Error Handling',
      'Node.js Security',
      'Node.js Performance',
      'Advanced Node.js',
    ],
  },
  {
    name: 'NestJS',
    slug: 'nestjs',
    description:
      'Assessments covering NestJS modules, controllers, providers, guards, pipes, and application architecture.',
    packages: [
      'NestJS Fundamentals',
      'NestJS Controllers',
      'NestJS Providers',
      'NestJS Modules',
      'NestJS Dependency Injection',
      'NestJS Guards',
      'NestJS Pipes',
      'NestJS Interceptors',
      'NestJS Authentication',
      'Advanced NestJS',
    ],
  },
  {
    name: 'SQL',
    slug: 'sql',
    description:
      'Assessments covering relational databases, SQL queries, joins, indexes, transactions, and optimization.',
    packages: [
      'SQL Fundamentals',
      'SQL Filtering',
      'SQL Joins',
      'SQL Aggregation',
      'SQL Subqueries',
      'SQL Constraints',
      'SQL Indexes',
      'SQL Transactions',
      'SQL Query Optimization',
      'Advanced SQL',
    ],
  },
  {
    name: 'AWS',
    slug: 'aws',
    description:
      'Assessments covering AWS compute, storage, networking, databases, security, and cloud architecture.',
    packages: [
      'AWS Fundamentals',
      'AWS EC2',
      'AWS S3',
      'AWS IAM',
      'AWS VPC',
      'AWS RDS',
      'AWS Lambda',
      'AWS ECS and Fargate',
      'AWS Cloud Architecture',
      'Advanced AWS',
    ],
  },
] as const;

// --------------------------------------------------
// Question generation
// --------------------------------------------------

type GeneratedQuestion = {
  title: string;
  description: string;
  type: QuestionType;
  points: number;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
};

/**
 * For seed/demo data we generate deterministic questions.
 *
 * Later, you can replace this function with real curated question banks
 * without changing the rest of the seeding architecture.
 */
function generateQuestions(
  categoryName: string,
  packageTitle: string,
): GeneratedQuestion[] {
  const topic = packageTitle;

  return [
    {
      title: `What is the primary purpose of ${topic}?`,
      description: `Choose the most appropriate description related to ${categoryName}.`,
      type: QuestionType.MCQ_SINGLE,
      points: 1,
      options: [
        {
          text: `To apply concepts associated with ${topic}`,
          isCorrect: true,
        },
        {
          text: 'To replace the operating system',
          isCorrect: false,
        },
        {
          text: 'To manage physical hardware exclusively',
          isCorrect: false,
        },
        {
          text: 'To eliminate the need for application logic',
          isCorrect: false,
        },
      ],
    },
    {
      title: `Which statement best describes ${topic}?`,
      description: `Select the best answer about ${topic}.`,
      type: QuestionType.MCQ_SINGLE,
      points: 1,
      options: [
        {
          text: `${topic} is an important concept within ${categoryName}`,
          isCorrect: true,
        },
        {
          text: `${topic} is unrelated to software development`,
          isCorrect: false,
        },
        {
          text: `${topic} can only be used for hardware development`,
          isCorrect: false,
        },
        {
          text: `${topic} completely replaces programming languages`,
          isCorrect: false,
        },
      ],
    },
    {
      title: `When working with ${topic}, what should a developer consider first?`,
      description: `Evaluate the best general engineering practice for ${topic}.`,
      type: QuestionType.MCQ_SINGLE,
      points: 1,
      options: [
        {
          text: 'The requirements and intended behaviour',
          isCorrect: true,
        },
        {
          text: 'Randomly selecting an implementation',
          isCorrect: false,
        },
        {
          text: 'Avoiding all documentation',
          isCorrect: false,
        },
        {
          text: 'Ignoring application requirements',
          isCorrect: false,
        },
      ],
    },
    {
      title: `Which approach is generally recommended when implementing ${topic}?`,
      description: `Choose the strongest software engineering practice.`,
      type: QuestionType.MCQ_SINGLE,
      points: 1,
      options: [
        {
          text: 'Use clear, maintainable and testable implementation',
          isCorrect: true,
        },
        {
          text: 'Duplicate logic wherever possible',
          isCorrect: false,
        },
        {
          text: 'Ignore error handling',
          isCorrect: false,
        },
        {
          text: 'Avoid testing the implementation',
          isCorrect: false,
        },
      ],
    },
    {
      title: `What can improve maintainability when using ${topic}?`,
      description: `Select the best maintainability practice.`,
      type: QuestionType.MCQ_SINGLE,
      points: 1,
      options: [
        {
          text: 'Clear separation of responsibilities',
          isCorrect: true,
        },
        {
          text: 'Mixing unrelated responsibilities together',
          isCorrect: false,
        },
        {
          text: 'Removing meaningful names',
          isCorrect: false,
        },
        {
          text: 'Increasing unnecessary duplication',
          isCorrect: false,
        },
      ],
    },
    {
      title: `What is an important consideration when testing ${topic}?`,
      description: `Choose the best testing principle.`,
      type: QuestionType.MCQ_SINGLE,
      points: 1,
      options: [
        {
          text: 'Test expected behaviour and important edge cases',
          isCorrect: true,
        },
        {
          text: 'Only test code that cannot fail',
          isCorrect: false,
        },
        {
          text: 'Avoid testing edge cases',
          isCorrect: false,
        },
        {
          text: 'Only test implementation details',
          isCorrect: false,
        },
      ],
    },
    {
      title: `Which practice can help prevent issues with ${topic}?`,
      description: `Select the most appropriate development practice.`,
      type: QuestionType.MCQ_SINGLE,
      points: 1,
      options: [
        {
          text: 'Validation, testing and appropriate error handling',
          isCorrect: true,
        },
        {
          text: 'Ignoring invalid input',
          isCorrect: false,
        },
        {
          text: 'Removing all validation',
          isCorrect: false,
        },
        {
          text: 'Suppressing every error',
          isCorrect: false,
        },
      ],
    },
    {
      title: `Why should ${topic} implementations be documented?`,
      description: `Choose the strongest reason.`,
      type: QuestionType.MCQ_SINGLE,
      points: 1,
      options: [
        {
          text: 'To make behaviour and design decisions easier to understand',
          isCorrect: true,
        },
        {
          text: 'To make the code intentionally harder to change',
          isCorrect: false,
        },
        {
          text: 'To remove the need for readable code',
          isCorrect: false,
        },
        {
          text: 'To prevent developers from testing the system',
          isCorrect: false,
        },
      ],
    },
    {
      title: `When optimizing ${topic}, what should normally happen first?`,
      description: `Select the best performance engineering approach.`,
      type: QuestionType.MCQ_SINGLE,
      points: 1,
      options: [
        {
          text: 'Measure and identify the actual bottleneck',
          isCorrect: true,
        },
        {
          text: 'Optimize everything without measuring',
          isCorrect: false,
        },
        {
          text: 'Remove all logging immediately',
          isCorrect: false,
        },
        {
          text: 'Rewrite the entire application first',
          isCorrect: false,
        },
      ],
    },
    {
      title: `Which principle is useful when designing solutions involving ${topic}?`,
      description: `Choose the strongest general design principle.`,
      type: QuestionType.MCQ_SINGLE,
      points: 1,
      options: [
        {
          text: 'Keep responsibilities clear and dependencies manageable',
          isCorrect: true,
        },
        {
          text: 'Create unnecessary dependencies between components',
          isCorrect: false,
        },
        {
          text: 'Make every component responsible for everything',
          isCorrect: false,
        },
        {
          text: 'Avoid defining clear boundaries',
          isCorrect: false,
        },
      ],
    },
  ];
}

// --------------------------------------------------
// Users
// --------------------------------------------------

async function seedUsers() {
  console.log('👤 Seeding users...');

  const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);

  const superAdmin = await seedUser(
    {
      firstName: 'Super',
      lastName: 'Admin',
      email: 'superadmin@test.com',
      role: Role.SUPER_ADMIN,
      bio: 'Platform super administrator',
    },
    hashedPassword,
  );

  const admin = await seedUser(
    {
      firstName: 'Admin',
      lastName: 'One',
      email: 'admin@test.com',
      role: Role.ADMIN,
      bio: 'Platform administrator',
    },
    hashedPassword,
  );

  await seedUser(
    {
      firstName: 'Admin',
      lastName: 'Two',
      email: 'admin2@test.com',
      role: Role.ADMIN,
      bio: 'Secondary platform administrator',
    },
    hashedPassword,
  );

  await seedUser(
    {
      firstName: 'Test',
      lastName: 'User',
      email: 'user@test.com',
      role: Role.USER,
      bio: 'Test platform user',
    },
    hashedPassword,
  );

  return {
    superAdmin,
    admin,
  };
}

// --------------------------------------------------
// Categories
// --------------------------------------------------

async function seedCategories(adminId: string) {
  console.log('📁 Seeding categories...');

  type SeedCategory = Awaited<ReturnType<typeof prisma.category.upsert>> & {
    packageDefinitions: readonly string[];
  };

  const categories: SeedCategory[] = [];

  for (const categoryData of categorySeedData) {
    const category = await prisma.category.upsert({
      where: {
        slug: categoryData.slug,
      },
      update: {
        name: categoryData.name,
        description: categoryData.description,
      },
      create: {
        name: categoryData.name,
        slug: categoryData.slug,
        description: categoryData.description,
        createdByUserId: adminId,
      },
    });

    categories.push({
      ...category,
      packageDefinitions: categoryData.packages,
    });
  }

  return categories;
}

// --------------------------------------------------
// Packages
// --------------------------------------------------

async function seedPackages(
  adminId: string,
  categories: Awaited<ReturnType<typeof seedCategories>>,
) {
  console.log('📦 Seeding test packages...');

  type SeedPackage = Awaited<ReturnType<typeof prisma.package.update>> & {
    categoryName: string;
  };

  const packages: SeedPackage[] = [];

  for (const category of categories) {
    for (let index = 0; index < category.packageDefinitions.length; index++) {
      const title = category.packageDefinitions[index];

      const packageSlug = `${category.slug}-${slugify(title)}`;

      const existingPackage = await prisma.package.findFirst({
        where: {
          title,
          categoryId: category.id,
        },
      });

      const packageData = {
        title,
        categoryId: category.id,
        shortDescription: `Test your knowledge of ${title}`,
        description: `Assessment covering important concepts related to ${title}.`,
      };

      const testPackage = existingPackage
        ? await prisma.package.update({
            where: { id: existingPackage.id },
            data: packageData,
          })
        : await prisma.package.create({
            data: {
              ...packageData,
              slug: packageSlug,
              durationMinutes: 20,
              passingPercentage: 70,
              expReward: 100 + index * 10,
              categoryId: category.id,
              createdByUserId: adminId,
            },
          });

      packages.push({
        ...testPackage,
        categoryName: category.name,
      });
    }
  }

  return packages;
}

// --------------------------------------------------
// Questions
// --------------------------------------------------

async function seedQuestions(
  packages: Awaited<ReturnType<typeof seedPackages>>,
) {
  console.log('❓ Seeding questions...');

  for (const testPackage of packages) {
    // Find positions already populated for this package.
    //
    // This makes the seed rerunnable. If positions 1-10 already
    // exist we leave the existing questions untouched.

    const existingPackageQuestions = await prisma.testPackageQuestion.findMany({
      where: {
        testPackageId: testPackage.id,
      },
      select: {
        position: true,
      },
    });

    const existingPositions = new Set(
      existingPackageQuestions.map((item) => item.position),
    );

    const questions = generateQuestions(
      testPackage.categoryName,
      testPackage.title,
    );

    for (let index = 0; index < QUESTIONS_PER_PACKAGE; index++) {
      const position = index + 1;

      if (existingPositions.has(position)) {
        continue;
      }

      const questionData = questions[index];

      const question = await prisma.testQuestion.create({
        data: {
          title: questionData.title,

          description: questionData.description,

          type: questionData.type,

          points: questionData.points,

          mcqOptions: {
            create: questionData.options,
          },
        },
      });

      await prisma.testPackageQuestion.create({
        data: {
          testPackageId: testPackage.id,
          questionId: question.id,
          position,
        },
      });
    }

    console.log(`   ✓ ${testPackage.categoryName} → ${testPackage.title}`);
  }
}

// --------------------------------------------------
// Badges
// --------------------------------------------------

async function seedBadges() {
  console.log('🏅 Seeding badges...');

  const badges = [
    {
      name: 'First Assessment',
      description: 'Complete your first assessment.',
    },
    {
      name: 'Perfect Score',
      description: 'Achieve 100% on an assessment.',
    },
    {
      name: 'React Developer',
      description: 'Successfully complete a React assessment.',
    },
    {
      name: 'SQL Explorer',
      description: 'Successfully complete a SQL assessment.',
    },
    {
      name: 'Cloud Explorer',
      description: 'Successfully complete an AWS assessment.',
    },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: {
        name: badge.name,
      },
      update: {
        description: badge.description,
      },
      create: badge,
    });
  }
}

// --------------------------------------------------
// Main
// --------------------------------------------------

async function main() {
  console.log('🌱 Starting database seed...\n');

  const { admin } = await seedUsers();

  const categories = await seedCategories(admin.id);

  const packages = await seedPackages(admin.id, categories);

  await seedQuestions(packages);

  await seedBadges();

  // ------------------------------------------------
  // Summary
  // ------------------------------------------------

  const [userCount, categoryCount, packageCount, questionCount, optionCount] =
    await Promise.all([
      prisma.user.count(),
      prisma.category.count(),
      prisma.package.count(),
      prisma.testQuestion.count(),
      prisma.mcqOption.count(),
    ]);

  console.log('\n----------------------------------------');
  console.log('✅ Database seeded successfully');
  console.log('----------------------------------------');
  console.log(`Users:      ${userCount}`);
  console.log(`Categories: ${categoryCount}`);
  console.log(`Packages:   ${packageCount}`);
  console.log(`Questions:  ${questionCount}`);
  console.log(`Options:    ${optionCount}`);
  console.log('----------------------------------------');

  console.log('\nDevelopment accounts:');
  console.log('SUPER_ADMIN: superadmin@test.com');
  console.log('ADMIN 1:     admin@test.com');
  console.log('ADMIN 2:     admin2@test.com');
  console.log('USER:        user@test.com');
  console.log(`Password:    ${DEFAULT_PASSWORD}`);
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
