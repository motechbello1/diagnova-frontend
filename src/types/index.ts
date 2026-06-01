export interface Assessment {
  app_name: string;
  platform: string;
  composite_score: number;
  dimensions: { performance: number; stability: number; usability: number; fault_tolerance: number; };
  issues: Issue[];
  recommendations: string[];
  rules_fired: number;
  timestamp: string;
}

export interface Issue {
  dimension: string;
  severity: string;
  issue: string;
  rule_id: string;
}
