

import React from 'react';
import { Text, Badge, ActionIcon, Group } from '@mantine/core';
import { IconEye, IconEdit, IconTrash } from '@tabler/icons-react';
import {
  COLORS,
  VARIANTS,
  SIZES,
  FONT_WEIGHTS,
  ICON_SIZES,
} from '../constants/ui';
import { formatCurrency, formatDate } from './formatters';


import { CellType, CELL_TYPES } from '../constants/tableStrings';

export type { CellType };


export interface TextStyle {
  size?: keyof typeof SIZES;
  weight?: keyof typeof FONT_WEIGHTS;
  className?: string;
}


export interface BadgeConfig {
  colorMapping?: Record<string, string>;
  statusMapping?: Record<string, string>;
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
}


export interface ActionConfig<T = Record<string, unknown>> {
  view?: {
    show: boolean;
    handler?: (item: T) => void;
    icon?: React.ReactNode;
    color?: string;
  };
  edit?: {
    show: boolean;
    handler?: (item: T) => void;
    icon?: React.ReactNode;
    color?: string;
  };
  delete?: {
    show: boolean;
    handler?: (item: T) => void;
    icon?: React.ReactNode;
    color?: string;
  };
}


export interface ColumnConfig<T = Record<string, unknown>> {
  key: string;
  type: CellType;
  field?: string;
  textStyle?: TextStyle;
  badgeConfig?: BadgeConfig;
  actionConfig?: ActionConfig<T>;
  className?: string;
}


export interface TableConfig<T = Record<string, unknown>> {
  columns: ColumnConfig<T>[];
  rowClassName?: string;
  actionClassName?: string;
}


export const renderTableCell = <T = Record<string, unknown>>(
  column: ColumnConfig<T>,
  item: T,
  config?: {
    actionClassName?: string;
  }
): React.ReactNode => {
  const fieldValue = column.field ? (item as Record<string, unknown>)[column.field] : null;
  

  const safeValue = (value: unknown): React.ReactNode => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }
    return String(value);
  };

  switch (column.type) {
    case CELL_TYPES.TEXT:
      return (
        <Text
          size={column.textStyle?.size || SIZES.SM}
          fw={column.textStyle?.weight ? FONT_WEIGHTS[column.textStyle.weight] : undefined}
          className={column.textStyle?.className}
        >
          {safeValue(fieldValue)}
        </Text>
      );

    case CELL_TYPES.NUMBER:
      return (
        <Text
          size={column.textStyle?.size || SIZES.SM}
          fw={column.textStyle?.weight ? FONT_WEIGHTS[column.textStyle.weight] : FONT_WEIGHTS.SEMIBOLD}
          className={column.textStyle?.className}
        >
          {safeValue(fieldValue)}
        </Text>
      );

    case CELL_TYPES.CURRENCY:
      return (
        <Text
          size={column.textStyle?.size || SIZES.SM}
          fw={column.textStyle?.weight ? FONT_WEIGHTS[column.textStyle.weight] : FONT_WEIGHTS.SEMIBOLD}
          className={column.textStyle?.className}
        >
          {formatCurrency(fieldValue as number)}
        </Text>
      );

    case CELL_TYPES.DATE:
      return (
        <Text
          size={column.textStyle?.size || SIZES.SM}
          fw={column.textStyle?.weight ? FONT_WEIGHTS[column.textStyle.weight] : undefined}
          className={column.textStyle?.className}
        >
          {formatDate(String(fieldValue || ''))}
        </Text>
      );

    case CELL_TYPES.BADGE:
      const badgeConfig = column.badgeConfig || {};
      const fieldStr = String(fieldValue || '');
      const badgeColor = badgeConfig.colorMapping?.[fieldStr] || COLORS.PRIMARY;
      const badgeText = badgeConfig.statusMapping?.[fieldStr.toUpperCase()] || fieldStr;
      
      return (
        <Badge
          color={badgeColor}
          variant={badgeConfig.variant || VARIANTS.LIGHT}
          size={badgeConfig.size || SIZES.SM}
        >
          {badgeText}
        </Badge>
      );

    case CELL_TYPES.ACTIONS:
      const actionConfig = column.actionConfig || {};
      
      return (
        <Group gap={SIZES.XS}>
          {actionConfig.view?.show && (
            <ActionIcon
              variant={VARIANTS.SUBTLE}
              color={actionConfig.view.color || COLORS.PRIMARY}
              size={SIZES.SM}
              onClick={() => actionConfig.view?.handler?.(item)}
              className={config?.actionClassName}
            >
              {actionConfig.view.icon || <IconEye size={ICON_SIZES.SM} />}
            </ActionIcon>
          )}
          {actionConfig.edit?.show && (
            <ActionIcon
              variant={VARIANTS.SUBTLE}
              color={actionConfig.edit.color || COLORS.WARNING}
              size={SIZES.SM}
              onClick={() => actionConfig.edit?.handler?.(item)}
              className={config?.actionClassName}
            >
              {actionConfig.edit.icon || <IconEdit size={ICON_SIZES.SM} />}
            </ActionIcon>
          )}
          {actionConfig.delete?.show && (
            <ActionIcon
              variant={VARIANTS.SUBTLE}
              color={actionConfig.delete.color || COLORS.DANGER}
              size={SIZES.SM}
              onClick={() => actionConfig.delete?.handler?.(item)}
              className={config?.actionClassName}
            >
              {actionConfig.delete.icon || <IconTrash size={ICON_SIZES.SM} />}
            </ActionIcon>
          )}
        </Group>
      );

    default:
      return (
        <Text size={SIZES.SM}>
          {safeValue(fieldValue)}
        </Text>
      );
  }
};