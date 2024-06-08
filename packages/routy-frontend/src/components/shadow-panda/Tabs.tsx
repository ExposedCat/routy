'use client';

import { tabs } from '@styled-system/recipes/tabs.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';
import { createStyleContext } from '@shadow-panda/style-context';
import TabsPrimitive from '@radix-ui/react-tabs';

import type { Nested, Provider } from '~/utils/types.js';

const { withProvider, withContext } = createStyleContext(tabs);
// TODO: Make custom component to match sane routing
const _Tabs = styled(TabsPrimitive.Root);
export const Tabs: Provider<typeof _Tabs, typeof tabs> = withProvider(_Tabs, 'root');
const _TabsList = styled(TabsPrimitive.List);
export const TabsList: Nested<typeof _TabsList> = withContext(_TabsList, 'list');
const _TabsTrigger = styled(TabsPrimitive.Trigger);
export const TabsTrigger: Nested<typeof _TabsTrigger> = withContext(_TabsTrigger, 'trigger');
const _TabsContent = styled(TabsPrimitive.Content);
export const TabsContent: Nested<typeof _TabsContent> = withContext(_TabsContent, 'content');
