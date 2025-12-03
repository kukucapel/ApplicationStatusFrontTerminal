export interface Unit {
  id: number;
  unit_name: string;
  children: Record<string, Unit>;
}
