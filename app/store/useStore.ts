import { create } from 'zustand';

export interface RobotStats {
  battery: number;
  armor: number;
  weaponHeat: number;
  stability: number;
}

export interface RobotComponent {
  id: string;
  name: string;
  durability: number;
  damaged: boolean;
  critical: boolean;
}

export interface Part {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'core' | 'limb';
  durability: number;
  weight: number;
  compatible: boolean;
  illegal: boolean;
}

export interface Alert {
  id: string;
  type: 'crew' | 'authority' | 'system' | 'warning';
  message: string;
  timestamp: number;
  acknowledged: boolean;
}

export interface BattleReplay {
  id: string;
  date: string;
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  duration: number;
}

export type ArmState = 'normal' | 'damaged' | 'repaired';

export interface ArmInfo {
  state: ArmState;
  health: number;
  repairTime: number;
  materialCost: number;
  upgrades: string[];
}

interface AppState {
  robotStats: RobotStats;
  components: RobotComponent[];
  parts: Part[];
  alerts: Alert[];
  replays: BattleReplay[];
  notoriety: number;
  currentPage: string;
  armInfo: ArmInfo;
  selectedArm: boolean;
  
  setRobotStats: (stats: Partial<RobotStats>) => void;
  updateComponent: (id: string, updates: Partial<RobotComponent>) => void;
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp' | 'acknowledged'>) => void;
  acknowledgeAlert: (id: string) => void;
  addReplay: (replay: Omit<BattleReplay, 'id'>) => void;
  setNotoriety: (value: number) => void;
  setArmInfo: (info: Partial<ArmInfo>) => void;
  setSelectedArm: (selected: boolean) => void;
  setArmState: (state: ArmState) => void;
}

const initialStats: RobotStats = {
  battery: 75,
  armor: 60,
  weaponHeat: 30,
  stability: 85,
};

const initialComponents: RobotComponent[] = [
  { id: 'left-arm', name: 'Left Arm', durability: 40, damaged: true, critical: false },
  { id: 'right-arm', name: 'Right Arm', durability: 90, damaged: false, critical: false },
  { id: 'core', name: 'Core', durability: 65, damaged: true, critical: true },
  { id: 'left-leg', name: 'Left Leg', durability: 80, damaged: false, critical: false },
  { id: 'right-leg', name: 'Right Leg', durability: 85, damaged: false, critical: false },
];

const initialParts: Part[] = [
  { id: '1', name: 'Plasma Cannon Mk.II', type: 'weapon', durability: 85, weight: 45, compatible: true, illegal: false },
  { id: '2', name: 'Reinforced Chassis', type: 'armor', durability: 70, weight: 120, compatible: true, illegal: false },
  { id: '3', name: 'Overclocked Core', type: 'core', durability: 50, weight: 30, compatible: false, illegal: true },
  { id: '4', name: 'Hydraulic Arm', type: 'limb', durability: 90, weight: 60, compatible: true, illegal: false },
];

const initialReplays: BattleReplay[] = [
  { id: '1', date: '2027-10-25', opponent: 'Iron Mongrels', result: 'win', duration: 180 },
  { id: '2', date: '2027-10-24', opponent: 'Steel Hawks', result: 'loss', duration: 95 },
  { id: '3', date: '2027-10-23', opponent: 'Rust Riders', result: 'win', duration: 210 },
];

const initialArmInfo: ArmInfo = {
  state: 'damaged',
  health: 40,
  repairTime: 120,
  materialCost: 850,
  upgrades: ['Reinforced Joints', 'Enhanced Grip', 'Quick Release'],
};

export const useStore = create<AppState>((set) => ({
  robotStats: initialStats,
  components: initialComponents,
  parts: initialParts,
  alerts: [],
  replays: initialReplays,
  notoriety: 45,
  currentPage: '/robot',
  armInfo: initialArmInfo,
  selectedArm: false,
  
  setRobotStats: (stats) => set((state) => ({
    robotStats: { ...state.robotStats, ...stats },
  })),
  
  updateComponent: (id, updates) => set((state) => ({
    components: state.components.map((c) =>
      c.id === id ? { ...c, ...updates } : c
    ),
  })),
  
  addAlert: (alert) => set((state) => ({
    alerts: [
      ...state.alerts,
      {
        ...alert,
        id: Date.now().toString(),
        timestamp: Date.now(),
        acknowledged: false,
      },
    ],
  })),
  
  acknowledgeAlert: (id) => set((state) => ({
    alerts: state.alerts.map((a) =>
      a.id === id ? { ...a, acknowledged: true } : a
    ),
  })),
  
  addReplay: (replay) => set((state) => ({
    replays: [
      { ...replay, id: Date.now().toString() },
      ...state.replays,
    ],
  })),
  
  setNotoriety: (value) => set({ notoriety: Math.max(0, Math.min(100, value)) }),
  
  setArmInfo: (info) => set((state) => ({
    armInfo: { ...state.armInfo, ...info },
  })),
  
  setSelectedArm: (selected) => set({ selectedArm: selected }),
  
  setArmState: (state) => set((store) => ({
    armInfo: { ...store.armInfo, state },
  })),
}));
