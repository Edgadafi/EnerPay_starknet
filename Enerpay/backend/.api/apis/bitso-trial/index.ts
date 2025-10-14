import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'bitso-trial/1.0.0 (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Returns all user CLABEs for the authenticated user.
   *
   * @summary List CLABEs.
   * @throws FetchError<400, types.UserClabesResponse400> Get user clabes bad request
   * @throws FetchError<401, types.UserClabesResponse401> Unauthorized
   * @throws FetchError<404, types.UserClabesResponse404> Not Found
   * @throws FetchError<500, types.UserClabesResponse500> Server Error
   */
  user_clabes(metadata?: types.UserClabesMetadataParam): Promise<FetchResponse<200, types.UserClabesResponse200>> {
    return this.core.fetch('/spei/v1/clabes', 'get', metadata);
  }

  /**
   * Creates a CLABE for the authenticated user.
   *
   * @summary Creates a CLABE.
   * @throws FetchError<401, types.CreateClabeResponse401> Unauthorized
   * @throws FetchError<403, types.CreateClabeResponse403> Forbidden
   * @throws FetchError<500, types.CreateClabeResponse500> Server Error
   */
  create_clabe(): Promise<FetchResponse<201, types.CreateClabeResponse201>> {
    return this.core.fetch('/spei/v1/clabes', 'post');
  }

  /**
   * Returns the CLABE resource if it exists for the authenticated user.
   *
   * @summary Get CLABE details
   * @throws FetchError<401, types.GetClabeDetailsResponse401> Unauthorized
   * @throws FetchError<404, types.GetClabeDetailsResponse404> Not Found
   * @throws FetchError<500, types.GetClabeDetailsResponse500> Server Error
   */
  get_clabe_details(metadata: types.GetClabeDetailsMetadataParam): Promise<FetchResponse<200, types.GetClabeDetailsResponse200>> {
    return this.core.fetch('/spei/v1/clabes/{clabe}', 'get', metadata);
  }

  /**
   * Enables or disables a CLABE of the authenticated user.
   *
   * @summary Enables or disables a CLABE.
   * @throws FetchError<400, types.UpdateClabeStatusResponse400> Bad Request
   * @throws FetchError<401, types.UpdateClabeStatusResponse401> Unauthorized
   * @throws FetchError<403, types.UpdateClabeStatusResponse403> Forbidden
   * @throws FetchError<500, types.UpdateClabeStatusResponse500> Server Error
   */
  update_clabe_status(body: types.UpdateClabeStatusBodyParam, metadata: types.UpdateClabeStatusMetadataParam): Promise<FetchResponse<200, types.UpdateClabeStatusResponse200>>;
  update_clabe_status(metadata: types.UpdateClabeStatusMetadataParam): Promise<FetchResponse<200, types.UpdateClabeStatusResponse200>>;
  update_clabe_status(body?: types.UpdateClabeStatusBodyParam | types.UpdateClabeStatusMetadataParam, metadata?: types.UpdateClabeStatusMetadataParam): Promise<FetchResponse<200, types.UpdateClabeStatusResponse200>> {
    return this.core.fetch('/spei/v1/clabes/{clabe}/status', 'put', body, metadata);
  }

  /**
   * Returns a paginated SPEI Deposits according to the query parameters.
   *
   * @summary Get paged deposits
   * @throws FetchError<400, types.UserClabeDepositResponse400> Get paged deposits bad request
   * @throws FetchError<401, types.UserClabeDepositResponse401> Unauthorized
   * @throws FetchError<500, types.UserClabeDepositResponse500> Server Error
   */
  user_clabe_deposit(metadata?: types.UserClabeDepositMetadataParam): Promise<FetchResponse<200, types.UserClabeDepositResponse200>> {
    return this.core.fetch('/spei/v1/deposits', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { CreateClabeResponse201, CreateClabeResponse401, CreateClabeResponse403, CreateClabeResponse500, GetClabeDetailsMetadataParam, GetClabeDetailsResponse200, GetClabeDetailsResponse401, GetClabeDetailsResponse404, GetClabeDetailsResponse500, UpdateClabeStatusBodyParam, UpdateClabeStatusMetadataParam, UpdateClabeStatusResponse200, UpdateClabeStatusResponse400, UpdateClabeStatusResponse401, UpdateClabeStatusResponse403, UpdateClabeStatusResponse500, UserClabeDepositMetadataParam, UserClabeDepositResponse200, UserClabeDepositResponse400, UserClabeDepositResponse401, UserClabeDepositResponse500, UserClabesMetadataParam, UserClabesResponse200, UserClabesResponse400, UserClabesResponse401, UserClabesResponse404, UserClabesResponse500 } from './types';
