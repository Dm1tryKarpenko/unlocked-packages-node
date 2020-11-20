const axios = require('axios');

function post(domain, sessionId, namespacePrefix, body) {
  return new Promise((resolve, reject) => {
    try {
      const headers = {
        Authorization: `OAuth ${sessionId}`,
        // Authorization: 'OAuth 00D2w00000FaaEC!AQEAQIbfsbWDhocbRDEKq9v0Zu_mjhbMpHsVI44bxCcAdnVZ2LOzwd3X0CrDp_dTZ..gs90KnMehUs5Eoim1uT6VuVxrtQda',
        'Content-Type': 'application/json',
      };
      // const url = 'https://up-karpes-dev-ed-dev-ed.my.salesforce.com/services/apexrest/unlocked-packages';
      const prefix = namespacePrefix ? `${namespacePrefix}/` : '';
      const url = `https://${domain}/services/apexrest/${prefix}unlocked-packages`;
      axios.post(url, body, { headers }).then((response) => {
        resolve(response);
      }).catch((e) => {
        if (e && e.response) {
          reject(e.response.data);
        } else if (error.request) {
          reject(error.request);
        } else {
          reject(error.message);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  post,
};