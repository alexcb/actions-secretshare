import * as cache from "@actions/cache";
import * as core from "@actions/core";

import { State } from "./constants";

import * as utils from "./cache-utils";

export const restoreCache = async (
  path: string,
  version: string
): Promise<boolean> => {
  if (!utils.isCacheFeatureAvailable()) {
    return false;
  }

  const platform = process.env.RUNNER_OS;

  const primaryKey = `secretshare-cache-${platform}-${version}`;
  core.debug(`primary key is ${primaryKey}`);

  core.saveState(State.CachePrimaryKey, primaryKey);
  core.saveState(State.BinaryPath, path);

  const cacheKey = await cache.restoreCache([path], primaryKey);
  core.setOutput("cache-hit", Boolean(cacheKey));

  if (!cacheKey) {
    core.info(`secretshare cache is not found`);
    return false;
  }

  core.saveState(State.CacheMatchedKey, cacheKey);
  core.info(`Cache restored from key: ${cacheKey}`);
  return Boolean(cacheKey);
};
