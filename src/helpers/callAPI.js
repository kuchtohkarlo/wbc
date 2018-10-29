import superAgent from 'superagent';


const methods = ['get', 'post', 'put', 'patch', 'del'];

const formatUrl = path => {
  if (/^(\/\/|http|https)/.test(path)) {
    return path;
  }
  
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  return `/api${adjustedPath}`;
};


export default class ApiClient {
  constructor () {
    methods.forEach(method =>
      (
        this[method] = (path, { params, data } = {}) =>
          new Promise((resolve, reject) => {
            const request = superAgent[method](formatUrl(path));
  
            if (params) {
              request.query(params);
            }
  
            if (data) {
              request.send(data);
            }
  
            request.end((err, { body } = {}) => {
              if (err) {
                // TODO Handle joi validation errors.
                if (body && body.validation) {
                  const messages = body.message.match(/[^[\]]+(?=])/g);
                  const validationErrors = {};
                  body.validation.keys.forEach((key, idx) => {
                    validationErrors[key] = messages ? messages[idx] : body.message;
                  });
                  reject({ message: validationErrors });
                } else {
                  reject(body || err);
                }
              } else {
                resolve(body);
              }
            });
          })
      )
    );
  }
  
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty () {
  }
}