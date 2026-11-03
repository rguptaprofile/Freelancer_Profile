declare module 'lucide-react' {
  import * as React from 'react';
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }
  export type LucideIcon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;

  export const ArrowRight: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const Check: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const Shield: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Code2: LucideIcon;
  export const PenTool: LucideIcon;
  export const Rocket: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Terminal: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Mail: LucideIcon;
  export const Eye: LucideIcon;
  export const EyeOff: LucideIcon;
  export const ThumbsUp: LucideIcon;
  export const Share2: LucideIcon;
  export const Clock: LucideIcon;
  export const Layers: LucideIcon;
  export const FileText: LucideIcon;
  export const FileSignature: LucideIcon;
  export const Copy: LucideIcon;
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const Calendar: LucideIcon;
  export const Star: LucideIcon;
  export const Filter: LucideIcon;
  export const GitCommit: LucideIcon;
  export const GitPullRequest: LucideIcon;
  export const UserCheck: LucideIcon;
  export const User: LucideIcon;
  export const Award: LucideIcon;
  export const GraduationCap: LucideIcon;
  export const Building2: LucideIcon;
  export const Quote: LucideIcon;
  export const BookOpen: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const Send: LucideIcon;
  export const Printer: LucideIcon;
  export const Download: LucideIcon;
  export const Heart: LucideIcon;
  export const ClipboardCheck: LucideIcon;
  export const Layout: LucideIcon;
  export const ZoomIn: LucideIcon;
  export const ZoomOut: LucideIcon;
  export const Maximize2: LucideIcon;
  export const Briefcase: LucideIcon;
  export const CreditCard: LucideIcon;
  export const QrCode: LucideIcon;
  export const DollarSign: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const MapPin: LucideIcon;
  export const Globe: LucideIcon;
  export const Upload: LucideIcon;
  export const Lock: LucideIcon;
  export const BadgeCheck: LucideIcon;
  export const Smartphone: LucideIcon;

  const icons: Record<string, LucideIcon>;
  export default icons;
}
