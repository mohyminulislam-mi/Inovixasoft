import { 
  Code, 
  Smartphone, 
  Palette, 
  Cpu, 
  Layers, 
  Search, 
  Cloud, 
  Globe, 
  ShoppingCart, 
  LifeBuoy 
} from 'lucide-react';

export const services = [
  {
    id: 'web-development',
    slug: 'web-development',
    name: 'Web Development',
    description: 'Custom web apps, CRM, ERP, and enterprise business platforms built for high performance.',
    icon: Code,
    category: 'Development',
    fullDescription: 'We specialize in building robust, scalable web applications using the latest technologies. From complex ERP systems to streamlined customer portals, our solutions are architected to handle growth while providing an exceptional user experience.',
    features: [
      'React & Next.js Single Page Applications',
      'Robust Backend with Node.js & Go',
      'Scalable Databases (SQL & NoSQL)',
      'Enterprise CMS & CRM Integration',
      'Performance Optimization & Caching',
      'Progressive Web Apps (PWA)',
      'Legacy System Modernization'
    ],
    pricing: [
      { name: 'Starter', price: '$5k+', features: ['Basic Web App', 'Responsive Design', '3 Months Support'] },
      { name: 'Growth', price: '$15k+', features: ['Custom Dashboard', 'API Integrations', 'SEO Optimized', '6 Months Support'] },
      { name: 'Enterprise', price: 'Custom', features: ['Full-scale Architecture', 'Legacy Migration', 'Multi-region Deployment', '24/7 Support'] }
    ]
  },
  {
    id: 'mobile-app-development',
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    description: 'High-performance iOS and Android apps developed with React Native and Native technologies.',
    icon: Smartphone,
    category: 'Development',
    fullDescription: 'Reach your users wherever they are with feature-rich mobile applications. We leverage React Native for fast cross-platform delivery without compromising on the native look and feel that users expect.',
    features: [
        'Cross-platform iOS & Android',
        'Offline-first Architecture',
        'Push Notifications & Deep Linking',
        'In-app Purchases & Subscriptions',
        'Bio-metric Authentication',
        'Device Hardware Integration (GPS, Camera)',
        'App Store & Play Store Optimization'
    ],
    pricing: [
        { name: 'Starter', price: '$8k+', features: ['MVP Build', 'Basic Features', 'Store Submission'] },
        { name: 'Growth', price: '$20k+', features: ['Custom UI/UX', 'Cloud Sync', 'Advanced Analytics'] },
        { name: 'Enterprise', price: 'Custom', features: ['Complex Logic', 'Hardware Integration', 'Ongoing Maintenance'] }
    ]
  },
  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    description: 'User-centered design, interactive Figma prototypes, and comprehensive design systems.',
    icon: Palette,
    category: 'Design',
    fullDescription: 'Good design is about more than just looks—it\'s about results. Our design process starts with research and ends with intuitive interfaces that delight users and drive conversions.',
    features: [
        'User Research & Personas',
        'Wireframing & Prototyping',
        'High-Fidelity UI Design',
        'Design Systems & Style Guides',
        'Interactive Figma Mockups',
        'Usability Testing',
        'Conversion Rate Optimization'
    ],
    pricing: [
        { name: 'Starter', price: '$3k+', features: ['Landing Page Design', 'Brand Identity', 'Basic Prototype'] },
        { name: 'Growth', price: '$7k+', features: ['Full SaaS Design', 'Interactive Prototype', 'Design System'] },
        { name: 'Enterprise', price: 'Custom', features: ['Complex Dashboard Design', 'White-labeling', 'Ongoing Design Support'] }
    ]
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    name: 'AI & Automation',
    description: 'Intelligent AI integration, workflow automation, and seamless API orchestration.',
    icon: Cpu,
    category: 'AI',
    fullDescription: 'Unlock the power of artificial intelligence to automate repetitive tasks and gain deeper insights into your business. We integrate LLMs, computer vision, and predictive analytics into your existing workflows.',
    features: [
        'Custom GPT & LLM Implementation',
        'Predictive Analytics Dashboards',
        'Process Automation (RPA)',
        'Natural Language Processing',
        'AI-driven Chatbots & Virtual Assistants',
        'Workflow Orchestration (Zapier, Make, Custom)',
        'Computer Vision Solutions'
    ],
    pricing: [
        { name: 'Starter', price: '$6k+', features: ['AI Chatbot Integration', 'Basic Automation'] },
        { name: 'Growth', price: '$18k+', features: ['Custom Model Fine-tuning', 'Complex Workflows'] },
        { name: 'Enterprise', price: 'Custom', features: ['E2E AI Infrastructure', 'Scalable Data Pipelines'] }
    ]
  },
  {
    id: 'saas-development',
    slug: 'saas-development',
    name: 'SaaS Development',
    description: 'From MVP to enterprise, we build scalable software-as-a-service products that scale.',
    icon: Layers,
    category: 'SaaS',
    fullDescription: 'Launch your product with confidence. We help you navigate the complexity of building a SaaS, from multi-tenant architecture to subscription management and security.',
    features: [
        'Multi-tenant Architecture',
        'Stripe & Subscription Management',
        'RBAC (Role Based Access Control)',
        'Usage Analytics & Monitoring',
        'Scalable Cloud Infrastructure',
        'API First Design',
        'Automated Onboarding Flows'
    ],
    pricing: [
        { name: 'Starter', price: '$12k+', features: ['MVP Build', 'Basic Auth', 'Stripe Integration'] },
        { name: 'Growth', price: '$35k+', features: ['Advanced Features', 'Analytics', 'Custom Roles'] },
        { name: 'Enterprise', price: 'Custom', features: ['Full Suite Architecture', 'High Availability'] }
    ]
  },
  {
    id: 'seo-marketing',
    slug: 'seo-marketing',
    name: 'SEO & Digital Marketing',
    description: 'Technical SEO, growth strategy, and analytics setup for maximum visibility.',
    icon: Search,
    category: 'Marketing',
    fullDescription: 'Building a great product is only half the battle. We ensure your target audience finds you with technical SEO audits, content strategy, and data-driven marketing campaigns.',
    features: [
        'Technical SEO Audits',
        'Keyword Strategy & Research',
        'Performance Tracking & Analytics',
        'Conversion Path Optimization',
        'Content Marketing Strategy',
        'Backlink Analysis',
        'Pay-Per-Click Management'
    ],
    pricing: [
        { name: 'Starter', price: '$2k/mo', features: ['Core SEO Setup', 'Monthly Reports'] },
        { name: 'Growth', price: '$5k/mo', features: ['Advanced Strategy', 'Content Creation'] },
        { name: 'Enterprise', price: 'Custom', features: ['Global SEO', 'Dedicated Growth Manager'] }
    ]
  },
  {
    id: 'cloud-devops',
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    description: 'AWS/GCP/Azure deployment, CI/CD pipelines, and automated infrastructure management.',
    icon: Cloud,
    category: 'Infrastructure',
    fullDescription: 'Ensure your application is always available and scales automatically. We implement modern DevOps practices to speed up deployments and improve reliability.',
    features: [
        'AWS / GCP / Azure Infrastructure',
        'Docker & Kubernetes (K8s)',
        'CI/CD Pipeline Setup (GitHub Actions, Jenkins)',
        'Serverless Architecture',
        'Infrastructure as Code (Terraform)',
        'Security Hardening & Backups',
        '24/7 Uptime Monitoring'
    ],
    pricing: [
        { name: 'Starter', price: '$4k+', features: ['Deployment Setup', 'Basic Monitoring'] },
        { name: 'Growth', price: '$10k+', features: ['K8s Setup', 'Auto-scaling', 'CI/CD'] },
        { name: 'Enterprise', price: 'Custom', features: ['Multi-cloud Setup', 'Hardened Security'] }
    ]
  },
  {
    id: 'api-development',
    slug: 'api-development',
    name: 'API Development',
    description: 'High-performance REST and GraphQL APIs for seamless third-party integrations.',
    icon: Globe,
    category: 'Development',
    fullDescription: 'Connect your systems with secure, efficient APIs. We build documentation-first APIs that are easy for developers to consume and provide the reliability your business needs.',
    features: [
        'REST & GraphQL API Design',
        'Microservices Architecture',
        'Third-party Integration (Stripe, Twilio, etc)',
        'API Gateway & Auth (JWT, OAuth)',
        'Rate Limiting & Security',
        'Swagger / OpenAPI Documentation',
        'Webhooks & Real-time Sockets'
    ],
    pricing: [
        { name: 'Starter', price: '$3k+', features: ['Basic API', 'Auth Setup'] },
        { name: 'Growth', price: '7k+', features: ['Complex Logic', 'Multiple Integrations'] },
        { name: 'Enterprise', price: 'Custom', features: ['Microservices', 'High-throughput API'] }
    ]
  },
  {
    id: 'ecommerce-solutions',
    slug: 'ecommerce-solutions',
    name: 'E-commerce Solutions',
    description: 'Custom online stores, payment gateways, and inventory management systems.',
    icon: ShoppingCart,
    category: 'SaaS',
    fullDescription: 'Sell globally with custom-built e-commerce solutions. We go beyond simple storefronts to build integrated shopping experiences that manage everything from inventory to payments.',
    features: [
        'Headless E-commerce Solutions',
        'Shopify / WooCommerce Customization',
        'Custom Payment Gateway Integration',
        'Inventory Management Systems',
        'Customer Review & Loyalty Programs',
        'Abandoned Cart Recovery',
        'Multi-currency & Multi-language'
    ],
    pricing: [
        { name: 'Starter', price: '$5k+', features: ['Standard Store', 'Payment Setup'] },
        { name: 'Growth', price: '$12k+', features: ['Custom UI', 'Inventory Sync', 'Advanced SEO'] },
        { name: 'Enterprise', price: 'Custom', features: ['Global Scale Shop', 'Omnichannel Sales'] }
    ]
  },
  {
    id: 'maintenance-support',
    slug: 'maintenance-support',
    name: 'Maintenance & Support',
    description: '24/7 support, performance monitoring, and regular software updates.',
    icon: LifeBuoy,
    category: 'Support',
    fullDescription: 'Your product needs continuous care to stay competitive. We provide ongoing support to fix bugs, improve performance, and add new features as your business evolves.',
    features: [
        '24/7 Security Monitoring',
        'Regular Software Updates & Patches',
        'Performance Optimization',
        'Bug Fixing & Troubleshooting',
        'New Feature Development',
        'Database Maintenance',
        'Monthly Health Reports'
    ],
    pricing: [
        { name: 'Starter', price: '$1k/mo', features: ['8h Response', 'Security Patches'] },
        { name: 'Growth', price: '$3k/mo', features: ['4h Response', 'Minor Updates'] },
        { name: 'Enterprise', price: 'Custom', features: ['Instant Response', 'Dedicated Engineer'] }
    ]
  }
];

export const projects = [
  {
    id: 'quantum-pay',
    name: 'QuantumPay',
    category: 'Fintech / SaaS',
    description: 'Next-generation payment processor with real-time analytics and cross-border settlement.',
    image: 'https://picsum.photos/seed/quantumpay/800/600',
    tags: ['Next.js', 'PostgreSQL', 'Stripe', 'Node.js'],
    slug: 'quantum-pay'
  },
  {
    id: 'health-ai',
    name: 'HealthAI',
    category: 'Health / AI',
    description: 'AI-powered diagnostic assistant for personalized health insights using LLMs.',
    image: 'https://picsum.photos/seed/healthai/800/600',
    tags: ['Python', 'Cloud Functions', 'Gemini API', 'React'],
    slug: 'health-ai'
  },
  {
    id: 'lux-homes',
    name: 'LuxHomes',
    category: 'Real Estate / Web',
    description: 'Luxury real estate platform with virtual tours and automated lead management.',
    image: 'https://picsum.photos/seed/luxhomes/800/600',
    tags: ['React', 'Firebase', 'Framer Motion', 'Tailwind'],
    slug: 'lux-homes'
  },
  {
    id: 'stream-hub',
    name: 'StreamHub',
    category: 'Media / Entertainment',
    description: 'Multi-platform live streaming dashboard with engagement analytics.',
    image: 'https://picsum.photos/seed/streamhub/800/600',
    tags: ['WebRTC', 'React Native', 'Redis', 'AWS'],
    slug: 'stream-hub'
  },
  {
    id: 'eco-tracker',
    name: 'EcoTracker',
    category: 'Sustainability / Mobile',
    description: 'Personal carbon footprint tracker with gamified social features.',
    image: 'https://picsum.photos/seed/ecotracker/800/600',
    tags: ['Flutter', 'Node.js', 'MongoDB', 'Mapbox'],
    slug: 'eco-tracker'
  },
  {
    id: 'swift-logistics',
    name: 'SwiftLogistics',
    category: 'Supply Chain / Dashboard',
    description: 'Fleet management system with real-time GPS tracking and AI route optimization.',
    image: 'https://picsum.photos/seed/swiftlog/800/600',
    tags: ['Next.js', 'Google Maps API', 'Python', 'AWS'],
    slug: 'swift-logistics'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO, FintechFlow',
    content: 'ScalexDevs transformed our legacy systems into a high-performance cloud architecture. Their engineering precision is unmatched.',
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: 2,
    name: 'Michael Ross',
    role: 'CTO, HealthScale',
    content: 'The level of communication and technical expertise they brought to our AI integration project was instrumental in our Series B.',
    avatar: 'https://picsum.photos/seed/michael/100/100'
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Product Lead, EcoSync',
    content: 'Building our MVP with ScalexDevs was the best decision. We shipped in 6 weeks and scaled to 50k users without a single crash.',
    avatar: 'https://picsum.photos/seed/elena/100/100'
  }
];

export const blogPosts = [
  {
    slug: 'scaling-nextjs-to-millions',
    title: 'Scaling Next.js to 1M+ Monthly Users',
    excerpt: 'Learn the architectural patterns we use to handle heavy traffic with Next.js and Vercel.',
    date: 'Oct 12, 2023',
    readTime: '8 min read',
    category: 'Engineering',
    image: 'https://picsum.photos/seed/nextjs/800/500'
  },
  {
    slug: 'ai-agents-for-enterprise',
    title: 'Implementing AI Agents in Enterprise Workflows',
    excerpt: 'Beyond chatbots: how autonomous AI agents are revolutionizing internal business processes.',
    date: 'Nov 05, 2023',
    readTime: '12 min read',
    category: 'AI',
    image: 'https://picsum.photos/seed/aiagents/800/500'
  },
  {
    slug: 'modern-saas-security',
    title: 'Modern SaaS Security Checklist for 2024',
    excerpt: 'Ensure your user data is protected with our comprehensive multi-tenant security guide.',
    date: 'Dec 02, 2023',
    readTime: '10 min read',
    category: 'Security',
    image: 'https://picsum.photos/seed/security/800/500'
  }
];

export const pricingPlans = [
  {
    name: 'Starter',
    price: '$999',
    description: 'Perfect for startups and small businesses looking for a professional digital edge.',
    features: [
      'High-Performance Landing Page',
      'Strategic SEO Setup',
      'Advanced Performance Optimization',
      'Premium Design Language',
      '3 Months Technical Support'
    ]
  },
  {
    name: 'Growth',
    price: '$2,499',
    description: 'Bespoke web applications designed to handle increasing scale and complexity.',
    features: [
      'Custom Full-Stack Dashboard',
      'Complex Database Architecture',
      'Seamless API Integrations',
      'Automated Workflow Logic',
      '6 Months Technical Support',
      'Dedicated Project Manager'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Unlimited engineering power for global platforms and high-security systems.',
    features: [
      'Full-Scale Microservices',
      'Hardened Security & Compliance',
      'AI Agent Integration',
      'Multi-Region Cloud Infrastructure',
      '24/7 Priority VIP Support',
      'Legacy Migration Strategy'
    ]
  }
];
