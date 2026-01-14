import { Project, FinancialSummary, Task, Worker, Customer, Lead, Invoice, Estimate, TimeEntry, File } from '../types/project';

export const workers = [
  { id: '1', name: 'Duy Hawkins', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=duy', role: 'Foreman', phone: '555-1001', email: 'duy@megabuild.com' },
  { id: '2', name: 'Savannah Nguyen', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=savannah', role: 'Electrician', phone: '555-1002', email: 'savannah@megabuild.com' },
  { id: '3', name: 'Robert Fox', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=robert', role: 'Plumber', phone: '555-1003', email: 'robert@megabuild.com' },
  { id: '4', name: 'Arlene Moy', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=arlene', role: 'Project Manager', phone: '555-1004', email: 'arlene@megabuild.com' },
  { id: '5', name: 'Cody Fisher', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=cody', role: 'Sales Manager', phone: '555-1005', email: 'cody@megabuild.com' },
  { id: '6', name: 'Ryan Howard', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=ryan', role: 'Carpenter', phone: '555-1006', email: 'ryan@megabuild.com' },
  { id: '7', name: 'Jacob Jones', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=jacob', role: 'Project Manager', phone: '555-1007', email: 'jacob@megabuild.com' },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Erin Hannon - Bathroom Remodel',
    customer: {
      name: 'Ryan Howard',
      email: 'ryan@example.com',
      phone: '555-1234',
      address: 'Door - 1772'
    },
    status: 'active',
    startDate: '2024-04-14',
    endDate: '2024-04-19',
    completionPercentage: 20,
    tasks: [
      {
        id: 't1',
        title: 'Composite Roof Installation',
        start: '2024-04-14',
        end: '2024-04-14',
        duration: 4,
        progress: 0,
        assignee: workers[0],
        status: 'pending',
        taskNumber: '02',
        hours: 4
      },
      {
        id: 't2',
        title: 'Master Bathroom Shower Installation',
        start: '2024-04-15',
        end: '2024-04-15',
        duration: 4,
        progress: 0,
        assignee: workers[1],
        status: 'pending',
        taskNumber: '12',
        hours: 4
      },
      {
        id: 't3',
        title: 'Master Bathroom Shower Fixtures',
        start: '2024-04-16',
        end: '2024-04-16',
        duration: 4,
        progress: 0,
        assignee: workers[0],
        status: 'pending',
        taskNumber: '09',
        hours: 4
      },
      {
        id: 't4',
        title: 'Miscellaneous Labor',
        start: '2024-04-17',
        end: '2024-04-17',
        duration: 4,
        progress: 0,
        assignee: workers[1],
        status: 'pending',
        taskNumber: '18',
        hours: 4
      },
      {
        id: 't5',
        title: 'Paint',
        start: '2024-04-15',
        end: '2024-04-17',
        duration: 3,
        progress: 0,
        assignee: workers[1],
        status: 'pending'
      }
    ],
    team: [workers[0], workers[1], workers[2]],
    projectManager: workers[3],
    salesPerson: workers[4],
    financials: {
      estimatedCost: 15000,
      actualCost: 12500,
      revenue: 20000,
      profit: 7500
    }
  },
  {
    id: '2',
    title: 'Nijum Chy - Bathroom Remodel',
    customer: {
      name: 'Nijum Chy',
      email: 'nijum@example.com',
      phone: '555-5678'
    },
    status: 'active',
    startDate: '2024-04-16',
    endDate: '2024-04-18',
    completionPercentage: 10,
    tasks: [
      {
        id: 't6',
        title: 'Composite Roof Installation',
        start: '2024-04-16',
        end: '2024-04-16',
        duration: 4,
        progress: 0,
        assignee: workers[2],
        status: 'pending',
        taskNumber: '02',
        hours: 4
      },
      {
        id: 't7',
        title: 'Master Bathroom Shower Installation',
        start: '2024-04-17',
        end: '2024-04-17',
        duration: 4,
        progress: 0,
        assignee: workers[3],
        status: 'pending',
        taskNumber: '02',
        hours: 4
      },
      {
        id: 't8',
        title: 'Additional Option: Decorative Tile',
        start: '2024-04-17',
        end: '2024-04-18',
        duration: 2,
        progress: 0,
        assignee: workers[3],
        status: 'pending'
      }
    ],
    team: [workers[2], workers[3]],
    financials: {
      estimatedCost: 12000,
      actualCost: 10000,
      revenue: 18000,
      profit: 8000
    }
  }
];

export const tasks: Task[] = [
  ...projects[0].tasks,
  ...projects[1].tasks
];

export const financialSummary: FinancialSummary = {
  revenue: 12220.64,
  balance: 52340.64,
  feesEarned: 13000.00,
  chargebackRate: 27650.00,
  totalTransactions: 7720.64,
  plannedPayouts: 56980.00,
  successfulPayments: 19465.00,
  failedPayments: 946.00
};

export const topMerchants = [
  { id: '1', name: 'Masum Parvej', email: 'hello@masum.design', amount: 430871 },
  { id: '2', name: 'Floyd Miles', email: 'floyed@gmail.com', amount: 361253 },
  { id: '3', name: 'Dianne Russell', email: 'michael@example.com', amount: 297105 },
  { id: '4', name: 'Ronald Richards', email: 'tanyahill@example.com', amount: 12893 }
];

export const currencyBalances = [
  { currency: 'USD', amount: 10180.00 },
  { currency: 'RUB', amount: 33180.00 },
  { currency: 'UAH', amount: 898110.00 },
  { currency: 'EUR', amount: 59609.00 },
  { currency: 'GBP', amount: 15043.00 }
];

export const revenueData = [
  { day: 'Sat 26', value: 3000 },
  { day: 'Sun 27', value: 9000 },
  { day: 'Mon 28', value: 15000 },
  { day: 'Tue 29', value: 8000 },
  { day: 'Wed 30', value: 5000 },
  { day: 'Thu 31', value: 10000 },
  { day: 'Fri 01', value: 12000 }
];

export const transactionData = [
  { day: 'Sat 26', value: 2000 },
  { day: 'Sun 27', value: 4000 },
  { day: 'Mon 28', value: 10000 },
  { day: 'Tue 29', value: 7000 },
  { day: 'Wed 30', value: 9000 },
  { day: 'Thu 31', value: 5000 },
  { day: 'Fri 01', value: 12000 }
];

export const customers: Customer[] = [
  {
    id: '1',
    name: 'Ryan Howard',
    email: 'ryan@example.com',
    phone: '555-1234',
    address: 'Door - 1772',
    projects: ['1'],
    status: 'active',
    avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=customer1',
  },
  {
    id: '2',
    name: 'Nijum Chy',
    email: 'nijum@example.com',
    phone: '555-5678',
    address: '123 Main Street',
    projects: ['2'],
    status: 'active',
    avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=customer2',
  },
  {
    id: '3',
    name: 'Michael Scott',
    email: 'michael@example.com',
    phone: '555-9876',
    address: '456 Oak Avenue',
    projects: [],
    status: 'inactive',
    avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=customer3',
  },
];

export const leads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '555-1111',
    address: '789 Pine Street',
    status: 'new',
    source: 'Website',
    notes: 'Interested in kitchen remodel',
    assignee: workers[4],
    estimatedValue: 25000,
    createdAt: '2024-04-10',
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily@example.com',
    phone: '555-2222',
    address: '321 Elm Road',
    status: 'contacted',
    source: 'Referral',
    notes: 'Wants basement finishing',
    assignee: workers[4],
    estimatedValue: 18000,
    createdAt: '2024-04-11',
  },
  {
    id: '3',
    name: 'David Williams',
    email: 'david@example.com',
    phone: '555-3333',
    address: '654 Maple Lane',
    status: 'qualified',
    source: 'Home Show',
    notes: 'Looking for bathroom renovation',
    assignee: workers[4],
    estimatedValue: 12000,
    createdAt: '2024-04-12',
  },
  {
    id: '4',
    name: 'Sarah Brown',
    email: 'sarah@example.com',
    phone: '555-4444',
    address: '987 Cedar Court',
    status: 'proposal',
    source: 'Google Ads',
    notes: 'Needs new roof installation',
    assignee: workers[4],
    estimatedValue: 15000,
    createdAt: '2024-04-13',
  },
];

export const invoices: Invoice[] = [
  {
    id: 'INV-001',
    projectId: '1',
    customerId: '1',
    status: 'paid',
    amount: 7500,
    createdAt: '2024-04-01',
    dueDate: '2024-04-15',
    paidAt: '2024-04-10',
    items: [
      { description: 'Initial deposit', amount: 7500 }
    ]
  },
  {
    id: 'INV-002',
    projectId: '1',
    customerId: '1',
    status: 'pending',
    amount: 7500,
    createdAt: '2024-04-16',
    dueDate: '2024-04-30',
    items: [
      { description: 'Progress payment', amount: 7500 }
    ]
  },
  {
    id: 'INV-003',
    projectId: '2',
    customerId: '2',
    status: 'paid',
    amount: 9000,
    createdAt: '2024-04-05',
    dueDate: '2024-04-20',
    paidAt: '2024-04-18',
    items: [
      { description: 'Initial deposit', amount: 9000 }
    ]
  },
  {
    id: 'INV-004',
    projectId: '2',
    customerId: '2',
    status: 'overdue',
    amount: 9000,
    createdAt: '2024-04-21',
    dueDate: '2024-05-05',
    items: [
      { description: 'Final payment', amount: 9000 }
    ]
  },
];

export const estimates: Estimate[] = [
  {
    id: 'EST-001',
    leadId: '3',
    status: 'draft',
    amount: 12000,
    createdAt: '2024-04-12',
    validUntil: '2024-05-12',
    items: [
      { description: 'Bathroom demolition', amount: 2000 },
      { description: 'New fixtures installation', amount: 5000 },
      { description: 'Tile work', amount: 3000 },
      { description: 'Plumbing', amount: 2000 },
    ]
  },
  {
    id: 'EST-002',
    leadId: '4',
    status: 'sent',
    amount: 15000,
    createdAt: '2024-04-13',
    validUntil: '2024-05-13',
    sentAt: '2024-04-14',
    items: [
      { description: 'Roof removal', amount: 3000 },
      { description: 'New roof materials', amount: 8000 },
      { description: 'Installation labor', amount: 4000 },
    ]
  },
  {
    id: 'EST-003',
    leadId: '2',
    status: 'approved',
    amount: 18000,
    createdAt: '2024-04-11',
    validUntil: '2024-05-11',
    sentAt: '2024-04-12',
    approvedAt: '2024-04-15',
    items: [
      { description: 'Basement framing', amount: 4000 },
      { description: 'Electrical work', amount: 3000 },
      { description: 'Drywall and finishing', amount: 6000 },
      { description: 'Flooring', amount: 5000 },
    ]
  },
];

export const timeEntries: TimeEntry[] = [
  {
    id: '1',
    workerId: '1',
    projectId: '1',
    taskId: 't1',
    date: '2024-04-14',
    hours: 4,
    notes: 'Completed roof installation'
  },
  {
    id: '2',
    workerId: '2',
    projectId: '1',
    taskId: 't2',
    date: '2024-04-15',
    hours: 3.5,
    notes: 'Began shower installation'
  },
  {
    id: '3',
    workerId: '3',
    projectId: '2',
    taskId: 't6',
    date: '2024-04-16',
    hours: 4,
    notes: 'Roof installation work'
  },
  {
    id: '4',
    workerId: '0',
    projectId: '1',
    taskId: 't5',
    date: '2024-04-15',
    hours: 2,
    notes: 'Started painting prep'
  },
  {
    id: '5',
    workerId: '2',
    projectId: '1',
    taskId: 't4',
    date: '2024-04-16',
    hours: 1.5,
    notes: 'Misc work and cleanup'
  },
];

export const files: File[] = [
  {
    id: '1',
    name: 'Bathroom_Design_Plan.pdf',
    type: 'document',
    size: 2500000,
    projectId: '1',
    uploadedAt: '2024-04-10',
    uploadedBy: workers[3],
    url: 'https://example.com/files/bathroom_plan.pdf'
  },
  {
    id: '2',
    name: 'Kitchen_Before.jpg',
    type: 'image',
    size: 1800000,
    projectId: '1',
    uploadedAt: '2024-04-11',
    uploadedBy: workers[0],
    url: 'https://img.heroui.chat/image/places?w=800&h=600&u=kitchen1'
  },
  {
    id: '3',
    name: 'Bathroom_Progress.jpg',
    type: 'image',
    size: 2200000,
    projectId: '1',
    uploadedAt: '2024-04-15',
    uploadedBy: workers[1],
    url: 'https://img.heroui.chat/image/places?w=800&h=600&u=bathroom1'
  },
  {
    id: '4',
    name: 'Contract_Signed.pdf',
    type: 'document',
    size: 1500000,
    projectId: '2',
    uploadedAt: '2024-04-08',
    uploadedBy: workers[4],
    url: 'https://example.com/files/contract.pdf'
  },
  {
    id: '5',
    name: 'Basement_Design.jpg',
    type: 'image',
    size: 1900000,
    projectId: '2',
    uploadedAt: '2024-04-12',
    uploadedBy: workers[3],
    url: 'https://img.heroui.chat/image/places?w=800&h=600&u=basement1'
  },
];

export const faqCategories = [
  {
    id: '1',
    name: 'Account Management',
    questions: [
      {
        id: 'q1',
        question: 'How do I reset my password?',
        answer: 'To reset your password, click on the "Forgot Password" link on the login page and follow the instructions sent to your email.'
      },
      {
        id: 'q2',
        question: 'How do I update my profile information?',
        answer: 'Go to Settings > Profile and update your information there. Click Save when you\'re done.'
      }
    ]
  },
  {
    id: '2',
    name: 'Project Management',
    questions: [
      {
        id: 'q3',
        question: 'How do I create a new project?',
        answer: 'Go to the Projects page and click the "Add New" button. Fill in the project details and save.'
      },
      {
        id: 'q4',
        question: 'How do I assign team members to a project?',
        answer: 'Open a project, go to the Team tab, and click "Add Team Member". Select the worker from the dropdown and assign their role.'
      }
    ]
  },
  {
    id: '3',
    name: 'Billing & Payments',
    questions: [
      {
        id: 'q5',
        question: 'How do I create an invoice?',
        answer: 'Go to the Invoices page, click "Create Invoice", select a customer and project, add line items, and save.'
      },
      {
        id: 'q6',
        question: 'How do I mark an invoice as paid?',
        answer: 'Open the invoice, click the "Actions" button, and select "Mark as Paid". Enter the payment date and method.'
      }
    ]
  }
];

export const locations = [
  {
    id: '1',
    projectId: '1',
    address: '123 Oak Street, Boston, MA 02108',
    lat: 42.3601,
    lng: -71.0589
  },
  {
    id: '2',
    projectId: '2',
    address: '456 Pine Avenue, Boston, MA 02109',
    lat: 42.3545,
    lng: -71.0643
  }
];
