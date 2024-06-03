import type { z } from 'zod';

import { CommonFailedBodySchema } from '../models/common.js';

type UrlAllowedOutputType = string | null | undefined | number | boolean | Record<string, any>;
export type UrlAllowedOutputMap = Record<string, UrlAllowedOutputType>;

export type HttpMethods = 'get' | 'post' | 'put' | 'delete' | 'PATCH';
export type RequestHeaders = z.ZodType<Record<string, string>, any, any> | undefined;
export type RequestBody = z.ZodType<any, any, any> | undefined;
export type ResponseBody = z.ZodType<any, any, any>;
export type ErrorBody = z.ZodType<any, any, any> | typeof CommonFailedBodySchema;
export type UrlParams = z.ZodType<UrlAllowedOutputMap, any, any> | undefined;
export type Query = z.ZodType<UrlAllowedOutputMap, any, any> | undefined;

export type ApiCall<
  RequestHeadersSchemaType extends RequestHeaders,
  RequestBodySchemaType extends RequestBody,
  ResponseBodySchemaType extends ResponseBody,
  HttpMethod extends HttpMethods,
  PathTemplate extends string,
  UrlParamsSchemaType extends UrlParams,
  ResponseErrorBodySchemaType extends ErrorBody,
  QuerySchemaType extends Query,
> = {
  UrlParamsSchema: UrlParamsSchemaType;
  HttpMethod: HttpMethod;
  PathTemplate: PathTemplate;
  RequestHeadersSchema: RequestHeadersSchemaType;
  RequestBodySchema: RequestBodySchemaType;
  ResponseBodySchema: ResponseBodySchemaType;
  ResponseErrorBodySchema: ResponseErrorBodySchemaType;
  QuerySchema: QuerySchemaType;
  target?: 'backend' | 'local';
  type?: 'json' | 'form';
};
export type AnyApiCall = ApiCall<any, any, any, any, any, any, any, any>;

export type ApiCallResponseBody<T extends AnyApiCall> = z.infer<T['ResponseBodySchema']>;

export type LoaderApiCall<
  RequestHeadersSchemaType extends RequestHeaders,
  ResponseBodySchemaType extends ResponseBody,
  PathTemplate extends string,
  UrlParamsSchemaType extends UrlParams,
  ResponseErrorBodySchemaType extends ErrorBody,
  QuerySchemaType extends Query,
> = ApiCall<
  RequestHeadersSchemaType,
  undefined,
  ResponseBodySchemaType,
  'get',
  PathTemplate,
  UrlParamsSchemaType,
  ResponseErrorBodySchemaType,
  QuerySchemaType
>;
export type AnyLoaderApiCall = LoaderApiCall<any, any, any, any, any, any>;

export const buildLoaderApiCall = <
  RequestHeadersSchemaType extends RequestHeaders,
  ResponseBodySchemaType extends ResponseBody,
  HttpMethod extends HttpMethods,
  PathTemplate extends string,
  UrlParamsSchemaType extends UrlParams,
  ResponseErrorBodySchemaType extends ErrorBody,
  QuerySchemaType extends Query,
>(
  apiCall: Omit<
    ApiCall<
      RequestHeadersSchemaType,
      undefined,
      ResponseBodySchemaType,
      HttpMethod,
      PathTemplate,
      UrlParamsSchemaType,
      z.ZodAny,
      QuerySchemaType
    >,
    'ResponseErrorBodySchema' | 'RequestBodySchema'
  > & {
    ResponseErrorBodySchema?: ResponseErrorBodySchemaType;
  },
): ApiCall<
  RequestHeadersSchemaType,
  undefined,
  ResponseBodySchemaType,
  HttpMethod,
  PathTemplate,
  UrlParamsSchemaType,
  typeof CommonFailedBodySchema,
  QuerySchemaType
> => ({
  ...apiCall,
  RequestBodySchema: undefined,
  ResponseErrorBodySchema: CommonFailedBodySchema,
});

export const buildApiCall = <
  RequestHeadersSchemaType extends RequestHeaders,
  RequestBodySchemaType extends RequestBody,
  ResponseBodySchemaType extends ResponseBody,
  HttpMethod extends HttpMethods,
  PathTemplate extends string,
  UrlParamsSchemaType extends UrlParams,
  QuerySchemaType extends Query,
  ResponseErrorBodySchemaType extends ErrorBody,
>(
  apiCall: Omit<
    ApiCall<
      RequestHeadersSchemaType,
      RequestBodySchemaType,
      ResponseBodySchemaType,
      HttpMethod,
      PathTemplate,
      UrlParamsSchemaType,
      z.ZodAny,
      QuerySchemaType
    >,
    'ResponseErrorBodySchema'
  > & {
    ResponseErrorBodySchema?: ResponseErrorBodySchemaType | undefined;
  },
): ApiCall<
  RequestHeadersSchemaType,
  RequestBodySchemaType,
  ResponseBodySchemaType,
  HttpMethod,
  PathTemplate,
  UrlParamsSchemaType,
  ResponseErrorBodySchemaType,
  QuerySchemaType
> => ({
  ...apiCall,
  ResponseErrorBodySchema: (apiCall.ResponseErrorBodySchema
    ? apiCall.ResponseErrorBodySchema
    : CommonFailedBodySchema) as ResponseErrorBodySchemaType,
});
