/*!
 * zeroModal.js
 * http://git.oschina.net/cylansad/zeroModal
 *
 * Copyright 2016, Sad
 */
(function(obj) {

    if (typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {
        module.exports = obj;
    } else if (typeof define === 'function' && define.amd) {
        define(function() {
            return obj;
        });
    } else {
        window.zeroModal = obj;
    }

}((function($, undefined) {

    var zeroModal = {};

    /**
     * 默认的参数
     * @type {Object}
     */
    var defaultOpt = {
        unique: '', // 模态框的唯一值，默认系统生成UUID，不建议自定义
        title: '', //标题
        content: '', //显示内容
        url: false, //如果输入url，将会根据url返回的内容显示在弹出层中
        iframe: false, //是否需要嵌入iframe，默认false，该参数需要和url一起使用
        width: '500px', //宽度（px、pt、%）
        height: '300px', //高度（px、pt、%）
        transition: false, //是否需要出场动画，默认false
        opacity: 0.2, // 遮罩层的透明度
        overlay: true, //是否需要显示遮罩层，默认true
        overlayClose: false, //是否允许点击遮罩层直接关闭弹出层，默认否
        drag: true, // 是否允许拖动显示层，注意不能和resize属性同时使用，默认可拖动
        dragHandle: 'top', // 允许选择拖动的位置,配合drag使用,提供值为“top、container”，默认为top
        max: false, // 是否允许最大化
        resize: false, // 是否允许调整大小
        resizeAfterFn: undefined, // 调整大小后触发的事件
        ok: false, //是否启用“ok”按钮，默认false
        okTitle: '', //“ok”按钮的显示值，默认为“确定”
        okFn: false, //点击“ok”按钮触发的事件
        cancel: false, //是否启用“cancel”按钮，默认false
        cancelTitle: '', //“cancel”按钮的显示值，默认为“取消”
        cancelFn: true, //点击“cancel”按钮触发的事件
        buttonTopLine: true,
        buttons: [], //自定义的按钮，使用了自定义按钮ok与cancel按钮将不会生效；格式：[{ className: 'zeromodal-btn zeromodal-btn-primary', name: '开始导出', fn:function(opt){} }]
        esc: false, //是否需要按esc键退出弹出层，默认false
        //callbacks
        onOpen: false, //弹出层弹开前事件
        onLoad: false, //弹出层加载显示内容前事件
        onComplete: false, //弹出层加载显示内容后事件
        onCleanup: false, //弹出层关闭前事件
        onClosed: false //弹出层关闭后事件
    };

    // 临时变量,是否已显示
    var _tmp_variate_ishow = false;
    // 临时变量,最后的zindex值
    var _tmp_last_zindex = 10000;
    // 临时变量，记录打开的模态框参数
    var _tmp_zemoModal_opt = {};

    /**
     * 显示模态框
     * @param  {[type]} opt [description]
     * @return {[type]}     [description]
     */
    zeroModal.show = function(opt) {
        // 初始化
        var params = _initParams(opt);

        // 渲染
        _render(params);

        // 重新定位
        _tmp_variate_ishow = true;
        $(window).resize(function() {
            if (_tmp_variate_ishow) {
                _resize(params);
            }
        });

        return params.unique;
    };

    /**
     * 关闭指定模态框
     * @param  {[type]} unique [description]
     * @return {[type]}        [description]
     */
    zeroModal.close = function(unique) {
        _close({ unique: unique });
        _tmp_variate_ishow = false;
        delete _tmp_zemoModal_opt[unique];
    };

    /**
     * 关闭全部模态框
     * @return {[type]} [description]
     */
    zeroModal.closeAll = function() {
        $('[role="zeromodal-loading"]').remove();
        $('.zeromodal-overlay').remove();

        $('.zeromodal-container').each(function() {
            var jobj = $(this);
            var unique = jobj.attr("zero-unique-container");
            if (unique !== undefined && _tmp_zemoModal_opt[unique] !== undefined) {
                var opt = _tmp_zemoModal_opt[unique];

                if (typeof opt.onCleanup === 'function') {
                    opt.onCleanup(opt);
                }
                jobj.remove();
                if (typeof opt.onClosed === 'function') {
                    opt.onClosed(opt);
                }

                delete _tmp_zemoModal_opt[unique];
            }
        });

        _tmp_variate_ishow = false;
    };


    /**
     * 显示等待框
     * @return {[type]} [description]
     */
    zeroModal.loading = function(type) {
        var params = _initParams();
        _buildOverlay(params);

        _tmp_last_zindex++;

        // 重新定位top值
        var _top = $(window).scrollTop() + Math.ceil($(window).height() / 3);

        if (type === undefined) {
            type = 1;
        }
        if (type === 1 || type === 2) {
            var loadClass = 'zeromodal-loading' + type;
            $('body').append('<div role="zeromodal-loading" zero-unique-loading="' + params.unique + '" class="' + loadClass + '" style="z-index:' + _tmp_last_zindex + ';top:' + _top + 'px;"></div>');

        } else if (_isIn([3, 4, 5, 6], type)) {
            var loader = {};

            switch (type) {
                case 3:
                    loader.className = 'pacman';
                    loader.containerCount = 5;
                    break;
                case 4:
                    loader.className = 'line-scale-pulse-out';
                    loader.containerCount = 5;
                    break;
                case 5:
                    loader.className = 'line-spin-fade-loader';
                    loader.containerCount = 8;
                    break;
                case 6:
                    loader.className = 'square-spin';
                    loader.containerCount = 1;
                    break;
            }

            var _html = '<div role="zeromodal-loading" zero-unique-loading="' + params.unique + '" class="' + loader.className + '" style="z-index:' + _tmp_last_zindex + ';left:46%;top:' + _top + 'px;">';
            for (var i = 0; i < loader.containerCount; i++) {
                _html += '  <div></div>';
            }
            _html += '  </div>';
            $('body').append(_html);
        }
        return params.unique;
    };

    zeroModal.progress = function(type, opt) {
        var params = _initParams();
        _buildOverlay(params);

        _tmp_last_zindex++;

        if (type === undefined) {
            type = 3;
        }
        // 重新定位top值
        var _top = $(window).scrollTop() + Math.ceil($(window).height() / 3);

        var loader = {};
        switch (type) {
            case 3:
                loader.className = 'pacman';
                loader.containerCount = 5;
                break;
            case 4:
                loader.className = 'line-scale-pulse-out';
                loader.containerCount = 5;
                break;
            case 5:
                loader.className = 'line-spin-fade-loader';
                loader.containerCount = 8;
                break;
            case 6:
                loader.className = 'square-spin';
                loader.containerCount = 1;
                break;
        }

        var _html = '<div zero-unique-loading="' + params.unique + '" class="' + loader.className + '" style="z-index:' + _tmp_last_zindex + ';left:46%;top:' + _top + 'px;">';
        for (var i = 0; i < loader.containerCount; i++) {
            _html += '  <div></div>';
        }
        _html += '  </div>';
        _html += '  <div zero-unique-loading="' + params.unique + '" class="zeromodal-progress-content" style="z-index:' + _tmp_last_zindex + ';top:' + (_top + 64) + 'px;"><span id="progess_content_' + params.unique + '"></span></div>';
        _html += '';
        $('body').append(_html);

        var _loadCount = 0;
        var _timer = setInterval(function() {
            $.ajax({
                url: opt.getProgressUrl + "?_=" + new Date().getTime(),
                dataType: 'json',
                type: 'get',
                success: function(data) {
                    $('#progess_content_' + params.unique).html(data.progress);
                    if (data.progress === 'finish') {
                        clearInterval(_timer);
                        $.get(opt.clearProgressUrl);
                        zeroModal.close(params.unique);
                    }
                }
            });
            _loadCount++;
            if (_loadCount >= 500) {
                clearInterval(_timer);
                //zeroModal.close(params.unique);
            }
        }, 500);

        return params.unique;
    };

    /**
     * 显示进度条
     * @param  {[type]} speed [description]
     * @return {[type]}       [description]
     */
    zeroModal.progress_old = function(speed) {
        var params = _initParams();
        _buildOverlay(params);

        _tmp_last_zindex++;

        var _top = $(window).scrollTop() + Math.ceil($(window).height() / 3);
        var _left = $(window).width() / 2 - 200;
        var _speed = 1;
        if (speed !== undefined && speed > _speed && speed < 10) {
            _speed = speed;
        }

        var _html = '<div class="zeromodal-progress" style="top:' + _top + 'px;left:' + _left + 'px;z-index:' + _tmp_last_zindex + '">';
        _html += '      <div zeromodal-progress-bar="' + params.unique + '" class="zeromodal-progress-bar" style="width: 0%; background: #92c26a;">';
        _html += '          <span class="zeromodal-progress-icon zeromodal-fa zeromodal-fa-check" style="border-color:#92c26a; color:#92c26a;"><div zeromodal-progress-val="' + params.unique + '" class="zeromodal-progress-val">&nbsp;0%</div></span>';
        _html += '      </div>';
        _html += '  </div>';
        $('body').append(_html);

        var _progress = 0;
        var jProgressBar = $('[zeromodal-progress-bar="' + params.unique + '"]');
        var jProgressVal = $('[zeromodal-progress-val="' + params.unique + '"]');
        var _timer = setInterval(function() {
            _progress += 1;
            jProgressBar.css("width", _progress + "%");
            jProgressVal.html((_progress > 9 ? _progress : '&nbsp;' + _progress) + '%');

            if (_progress >= 100) {
                jProgressVal.html('<span class="line tip"></span><span class="line long"></span>');
                clearInterval(_timer);
            }
        }, _speed * 100);

        return params.unique;
    };

    /**
     * 显示alert框
     * @param  {[type]} content [description]
     * @return {[type]}         [description]
     */
    zeroModal.alert = function(content) {
        var _opt = {
            iconClass: 'show-zero2 zeromodal-icon-info',
            iconText: '!'
        };

        var params = {};
        $.extend(params, _opt);

        if (typeof content === 'object') {
            $.extend(params, content);
        } else {
            params.content = content;
        }
        _buildAlertInfo(params);
    };

    /**
     * 显示错误alert框
     * @param  {[type]} content [description]
     * @return {[type]}         [description]
     */
    zeroModal.error = function(content) {
        var params = {
            iconDisplay: '<div class="show-zero2 zeromodal-icon zeromodal-error"><span class="x-mark"><span class="line left"></span><span class="line right"></span></span></div>'
        };

        if (typeof content === 'object') {
            $.extend(params, content);
        } else {
            params.content = content;
        }
        _buildAlertInfo(params);
    };

    /**
     * 显示正确alert框
     * @param  {[type]} content [description]
     * @return {[type]}         [description]
     */
    zeroModal.success = function(content) {
        var params = {
            iconDisplay: '<div class="show-zero2 zeromodal-icon zeromodal-success"><span class="line tip"></span><span class="line long"></span><div class="placeholder"></div></div>'
        };

        if (typeof content === 'object') {
            $.extend(params, content);
        } else {
            params.content = content;
        }
        _buildAlertInfo(params);
    };

    /**
     * 显示confirm框
     * @param  {[type]} content [description]
     * @param  {[type]} okFn    [description]
     * @return {[type]}         [description]
     */
    zeroModal.confirm = function(content, okFn) {
        var _opt = {
            iconClass: '',
            iconText: ''
        };

        var params = {};
        $.extend(params, _opt);
        if (typeof okFn === 'function') {
            params.okFn = okFn;
        }
        params.cancel = true;

        if (typeof content === 'object') {
            $.extend(params, content);
        } else {
            params.content = content;
        }
        _buildAlertInfo(params);
    };


    // 初始化
    function _initParams(opt) {
        var params = {};
        $.extend(params, defaultOpt);
        $.extend(params, opt);
        if (typeof params.unique === 'undefined' || params.unique === '') {
            params.unique = _getUuid();
        }
        // 将参数记录到临时变量中
        _tmp_zemoModal_opt[params.unique] = params;
        return params;
    }

    // 渲染
    function _render(opt) {
        if (typeof opt.onOpen === 'function') { opt.onOpen(opt); }

        _buildOverlay(opt);
        _buildModal(opt);
    }

    // 关闭
    function _close(opt) {
        if (typeof opt === 'object') {
            if (typeof opt.onCleanup === 'function') {
                opt.onCleanup();
            }

            $('[zero-unique-overlay="' + opt.unique + '"]').remove();
            $('[zero-unique-container="' + opt.unique + '"]').remove();
            $('[zero-unique-loading="' + opt.unique + '"]').remove();

            if (typeof opt.onClosed === 'function') {
                opt.onClosed();
            }
        }
    }

    /**
     * 构建遮罩层
     * @param  {[type]} opt [description]
     * @return {[type]}     [description]
     */
    function _buildOverlay(opt) {
        _tmp_last_zindex++;

        var _width = $(document).width();
        var _height = $(document).height();

        // 是否需要显示遮罩层
        if (opt.overlay) {
            var _overlay = $('<div zero-unique-overlay="' + opt.unique + '" class="zeromodal-overlay" style="opacity:' + 0.8 + ';z-index:' + _tmp_last_zindex + ';width:' + _width + 'px;height:' + _height + 'px"></div>');
            $('body').append(_overlay);

            // 是否允许点击遮罩层关闭modal
            if (opt.overlayClose) {
                _overlay.css('cursor', 'pointer');
                _overlay.click(function() {
                    _close(opt);
                });
            } else {
                _overlay.click(function() {
                    _shock($('[zero-unique-container="' + opt.unique + '"]'));
                });
            }
        }
    }

    /**
     * 构建模态框
     * @param  {[type]} opt [description]
     * @return {[type]}     [description]
     */
    function _buildModal(opt) {
        _tmp_last_zindex++;

        //// 获取modal的宽度和高度
        var _width = opt.width.replace('px', '');
        var _height = opt.height.replace('px', '');
        var _wwidth = $(window).width();
        var _wheight = $(window).height();
        // 如果width为%值，则计算具体的width值
        if (_width.indexOf('%') !== -1) {
            _width = (_wwidth * parseInt(_width.replace('%', '')) / 100);
        }
        // 如果height为%值，则计算具体的height值
        if (_height.indexOf('%') !== -1) {
            _height = (_wheight * parseInt(_height.replace('%', '')) / 100);
        }
        if (typeof _width === 'string') _width = parseInt(_width);
        if (typeof _height === 'string') _height = parseInt(_height);

        //// 获取modal的位置
        var _left = (_wwidth - _width) / 2;
        var _top = $(window).scrollTop() + Math.ceil(($(window).height() - _height) / 3);

        //// 构建容器
        var _container = $('<div zero-unique-container="' + opt.unique + '" class="zeromodal-container" style="z-index:' + _tmp_last_zindex + ';width:' + _width + 'px;height:' + _height + 'px;left:' + _left + 'px;top:' + (opt.transition ? _top - 50 : _top) + 'px"></div>');
        $('body').append(_container);

        //// 判断是否需要允许拖拽显示层
        if (opt.drag) {
            var _dragTopper = $('<div zero-unique-top="' + opt.unique + '" class="zeromodal-top"></div>');
            _container.append(_dragTopper);

            // 调用拖拽组件
            var _handle;
            if (opt.dragHandle === 'container') {
                _handle = $('[zero-unique-container="' + opt.unique + '"]')[0];
            } else {
                _handle = $('[zero-unique-top="' + opt.unique + '"]')[0];
            }
            new Drag($('[zero-unique-container="' + opt.unique + '"]')[0], { handle: _handle, limit: false });
        }

        //// 构建头部
        var _headerHtml = '<div zeromodal-unqiue-header="' + opt.unique + '" class="zeromodal-header">';
        _headerHtml += '        <div title="关闭" zero-close-unique="' + opt.unique + '" class="zeromodal-close">×</div>';
        if (opt.max) {
            _headerHtml += '    <div title="最大化/取消最大化" zero-max-unique="' + opt.unique + '" class="zeromodal-max"></div>';
        }
        _headerHtml += '        <span class="modal-title">' + opt.title + '</span>';
        _headerHtml += '   </div>';
        var _header = $(_headerHtml);
        _container.append(_header);

        // 绑定关闭事件
        $('[zero-close-unique="' + opt.unique + '"]').click(function() {
            _close(_tmp_zemoModal_opt[$(this).attr('zero-close-unique')]);
        });
        // 绑定最大化事件
        $('[zero-max-unique="' + opt.unique + '"]').click(function() {
            if ($(this).attr('max') !== '1') {
                _resize(_tmp_zemoModal_opt[$(this).attr('zero-max-unique')], '90%', '85%');
                $(this).attr('max', '1');
            } else {
                _resize(_tmp_zemoModal_opt[$(this).attr('zero-max-unique')]);
                $(this).attr('max', '0');
            }
            _resizeBodyHeight(opt); // 重置body的高度
        });

        // 出场动画
        if (opt.transition) {
            $('.zeromodal-container').animate({ top: _top }, 300);
        }

        //// 构建内容区
        var _body = $('<div zero-unique-body="' + opt.unique + '" class="zeromodal-body"></div>');
        _container.append(_body);
        _resizeBodyHeight(opt); // 重置body的高度

        // 构建拖拽区
        if (opt.resize) {
            _container.append('<div zero-unique-sweep-tee="' + opt.unique + '" class="zeromodal-sweep-tee"></div>');
            _dragChangeSize(opt.unique, opt); // 绑定拖拽事件
        }

        if (typeof opt.onLoad === 'function') { opt.onLoad(opt); }

        // 如果url为空，则直接显示content的内容
        if (!opt.url) {
            // 如果是div方式，则设置overflow-y属性，同时通过ajax获取内容
            $('[zero-unique-body="' + opt.unique + '"]').addClass('zeromodal-overflow-y');

            _body.html(opt.content);
            if (typeof opt.onComplete === 'function') { opt.onComplete(opt); }
        } else {
            _body.html('<div class="zeromodal-loading1"></div>');
            // 如果iframe为true，则通过iframe的方式加载需要显示的内容
            if (opt.iframe) {
                var _iframe = $('<iframe src="' + opt.url + '" class="zeromodal-frame"></iframe>');
                _body.append(_iframe);
                _iframe.load(function() {
                    $('.zeromodal-loading1').remove();
                    if (typeof opt.onComplete === 'function') { opt.onComplete(opt); }
                });
            } else {
                // 如果是div方式，则设置overflow-y属性，同时通过ajax获取内容
                $('[zero-unique-body="' + opt.unique + '"]').addClass('zeromodal-overflow-y');
                $.ajax({
                    url: opt.url,
                    dataType: "html",
                    type: "get",
                    success: function(data) {
                        _body.append(data);
                        $('.zeromodal-loading1').remove();
                        if (typeof opt.onComplete === 'function') { opt.onComplete(opt); }
                    }
                });
            }
        }

        //// 构建尾部区
        _buildFooter(opt, _container);

        if (opt.esc) {
            $('body').one("keyup", function(e) {
                if (e.keyCode === 27) {
                    _close(opt);
                }
            });
        }
    }


    /**
     * 构建尾部
     * @param  {[type]} opt [description]
     * @param  {[type]} _container [description]
     * @return {[type]}     [description]
     */
    function _buildFooter(opt, _container) {
        if (opt.ok || opt.cancel || (opt.buttons !== undefined && opt.buttons.length > 0)) {
            var _footer = '<div class="zeromodal-footer">';
            _footer += opt.buttonTopLine ? '<div class="zeromodal-line"></div>' : '';
            _footer += '        <div zeromodal-btn-container="' + opt.unique + '" class="zeromodal-btn-container"></div>';
            _footer += '   </div>';
            _container.append(_footer);

            if (opt.buttons !== undefined && opt.buttons.length > 0) {
                // 显示自定义的按钮
                for (var i = 0; i < opt.buttons.length; i++) {
                    var b = opt.buttons[i];
                    
                    var btn = $('<button zero-btn-unique="' + opt.unique + '" class="' + (b.className || '') + '"' + (b.attr !== undefined ? ' ' + b.attr : '') + '>' + b.name + '</button>');
                    if (typeof b.fn === 'function') {
                        (function(b) {
                            btn.click(function() {
                                var _r = b.fn(opt);
                                if (typeof _r === 'undefined' || _r) {
                                    _close(opt);
                                }
                            });
                        }(b));
                    }
                    $('[zeromodal-btn-container="' + opt.unique + '"]').append(btn);
                }

            } else {
                // 显示默认提供的按钮
                if (opt.ok) {
                    var _ok = $('<button zeromodal-btn-ok="' + opt.unique + '" class="zeromodal-btn zeromodal-btn-primary">' + opt.okTitle + '</button>');
                    $('[zeromodal-btn-container="' + opt.unique + '"]').append(_ok);
                    _ok.click(function() {
                        if (typeof opt.okFn === 'function') {
                            var _r = opt.okFn();
                            if (typeof _r === 'undefined' || _r) {
                                _close(opt);
                            }
                        } else {
                            _close(opt);
                        }
                    });
                }
                if (opt.cancel) {
                    var _cancel = $('<button zeromodal-btn-cancel="' + opt.unique + '" class="zeromodal-btn zeromodal-btn-default">' + opt.cancelTitle + '</button>');
                    $('[zeromodal-btn-container="' + opt.unique + '"]').append(_cancel);
                    _cancel.click(function() {
                        if (typeof opt.cancelFn === 'function') {
                            var _r = opt.cancelFn();
                            if (typeof _r === 'undefined' || _r) {
                                _close(opt);
                            }
                        } else {
                            _close(opt);
                        }
                    });
                }
            }
        }
    }

    /**
     * 构建提示框、确认框等内容
     */
    function _buildAlertInfo(opt) {
        // 初始化
        if (typeof opt === 'undefined' || typeof opt.cancelTitle === 'undefined') {
            opt.cancelTitle = '';
        }

        var params = _initParams(opt);
        params.width = '759px';
        params.height = '322px';
        params.esc = true;
        params.ok = true;
        params.buttonTopLine = false;
        if (typeof _okFn !== 'undefined') {
            params.okFn = _okFn;
        }
        if (typeof cancelFn !== 'undefined') {
            params.cancelFn = cancelFn;
        }

        var _content = params.content || '';
        var _contentDetail = params.contentDetail || '';
        params.content = '';

        // 渲染
        _render(params);

        // 渲染内容
        var icon;
        if (typeof params.iconDisplay !== 'undefined') {
            icon = $(params.iconDisplay);
        } else {
            icon = $('<div class="zeromodal-icon ' + params.iconClass + '">' + params.iconText + '</div>');
        }
        var text = $('<div class="zeromodal-title1">' + _content + '</div><div class="zeromodal-title2">' + _contentDetail + '</div>');
        $('[zero-unique-body="' + params.unique + '"]').append(icon);
        $('[zero-unique-body="' + params.unique + '"]').append(text);
        $('[zero-unique-body="' + params.unique + '"]').removeClass('zeromodal-overflow-y');

        // 给按钮添加focus
        $('[zeromodal-btn-ok="' + params.unique + '"]').focus();

        // 重新定位
        _tmp_variate_ishow = true;
        $(window).resize(function() {
            if (_tmp_variate_ishow) {
                _resize(params);
            }
        });
    }

    /**
     * 重新设置大小及位置
     * @param  {[type]} opt [description]
     * @return {[type]}     [description]
     */
    function _resize(opt, width, height) {
        // 遮罩层
        $('[zero-unique-overlay="' + opt.unique + '"]').css("width", $(document).width() + 'px').css("height", $(document).height() + 'px');

        // 弹出层
        var _wwidth = $(window).width();
        var _wheight = $(window).height();
        var _width = width !== undefined ? width.replace('px', '') : opt.width.replace('px', '');
        var _height = height !== undefined ? height.replace('px', '') : opt.height.replace('px', '');

        if (_width.indexOf('%') !== -1) {
            _width = (_wwidth * parseInt(_width.replace('%', '')) / 100);
        }
        if (_height.indexOf('%') !== -1) {
            _height = (_wheight * parseInt(_height.replace('%', '')) / 100);
        }
        if (typeof _width === 'string') _width = parseInt(_width);
        if (typeof _height === 'string') _height = parseInt(_height);
        var _left = (_wwidth - _width) / 2;
        var _top = $(window).scrollTop() + Math.ceil(($(window).height() - _height) / 3);
        $('[zero-unique-container="' + opt.unique + '"]').css('width', _width + 'px').css('height', _height + 'px').css('left', _left + 'px').css('top', _top + 'px');
    }

    /**
     * 重新设置位置
     * @param  {[type]} opt [description]
     * @return {[type]}     [description]
     */
    function _resizePostion(opt) {
        var _wwidth = $(window).width();
        var _wheight = $(window).height();
        var _width = parseInt($('[zero-unique-container="' + opt.unique + '"]').css('width').replace('px', ''));
        var _height = parseInt($('[zero-unique-container="' + opt.unique + '"]').css('height').replace('px', ''));

        var _left = (_wwidth - _width) / 2;
        var _top = $(window).scrollTop() + Math.ceil(($(window).height() - _height) / 3);
        $('[zero-unique-container="' + opt.unique + '"]').css('left', _left + 'px').css('top', _top + 'px');
    }

    /**
     * 重置设置body的高度
     * @param  {[type]} opt [description]
     * @return {[type]}     [description]
     */
    function _resizeBodyHeight(opt) {
        var headerHeight = $('[zeromodal-unqiue-header="' + opt.unique + '"]').height();
        var buttonHeight = (opt.ok || opt.cancel || (opt.buttons !== undefined && opt.buttons.length > 0)) ? 60 : 0;

        var height = $('[zero-unique-container="' + opt.unique + '"]').height() - headerHeight - 10 - buttonHeight;
        $('[zero-unique-body="' + opt.unique + '"]').css('height', height);
    }

    /**
     * 元素左右晃动
     * @param  {[type]} jobj [description]
     * @return {[type]}      [description]
     */
    function _shock(jobj) {
        if (jobj.length === 0) {
            return;
        }
        var left = jobj.position().left;
        for (var i = 0; i < 2; i++) {
            jobj.animate({ left: left - 2 }, 50);
            jobj.animate({ left: left }, 50);
            jobj.animate({ left: left + 2 }, 50);
        }
        jobj.animate({ left: left }, 50);
    }

    /**
     * 判断基本类型的值是否存在于数组中
     * @param  {[type]}  arr [description]
     * @param  {[type]}  r   [description]
     * @return {Boolean}     [description]
     */
    function _isIn(arr, r) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === r) {
                return true;
            }
        }
        return false;
    }

    /**
     * 获取uuid
     * @returns {string}
     */
    function _getUuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "";
        var uuid = s.join("");
        return uuid;
    }

    /**
     * 拖动改变大小(改变container、body)
     * @param  {[type]} unique [description]
     * @param  {[type]} opt    [description]
     * @return {[type]}        [description]
     */
    function _dragChangeSize(unique, opt) {
        var timer;
        var mouse_x;
        var mouse_y;
        var moved = false;

        var item = $('[zero-unique-sweep-tee="' + unique + '"]')[0];
        var itemBody = $('[zero-unique-body="' + unique + '"]')[0];
        document.onmousemove = function(e) {
            if ($('[zero-unique-container="' + opt.unique + '"]').size() === 0) {
                return;
            }
            mouse_x = e.pageX;
            mouse_y = e.pageY;
            if (timer !== undefined) {
                moved = true;
            }
        };
        item.onmousedown = function() {
            // 禁用允许选中
            document.onselectstart = function() {
                return false;
            };
            // offsetTop以及offsetTop必须要放在mousedown里面，每次都要计算
            var margin_top = mouse_y - item.offsetTop;
            var margin_left = mouse_x - item.offsetLeft;

            timer = setInterval(function() {
                if (timer && moved) {
                    var to_x = mouse_x - margin_left;
                    var to_y = mouse_y - margin_top;
                    $('.zeromodal-container').css('width', to_x + 3 + 'px').css('height', to_y + 3 + 'px');
                }
            }, 5);
        };
        document.onmouseup = function() {
            if ($('[zero-unique-container="' + opt.unique + '"]').size() === 0) {
                return;
            }

            // 启用允许选中
            document.onselectstart = function() {
                return true;
            };

            clearInterval(timer);
            timer = undefined;
            moved = false;

            // 重新定位
            _resizePostion(opt);
            // 重新设置body高度
            _resizeBodyHeight(opt);

            // 重置大小后触发的事件
            if (opt.resizeAfterFn !== undefined && typeof opt.resizeAfterFn === 'function') {
                opt.resizeAfterFn(opt);
            }
        };
    }

    /* 引进第三方拖拽的JS [begin] */
    function Drag() {
        this.initialize.apply(this, arguments);
    }
    Drag.prototype = {
        initialize: function(drag, options) {
            this.drag = drag;
            this._x = this._y = 0;
            this._moveDrag = this.bind(this, this.moveDrag);
            this._stopDrag = this.bind(this, this.stopDrag);

            this.setOptions(options);

            this.handle = this.options.handle;
            this.maxContainer = this.options.maxContainer;

            this.maxTop = Math.max(this.maxContainer.clientHeight, this.maxContainer.scrollHeight) - this.drag.offsetHeight;
            this.maxLeft = Math.max(this.maxContainer.clientWidth, this.maxContainer.scrollWidth) - this.drag.offsetWidth;

            this.limit = this.options.limit;
            this.lockX = this.options.lockX;
            this.lockY = this.options.lockY;
            this.lock = this.options.lock;

            this.onStart = this.options.onStart;
            this.onMove = this.options.onMove;
            this.onStop = this.options.onStop;

            this.handle.style.cursor = "move";

            this.changeLayout();

            this.addHandler(this.handle, "mousedown", this.bind(this, this.startDrag));
        },
        changeLayout: function() {
            this.drag.style.top = this.drag.offsetTop + "px";
            this.drag.style.left = this.drag.offsetLeft + "px";
            this.drag.style.position = "absolute";
            this.drag.style.margin = "0";
        },
        startDrag: function(event) {
            var e = event || window.event;

            this._x = e.clientX - this.drag.offsetLeft;
            this._y = e.clientY - this.drag.offsetTop;

            this.addHandler(document, "mousemove", this._moveDrag);
            this.addHandler(document, "mouseup", this._stopDrag);

            if (e.preventDefault) {
                e.preventDefault();
            }
            if (this.handle.setCapture) {
                this.handle.setCapture();
            }
            this.onStart();
        },
        moveDrag: function(event) {
            var e = event || window.event;

            var iTop = e.clientY - this._y;
            var iLeft = e.clientX - this._x;

            if (this.lock) return;

            //this.limit && (iTop < 0 && (iTop = 0), iLeft < 0 && (iLeft = 0), iTop > this.maxTop && (iTop = this.maxTop), iLeft > this.maxLeft && (iLeft = this.maxLeft));

            if (!this.lockY) {
                this.drag.style.top = iTop + "px";
            }
            if (!this.lockX) {
                this.drag.style.left = iLeft + "px";
            }
            //this.lockY || (this.drag.style.top = iTop + "px");
            //this.lockX || (this.drag.style.left = iLeft + "px");

            if (e.preventDefault) {
                e.preventDefault();
            }

            this.onMove();
        },
        stopDrag: function() {
            this.removeHandler(document, "mousemove", this._moveDrag);
            this.removeHandler(document, "mouseup", this._stopDrag);

            if (this.handle.releaseCapture) {
                this.handle.releaseCapture();
            }

            this.onStop();
        },
        //参数设置
        setOptions: function(options) {
            this.options = {
                handle: this.drag, //事件对象
                limit: true, //锁定范围
                lock: false, //锁定位置
                lockX: false, //锁定水平位置
                lockY: false, //锁定垂直位置
                maxContainer: document.documentElement || document.body, //指定限制容器
                onStart: function() {}, //开始时回调函数
                onMove: function() {}, //拖拽时回调函数
                onStop: function() {} //停止时回调函数
            };
            for (var p in options) {
                this.options[p] = options[p];
            }
        },
        //添加绑定事件
        addHandler: function(oElement, sEventType, fnHandler) {
            return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler);
        },
        //删除绑定事件
        removeHandler: function(oElement, sEventType, fnHandler) {
            return oElement.removeEventListener ? oElement.removeEventListener(sEventType, fnHandler, false) : oElement.detachEvent("on" + sEventType, fnHandler);
        },
        //绑定事件到对象
        bind: function(object, fnHandler) {
            return function() {
                return fnHandler.apply(object, arguments);
            };
        }
    };
    /* 引进第三方拖拽的JS [end] */

    return zeroModal;

}(jQuery))));
