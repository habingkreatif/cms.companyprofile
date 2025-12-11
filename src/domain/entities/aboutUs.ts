export interface OrgNode {
  id: string;
  name: string;
  position: string;
  photo?: string; // URL to profile photo
  children?: OrgNode[];
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  website?: string;
  twitter?: string;
}

export interface AboutUs {
  companyName: string;
  description: string;
  vision: string;
  mission: string;
  history: string;
  email: string;
  phone: string;
  address: string;
  logoUrl?: string;
  organizationStructure?: OrgNode[];
  socialMedia?: SocialMedia;
}
