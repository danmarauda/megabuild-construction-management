import { Project, FinancialSummary, Task, Worker, Customer, Lead, Invoice, Estimate, TimeEntry, File } from '../types/project';

// WORKERS - Expanded team with diverse roles
export const workers: Worker[] = [
  { id: '1', name: 'Duy Hawkins', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=duy', role: 'Foreman', phone: '555-1001', email: 'duy@megabuild.com' },
  { id: '2', name: 'Savannah Nguyen', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=savannah', role: 'Electrician', phone: '555-1002', email: 'savannah@megabuild.com' },
  { id: '3', name: 'Robert Fox', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=robert', role: 'Plumber', phone: '555-1003', email: 'robert@megabuild.com' },
  { id: '4', name: 'Arlene Moy', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=arlene', role: 'Project Manager', phone: '555-1004', email: 'arlene@megabuild.com' },
  { id: '5', name: 'Cody Fisher', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=cody', role: 'Sales Manager', phone: '555-1005', email: 'cody@megabuild.com' },
  { id: '6', name: 'Ryan Howard', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=ryan', role: 'Carpenter', phone: '555-1006', email: 'ryan@megabuild.com' },
  { id: '7', name: 'Jacob Jones', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=jacob', role: 'Project Manager', phone: '555-1007', email: 'jacob@megabuild.com' },
  { id: '8', name: 'Marvin McKinney', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=marvin', role: 'HVAC Technician', phone: '555-1008', email: 'marvin@megabuild.com' },
  { id: '9', name: 'Brooklyn Simmons', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=brooklyn', role: 'Interior Designer', phone: '555-1009', email: 'brooklyn@megabuild.com' },
  { id: '10', name: 'Leslie Alexander', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=leslie', role: 'Architect', phone: '555-1010', email: 'leslie@megabuild.com' },
];

// PROJECTS - Expanded with all statuses and more variety
export const projects: Project[] = [
  {
    id: '1',
    title: 'Erin Hannon - Bathroom Remodel',
    customer: { name: 'Ryan Howard', email: 'ryan@example.com', phone: '555-1234', address: '1772 Willow Lane, Boston, MA 02108' },
    status: 'active',
    startDate: '2024-04-14',
    endDate: '2024-04-19',
    completionPercentage: 65,
    tasks: [
      { id: 't1', title: 'Demolition & Removal', start: '2024-04-14', end: '2024-04-14', duration: 1, progress: 100, assignee: workers[0], status: 'completed', taskNumber: '01', hours: 8 },
      { id: 't2', title: 'Plumbing Rough-in', start: '2024-04-15', end: '2024-04-15', duration: 1, progress: 100, assignee: workers[2], status: 'completed', taskNumber: '02', hours: 6 },
      { id: 't3', title: 'Electrical Rough-in', start: '2024-04-15', end: '2024-04-16', duration: 2, progress: 100, assignee: workers[1], status: 'completed', taskNumber: '03', hours: 8 },
      { id: 't4', title: 'Shower Installation', start: '2024-04-16', end: '2024-04-17', duration: 2, progress: 60, assignee: workers[2], status: 'in-progress', taskNumber: '04', hours: 8 },
      { id: 't5', title: 'Tile Work', start: '2024-04-17', end: '2024-04-18', duration: 2, progress: 0, assignee: workers[0], status: 'pending', taskNumber: '05', hours: 12 },
      { id: 't6', title: 'Fixture Installation', start: '2024-04-18', end: '2024-04-19', duration: 1, progress: 0, assignee: workers[2], status: 'pending', taskNumber: '06', hours: 6 },
    ],
    team: [workers[0], workers[1], workers[2]],
    projectManager: workers[3],
    salesPerson: workers[4],
    financials: { estimatedCost: 25000, actualCost: 16250, revenue: 35000, profit: 18750 }
  },
  {
    id: '2',
    title: 'Nijum Chy - Kitchen Renovation',
    customer: { name: 'Nijum Chy', email: 'nijum@example.com', phone: '555-5678', address: '123 Main Street, Cambridge, MA 02139' },
    status: 'active',
    startDate: '2024-04-10',
    endDate: '2024-04-25',
    completionPercentage: 45,
    tasks: [
      { id: 't7', title: 'Kitchen Demolition', start: '2024-04-10', end: '2024-04-11', duration: 2, progress: 100, assignee: workers[0], status: 'completed', taskNumber: '01', hours: 16 },
      { id: 't8', title: 'Cabinet Installation', start: '2024-04-12', end: '2024-04-16', duration: 5, progress: 80, assignee: workers[5], status: 'in-progress', taskNumber: '02', hours: 40 },
      { id: 't9', title: 'Countertop Installation', start: '2024-04-16', end: '2024-04-18', duration: 3, progress: 0, assignee: workers[5], status: 'pending', taskNumber: '03', hours: 24 },
      { id: 't10', title: 'Appliance Installation', start: '2024-04-19', end: '2024-04-20', duration: 2, progress: 0, assignee: workers[1], status: 'pending', taskNumber: '04', hours: 16 },
      { id: 't11', title: 'Plumbing Connections', start: '2024-04-20', end: '2024-04-21', duration: 2, progress: 0, assignee: workers[2], status: 'pending', taskNumber: '05', hours: 16 },
      { id: 't12', title: 'Final Finishing', start: '2024-04-22', end: '2024-04-25', duration: 4, progress: 0, assignee: workers[8], status: 'pending', taskNumber: '06', hours: 32 },
    ],
    team: [workers[0], workers[1], workers[2], workers[5], workers[8]],
    projectManager: workers[6],
    salesPerson: workers[4],
    financials: { estimatedCost: 45000, actualCost: 20250, revenue: 65000, profit: 44750 }
  },
  {
    id: '3',
    title: 'Michael Scott - Basement Finishing',
    customer: { name: 'Michael Scott', email: 'michael@example.com', phone: '555-9876', address: '456 Oak Avenue, Newton, MA 02458' },
    status: 'completed',
    startDate: '2024-03-01',
    endDate: '2024-03-30',
    completionPercentage: 100,
    tasks: [
      { id: 't13', title: 'Framing', start: '2024-03-01', end: '2024-03-05', duration: 5, progress: 100, assignee: workers[5], status: 'completed', taskNumber: '01', hours: 40 },
      { id: 't14', title: 'Electrical', start: '2024-03-06', end: '2024-03-10', duration: 5, progress: 100, assignee: workers[1], status: 'completed', taskNumber: '02', hours: 40 },
      { id: 't15', title: 'Plumbing', start: '2024-03-06', end: '2024-03-10', duration: 5, progress: 100, assignee: workers[2], status: 'completed', taskNumber: '03', hours: 40 },
      { id: 't16', title: 'Drywall', start: '2024-03-11', end: '2024-03-18', duration: 8, progress: 100, assignee: workers[0], status: 'completed', taskNumber: '04', hours: 64 },
      { id: 't17', title: 'Flooring', start: '2024-03-19', end: '2024-03-25', duration: 7, progress: 100, assignee: workers[5], status: 'completed', taskNumber: '05', hours: 56 },
      { id: 't18', title: 'Paint & Trim', start: '2024-03-26', end: '2024-03-30', duration: 5, progress: 100, assignee: workers[0], status: 'completed', taskNumber: '06', hours: 40 },
    ],
    team: [workers[0], workers[1], workers[2], workers[5]],
    projectManager: workers[3],
    salesPerson: workers[4],
    financials: { estimatedCost: 35000, actualCost: 34000, revenue: 50000, profit: 16000 }
  },
  {
    id: '4',
    title: 'Pam Beesly - Home Office Addition',
    customer: { name: 'Pam Beesly', email: 'pam@example.com', phone: '555-3456', address: '789 Pine Street, Brookline, MA 02445' },
    status: 'on-hold',
    startDate: '2024-04-01',
    endDate: '2024-05-15',
    completionPercentage: 30,
    tasks: [
      { id: 't19', title: 'Foundation Work', start: '2024-04-01', end: '2024-04-08', duration: 8, progress: 100, assignee: workers[0], status: 'completed', taskNumber: '01', hours: 64 },
      { id: 't20', title: 'Framing', start: '2024-04-09', end: '2024-04-16', duration: 8, progress: 30, assignee: workers[5], status: 'in-progress', taskNumber: '02', hours: 64 },
      { id: 't21', title: 'Roofing', start: '2024-04-17', end: '2024-04-20', duration: 4, progress: 0, assignee: workers[0], status: 'pending', taskNumber: '03', hours: 32 },
      { id: 't22', title: 'Windows & Doors', start: '2024-04-21', end: '2024-04-25', duration: 5, progress: 0, assignee: workers[5], status: 'pending', taskNumber: '04', hours: 40 },
      { id: 't23', title: 'Electrical & Plumbing', start: '2024-04-26', end: '2024-05-05', duration: 10, progress: 0, assignee: workers[1], status: 'pending', taskNumber: '05', hours: 80 },
      { id: 't24', title: 'Interior Finishing', start: '2024-05-06', end: '2024-05-15', duration: 10, progress: 0, assignee: workers[8], status: 'pending', taskNumber: '06', hours: 80 },
    ],
    team: [workers[0], workers[1], workers[5], workers[8]],
    projectManager: workers[6],
    salesPerson: workers[4],
    financials: { estimatedCost: 75000, actualCost: 22500, revenue: 95000, profit: 72500 }
  },
  {
    id: '5',
    title: 'Dwight Schrute - Roof Replacement',
    customer: { name: 'Dwight Schrute', email: 'dwight@example.com', phone: '555-7890', address: '987 Cedar Court, Worcester, MA 01609' },
    status: 'active',
    startDate: '2024-04-08',
    endDate: '2024-04-20',
    completionPercentage: 85,
    tasks: [
      { id: 't25', title: 'Old Roof Removal', start: '2024-04-08', end: '2024-04-10', duration: 3, progress: 100, assignee: workers[0], status: 'completed', taskNumber: '01', hours: 24 },
      { id: 't26', title: 'Deck Repair', start: '2024-04-10', end: '2024-04-12', duration: 3, progress: 100, assignee: workers[5], status: 'completed', taskNumber: '02', hours: 24 },
      { id: 't27', title: 'Underlayment Installation', start: '2024-04-11', end: '2024-04-13', duration: 3, progress: 100, assignee: workers[0], status: 'completed', taskNumber: '03', hours: 24 },
      { id: 't28', title: 'Shingle Installation', start: '2024-04-13', end: '2024-04-18', duration: 6, progress: 70, assignee: workers[0], status: 'in-progress', taskNumber: '04', hours: 48 },
      { id: 't29', title: 'Flashing & Ventilation', start: '2024-04-18', end: '2024-04-20', duration: 3, progress: 0, assignee: workers[0], status: 'pending', taskNumber: '05', hours: 24 },
    ],
    team: [workers[0], workers[5]],
    projectManager: workers[3],
    salesPerson: workers[4],
    financials: { estimatedCost: 18000, actualCost: 15300, revenue: 25000, profit: 9700 }
  },
  {
    id: '6',
    title: 'Jim Halpert - HVAC Installation',
    customer: { name: 'Jim Halpert', email: 'jim@example.com', phone: '555-2345', address: '321 Elm Road, Somerville, MA 02143' },
    status: 'completed',
    startDate: '2024-03-15',
    endDate: '2024-03-22',
    completionPercentage: 100,
    tasks: [
      { id: 't30', title: 'Ductwork Installation', start: '2024-03-15', end: '2024-03-18', duration: 4, progress: 100, assignee: workers[7], status: 'completed', taskNumber: '01', hours: 32 },
      { id: 't31', title: 'Unit Installation', start: '2024-03-19', end: '2024-03-20', duration: 2, progress: 100, assignee: workers[7], status: 'completed', taskNumber: '02', hours: 16 },
      { id: 't32', title: 'Electrical Connections', start: '2024-03-20', end: '2024-03-21', duration: 2, progress: 100, assignee: workers[1], status: 'completed', taskNumber: '03', hours: 16 },
      { id: 't33', title: 'Testing & Balancing', start: '2024-03-21', end: '2024-03-22', duration: 2, progress: 100, assignee: workers[7], status: 'completed', taskNumber: '04', hours: 16 },
    ],
    team: [workers[1], workers[7]],
    projectManager: workers[6],
    salesPerson: workers[4],
    financials: { estimatedCost: 15000, actualCost: 14800, revenue: 22000, profit: 7200 }
  },
];

export const tasks: Task[] = projects.flatMap(p => p.tasks);

// CUSTOMERS - Expanded with all statuses
export const customers: Customer[] = [
  { id: '1', name: 'Ryan Howard', email: 'ryan@example.com', phone: '555-1234', address: '1772 Willow Lane, Boston, MA 02108', projects: ['1'], status: 'active', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=customer1' },
  { id: '2', name: 'Nijum Chy', email: 'nijum@example.com', phone: '555-5678', address: '123 Main Street, Cambridge, MA 02139', projects: ['2'], status: 'active', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=customer2' },
  { id: '3', name: 'Michael Scott', email: 'michael@example.com', phone: '555-9876', address: '456 Oak Avenue, Newton, MA 02458', projects: ['3'], status: 'active', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=customer3' },
  { id: '4', name: 'Pam Beesly', email: 'pam@example.com', phone: '555-3456', address: '789 Pine Street, Brookline, MA 02445', projects: ['4'], status: 'active', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=customer4' },
  { id: '5', name: 'Dwight Schrute', email: 'dwight@example.com', phone: '555-7890', address: '987 Cedar Court, Worcester, MA 01609', projects: ['5'], status: 'active', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=customer5' },
  { id: '6', name: 'Jim Halpert', email: 'jim@example.com', phone: '555-2345', address: '321 Elm Road, Somerville, MA 02143', projects: ['6'], status: 'active', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=customer6' },
  { id: '7', name: 'Stanley Hudson', email: 'stanley@example.com', phone: '555-4567', address: '654 Maple Lane, Quincy, MA 02169', projects: [], status: 'inactive', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=customer7' },
  { id: '8', name: 'Kevin Malone', email: 'kevin@example.com', phone: '555-6789', address: '987 Birch Drive, Waltham, MA 02452', projects: [], status: 'active', avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=customer8' },
];

// LEADS - All pipeline stages represented
export const leads: Lead[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com', phone: '555-1111', address: '111 Apple Street, Boston, MA 02101', status: 'new', source: 'Website', notes: 'Interested in kitchen remodel, wants modern design', assignee: workers[4], estimatedValue: 45000, createdAt: '2024-04-13' },
  { id: '2', name: 'Emily Johnson', email: 'emily@example.com', phone: '555-2222', address: '222 Banana Boulevard, Cambridge, MA 02140', status: 'contacted', source: 'Referral', notes: 'Wants basement finishing, home office setup', assignee: workers[4], estimatedValue: 55000, createdAt: '2024-04-11' },
  { id: '3', name: 'David Williams', email: 'david@example.com', phone: '555-3333', address: '333 Cherry Court, Newton, MA 02458', status: 'qualified', source: 'Home Show', notes: 'Looking for bathroom renovation, has budget approved', assignee: workers[4], estimatedValue: 28000, createdAt: '2024-04-08' },
  { id: '4', name: 'Sarah Brown', email: 'sarah@example.com', phone: '555-4444', address: '444 Date Drive, Brookline, MA 02446', status: 'proposal', source: 'Google Ads', notes: 'Needs new roof installation, waiting on quote', assignee: workers[4], estimatedValue: 22000, createdAt: '2024-04-05' },
  { id: '5', name: 'Robert Davis', email: 'robert@example.com', phone: '555-5555', address: '555 Elm Street, Worcester, MA 01601', status: 'converted', source: 'Referral', notes: 'Signed contract for sunroom addition', assignee: workers[4], estimatedValue: 85000, createdAt: '2024-03-25' },
  { id: '6', name: 'Jennifer Martinez', email: 'jennifer@example.com', phone: '555-6666', address: '666 Fir Lane, Springfield, MA 01101', status: 'lost', source: 'Website', notes: 'Went with competitor due to lower price', assignee: workers[4], estimatedValue: 35000, createdAt: '2024-03-20' },
  { id: '7', name: 'Thomas Wilson', email: 'thomas@example.com', phone: '555-7777', address: '777 Garden Road, Lowell, MA 01850', status: 'new', source: 'Facebook Ad', notes: 'Interested in deck construction', assignee: workers[4], estimatedValue: 18000, createdAt: '2024-04-14' },
  { id: '8', name: 'Lisa Anderson', email: 'lisa@example.com', phone: '555-8888', address: '888 Hill Avenue, Lynn, MA 01901', status: 'contacted', source: 'Yelp', notes: 'Wants whole house painting estimate', assignee: workers[4], estimatedValue: 12000, createdAt: '2024-04-12' },
  { id: '9', name: 'Mark Thompson', email: 'mark@example.com', phone: '555-9999', address: '999 Island Way, New Bedford, MA 02740', status: 'qualified', source: 'Angie\'s List', notes: 'Ready to move forward with addition', assignee: workers[4], estimatedValue: 95000, createdAt: '2024-04-09' },
];

// INVOICES - All statuses represented
export const invoices: Invoice[] = [
  { id: 'INV-001', projectId: '1', customerId: '1', status: 'paid', amount: 8750, createdAt: '2024-04-14', dueDate: '2024-04-14', paidAt: '2024-04-14', items: [{ description: 'Initial Deposit (35%)', amount: 8750 }] },
  { id: 'INV-002', projectId: '1', customerId: '1', status: 'pending', amount: 8750, createdAt: '2024-04-18', dueDate: '2024-05-02', items: [{ description: 'Progress Payment (35%)', amount: 8750 }] },
  { id: 'INV-003', projectId: '2', customerId: '2', status: 'paid', amount: 22750, createdAt: '2024-04-10', dueDate: '2024-04-10', paidAt: '2024-04-12', items: [{ description: 'Initial Deposit (35%)', amount: 22750 }] },
  { id: 'INV-004', projectId: '2', customerId: '2', status: 'overdue', amount: 16250, createdAt: '2024-03-20', dueDate: '2024-04-15', items: [{ description: 'Progress Payment', amount: 16250 }] },
  { id: 'INV-005', projectId: '3', customerId: '3', status: 'paid', amount: 17500, createdAt: '2024-03-01', dueDate: '2024-03-01', paidAt: '2024-03-01', items: [{ description: 'Initial Deposit (35%)', amount: 17500 }] },
  { id: 'INV-006', projectId: '3', customerId: '3', status: 'paid', amount: 17500, createdAt: '2024-03-15', dueDate: '2024-03-15', paidAt: '2024-03-20', items: [{ description: 'Progress Payment', amount: 17500 }] },
  { id: 'INV-007', projectId: '3', customerId: '3', status: 'paid', amount: 15000, createdAt: '2024-03-30', dueDate: '2024-03-30', paidAt: '2024-04-05', items: [{ description: 'Final Payment (30%)', amount: 15000 }] },
  { id: 'INV-008', projectId: '4', customerId: '4', status: 'draft', amount: 26250, createdAt: '2024-04-15', dueDate: '2024-05-15', items: [{ description: 'Progress Payment', amount: 26250 }] },
  { id: 'INV-009', projectId: '5', customerId: '5', status: 'sent', amount: 8750, createdAt: '2024-04-08', dueDate: '2024-04-22', items: [{ description: 'Initial Deposit (35%)', amount: 8750 }] },
  { id: 'INV-010', projectId: '6', customerId: '6', status: 'viewed', amount: 7700, createdAt: '2024-03-15', dueDate: '2024-03-30', paidAt: '2024-03-28', items: [{ description: 'Full Payment', amount: 7700 }] },
];

// ESTIMATES - All statuses represented
export const estimates: Estimate[] = [
  { id: 'EST-001', leadId: '3', status: 'draft', amount: 28000, createdAt: '2024-04-08', validUntil: '2024-05-08', items: [
    { description: 'Bathroom demolition', amount: 3500 },
    { description: 'New fixtures installation', amount: 6500 },
    { description: 'Tile work - floor and walls', amount: 5500 },
    { description: 'Plumbing rough-in and finish', amount: 4500 },
    { description: 'Electrical updates', amount: 3000 },
    { description: 'Paint and finishing', amount: 5000 },
  ]},
  { id: 'EST-002', leadId: '4', status: 'sent', amount: 22000, createdAt: '2024-04-05', validUntil: '2024-05-05', sentAt: '2024-04-06', items: [
    { description: 'Old roof removal and disposal', amount: 4000 },
    { description: 'New architectural shingles', amount: 9500 },
    { description: 'Deck repair and replacement', amount: 3500 },
    { description: 'Flashing and ventilation', amount: 3000 },
    { description: 'Labor and installation', amount: 2000 },
  ]},
  { id: 'EST-003', leadId: '2', status: 'approved', amount: 55000, createdAt: '2024-04-11', validUntil: '2024-05-11', sentAt: '2024-04-12', viewedAt: '2024-04-13', approvedAt: '2024-04-15', items: [
    { description: 'Basement excavation and prep', amount: 8000 },
    { description: 'Foundation work', amount: 12000 },
    { description: 'Framing and structure', amount: 10000 },
    { description: 'Electrical rough-in', amount: 5500 },
    { description: 'Plumbing rough-in', amount: 4500 },
    { description: 'Drywall and insulation', amount: 6000 },
    { description: 'Flooring installation', amount: 5000 },
    { description: 'Paint and trim', amount: 4000 },
  ]},
  { id: 'EST-004', leadId: '1', status: 'viewed', amount: 45000, createdAt: '2024-04-13', validUntil: '2024-05-13', sentAt: '2024-04-14', viewedAt: '2024-04-15', items: [
    { description: 'Kitchen demolition', amount: 5000 },
    { description: 'Custom cabinets', amount: 18000 },
    { description: 'Countertops - quartz', amount: 8500 },
    { description: 'Appliances', amount: 6500 },
    { description: 'Installation labor', amount: 7000 },
  ]},
  { id: 'EST-005', leadId: '6', status: 'rejected', amount: 35000, createdAt: '2024-03-20', validUntil: '2024-04-20', sentAt: '2024-03-21', viewedAt: '2024-03-25', rejectedAt: '2024-03-28', items: [
    { description: 'Deck construction - materials', amount: 15000 },
    { description: 'Deck construction - labor', amount: 12000 },
    { description: 'Railings and stairs', amount: 5000 },
    { description: 'Permit and inspection fees', amount: 3000 },
  ]},
  { id: 'EST-006', leadId: '9', status: 'sent', amount: 95000, createdAt: '2024-04-09', validUntil: '2024-05-09', sentAt: '2024-04-10', items: [
    { description: 'Foundation and slab', amount: 25000 },
    { description: 'Framing structure', amount: 30000 },
    { description: 'Roofing', amount: 15000 },
    { description: 'Windows and exterior doors', amount: 12000 },
    { description: 'Electrical and plumbing', amount: 8000 },
    { description: 'Insulation and drywall', amount: 5000 },
  ]},
];

// TIME ENTRIES - Comprehensive coverage across workers, projects, dates
export const timeEntries: TimeEntry[] = [
  // Project 1 - Bathroom Remodel
  { id: 'te1', workerId: '1', projectId: '1', taskId: 't1', date: '2024-04-14', hours: 8, notes: 'Completed demolition and debris removal' },
  { id: 'te2', workerId: '2', projectId: '1', taskId: 't3', date: '2024-04-15', hours: 6, notes: 'Electrical rough-in for shower and vanity' },
  { id: 'te3', workerId: '3', projectId: '1', taskId: 't2', date: '2024-04-15', hours: 6, notes: 'Plumbing rough-in completed' },
  { id: 'te4', workerId: '2', projectId: '1', taskId: 't3', date: '2024-04-16', hours: 6, notes: 'Finished electrical rough-in, passed inspection' },
  { id: 'te5', workerId: '3', projectId: '1', taskId: 't4', date: '2024-04-16', hours: 5, notes: 'Started shower pan installation' },
  { id: 'te6', workerId: '3', projectId: '1', taskId: 't4', date: '2024-04-17', hours: 7, notes: 'Continued shower installation, waterproofing' },
  { id: 'te7', workerId: '1', projectId: '1', taskId: 't5', date: '2024-04-17', hours: 4, notes: 'Began prep work for tile installation' },

  // Project 2 - Kitchen Renovation
  { id: 'te8', workerId: '1', projectId: '2', taskId: 't7', date: '2024-04-10', hours: 8, notes: 'Kitchen demolition day 1' },
  { id: 'te9', workerId: '1', projectId: '2', taskId: 't7', date: '2024-04-11', hours: 8, notes: 'Kitchen demolition day 2, cleanup complete' },
  { id: 'te10', workerId: '6', projectId: '2', taskId: 't8', date: '2024-04-12', hours: 8, notes: 'Started cabinet installation' },
  { id: 'te11', workerId: '6', projectId: '2', taskId: 't8', date: '2024-04-13', hours: 8, notes: 'Continued cabinet installation' },
  { id: 'te12', workerId: '6', projectId: '2', taskId: 't8', date: '2024-04-14', hours: 6, notes: 'Upper cabinets installed' },
  { id: 'te13', workerId: '6', projectId: '2', taskId: 't8', date: '2024-04-15', hours: 8, notes: 'Lower cabinets installed' },
  { id: 'te14', workerId: '6', projectId: '2', taskId: 't8', date: '2024-04-16', hours: 7, notes: 'Final cabinet adjustments and trim' },

  // Project 3 - Basement Finishing (completed)
  { id: 'te15', workerId: '6', projectId: '3', taskId: 't13', date: '2024-03-01', hours: 8, notes: 'Framing started' },
  { id: 'te16', workerId: '6', projectId: '3', taskId: 't13', date: '2024-03-02', hours: 8, notes: 'Framing continued' },
  { id: 'te17', workerId: '1', projectId: '3', taskId: 't14', date: '2024-03-06', hours: 8, notes: 'Electrical rough-in started' },
  { id: 'te18', workerId: '3', projectId: '3', taskId: 't15', date: '2024-03-06', hours: 8, notes: 'Plumbing rough-in for bathroom' },
  { id: 'te19', workerId: '1', projectId: '3', taskId: 't14', date: '2024-03-08', hours: 8, notes: 'Electrical rough-in completed' },
  { id: 'te20', workerId: '6', projectId: '3', taskId: 't16', date: '2024-03-11', hours: 8, notes: 'Drywall installation started' },
  { id: 'te21', workerId: '6', projectId: '3', taskId: 't16', date: '2024-03-15', hours: 8, notes: 'Drywall mudding and taping' },
  { id: 'te22', workerId: '1', projectId: '3', taskId: 't18', date: '2024-03-26', hours: 8, notes: 'Paint started' },

  // Project 4 - Home Office Addition (on hold)
  { id: 'te23', workerId: '1', projectId: '4', taskId: 't19', date: '2024-04-01', hours: 8, notes: 'Foundation excavation' },
  { id: 'te24', workerId: '1', projectId: '4', taskId: 't19', date: '2024-04-03', hours: 8, notes: 'Concrete pour' },
  { id: 'te25', workerId: '6', projectId: '4', taskId: 't20', date: '2024-04-09', hours: 8, notes: 'Framing started' },
  { id: 'te26', workerId: '6', projectId: '4', taskId: 't20', date: '2024-04-11', hours: 8, notes: 'Framing continued' },

  // Project 5 - Roof Replacement
  { id: 'te27', workerId: '1', projectId: '5', taskId: 't25', date: '2024-04-08', hours: 8, notes: 'Old roof removal started' },
  { id: 'te28', workerId: '1', projectId: '5', taskId: 't25', date: '2024-04-09', hours: 8, notes: 'Old roof removal completed' },
  { id: 'te29', workerId: '6', projectId: '5', taskId: 't26', date: '2024-04-10', hours: 8, notes: 'Deck repair and replacement' },
  { id: 'te30', workerId: '1', projectId: '5', taskId: 't27', date: '2024-04-11', hours: 8, notes: 'Underlayment installation' },
  { id: 'te31', workerId: '1', projectId: '5', taskId: 't28', date: '2024-04-13', hours: 8, notes: 'Shingle installation started' },
  { id: 'te32', workerId: '1', projectId: '5', taskId: 't28', date: '2024-04-15', hours: 8, notes: 'Shingle installation continued' },
  { id: 'te33', workerId: '1', projectId: '5', taskId: 't28', date: '2024-04-17', hours: 6, notes: 'Shingle installation nearly complete' },

  // Project 6 - HVAC Installation (completed)
  { id: 'te34', workerId: '7', projectId: '6', taskId: 't30', date: '2024-03-15', hours: 8, notes: 'Ductwork installation started' },
  { id: 'te35', workerId: '1', projectId: '6', taskId: 't32', date: '2024-03-20', hours: 8, notes: 'Electrical connections for HVAC' },
];

// FILES - Comprehensive with all types
export const files: File[] = [
  // Project 1 - Bathroom Remodel
  { id: 'f1', name: 'Bathroom_Design_Plan_v2.pdf', type: 'document', size: 2500000, projectId: '1', uploadedAt: '2024-04-10', uploadedBy: workers[3], url: 'https://example.com/files/bathroom_plan.pdf' },
  { id: 'f2', name: 'Before_Photo_Bathroom.jpg', type: 'image', size: 1800000, projectId: '1', uploadedAt: '2024-04-11', uploadedBy: workers[0], url: 'https://img.heroui.chat/image/places?w=800&h=600&u=bathroom_before' },
  { id: 'f3', name: 'Progress_Day_4.jpg', type: 'image', size: 2200000, projectId: '1', uploadedAt: '2024-04-17', uploadedBy: workers[1], url: 'https://img.heroui.chat/image/places?w=800&h=600&u=bathroom_progress' },
  { id: 'f4', name: 'Material_Order_List.xlsx', type: 'spreadsheet', size: 45000, projectId: '1', uploadedAt: '2024-04-12', uploadedBy: workers[3], url: 'https://example.com/files/materials.xlsx' },
  { id: 'f5', name: 'Plumbing_Inspection_Report.pdf', type: 'document', size: 890000, projectId: '1', uploadedAt: '2024-04-16', uploadedBy: workers[2], url: 'https://example.com/files/plumbing_insp.pdf' },

  // Project 2 - Kitchen Renovation
  { id: 'f6', name: 'Kitchen_3D_Design.dwg', type: 'document', size: 5600000, projectId: '2', uploadedAt: '2024-04-05', uploadedBy: workers[9], url: 'https://example.com/files/kitchen_3d.dwg' },
  { id: 'f7', name: 'Contract_Signed.pdf', type: 'document', size: 1500000, projectId: '2', uploadedAt: '2024-04-05', uploadedBy: workers[4], url: 'https://example.com/files/contract_kitchen.pdf' },
  { id: 'f8', name: 'Cabinet_Layout.jpg', type: 'image', size: 1900000, projectId: '2', uploadedAt: '2024-04-12', uploadedBy: workers[8], url: 'https://img.heroui.chat/image/places?w=800&h=600&u=cabinet_layout' },
  { id: 'f9', name: 'Before_Kitchen.jpg', type: 'image', size: 2100000, projectId: '2', uploadedAt: '2024-04-10', uploadedBy: workers[0], url: 'https://img.heroui.chat/image/places?w=800&h=600&u=kitchen_before' },
  { id: 'f10', name: 'Progress_Cabinets.jpg', type: 'image', size: 1950000, projectId: '2', uploadedAt: '2024-04-15', uploadedBy: workers[6], url: 'https://img.heroui.chat/image/places?w=800&h=600&u=cabinets_progress' },
  { id: 'f11', name: 'Appliance_Schedule.xlsx', type: 'spreadsheet', size: 38000, projectId: '2', uploadedAt: '2024-04-08', uploadedBy: workers[8], url: 'https://example.com/files/appliances.xlsx' },

  // Project 3 - Basement Finishing
  { id: 'f12', name: 'Basement_Floor_Plan.pdf', type: 'document', size: 1200000, projectId: '3', uploadedAt: '2024-02-25', uploadedBy: workers[9], url: 'https://example.com/files/basement_plan.pdf' },
  { id: 'f13', name: 'Before_Basement.jpg', type: 'image', size: 1650000, projectId: '3', uploadedAt: '2024-02-28', uploadedBy: workers[3], url: 'https://img.heroui.chat/image/places?w=800&h=600&u=basement_before' },
  { id: 'f14', name: 'Final_Basement.jpg', type: 'image', size: 2300000, projectId: '3', uploadedAt: '2024-03-30', uploadedBy: workers[6], url: 'https://img.heroui.chat/image/places?w=800&h=600&u=basement_final' },
  { id: 'f15', name: 'Change_Order_1.pdf', type: 'document', size: 450000, projectId: '3', uploadedAt: '2024-03-10', uploadedBy: workers[3], url: 'https://example.com/files/change_order_1.pdf' },

  // Project 4 - Home Office Addition
  { id: 'f16', name: 'Addition_Blueprints.pdf', type: 'document', size: 7800000, projectId: '4', uploadedAt: '2024-03-20', uploadedBy: workers[9], url: 'https://example.com/files/addition_bp.pdf' },
  { id: 'f17', name: 'Building_Permit.pdf', type: 'document', size: 920000, projectId: '4', uploadedAt: '2024-03-25', uploadedBy: workers[3], url: 'https://example.com/files/building_permit.pdf' },
  { id: 'f18', name: 'Foundation_Photo.jpg', type: 'image', size: 1750000, projectId: '4', uploadedAt: '2024-04-03', uploadedBy: workers[0], url: 'https://img.heroui.chat/image/places?w=800&h=600&u=foundation' },

  // Project 5 - Roof Replacement
  { id: 'f19', name: 'Roof_Inspection_Before.pdf', type: 'document', size: 650000, projectId: '5', uploadedAt: '2024-04-05', uploadedBy: workers[3], url: 'https://example.com/files/roof_insp.pdf' },
  { id: 'f20', name: 'Roof_Before.jpg', type: 'image', size: 1550000, projectId: '5', uploadedAt: '2024-04-07', uploadedBy: workers[0], url: 'https://img.heroui.chat/image/places?w=800&h=600&u=roof_before' },
  { id: 'f21', name: 'Roof_In_Progress.jpg', type: 'image', size: 1820000, projectId: '5', uploadedAt: '2024-04-14', uploadedBy: workers[0], url: 'https://img.heroui.chat/image/places?w=800&h=600&u=roof_progress' },
  { id: 'f22', name: 'Material_Order_Roofing.xlsx', type: 'spreadsheet', size: 28000, projectId: '5', uploadedAt: '2024-04-06', uploadedBy: workers[4], url: 'https://example.com/files/roofing_materials.xlsx' },

  // Project 6 - HVAC Installation
  { id: 'f23', name: 'HVAC_Load_Calculations.pdf', type: 'document', size: 890000, projectId: '6', uploadedAt: '2024-03-10', uploadedBy: workers[7], url: 'https://example.com/files/hvac_load.pdf' },
  { id: 'f24', name: 'HVAC_Installation.jpg', type: 'image', size: 1680000, projectId: '6', uploadedAt: '2024-03-19', uploadedBy: workers[7], url: 'https://img.heroui.chat/image/places?w=800&h=600&u=hvac_install' },
];

// Dashboard data
export const financialSummary: FinancialSummary = {
  revenue: 189000,
  balance: 95600,
  feesEarned: 45000,
  chargebackRate: 27650,
  totalTransactions: 162000,
  plannedPayouts: 86200,
  successfulPayments: 134500,
  failedPayments: 2150
};

export const revenueData = [
  { day: 'Mon 08', value: 12000 },
  { day: 'Tue 09', value: 8000 },
  { day: 'Wed 10', value: 15000 },
  { day: 'Thu 11', value: 22000 },
  { day: 'Fri 12', value: 18000 },
  { day: 'Sat 13', value: 25000 },
  { day: 'Sun 14', value: 35000 },
  { day: 'Mon 15', value: 28000 },
  { day: 'Tue 16', value: 15000 },
  { day: 'Wed 17', value: 11000 },
];

export const transactionData = [
  { day: 'Mon 08', value: 8000 },
  { day: 'Tue 09', value: 6000 },
  { day: 'Wed 10', value: 12000 },
  { day: 'Thu 11', value: 18000 },
  { day: 'Fri 12', value: 14000 },
  { day: 'Sat 13', value: 20000 },
  { day: 'Sun 14', value: 28000 },
  { day: 'Mon 15', value: 22000 },
  { day: 'Tue 16', value: 10000 },
  { day: 'Wed 17', value: 8000 },
];

export const topMerchants = [
  { id: '1', name: 'Home Depot Supply', email: 'supply@homedepot.com', amount: 42871 },
  { id: '2', name: 'Flooring Masters', email: 'orders@flooringmasters.com', amount: 36125 },
  { id: '3', name: 'Cabinet World', email: 'sales@cabinetworld.com', amount: 29710 },
  { id: '4', name: 'Roofing Depot', email: 'supply@roofingdepot.com', amount: 22350 },
  { id: '5', name: 'Plumbing Supplies Co', email: 'orders@plumbingsupplies.com', amount: 18930 },
];

export const currencyBalances = [
  { currency: 'USD', amount: 95600.00 },
  { currency: 'EUR', amount: 82100.00 },
  { currency: 'GBP', amount: 68400.00 },
];

// FAQ data
export const faqCategories = [
  {
    id: '1', name: 'Getting Started', questions: [
      { id: 'q1', question: 'How do I create my first project?', answer: 'Navigate to the Projects page and click the "New Project" button. Fill in the project details including customer information, start date, and estimated budget.' },
      { id: 'q2', question: 'How do I add team members?', answer: 'Go to Settings > Team Management and click "Add Team Member". Enter their details and assign their role.' },
      { id: 'q3', question: 'Can I import existing customer data?', answer: 'Yes! Go to Customers page and click "Import" to upload a CSV file with your customer information.' },
    ]
  },
  {
    id: '2', name: 'Project Management', questions: [
      { id: 'q4', question: 'How do I track project progress?', answer: 'Each project has a progress bar and task list. Update task statuses as work is completed, and the overall progress will calculate automatically.' },
      { id: 'q5', question: 'How do I assign workers to tasks?', answer: 'Open a project, go to the Tasks tab, and click on a task. You can assign any worker from your team to that task.' },
      { id: 'q6', question: 'Can I add files to a project?', answer: 'Yes! Go to the Photos/Files tab within a project and upload any relevant documents, photos, or specifications.' },
    ]
  },
  {
    id: '3', name: 'Billing & Invoicing', questions: [
      { id: 'q7', question: 'How do I create an invoice?', answer: 'Go to Invoices page, click "Create Invoice", select a customer and project, add line items, and save. You can then send it directly to the customer.' },
      { id: 'q8', question: 'How do I track payments?', answer: 'Open any invoice and click "Record Payment". Enter the payment amount, date, and method. The invoice status will update automatically.' },
      { id: 'q9', question: 'Can I set up payment reminders?', answer: 'Yes! Go to Settings > Billing and enable automatic payment reminders. Choose when reminders should be sent before and after due dates.' },
    ]
  },
  {
    id: '4', name: 'Time Tracking', questions: [
      { id: 'q10', question: 'How do workers log their time?', answer: 'Workers can access the Time Tracking page and add entries for their work. They select the project, task, date, and hours worked.' },
      { id: 'q11', question: 'Can I approve time entries?', answer: 'As a manager, you can review all time entries and approve or reject them. This ensures accurate billing and payroll.' },
      { id: 'q12', question: 'How do I generate time reports?', answer: 'Go to Reports > Time Tracking. You can filter by date range, worker, or project and export the data as needed.' },
    ]
  },
  {
    id: '5', name: 'Lead Management', questions: [
      { id: 'q13', question: 'How do I add a new lead?', answer: 'Go to the Leads page and click "Add Lead". Enter the contact information, source, and estimated value.' },
      { id: 'q14', question: 'How do I move leads through the pipeline?', answer: 'Open a lead and change its status from new → contacted → qualified → proposal → converted. Each stage represents progress in the sales process.' },
      { id: 'q15', question: 'Can I create estimates for leads?', answer: 'Yes! When a lead reaches the qualified or proposal stage, you can create detailed estimates with multiple line items.' },
    ]
  },
];

// Map locations
export const locations = [
  { id: '1', projectId: '1', address: '1772 Willow Lane, Boston, MA 02108', lat: 42.3601, lng: -71.0589 },
  { id: '2', projectId: '2', address: '123 Main Street, Cambridge, MA 02139', lat: 42.3545, lng: -71.0643 },
  { id: '3', projectId: '3', address: '456 Oak Avenue, Newton, MA 02458', lat: 42.3370, lng: -71.2092 },
  { id: '4', projectId: '4', address: '789 Pine Street, Brookline, MA 02445', lat: 42.3798, lng: -71.1204 },
  { id: '5', projectId: '5', address: '987 Cedar Court, Worcester, MA 01609', lat: 42.2626, lng: -71.8023 },
  { id: '6', projectId: '6', address: '321 Elm Road, Somerville, MA 02143', lat: 42.4254, lng: -71.0990 },
];
