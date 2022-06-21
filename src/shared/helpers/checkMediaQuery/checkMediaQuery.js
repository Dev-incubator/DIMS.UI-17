import { BREAKPOINTS } from '../../constants';

export const isLargeScreen = (screenWidth) => screenWidth <= BREAKPOINTS.lg;
export const isMediumScreen = (screenWidth) => screenWidth <= BREAKPOINTS.md;
export const isSmallScreen = (screenWidth) => screenWidth <= BREAKPOINTS.sm;
