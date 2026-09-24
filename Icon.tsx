// src/components/ui/Icon/Icon.tsx
import * as LucideIcons from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

export const iconVariants = tv({
  base: 'shrink-0 transition-colors',
  variants: {
    size: {
      xs: 'size-3.5', // 14px
      sm: 'size-4', // 16px
      md: 'size-5', // 20px
      lg: 'size-6', // 24px
      xl: 'size-8', // 32px
      // Internal "unset" option (not part of the public API, see IconProps).
      // Emits no size class, so SVG width/height attributes become the only source of size.
      custom: '',
    },
    color: {
      primary: 'text-blue-600',
      error: 'text-red-600',
      success: 'text-green-600',
      muted: 'text-gray-400',
      current: 'text-current',
    },
  },
  defaultVariants: {
    size: 'sm',
    color: 'current',
  },
});

type IconVariantProps = VariantProps<typeof iconVariants>;

export type IconName = keyof typeof LucideIcons;

export interface IconProps extends Omit<IconVariantProps, 'size'> {
  name: IconName;
  /** Preset size. Ignored when `customSize` is provided. */
  size?: Exclude<IconVariantProps['size'], 'custom'>;
  className?: string;
  strokeWidth?: number;
  /** Arbitrary size in px (applied to SVG width/height). Takes precedence over `size`. */
  customSize?: number;
}

export const Icon = ({
  name,
  size,
  color,
  className,
  strokeWidth = 2,
  customSize,
}: IconProps) => {
  // Lucide types their exports as LucideIcon
  const IconComponent = LucideIcons[name] as LucideIcons.LucideIcon;
  const hasCustomSize = customSize !== undefined;

  return (
    <IconComponent
      // Lucide maps `size` to the SVG width/height attributes.
      // CSS classes beat presentation attributes, so the size class must be dropped
      // (see the `custom` variant) or it would silently override this value.
      size={customSize}
      className={iconVariants({
        size: hasCustomSize ? 'custom' : size,
        color,
        className,
      })}
      strokeWidth={strokeWidth}
    />
  );
};
