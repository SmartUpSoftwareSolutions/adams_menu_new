// src/hooks/useSortedMenuItems.ts
import { MenuItem } from "../services/menuServices.ts";
import React from "react";

export function sortMenuItems(items: MenuItem[]): MenuItem[] {
    if (!Array.isArray(items)) return [];
    return [...items].sort((a, b) => {
      // null/undefined order → sort last (matches PostgreSQL ASC NULLS LAST)
      const orderA = a.itemOrder ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.itemOrder ?? Number.MAX_SAFE_INTEGER;

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      // Tie-break alphabetically
      return (a.name || '').localeCompare(b.name || '');
    });
  }
  
  export function useSortedMenuItems(items: MenuItem[]): MenuItem[] {
    return React.useMemo(() => sortMenuItems(items), [items]);
  }