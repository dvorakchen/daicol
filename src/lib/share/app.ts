export enum AppStatus {
	Enabled = 0,
	Disabled = 1,
}

/**
 * App Categorys
 * 
 * the value is paraglide messages key, for i18n
 * 
 * # Usage:
 * 
 * ```ts
 * import { m } from '$lib/paraglide/messages';
 * const creativeDesign = AppCategory.creativeDesign;
 * 
 * const label = m[creativeDesign]();
 * ```
 */
export const AppCategory = {
	creativeDesign: 'app.category.creative_design',
};