/**
 * Skills inventory, consolidated from the CV variants (Backend Node.js,
 * Go/AWS, Fintech, Full Stack, Full Stack AI, GCP/Cloud Run, AI Developer).
 *
 * Everything here is a claim those CVs already make. Nothing is inferred from
 * the repositories — if a technology is not in a CV, it does not belong here.
 */

export interface Pillar {
  title: string;
  summary: string;
  highlights: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

/**
 * The four blocks that actually differentiate the profile. Breadth is in
 * `skillGroups` below; this is the part worth reading first.
 */
export const pillars: Pillar[] = [
  {
    title: 'Backend & Distributed Systems',
    summary:
      'Services that stay correct when they are split apart — event-driven communication, asynchronous processing and monolith-to-microservices migrations.',
    highlights: ['Node.js', 'NestJS', 'Go', 'Rust / Axum', 'Kafka', 'GraphQL'],
  },
  {
    title: 'Fintech & Payments',
    summary:
      'Real-money systems: payment cores and gateways, payouts, commissions, taxes and exchange rates, where a failure mode is an accounting problem.',
    highlights: ['Payment cores', 'Payouts', 'Financial transactions', 'Exchange rates (TRM)'],
  },
  {
    title: 'Cloud & DevOps',
    summary:
      'Provisioned as code and observable in production — AWS and GCP, containers and orchestration, pipelines that deploy without a human in the loop.',
    highlights: ['AWS', 'GCP / Cloud Run', 'Kubernetes', 'Terraform', 'GitHub Actions'],
  },
  {
    title: 'AI Agents & Developer Tooling',
    summary:
      'Agentic systems and the tooling underneath them: MCP servers, persistent context, voice pipelines and CLI/PTY integration.',
    highlights: ['MCP', 'AI agents', 'LLM applications', 'Claude Code', 'STT / TTS / VAD'],
  },
];

/**
 * Full inventory. Ordered so a reader scanning top to bottom moves from what
 * the code is written in, through where it runs, to what it is written about.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Node.js', 'Go', 'Python', 'Rust'],
  },
  {
    title: 'Backend',
    items: [
      'Node.js',
      'NestJS',
      'Express.js',
      'Rust / Axum',
      'REST APIs',
      'GraphQL',
      'Apollo',
      'Public APIs',
      'Webhooks',
      'Asynchronous processing',
    ],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Remix'],
  },
  {
    title: 'AI & LLMs',
    items: [
      'LLM applications',
      'Generative AI',
      'AI agents',
      'Agentic systems',
      'Model & provider integration',
      'AI-assisted engineering',
    ],
  },
  {
    title: 'Agent tooling',
    items: [
      'MCP (Model Context Protocol)',
      'Tool protocols',
      'Context management',
      'Persistent memory',
      'Claude Code',
      'OpenCode',
      'Prompt, model & tool iteration',
    ],
  },
  {
    title: 'Voice AI',
    items: [
      'Speech to text (STT)',
      'Text to speech (TTS)',
      'Voice Activity Detection (VAD)',
      'Real-time streaming',
      'Swappable voice & LLM providers',
    ],
  },
  {
    title: 'Developer tooling',
    items: [
      'CLI tooling',
      'PTY integration',
      'AI-assisted development workflows',
      'Engineering-cycle automation',
    ],
  },
  {
    title: 'Relational databases',
    items: ['PostgreSQL', 'MySQL', 'Amazon RDS'],
  },
  {
    title: 'NoSQL & caching',
    items: ['MongoDB', 'DynamoDB', 'Redis', 'Cassandra'],
  },
  {
    title: 'ORM & data tooling',
    items: [
      'Prisma',
      'Relational & NoSQL modelling',
      'Query design',
      'Reporting',
      'Analytics',
    ],
  },
  {
    title: 'AWS',
    items: [
      'Lambda',
      'API Gateway',
      'SQS',
      'SNS',
      'EventBridge',
      'DynamoDB',
      'S3',
      'RDS',
      'IAM',
      'CloudWatch',
      'Cognito',
      'Secrets Manager',
    ],
  },
  {
    title: 'Other platforms',
    items: ['Google Cloud (GCP)', 'Cloud Run', 'Vercel'],
  },
  {
    title: 'Containers & orchestration',
    items: ['Docker', 'Docker Compose', 'Kubernetes', 'AWS EKS', 'Cloud Run'],
  },
  {
    title: 'Infrastructure as Code',
    items: ['Terraform', 'AWS CDK', 'CloudFormation', 'Serverless Framework'],
  },
  {
    title: 'CI/CD',
    items: ['GitHub Actions', 'CI/CD pipelines', 'Automated deployments', 'OIDC'],
  },
  {
    title: 'Version control',
    items: ['Git', 'GitHub', 'Pull requests', 'Code reviews'],
  },
  {
    title: 'Testing',
    items: [
      'Jest',
      'Mocha',
      'Cypress',
      'Unit testing',
      'Integration testing',
      'End-to-end testing',
      'Automated testing',
    ],
  },
  {
    title: 'API documentation',
    items: ['Swagger', 'OpenAPI'],
  },
  {
    title: 'Observability',
    items: [
      'CloudWatch Logs & Metrics',
      'OpenTelemetry',
      'Sentry',
      'Centralized logging',
      'Monitoring',
      'Tracing',
      'Incident analysis',
    ],
  },
  {
    title: 'Security',
    items: [
      'IAM',
      'Cognito',
      'RBAC',
      'OIDC',
      'Authentication',
      'Authorization',
      'Rate limiting',
      'Strict validation',
      'Secure coding',
      'Failure handling',
    ],
  },
  {
    title: 'Architecture',
    items: [
      'Microservices',
      'Distributed systems',
      'Event-driven architecture',
      'Serverless architecture',
      'Asynchronous processing',
      'Clean Architecture',
      'SOLID',
      'Design patterns',
    ],
  },
  {
    title: 'Product & systems design',
    items: [
      'SaaS',
      'Multi-tenant systems',
      'End-to-end product development',
      'API design',
      'Solution architecture',
      'System modernization',
      'Monolith-to-microservices migration',
    ],
  },
  {
    title: 'Reliability in production',
    items: [
      'High availability',
      'Error handling',
      'Production incident resolution',
      'Scalability',
      'Maintainability',
      'Technical-debt reduction',
      'Failure-aware distributed design',
    ],
  },
  {
    title: 'Fintech',
    items: [
      'Payment cores',
      'Payment gateways',
      'Payouts',
      'Financial transactions',
      'Accounts',
      'Withdrawals',
      'Commissions',
      'Taxes',
      'Exchange rates (TRM)',
      'Financial snapshots',
      'Real-money systems',
    ],
  },
  {
    title: 'Integrations',
    items: [
      'Third-party APIs',
      'REST integrations',
      'GraphQL integrations',
      'Webhooks',
      'Authentication integrations',
      'Asynchronous integrations',
    ],
  },
  {
    title: 'Scraping & automation',
    items: [
      'Web scraping orchestration',
      'Platform integrations',
      'Earnings extraction & reporting',
    ],
  },
  {
    title: 'Engineering & leadership',
    items: [
      'Technical ownership',
      'Architecture decisions',
      'Building systems from scratch',
      'Leading migrations to microservices',
      'Code review',
      'Collaboration with Frontend, QA, DevOps & Product',
      'Autonomous problem solving',
    ],
  },
  {
    title: 'Domains',
    items: [
      'Fintech',
      'Payments & payouts',
      'Financial platforms',
      'ERP & backoffice',
      'Reporting & analytics',
      'SaaS',
      'AI developer tooling',
      'Agentic AI',
      'E-commerce & Shopify',
      'Enterprise integrations',
    ],
  },
];
