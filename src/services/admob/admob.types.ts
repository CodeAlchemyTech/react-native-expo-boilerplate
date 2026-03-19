export interface IAdmobService {
  initialize(): Promise<void>;
  showInterstitial(unitId: string): Promise<void>;
}

export interface BannerAdProps {
  unitId?: string;
  className?: string;
}

export interface InterstitialAdManagerProps {
  unitId?: string;
}
