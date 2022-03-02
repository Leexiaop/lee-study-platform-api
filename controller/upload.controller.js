const path = require('path');

module.exports = {
    upload: (ctx) => {
        const file = ctx.request.files.file;
        const basename = path.basename(file.path);
        ctx.body = {
            code: 0,
            msg: '上传成功',
            data: `${ctx.origin}/uploads/${basename}`
        };
    }
};
