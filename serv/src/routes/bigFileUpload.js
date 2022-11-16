// 大文件上传接口
const router = require('express').Router()
const path = require('path')
const fs = require("fs")
const multiparty = require('multiparty')

router.all('/upload',async (req, res, next) => {
    try {
        // 设置文件获取后的存放目录
        let form = new multiparty.Form({uploadDir:path.resolve(__dirname, '../static')});
        form.on('error', err => { res.send('文件保存失败') })
        form.parse(req, function(err, fields, files) {
            if(err || !files){ // 当网络出现问题时，有可能拿不到 files
                next(err)
                return
            }
            let blobs = files['blobs[]'] // 'blobs[]'可以是任意值，前后端自己约定的
            // 创建写入流
            let write = fs.createWriteStream(path.resolve(__dirname, `../static/${req.query.name}`))
            let index = 0
            let stream
            merge() // 目前只能使用递的方式归合并文件

            function merge(){
                stream = fs.createReadStream(blobs[index].path)
                stream.pipe(write, { end: false }) // 当一个读取流写入后，通过 end: false 保持写入流的开启状态
                stream.on('end',() => {
                    index ++
                    if(index !== blobs.length)
                        merge()
                    else{
                        write.end() // 当不需要合并文件时，关闭写入流
                        res.send('OK') // 发送响应
                        blobs.forEach(blob => { // 删除切片、临时文件
                            fs.unlinkSync(blob.path)
                        })
                    }
                })
                // 读取流结束后会自动关闭，不占内存，不需要手动 close() 或 destroy()
                // 读取流的事件顺序 error -> end -> close
                stream.on('close',()=>{ })
                // 当读取流发生错误时，需要手动关闭写入流
                stream.on('error',() => {
                    write.end()
                })
            }

        })
    } catch(err){ next(err) }
})
router.all('/download',async (req, res, next) => {
    try{
        let stream = fs.createReadStream(path.resolve(__dirname, `../static/大文件测试.mp4`))
        stream.pipe(res) // 可以不设置响应头，express 会帮你处理
    }catch(err){ next(err) }
})

module.exports = router
