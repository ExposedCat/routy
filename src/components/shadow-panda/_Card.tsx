import { card } from '@styled-system/recipes/card.mjs';
import { cardTitle } from '@styled-system/recipes/card-title.mjs';
import { cardHeader } from '@styled-system/recipes/card-header.mjs';
import { cardFooter } from '@styled-system/recipes/card-footer.mjs';
import { cardDescription } from '@styled-system/recipes/card-description.mjs';
import { cardContent } from '@styled-system/recipes/card-content.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';

export const _Card = styled('div', card);
export const _CardHeader = styled('div', cardHeader);
export const _CardTitle = styled('h3', cardTitle);
export const _CardDescription = styled('p', cardDescription);
export const _CardContent = styled('div', cardContent);
export const _CardFooter = styled('div', cardFooter);
