import { MockAPIService, CamelAPIService } from 'share-services';
import { getAppConfigValue } from 'share-utils';

export const getContactInfoCountryList = async () => {
  const isMockOnly = getAppConfigValue('mockOnly', false);
  const resp = isMockOnly 
    ? await MockAPIService.getV2('/api')
    : await CamelAPIService.postV2('/api', null, params || {});
  return Promise.resolve(resp);
}


