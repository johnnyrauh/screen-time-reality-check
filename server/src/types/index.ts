export interface ScreenTimeData {
  dailyAverage: number;
  weeklyTotal: number;
  topApps: AppUsage[];
  timePeriod: string;
}

export interface AppUsage {
  name: string;
  hours: number;
  category?: string;
}

export interface QuestionnaireData {
  screenTimeData: ScreenTimeData;
  dreamGoal: string;
  workHours: string;
  role: string;
  regretApp: string;
  regretReason?: string;
  wantTimeBack: string[];
  phoneRelationship: string;
  changeSeriousness: string;
  successDefinition: string;
}

export interface AnalysisResult {
  bigNumber: {
    yearlyDays: number;
    percentOfWakingLife: number;
    comparisonToWork: string;
  };
  translation: {
    app: string;
    hours: number;
    equivalent: string;
  }[];
  gutPunch: string;
  patterns: string[];
  opportunityCost: {
    oneMonth: string;
    threeMonths: string;
    sixMonths: string;
    oneYear: string;
  };
  reclaimPlan: {
    quickWin: string;
    highImpact: string;
    longTerm: string;
  };
}
