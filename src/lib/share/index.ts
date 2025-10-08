// import { UserStatus } from '$lib/share/user.ts';

export const permissions = {
	baseAccess: 'base_access',
	adminAccess: 'admin_access',
	premiumFeatures: 'premium_features',
	prioritySupport: 'priority_support'
} as const;

export const themePrefer = {
	light: 'corporate',
	dark: 'sunset'
} as const;

export const QS_REDIRECT_KEY = 'redirect';
