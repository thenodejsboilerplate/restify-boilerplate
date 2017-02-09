'use strict';

module.exports = (data = {}, code = 0, msg = '操作成功') => {
  return {
    Code: code,
    Message: msg,
    Result: data || {}
  };
};
