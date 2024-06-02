import type { RecipeVariantRecord, RecipeRuntimeFn } from '@styled-system/types/recipe.mjs';
import { cx } from '@styled-system/css/cx.mjs';
import { createStyleContext as _createStyleContext } from '@shadow-panda/style-context';

// Types extracted from Panda's `withContext` and `withProvider`
type WithContext<T> =
  | React.ComponentType<T>
  | React.ForwardRefExoticComponent<
      React.PropsWithoutRef<T & { className?: string | undefined }> & React.RefAttributes<unknown>
    >;

type AnyProps = Record<string, unknown>;
type AnyRecipe = {
  (props?: AnyProps): Record<string, string>;
  splitVariantProps: (props: AnyProps) => any;
};

type WithProvider<T, R extends AnyRecipe> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<T & Parameters<R>[0]> & React.RefAttributes<unknown>
>;

// For cleaner usage of types above
export type Provider<
  T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>,
  R extends AnyRecipe,
> = WithProvider<React.ComponentProps<T>, R>;

export type Nested<T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>> = WithContext<
  React.ComponentProps<T>
>;

export type PropsFromCVA<T extends RecipeRuntimeFn<RecipeVariantRecord>> = Exclude<Parameters<T>['0'], undefined>;

export const clsx = cx;

export type Customizable<T = unknown> = T & { className?: string };

export type FullError<T> = {
  message: string;
  name?: string;
  stack?: string;
  cause?: T;
};

export class TypedError<T> extends Error {
  constructor(error: FullError<T>) {
    super(error.message);
    this.name = error.name || 'Error';
    this.stack = error.stack;
    this.cause = error.cause;
  }
}
