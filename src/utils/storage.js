let isLocalStorageSupported = function () {
  let testKey = 'test', storage = window.localStorage;
  try {
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}();

let cookie = {
  defaults: {
    path: '/'
  },
  set (key, value, expires, path, domain, secure) {
    if (value == undefined) return;

    var options = {
      expires: expires,
      path: path,
      domain: domain,
      secure: secure
    };

    options = Object.assign({}, this.defaults, options);

    if (value === null || value === "") {
      options.expires = -1;
    }

    if (typeof options.expires === 'number') {
      var days = options.expires,
        time = options.expires = new Date();
      time.setDate(time.getDate() + days);
    }

    return (document.cookie = [
      encodeURIComponent(key), '=', encodeURIComponent(String(value)),
      options.expires ? '; expires=' + options.expires.toUTCString() : '',
      options.path ? '; path=' + options.path : '',
      options.domain ? '; domain=' + options.domain : '',
      options.secure ? '; secure' : ''
    ].join(''));
  },
  get (key) {
    var
      cookies = document.cookie.split('; '),
      result = key ? null : {},
      parts,
      name,
      cookie;

    var decode = function (s) {
      return unRfc2068(decodeURIComponent(s.replace(/\+/g, ' ')));
    };

    var unRfc2068 = function (value) {
      if (value.indexOf('"') === 0) {
        value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      }
      return value;
    };

    for (var i = 0, l = cookies.length; i < l; i++) {
      parts = cookies[i].split('=');
      name = decode(parts.shift());
      cookie = decode(parts.join('='));

      if (key && key === name) {
        result = cookie;
        break;
      }

      if (!key) {
        result[name] = cookie;
      }
    }

    return result;
  }
  ,
  remove (key) {
    if (this.get(key) !== null) {
      var arg = [].slice.call(arguments, 1);
      arg.unshift(key, null);
      this.set.apply(this, arg);
      return true;
    }
    return false;
  }
};

let localStorage = {
  set (key, value) {

    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    if (isLocalStorageSupported) {
      window.localStorage.setItem(key, encodeURIComponent(value));
    }
    else {
      cookie.set(key, value, 3650);
    }
  },
  get (key) {
    let val = '';

    if (isLocalStorageSupported) {
      val = decodeURIComponent(window.localStorage.getItem(key));
    } else {
      val = cookie.get(key);
    }

    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }

  }
};

let sessionStorage = {
  set (key, value) {
    if (isLocalStorageSupported) {
      window.sessionStorage.setItem(key, value);
    } else {
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      cookie.set(key, value);
    }
  },
  get (key) {
    if (isLocalStorageSupported) {
      return window.sessionStorage.getItem(key);
    } else {
      let val = cookie.get(key);
      try {
        return JSON.parse(val);
      } catch (e) {
        return val;
      }
    }
  }
};

module.exports = {
  cookie,
  localStorage,
  sessionStorage
};